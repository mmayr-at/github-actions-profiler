import React, { ReactElement, useState } from "react";
import { Grid } from "@dynatrace/strato-components-preview";
import WorkflowSelect from "./WorkflowSelect";
import WorkflowMetricsTable from "./WorkflowMetricsTable";
import SuccessRateDonutChart from "./SuccessRateDonutChart";
import WeeklyCycleTimesChart from "./WeeklyCycleTimesChart";
import WeeklySuccessRatesChart from "./WeeklySuccessRatesChart";
import { useWorkflowNamesQuery } from "./hooks/useWorkflowNamesQuery";
import CallToActionsCard from "./CallToActionsCard";

export default function ChartsLayout(): ReactElement {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | undefined>();
  const [workflows] = useWorkflowNamesQuery();

  if (selectedWorkflow === undefined && workflows.length > 0) {
    setSelectedWorkflow(workflows[0]);
  }

  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={32}>
      <Grid gridItem gridColumn="1 / 3">
        <CallToActionsCard />
      </Grid>
      <Grid gridItem gridColumn="1 / 2">
        <WorkflowSelect
          selectedWorkflow={selectedWorkflow}
          workflows={workflows}
          onChange={setSelectedWorkflow}
        />
      </Grid>
      <Grid gridItem gridColumn="1 /3">
        {selectedWorkflow && (
          <Grid gridTemplateColumns="repeat(4, 1fr)" gap={32}>
            <Grid gridItem gridColumn="1 / 4">
              <WorkflowMetricsTable workflow={selectedWorkflow} />
            </Grid>
            <Grid gridItem gridColumn="4 / 5">
              <SuccessRateDonutChart workflow={selectedWorkflow} />
            </Grid>
            <Grid gridItem gridColumn="1 / 3 ">
              <WeeklyCycleTimesChart workflow={selectedWorkflow} />
            </Grid>
            <Grid gridItem gridColumn="3 / 5">
              <WeeklySuccessRatesChart workflow={selectedWorkflow} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
