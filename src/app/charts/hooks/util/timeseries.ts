import { Timeseries } from "@dynatrace/strato-components-preview";

export function normalizeTimeseriesLabels(timeseries: Timeseries): Timeseries {
  const formatName = (name: string) => {
    if (name.endsWith("_value")) {
      return name.substring(0, name.indexOf("_value"));
    } else {
      return name;
    }
  };

  if (Array.isArray(timeseries.name)) {
    return { ...timeseries, name: timeseries.name.map((name) => formatName(name)) };
  } else {
    return { ...timeseries, name: formatName(timeseries.name) };
  }
}
