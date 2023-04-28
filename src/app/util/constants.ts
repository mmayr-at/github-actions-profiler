// EVENT_TYPE is the unique type identifier for the business events ingested by the GitHub Actions Profiler app.
// This is used in all queries and imports.
// Change it if you want to start over.
// See the documentation about 'event.type' for more context here:
// https://www.dynatrace.com/support/help/platform-modules/business-analytics/ba-events-capturing
export const EVENT_TYPE = "com.dynatrace.github.workflow.run";

// Used in DQL queries to specify event timestamp range. This is *not* related to the updated_at timestamp of the
// workflow run itself.
export const DQL_QUERY_TIMESTAMP_OFFSET = '90d';

// Defines in which interval the data import should re-check if there is data available.
// See DataImport.tsx for more information.
export const RELOAD_RECORDS_AVAILABLE_INTERVAL_MS = 10000;
