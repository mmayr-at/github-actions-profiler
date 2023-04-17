import { EVENT_TYPE } from "../util/Constants";

/**
 * This DQL returns the percentage of successful runs for each GitHub workflow.
 * */
const query = `
  fetch bizevents
| filter event.type == "${EVENT_TYPE}"
| fieldsAdd updated_timestamp = toTimestamp(updated_at)
| filter updated_timestamp > (now()-1d) and updated_timestamp < (now())
| summarize 
    success_rate = round((countIf(conclusion == "success") / toDouble(count())) * 100, decimals: 1),
    by: {name}
    `;

/**
 * When we dynamically create a workflow from within the app,
 * we will use a javascript function as a workflow task.
 *
 * When we create the workflow (see CreateNotificationWorkflowButton.tsx),
 * we will embed this script as part of our workflow.
 *
 * One of the tasks we create for our workflow is of type "dynatrace.automations:run-javascript".
 * So here we prepare a piece of code that will execute the query and finds the smallest successRate
 * a workflow made within the last day.
 *
 * The result can then be read from the next task in our workflow to decide if we want to send a notification
 * and what our message will look like.

 * */
export const sendNotificationOnFailedActionsScript = `
    import { queryClient } from '@dynatrace-sdk/client-query-v02';
    export default async function successRates() {
    const response = await queryClient.query({ query: \`${query}\` });
    let smallestSuccessRate = 100;
    response["records"].map((record)=>{
      const workflow = record.values["name"];
      const successRate = record.values["success_rate"];
      if(successRate < smallestSuccessRate) {
        smallestSuccessRate = successRate;
      } 
    });
    return smallestSuccessRate;
    }
  `;
