import { useEffect, useState } from "react";
import { useDQLQuery } from "../../util/hooks/useDQLQuery";
import { DQL_QUERY_TIMESTAMP_OFFSET, EVENT_TYPE } from "../../util/constants";

export type SuccessRate = { category: string; value: number };
export type UseSuccessRateQueryResult = { rates: SuccessRate[] };

/**
 * DQL query that returns the GitHub Actions workflow names, grouped by conclusion type (successful, failed etc).
 *
 * Note that we filter the data first, by EVENT_TYPE as well as by the full name of the selected action,
 * which we construct from the repository information and the name of the githubActionIdentifier, which we got from Github API,
 *
 * For more on building DQL queries, see https://developer.dynatrace.com/preview/explanation/dynatrace-query-language/
 * */
function query(workflowName: string) {
  return `fetch bizevents, from:now()-${DQL_QUERY_TIMESTAMP_OFFSET}
  | parse repository, "JSON:repository"
  | fieldsAdd fullName = concat(repository[full_name],"/",name)
  | filter fullName == "${workflowName}" and event.type == "${EVENT_TYPE}" and isNotNull(conclusion)
  | summarize value = count(), by: { category = conclusion }`;
}

export const useSuccessRateQuery = (
  workflowName: string,
): [UseSuccessRateQueryResult | undefined, boolean] => {
  const [result, isLoading] = useDQLQuery(query(workflowName));
  const [rates, setRates] = useState<SuccessRate[] | undefined>();

  useEffect(() => {
    if (!isLoading && result?.records) {
      setRates(result.records.map((record) => record as SuccessRate));
    }
  }, [result, isLoading]);

  return [rates ? { rates } : undefined, isLoading];
};
