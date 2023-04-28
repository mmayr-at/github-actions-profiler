import React from "react";
import {
  Flex,
  LoadingIndicator,
  LoadingIndicatorProps,
  Text,
} from "@dynatrace/strato-components-preview";

type LabeledLoadingIndicatorProps = {
  /**
   * Message to show below the LoadingIndicator
   */
  message: string;
} & LoadingIndicatorProps;

/**
 * A simple component to render a LoadingIndicator with a message below
 */
export const LabeledLoadingIndicator = ({
  message,
  ...rest
}: LabeledLoadingIndicatorProps) => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={16}>
      <LoadingIndicator {...rest} />
      <Text>{message}</Text>
    </Flex>
  );
}
