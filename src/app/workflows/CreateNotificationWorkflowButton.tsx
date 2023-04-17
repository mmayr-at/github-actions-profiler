import { IntentPayload, sendIntent } from "@dynatrace-sdk/navigation";
import { Button } from "@dynatrace/strato-components-preview/buttons";
import React from "react";
import { sendNotificationOnFailedActionsScript } from "./SendNotificationOnFailedActionsScript";
import { ExpandableText } from "@dynatrace/strato-components-preview/content";
import { Heading, Section } from "@dynatrace/strato-components-preview/typography";
import { Flex } from "@dynatrace/strato-components-preview";

/**
 * This component renders a button which will use an Intent to create a workflow in your Dynatrace environment.
 *
 * We are creating a workflow with three steps:
 *
 * - A trigger that will start your workflow every morning at 9:00
 * - A task 'successrate' that will send a DQL query to your environment.
 * - A task 'sendnotification', that will send a Slack notification to a channel of your choice.
 *
 * To learn more about Intents, see https://developer.dynatrace.com/preview/explanation/intents/
 * To learn more about Workflows, see https://developer.dynatrace.com/preview/category/workflows/
 * In order to use the Slack-Integration, you need to first install add the integration in the Dynatrace Hub:
 * https://ulc38583.apps.dynatrace.com/ui/apps/dynatrace.hub
 *
 * */
export default function CreateNotificationWorkflowButton() {
  /**
   * This DQL query finds the success rate in percent for each workflow in bizevents.
   *
   * Tip: The most convenient way to create DQL queries that you want to use in your code is is
   * to write and test the query in a Notebook. Then copy the result to your workflow or code.
   *
   * */

  const payload: IntentPayload = {
    title: "Aggregate success rates of previous day",
    tasks: {
      successrate: {
        name: "successrate",
        action: "dynatrace.automations:run-javascript",
        input: {
          script: sendNotificationOnFailedActionsScript,
        },
      },
      sendnotification: {
        name: "sendnotification",
        action: "dynatrace.slack:slack-send-message",
        input: {
          connection: "",
          channel: "random",

          message: "success rate is {{result('successrate')}}",
          reactions: "eyes",
        },
        conditions: {
          custom: "{{result('successrate') <= 75}}",
        },
        predecessors: ["successrate"],
      },
    },
    trigger: {
      schedule: {
        trigger: {
          type: "time",
          time: "09:00",
        },
      },
    },
  };

  return (
    <Flex gap={6} flexDirection="column" alignItems={"left"}>
      <Section>
        <Heading level={4}>Get Notified</Heading>
        Set up an workflow that sends you a slack notification every day.
        <ExpandableText>
          Dynatrace Automations lets you create workflows on the fly. Here we create a simple
          workflow that sends you a slack message every morning, if the success rate of one of your
          GitHub workflows was below 75% for the previous day.
        </ExpandableText>
      </Section>
      <Button
        variant="accent"
        color="primary"
        onClick={() => {
          sendIntent(payload, "dynatrace.automations", "create-workflow");
        }}
      >
        Create Workflow
      </Button>
    </Flex>
  );
}
