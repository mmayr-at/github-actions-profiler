import React, { ReactElement } from "react";
import { useCycleTimeQuery } from "./hooks/useCycleTimeQuery";
import CenteredLoadingIndicator from "../util/components/CenteredLoadingIndicator";
import ChartContainer from "./ChartContainer";
import ConclusionTimeseriesChart from "./ConclusionTimeseriesChart";

interface WeeklyCycleTimesChartProps {
  workflow: string;
}

export default function WeeklyCycleTimesChart({
  workflow,
}: WeeklyCycleTimesChartProps): ReactElement | null {
  const [weeklyCycleTimes, isLoading] = useCycleTimeQuery(workflow);

  return (
    <ChartContainer heading="Average cycle time in minutes per week">
      {isLoading || weeklyCycleTimes === undefined ? (
        <CenteredLoadingIndicator />
      ) : (
        <ConclusionTimeseriesChart timeseries={weeklyCycleTimes.result} variant="line" />
      )}
    </ChartContainer>
  );
}
