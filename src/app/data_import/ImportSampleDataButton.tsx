import React from "react";
import { Button, Flex } from "@dynatrace/strato-components-preview";
import { Heading, Section } from "@dynatrace/strato-components-preview/typography";

interface ImportSampleDataButtonProps {
  onClick: () => void;
}

export default function ImportSampleDataButton({ onClick }: ImportSampleDataButtonProps) {
  return (
    <Flex gap={6} flexDirection="column" alignItems={"left"}>
      <Section>
        <Heading level={4}>Import Sample Data</Heading>
        Generate some synthetic data so you can check out the app immediately.
      </Section>
      <Button variant="accent" color="primary" onClick={onClick}>
        Import Sample Data
      </Button>
    </Flex>
  );
}
