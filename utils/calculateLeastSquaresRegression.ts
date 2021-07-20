import { ChartData } from "../types";

export function calculateLeastSquaresRegression(data: ChartData) {
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

    return [slope, yIntercept];
  }