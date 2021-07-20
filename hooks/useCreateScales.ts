import React from 'react'
import { scaleLinear } from "d3-scale";
import { ChartData } from "../types";
import { CombinedChartDimensions, Dimensions } from "./useChartDimensions";

export function useCreateScales(data: ChartData, dimensions: CombinedChartDimensions) {
    const xScale = React.useMemo(
        () =>
          scaleLinear()
            .domain([0, Math.max(...data.map(({ x }) => x))])
            .range([0, dimensions.boundedWidth]),
        [dimensions.boundedWidth, data]
      );
    
      const yScale = React.useMemo(
        () =>
          scaleLinear()
            .domain([
              Math.max(...data.map(({ y }) => y)),
              Math.min(...data.map(({ y }) => y)),
            ])
            .range([0, dimensions.boundedHeight]),
        [dimensions.boundedHeight, data]
      );

      return { xScale, yScale }
}