import React from "react";
import { Axis } from "./Axis";
import { useChartDimensions } from "../../hooks/useChartDimensions";
import { scaleLinear } from "d3-scale";
import { Line } from "./Line";
import { useCreateScales } from "../../hooks/useCreateScales";
import { ChartData } from "../../types";

const chartSettings = {
  marginLeft: 75,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 25,
};

export function LineChart({ data }: { data: ChartData }) {
  const [ref, dms] = useChartDimensions(chartSettings);
  const { xScale, yScale } = useCreateScales(data, dms);
  const [mounted, setMounted] = React.useState(false);

  // Prevent ssr from causing hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ width: "75vw" }}>
      <div
        className="Chart__wrapper"
        // @ts-ignore
        ref={ref}
        style={{ height: "300px" }}
      >
        <svg width={dms.width} height={dms.height}>
          <g
            transform={`translate(${[dms.marginLeft, dms.marginTop].join(
              ","
            )})`}
          >
            <rect
              width={dms.boundedWidth}
              height={dms.boundedHeight}
              fill="lavender"
            />
            {data && mounted && (
              <>
                <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
                  <Axis
                    xDomain={xScale.domain()}
                    xRange={xScale.range()}
                    yDomain={yScale.domain()}
                    yRange={yScale.range()}
                  />
                </g>
                <g>
                  <Line xScale={xScale} yScale={yScale} data={data} />
                </g>
              </>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
