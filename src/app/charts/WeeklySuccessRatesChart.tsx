import React, { ReactElement } from "react";
import { useWeeklySuccessRateQuery } from "./hooks/useWeeklySuccessRateQuery";
import CenteredLoadingIndicator from "../util/components/CenteredLoadingIndicator";
import ChartContainer from "./ChartContainer";
import ConclusionTimeseriesChart from "./ConclusionTimeseriesChart";

interface WeeklySuccessRatesChartProps {
  workflow: string;
}

export default function WeeklySuccessRatesChart({
  workflow,
}: WeeklySuccessRatesChartProps): ReactElement | null {
  const [weeklySuccessRates, isLoading] = useWeeklySuccessRateQuery(workflow);

  return (
    <ChartContainer heading="Workflow runs per week">
      {isLoading || weeklySuccessRates === undefined ? (
        <CenteredLoadingIndicator />
      ) : (
        <ConclusionTimeseriesChart timeseries={weeklySuccessRates.result} variant="bar" />
      )}
    </ChartContainer>
  );
}
