import React from 'react';
import { FormField, Select, SelectOption } from '@dynatrace/strato-components-preview/forms';

interface WorkflowSelectProps {
  selectedWorkflow?: string;
  workflows: string[];
  onChange: (arg: string | undefined) => void;
}

export const WorkflowSelect = ({ selectedWorkflow, workflows, onChange }: WorkflowSelectProps) => {
  return (
    <FormField label='Select a workflow'>
      <Select
        name='workflow-select'
        selectedId={selectedWorkflow && workflows ? [selectedWorkflow] : null}
        onChange={([selectedWorkflow]: string[]) => onChange(selectedWorkflow)}
        hasFilter
        disabled={workflows.length === 0}
      >
        {workflows.map((workflow) => (
          <SelectOption id={workflow || 'undefined'} key={workflow}>
            {workflow}
          </SelectOption>
        ))}
      </Select>
    </FormField>
  );
};
