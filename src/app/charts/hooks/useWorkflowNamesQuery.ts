import { useEffect, useState } from 'react';
import { useDQLQuery } from '../../util/hooks/useDQLQuery';
import { DQL_QUERY_TIMESTAMP_OFFSET, EVENT_TYPE } from '../../util/constants';

const field = 'githubWorkflows';

/**
 * DQL query that returns unique qualified names of every GitHub Actions workflow we have data for.
 *
 * Note that we filter the data first, by EVENT_TYPE.
 * We create the GitHub Actions workflow identifier out of the full name of the GitHub repository, and the name of the
 * workflow.
 *
 * For more on building DQL queries, see https://developer.dynatrace.com/explanation/dynatrace-query-language/
 * */
const query = `
fetch bizevents, from:now()-${DQL_QUERY_TIMESTAMP_OFFSET}
| filter event.type == "${EVENT_TYPE}"
| filter isNotNull(name) and isNotNull(repository)
| parse repository, "JSON:repository"
| fieldsAdd fullName = concat(repository[full_name],"/",name)
| sort fullName
| summarize ${field} = collectDistinct(fullName)
| fields ${field}
| limit 1
`;

export const useWorkflowNamesQuery = (): [string[], boolean] => {
  const [result, isLoading] = useDQLQuery(query);
  const [workflows, setWorkflows] = useState<string[]>([]);
  useEffect(() => {
    const records = result?.records || [];
    const values = records[0]?.[field] as string[];
    if (!isLoading && values) {
      setWorkflows(values);
    }
  }, [result, isLoading]);
  return [workflows, isLoading];
};
