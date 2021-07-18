import React from "react";
import { scaleLinear } from "d3-scale";

// Copied from https://wattenberger.com/blog/react-and-d3#axes
export const Axis = ({ domain = [0, 100], range = [10, 290] }) => {
  const domainString = domain.join("-");
  const rangeString = range.join("-");

  const ticks = React.useMemo(() => {
    const xScale = scaleLinear().domain(domain).range(range);

    const width = range[1] - range[0];
    const pixelsPerTick = 30;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
    // Use domain and range strings rather than array references
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainString, rangeString]);

  console.log(domain, range);

  return (
    <svg style={{ overflow: "visible" }}>
      <path
        d={["M", range[0], 6, "v", -6, "H", range[1], "v", 6].join(" ")}
        fill="none"
        stroke="currentColor"
      />
      {ticks.map(({ value, xOffset }) => (
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
  );
};
