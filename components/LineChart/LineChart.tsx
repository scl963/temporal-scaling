import React from "react";
import { Axis } from "./Axis";
import { useChartDimensions } from "../../utils/useChartDimensions";
import { scaleLinear } from "d3-scale";

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
    () => scaleLinear().domain([0, 100]).range([0, dms.boundedWidth]),
    [dms.boundedWidth]
  );

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  console.log(xScale.domain(), xScale.range);

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
              <Axis domain={xScale.domain()} range={xScale.range()} />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
