import React from "react";

export type Dimensions = {
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  width?: number;
  height?: number;
};

export type CombinedChartDimensions = ReturnType<typeof combineChartDimensions>

// Copied from https://wattenberger.com/blog/react-and-d3#sizing-responsivity
const combineChartDimensions = (dimensions: Dimensions) => {
  const parsedDimensions = {
    ...dimensions,
    marginTop: dimensions.marginTop || 10,
    marginRight: dimensions.marginRight || 10,
    marginBottom: dimensions.marginBottom || 40,
    marginLeft: dimensions.marginLeft || 75,
  };
  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      Number(parsedDimensions.height) -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      Number(parsedDimensions.width) -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0
    ),
  };
};

export function useChartDimensions(
  passedSettings: Dimensions
): [
  React.MutableRefObject<HTMLElement | undefined>,
  CombinedChartDimensions
] {
  const ref = React.useRef();
  const dimensions = combineChartDimensions(passedSettings);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  // @ts-ignore
  React.useEffect(() => {
    if (dimensions.width && dimensions.height) return [ref, dimensions];

    const element = ref.current as unknown as HTMLElement;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (width != entry.contentRect.width) setWidth(entry.contentRect.width);
      if (height != entry.contentRect.height)
        setHeight(entry.contentRect.height);
    });
    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
}
