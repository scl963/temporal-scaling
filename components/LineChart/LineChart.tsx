import React from "react";
import { Axis } from "./Axis";
import { useChartDimensions } from "../../utils/useChartDimensions";
import { scaleLinear } from "d3-scale";
import { Line } from "./Line";

const chartSettings = {
  marginLeft: 75,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 25,
};

export function LineChart({
  data,
}: {
  data: {
    x: number;
    y: number;
  }[];
}) {
  const [ref, dms] = useChartDimensions(chartSettings);

  const xScale = React.useMemo(
    () =>
      scaleLinear()
        .domain([0, Math.max(...data.map(({ x }) => x))])
        .range([0, dms.boundedWidth]),
    [dms.boundedWidth, data]
  );

  const yScale = React.useMemo(
    () =>
      scaleLinear()
        .domain([Math.max(...data.map(({ y }) => y)) + 10, 0])
        .range([0, dms.boundedHeight]),
    [dms.boundedHeight, data]
  );

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
          </g>
        </svg>
      </div>
    </div>
  );
}
