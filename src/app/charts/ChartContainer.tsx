import React, { ReactNode } from "react";
import { Heading, Surface } from "@dynatrace/strato-components-preview";

interface ChartContainerProps {
  children: ReactNode;
  heading: string;
}

export const ChartContainer = ({ heading, children }: ChartContainerProps) => {
  return (
    <Surface>
      <Heading level={5}>{heading}</Heading>
      {children}
    </Surface>
  );
}
