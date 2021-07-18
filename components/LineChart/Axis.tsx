import React from "react";
import { scaleLinear } from "d3-scale";

// Copied from https://wattenberger.com/blog/react-and-d3#axes
export const Axis = ({
  xDomain = [0, 100],
  xRange = [10, 290],
  yDomain = [0, 100],
  yRange = [0, 100],
}: {
  xDomain: number[];
  xRange: number[];
  yDomain: number[];
  yRange: number[];
}) => {
  const xDomainString = xDomain.join("-");
  const xRangeString = xRange.join("-");

  const [xTicks, yTicks] = React.useMemo(() => {
    const xScale = scaleLinear().domain(xDomain).range(xRange);
    const yScale = scaleLinear().domain(yDomain).range(yRange);

    const width = xRange[1] - xRange[0];
    const height = yRange[1] - yRange[0];
    const pixelsPerTick = 30;
    const numberOfTicksTargetX = Math.max(1, Math.floor(width / pixelsPerTick));
    const numberOfTicksTargetY = Math.max(
      1,
      Math.floor(height / pixelsPerTick)
    );

    const xTicks = xScale.ticks(numberOfTicksTargetX).map((value) => ({
      value,
      xOffset: xScale(value),
    }));

    const yTicks = yScale.ticks(numberOfTicksTargetY).map((value) => ({
      value,
      yOffset: yScale(value),
    }));

    return [xTicks, yTicks];
    // Use domain and range strings rather than array references
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xDomainString, xRangeString]);

  console.log(xDomain, xRange);

  return (
    <>
      <svg style={{ overflow: "visible" }}>
        <path
          d={["M", xRange[0], 6, "v", -6, "H", xRange[1], "v", 6].join(" ")}
          fill="none"
          stroke="currentColor"
        />
        {xTicks.map(({ value, xOffset }) => (
          <g key={value} transform={`translate(${xOffset}, 0)`}>
            <line y2="6" stroke="currentColor" />
            <text
              key={value}
              style={{
                fontSize: "10px",
                textAnchor: "middle",
                transform: "translateY(20px)",
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </svg>
      <svg style={{ overflow: "visible" }}>
        <path
          d={["M", 0, yRange[0], "v", -yRange[1], "h", -6].join(" ")}
          fill="none"
          stroke="currentColor"
        />
        {yTicks.map(({ value, yOffset }) => (
          <g key={value} transform={`translate(-6, ${-yOffset})`}>
            <line x2="6" stroke="currentColor" />
            <text
              key={value}
              style={{
                fontSize: "10px",
                textAnchor: "start",
                transform: "translateX(-15px)",
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </svg>
    </>
  );
};
