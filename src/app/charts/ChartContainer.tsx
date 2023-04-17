import React, { ReactElement, ReactNode } from "react";
import Paper from "../util/components/Paper";
import { Heading } from "@dynatrace/strato-components-preview/typography";
import styled from "styled-components";

interface ChartContainerProps {
  children: ReactNode;
  heading: string;
}

const CenteredHeading = styled(Heading)`
  text-align: center;
`;

export default function ChartContainer({ heading, children }: ChartContainerProps): ReactElement {
  return (
    <Paper>
      <CenteredHeading level={5}>{heading}</CenteredHeading>
      {children}
    </Paper>
  );
}
