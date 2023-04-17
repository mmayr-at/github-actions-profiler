import { useEffect, useState } from "react";
import { queryClient, QueryResponseV2Beta } from "@dynatrace-sdk/client-query-v02";

/**
 * useDQLQuery: hook to fetch data from Grail via @dynatrace-sdk/client-query
 * @example
 * const [result, loading] = useDQLQuery(query);
 */
export const useDQLQuery = (query: string): [QueryResponseV2Beta | undefined, boolean] => {
  const [result, setResult] = useState<QueryResponseV2Beta>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    queryClient
      .query({ query: query })
      .then((res) => setResult(res))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [query]);
  return [result, isLoading];
};
