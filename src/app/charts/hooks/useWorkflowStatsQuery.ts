import { useEffect, useState } from "react";
import { useDQLQuery } from "../../util/hooks/useDQLQuery";
import { RecordV2Beta } from "@dynatrace-sdk/client-query-v02/types/packages/client/query-v02/src/lib/models/record-v2-beta";
import { TimeframeV2Beta } from "@dynatrace-sdk/client-query-v02";
import { formatDuration } from "../../util/time/format-duration";
import { DQL_QUERY_TIMESTAMP_OFFSET, EVENT_TYPE } from "src/app/util/Constants";

/**
 * DQL query that returns various statistics about the GitHub Actions workflow.
 *
 * Note that we filter the data first, by EVENT_TYPE as well as by the full name of the selected workflow,
 * which we construct from the repository information and the name of the action, which we got from GitHub.
 *
 * For more on building DQL queries, see https://developer.dynatrace.com/preview/explanation/dynatrace-query-language/
 * */
function query(workflowName: string) {
  return `
fetch bizevents, from:now()-${DQL_QUERY_TIMESTAMP_OFFSET}
| parse repository, "JSON:repository"
| fieldsAdd fullName = concat(repository[full_name],"/",name)
| filter fullName=="${workflowName}" and event.type == "${EVENT_TYPE}"
| fieldsAdd updated_timestamp = toTimestamp(updated_at)
| summarize 
            triggered = count(),
            failed = countIf(conclusion == "failure"),
            cancelled = countIf(conclusion == "cancelled"),
            success = countIf(conclusion == "success"),
            success_rate = concat(toString(round((countIf(conclusion == "success") / toDouble(count())) * 100, decimals: 1)), "%"),
            cycle_time_avg = round(avg(run_duration_ms),decimals:1),
            cycle_time_min = min(run_duration_ms),
            cycle_time_max = max(run_duration_ms),
            cycle_time_stddev = stddev(run_duration_ms),
            by: {interval = bin(updated_timestamp, 7d)}
| fieldsAdd week = timeframe(from:interval, to:interval+7d)  
| fields week, triggered, failed, cancelled, success, cycle_time_avg, cycle_time_min, cycle_time_max, cycle_time_stddev, success_rate
| sort week desc
| limit 3
`;
}

export interface WorkflowMetric {
  metric: string;
  values: string[];
}

export interface WorkflowMetrics {
  valueHeadings: string[];
  metrics: WorkflowMetric[];
}

function formatTimeframeV2BetaTimestamp(val?: string) {
  if (val === undefined) {
    return "";
  }
  return new Date(val).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function extractMetricValues(records: RecordV2Beta[], metric: string): string[] {
  return records.map((record) => record.values?.[metric]?.toString() ?? "").reverse();
}

function convertToMetrics(records: RecordV2Beta[]): WorkflowMetrics {
  const valueHeadings = records
    .map((record) => {
      const week = record.values?.week as TimeframeV2Beta;
      const start = formatTimeframeV2BetaTimestamp(week.start);
      const end = formatTimeframeV2BetaTimestamp(week.end);
      return `${start} - ${end}`;
    })
    .reverse();

  return {
    valueHeadings,
    metrics: [
      {
        metric: "Triggered",
        values: extractMetricValues(records, "triggered"),
      },
      {
        metric: "Failed",
        values: extractMetricValues(records, "failed"),
      },
      {
        metric: "Cancelled",
        values: extractMetricValues(records, "cancelled"),
      },
      {
        metric: "Success",
        values: extractMetricValues(records, "success"),
      },
      {
        metric: "Success rate",
        values: extractMetricValues(records, "success_rate"),
      },
      {
        metric: "Cycle time average",
        values: extractMetricValues(records, "cycle_time_avg").map((value) =>
          formatDuration(parseInt(value)),
        ),
      },
      {
        metric: "Cycle time minimum",
        values: extractMetricValues(records, "cycle_time_min").map((value) =>
          formatDuration(parseInt(value)),
        ),
      },
      {
        metric: "Cycle time maximum",
        values: extractMetricValues(records, "cycle_time_max").map((value) =>
          formatDuration(parseInt(value)),
        ),
      },
      {
        metric: "Cycle time stddev",
        values: extractMetricValues(records, "cycle_time_stddev").map((value) =>
          formatDuration(parseInt(value)),
        ),
      },
    ],
  };
}

export const useWorkflowStatsQuery = (
  workflowName: string,
): [WorkflowMetrics | undefined, boolean] => {
  const [result, isLoading] = useDQLQuery(query(workflowName));
  const [metrics, setMetrics] = useState<WorkflowMetrics | undefined>();

  useEffect(() => {
    if (!isLoading && result?.records) {
      setMetrics(convertToMetrics(result.records));
    }
  }, [result, isLoading]);

  return [metrics, isLoading];
};
