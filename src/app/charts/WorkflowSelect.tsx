import React from "react";
import { FormField, Select, SelectOption } from "@dynatrace/strato-components-preview/forms";

interface WorkflowSelectProps {
  selectedWorkflow: string | undefined;
  workflows: (string | undefined)[];
  onChange: (arg: string | undefined) => void;
}

export default function WorkflowSelect({
  selectedWorkflow,
  workflows,
  onChange,
}: WorkflowSelectProps) {
  if (workflows.length === 0) return null;
  return (
    <FormField label="Select a workflow">
      <Select
        name="workflow-select"
        selectedId={selectedWorkflow ? [selectedWorkflow] : null}
        onChange={([selectedWorkflow]: string[]) => onChange(selectedWorkflow)}
        hasFilter
      >
        {workflows.map((workflow) => (
          <SelectOption id={workflow || "undefined"} key={workflow}>
            {workflow}
          </SelectOption>
        ))}
      </Select>
    </FormField>
  );
}
