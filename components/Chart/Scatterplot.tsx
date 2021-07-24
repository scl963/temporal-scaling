import { scaleLinear } from "d3-scale";
import React from "react";
import { useChartDimensions } from "../../hooks/useChartDimensions";
import { useCreateScales } from "../../hooks/useCreateScales";
import { ChartData } from "../../types";
import { calculateLeastSquaresRegression } from "../../utils/calculateLeastSquaresRegression";
import { Axis } from "./Axis";
import { Line } from "./Line";

const chartSettings = {
  marginLeft: 75,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 25,
};

export function Scatterplot({ data }: { data: ChartData }) {
  const [ref, dms] = useChartDimensions(chartSettings);
  const { xScale, yScale } = useCreateScales(data, dms);

  const points = React.useMemo(() => {
    return data.map(({ x, y }) => {
      return { x, y, scaledX: xScale(x), scaledY: yScale(y) };
    });
  }, [data, xScale, yScale]);

  const { slope, yIntercept } = React.useMemo(() => {
    return calculateLeastSquaresRegression(data);
  }, [data]);

  const bestFitLineData = React.useMemo(() => {
    const startingPoint = { x: 0, y: yIntercept };
    const highestXValue = Math.max(...data.map((el) => el.x));
    const endingPoint = {
      x: highestXValue,
      y: slope * highestXValue + yIntercept,
    };

    return [startingPoint, endingPoint];
  }, [yIntercept, data, slope]);

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
              fill="white"
            />
            {data && data.length > 1 && (
              <>
                <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
                  <Axis
                    xDomain={xScale.domain()}
                    xRange={xScale.range()}
                    yDomain={yScale.domain()}
                    yRange={yScale.range()}
                  />
                </g>
                <g stroke="steelblue" strokeWidth="1.5" fill="steelblue">
                  {points.map(({ x, y, scaledX, scaledY }) => {
                    return (
                      <circle
                        key={`${x}-${y}`}
                        cx={scaledX}
                        cy={scaledY}
                        r={3}
                      ></circle>
                    );
                  })}
                </g>
                <g>
                  <Line
                    data={bestFitLineData}
                    xScale={xScale}
                    yScale={yScale}
                  />
                </g>
              </>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
