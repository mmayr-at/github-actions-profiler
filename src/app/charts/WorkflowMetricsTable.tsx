import React, { ReactElement } from "react";
import {
  DataTable,
  TableColumn,
  TableVariantConfig,
} from "@dynatrace/strato-components-preview/tables";
import { useWorkflowStatsQuery } from "./hooks/useWorkflowStatsQuery";
import CenteredLoadingIndicator from "../util/components/CenteredLoadingIndicator";

interface WorkflowMetricsTableProps {
  workflow: string;
}

export default function WorkflowMetricsTable({
  workflow,
}: WorkflowMetricsTableProps): ReactElement | null {
  const [data, isLoading] = useWorkflowStatsQuery(workflow);
  if (isLoading) return <CenteredLoadingIndicator height="374px" />;
  if (!data) return null;

  const valueColumns: TableColumn[] = data.valueHeadings.map((heading, idx) => ({
    id: `${idx}`,
    header: heading,
    accessor: `values[${idx}]`,
  }));

  const columns: TableColumn[] = [
    { id: "metrics", header: "Workflow metrics", accessor: "metric" },
    ...valueColumns,
  ];

  const tableVariant: TableVariantConfig = {
    rowDensity: "default",
    rowSeparation: "zebraStripes",
    verticalDividers: true,
    contained: true,
  };
  return <DataTable columns={columns} data={data.metrics} variant={tableVariant} fullWidth />;
}
