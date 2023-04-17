import { ChartVariant, Timeseries, TimeseriesChart } from "@dynatrace/strato-components-preview";
import { COLOR_CANCELLED, COLOR_FAILURE, COLOR_SUCCESS } from "./ChartColorPalette";
import React from "react";

interface ConclusionTimeseriesChartProps {
  timeseries: Timeseries[];
  variant: ChartVariant;
}

function getTimeseriesChartComponent(
  variant: ChartVariant,
): typeof TimeseriesChart.Line | typeof TimeseriesChart.Bar | typeof TimeseriesChart.Area {
  if (variant === "bar") {
    return TimeseriesChart.Bar;
  } else if (variant === "area") {
    return TimeseriesChart.Area;
  } else {
    return TimeseriesChart.Line;
  }
}

export default function ConclusionTimeseriesChart({
  timeseries,
  variant,
}: ConclusionTimeseriesChartProps) {
  const successTimeseries = timeseries.find((t) => t.name === "success");
  const failureTimeseries = timeseries.find((t) => t.name === "failure");
  const cancelledTimeseries = timeseries.find((t) => t.name === "cancelled");
  const TimeseriesChartComponent = getTimeseriesChartComponent(variant);
  return (
    <TimeseriesChart variant={variant}>
      {successTimeseries && (
        <TimeseriesChartComponent data={successTimeseries} color={COLOR_SUCCESS} />
      )}
      {failureTimeseries && (
        <TimeseriesChartComponent data={failureTimeseries} color={COLOR_FAILURE} />
      )}
      {cancelledTimeseries && (
        <TimeseriesChartComponent data={cancelledTimeseries} color={COLOR_CANCELLED} />
      )}
    </TimeseriesChart>
  );
}
