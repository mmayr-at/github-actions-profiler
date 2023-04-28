import React, { ReactElement } from "react";
import { DonutChart } from "@dynatrace/strato-components-preview";
import { useSuccessRateQuery } from "./hooks/useSuccessRateQuery";
import {CenteredLoadingIndicator} from "../util/components/CenteredLoadingIndicator";
import {ChartContainer} from "./ChartContainer";
import { COLOR_PALETTE } from "./ChartColorPalette";

interface SuccessRateProps {
  workflow: string;
}

export default function SuccessRateDonutChart({ workflow }: SuccessRateProps): ReactElement | null {
  const [successRates, isLoading] = useSuccessRateQuery(workflow);

  return (
    <ChartContainer heading="Success rate">
      {isLoading ? (
        <CenteredLoadingIndicator />
      ) : (
        <DonutChart
          data={{ slices: successRates?.rates || [] }}
          colorPalette={COLOR_PALETTE}
          height="300"
        >
          <DonutChart.Legend position="bottom"></DonutChart.Legend>
        </DonutChart>
      )}
    </ChartContainer>
  );
}
