import { useEffect, useState } from "react";
import { useDQLQuery } from "../../util/hooks/useDQLQuery";
import { convertToTimeseries, Timeseries } from "@dynatrace/strato-components-preview";
import { DQL_QUERY_TIMESTAMP_OFFSET, EVENT_TYPE } from "../../util/Constants";
import { normalizeTimeseriesLabels } from "./util/timeseries";

export type UseWeeklySuccessRateQueryResult = { result: Timeseries[] };

/**
 * DQL query that returns the percentage of successful workflow runs, grouped by week.
 *
 * Note that we filter the data first, by EVENT_TYPE as well as by the full name of the selected action,
 * which we construct from the repository information and the name of the action, which we got from GitHub API,
 *
 * For more on building DQL queries, see https://developer.dynatrace.com/preview/explanation/dynatrace-query-language/
 * */
function query(workflowName: string) {
  return `
fetch bizevents, from: now() - ${DQL_QUERY_TIMESTAMP_OFFSET}
| parse repository, "JSON:repository"
| fieldsAdd fullName = concat(repository[full_name],"/",name)
| filter fullName == "${workflowName}" and event.type == "${EVENT_TYPE}" and isNotNull(conclusion)
| fieldsAdd updated_timestamp = toTimestamp(updated_at)
| summarize value = count(), by: {interval = bin(updated_timestamp, 7d), conclusion}
| fieldsAdd week = timeframe(from:interval, to:interval+7d)
| fieldsRemove interval
`;
}

export const useWeeklySuccessRateQuery = (
  workflowName: string,
): [UseWeeklySuccessRateQueryResult | undefined, boolean] => {
  const [result, isLoading] = useDQLQuery(query(workflowName));
  const [rates, setRates] = useState<Timeseries[] | undefined>();

  useEffect(() => {
    if (!isLoading && result?.records) {
      setRates(convertToTimeseries(result.records).map(normalizeTimeseriesLabels));
    }
  }, [result, isLoading]);

  return [rates ? { result: rates } : undefined, isLoading];
};
