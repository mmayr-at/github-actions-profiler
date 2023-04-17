import React from "react";
import { Button } from "@dynatrace/strato-components-preview/buttons";
import { ExpandableText } from "@dynatrace/strato-components-preview/content";
import { Heading, Section } from "@dynatrace/strato-components-preview/typography";
import { Flex } from "@dynatrace/strato-components-preview";

export default function LinkIngesterActionButton() {
  return (
    <Flex gap={6} flexDirection="column" alignItems={"left"}>
      <Section>
        <Heading level={4}>GitHub Ingester Action</Heading>
        Use our ingester GitHub Action to observe your workflows as they happen.
        <ExpandableText>
          <Section>
            This is a GitHub Action for ingesting the information about a completed GitHub Actions
            Workflow as a Business Event into Dynatrace Grail.
          </Section>
        </ExpandableText>
      </Section>
      <Button
        variant="accent"
        color="primary"
        onClick={() => {
          window.open("https://github.com/SemanticlabsGmbH/dynatrace-workflow-ingester");
        }}
      >
        Go to GitHub
      </Button>
    </Flex>
  );
}
