import React, { useState } from 'react';
import { Flex, Grid } from '@dynatrace/strato-components-preview';
import { WorkflowSelect } from './WorkflowSelect';
import { WorkflowMetricsTable } from './WorkflowMetricsTable';
import SuccessRateDonutChart from './SuccessRateDonutChart';
import { WeeklyCycleTimesChart } from './WeeklyCycleTimesChart';
import { WeeklySuccessRatesChart } from './WeeklySuccessRatesChart';
import { useWorkflowNamesQuery } from './hooks/useWorkflowNamesQuery';

export const ChartsLayout = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | undefined>();
  const [workflows] = useWorkflowNamesQuery();

  if (selectedWorkflow === undefined && workflows.length > 0) {
    setSelectedWorkflow(workflows[0]);
  }

  return (
    <Flex flexDirection='column'>
      <Flex>
        <WorkflowSelect selectedWorkflow={selectedWorkflow} workflows={workflows} onChange={setSelectedWorkflow} />
      </Flex>
      {selectedWorkflow && (
        <Grid gridTemplateColumns='repeat(auto-fit, minmax(320px, 1fr));' gap={16}>
          <Grid gridItem gridColumnStart='span 3'>
            <WorkflowMetricsTable workflow={selectedWorkflow} />
          </Grid>
          <Grid gridItem>
            <SuccessRateDonutChart workflow={selectedWorkflow} />
          </Grid>
          <Grid gridItem gridColumnStart='span 2'>
            <WeeklyCycleTimesChart workflow={selectedWorkflow} />
          </Grid>
          <Grid gridItem gridColumnStart='span 2'>
            <WeeklySuccessRatesChart workflow={selectedWorkflow} />
          </Grid>
        </Grid>
      )}
    </Flex>
  );
};
