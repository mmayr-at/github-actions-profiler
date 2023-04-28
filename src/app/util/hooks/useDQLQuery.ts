import { useEffect, useState } from 'react';
import { queryExecutionClient, QueryResult, QueryState } from '@dynatrace-sdk/client-query';

/**
 * useDQLQuery: hook to fetch data from Grail via @dynatrace-sdk/client-query
 * @example
 * const [result, loading] = useDQLQuery(query);
 */
export const useDQLQuery = (dqlQuery: string): [QueryResult | null, boolean] => {
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    query(dqlQuery)
      .then((result) => {
        if (result) {
          setResult(result);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [dqlQuery]);
  return [result, isLoading];
};

const MAX_GRAIL_POLLING_RETRIES = 10;

async function query(query: string) {
  const { state, requestToken, result } = await queryExecutionClient.queryExecute({ body: { query } });

  if (state === QueryState.Succeeded) {
    return Promise.resolve(result);
  }

  if (!requestToken) {
    throw new Error('Query did not succeed and provided no request-token for future polling');
  }

  const abortQuery = async () => {
    try {
      await queryExecutionClient.queryCancel({ requestToken });
    } catch (e) {}
  };

  let retries = 0;
  while (retries < MAX_GRAIL_POLLING_RETRIES) {
    const pollResponse = await queryExecutionClient.queryPoll({ requestToken });

    switch (pollResponse.state) {
      case QueryState.Succeeded:
        return pollResponse.result;
      case QueryState.NotStarted:
      case QueryState.Running:
        retries++;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        await new Promise((resolve) => setTimeout(resolve, 1_000));
        break;
      default:
        abortQuery();
        return undefined;
    }
  }
}
