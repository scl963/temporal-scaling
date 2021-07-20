import { scaleLinear } from "d3-scale";
import React from "react";
import { useChartDimensions } from "../../utils/useChartDimensions";
import { Axis } from "./Axis";
import { Line } from "./Line";

const chartSettings = {
  marginLeft: 75,
  marginRight: 25,
  marginTop: 25,
  marginBottom: 25,
};

export function Scatterplot({
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
        .domain([
          Math.max(...data.map(({ y }) => y)),
          Math.min(...data.map(({ y }) => y)),
        ])
        .range([0, dms.boundedHeight]),
    [dms.boundedHeight, data]
  );

  const points = React.useMemo(() => {
    return data.map(({ x, y }) => {
      return { x, y, scaledX: xScale(x), scaledY: yScale(y) };
    });
  }, [data, xScale, yScale]);

  //   TODO: extract to separate file
  // TODO: stop being lazy and create a reusable data type
  function calculateLeastSquaresRegression(
    data: {
      x: number;
      y: number;
    }[]
  ) {
    const numPoints = data.length;
    //   To future me, sorry for the reduce :(
    const [xValuesSum, yValuesSum, sumXTimesY, sumXSquared, sumYSquared] =
      data.reduce(
        (a, b) => [
          a[0] + b.x,
          a[1] + b.y,
          a[2] + b.x * b.y,
          a[3] + b.x ** 2,
          a[4] + b.y ** 2,
        ],
        [0, 0, 0, 0, 0]
      );
    // Slope equation m =  N Σ(xy) − ΣxΣy / N Σ(x**2) − (Σx)**2
    const slopeEquationTop = numPoints * sumXTimesY - xValuesSum * yValuesSum;
    const slopeEquationBottom = numPoints * sumXSquared - xValuesSum ** 2;
    const slope = slopeEquationTop / slopeEquationBottom;

    // Y intercept equation b =  Σy − m Σx / N
    const yIntercept = (yValuesSum - slope * xValuesSum) / numPoints;
    console.log(xValuesSum, yValuesSum);

    return [slope, yIntercept];
  }

  const [slope, yIntercept] = React.useMemo(() => {
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
            {data && (
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
