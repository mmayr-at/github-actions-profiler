import { useEffect, useState } from "react";
import { useDQLQuery } from "../../util/hooks/useDQLQuery";
import { convertToTimeseries, Timeseries } from "@dynatrace/strato-components-preview";
import { DQL_QUERY_TIMESTAMP_OFFSET, EVENT_TYPE } from "src/app/util/constants";

export type UseCycleTimeQueryResult = { result: Timeseries[] };

/**
 * DQL query that show average cycle time grouped by week.
 *
 * Note that we filter the data first, by EVENT_TYPE as well as by the full name of the selected action,
 * which we construct from the repository information and the name of the action, which we got from Github API,
 *
 * For more on building DQL queries, see https://developer.dynatrace.com/preview/explanation/dynatrace-query-language/
 * */
function query(workflowName: string) {
  return `
fetch bizevents, from: now() - ${DQL_QUERY_TIMESTAMP_OFFSET}
| fieldsAdd updated_timestamp = toTimestamp(updated_at)
| parse repository, "JSON:repository"
| fieldsAdd fullName = concat(repository[full_name],"/",name)
| filter event.type == "${EVENT_TYPE}" and fullName == "${workflowName}" and isNotNull(run_duration_ms)
| summarize count = avg(run_duration_ms) / 1000 / 60.0, by: { interval = bin(updated_timestamp, 7d), conclusion }
| fieldsAdd week = timeframe(from:interval, to:interval+7d)
| fieldsRemove interval
`;
}

export const useCycleTimeQuery = (
  workflowName: string,
): [UseCycleTimeQueryResult | undefined, boolean] => {
  const [result, isLoading] = useDQLQuery(query(workflowName));
  const [cycleTimes, setCycleTimes] = useState<Timeseries[] | undefined>();

  useEffect(() => {
    if (!isLoading && result?.records) {
      setCycleTimes(convertToTimeseries(result.records, result.types));
    }
  }, [result, isLoading]);

  return [cycleTimes ? { result: cycleTimes } : undefined, isLoading];
};
