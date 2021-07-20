import React from "react";
import { line } from "d3-shape";
import { ScaleLinear } from "d3-scale";
import { generateRandomWalkData } from "../../utils/generateRandomWalkData";

export function Line({
  xScale,
  yScale,
  data,
}: {
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  data: ReturnType<typeof generateRandomWalkData>;
}) {
  const lineGenerator = line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));
  const linePath = lineGenerator(data.map(({ x, y }) => [x, y])) || undefined;

  return (
    <path d={linePath} fill="none" stroke="currentColor" strokeWidth="1" />
  );
}
