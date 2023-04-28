import React from "react";
import {
  Flex,
  LoadingIndicator,
  LoadingIndicatorProps,
} from "@dynatrace/strato-components-preview";

type CenteredLoadingIndicatorProps = {
  /** The height of the chart.
   * @defaultValue 300px
   */
  height?: string;
} & LoadingIndicatorProps;

/**
 * A component to show a centered loading indicator with some space around.
 * Helpful for loading states of components with fixes sizes, e.g. for the charts layed out in a grid.
 */
export const  CenteredLoadingIndicator = ({
  height = "300px",
  ...rest
}: CenteredLoadingIndicatorProps) => {
  return (
    <Flex justifyContent="center" alignItems="center" height={height}>
      <LoadingIndicator {...rest} />
    </Flex>
  );
}
