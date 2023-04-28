import React from "react";
import { useCycleTimeQuery } from "./hooks/useCycleTimeQuery";
import {ChartContainer} from "./ChartContainer";
import { ConclusionTimeseriesChart } from "./ConclusionTimeseriesChart";

interface WeeklyCycleTimesChartProps {
  workflow: string;
}

export const WeeklyCycleTimesChart = ({
  workflow,
}: WeeklyCycleTimesChartProps) => {
  const [weeklyCycleTimes, isLoading] = useCycleTimeQuery(workflow);

  return (
    <ChartContainer heading="Average cycle time in minutes per week">
      <ConclusionTimeseriesChart loading={isLoading} timeseries={weeklyCycleTimes?.result || []} variant="line" />
    </ChartContainer>
  );
}

