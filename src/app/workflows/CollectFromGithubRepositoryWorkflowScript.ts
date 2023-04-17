import { EVENT_TYPE } from "../util/Constants";

/**
 * When we dynamically create a workflow from within the app,
 * we will use a javascript function as a workflow task.
 *
 * When we create the workflow (see CreateIngesterWorkflowButton.tsx),
 * we will embed this script as part of our workflow.
 * */
export const CollectFromGithubRepositoryWorkflowScript = `
/**
This code fetches Action Workflows from a Github repository, and then 
writes that data as business events into Dynatrace Grail.   
*/
/*
  In order to access your repository, you need to provide 
  See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token 
  
  For testing purposes, you can simply add the token directly into the constant below. If you want to use this code beyond simple testing, 
  we strongly recommend to NOT store any personal credentials directly inside a Workflow, but instead make use of Dynatrace secure Secret Management capabilities. 
  
  See https://developer.dynatrace.com/preview/develop/security/secrets-management/
*/
const GITHUB_ACCESS_TOKEN = "[YOUR GITHUB TOKEN]";

/* The name of the repository you want to observe. */
const GITHUB_REPOSITORY = "Dynatrace/dynatrace-operator";

/* This is the type buy which we filter bizevents when we query data from within the github actions profiler app.
You can change this to anything you like, but it should match the EVENT_TYPE constant in the app if you want to 
see the data there.
 */
const WORKFLOW_TYPE = "${EVENT_TYPE}";

import { coreClient } from '@dynatrace-sdk/client-core';

const githubHeaders = {
  Authorization: \`Bearer \${GITHUB_ACCESS_TOKEN}\`
}

async function fetchRuns({ page, pageSize }) {
  const url = \`https://api.github.com/repos/\${GITHUB_REPOSITORY}/actions/runs?page=\${page}&per_page=\${pageSize}\`;
  console.log(\`Fetching \${url}\`);
  const response = await fetch(url, { headers: githubHeaders });
  console.log("GitHub response status: ", response.status);
  return await response.json();
}

async function ingestBizEvents(events) {
  return await fetch("/platform/classic/environment-api/v2/bizevents/ingest", {
    method: "POST",
    headers: { "Content-Type": "application/cloudevent-batch+json" },
    body: JSON.stringify(events),
  });
}

async function ingestRuns({ page, pageSize }) {
  let response = await fetchRuns({ page, pageSize });
  const runs = response.workflow_runs;
  const bizevents = runs.map((run) => {
    return {
      specversion: "1.0",
      id: run.id,
      type: WORKFLOW_TYPE,
      source: "workflow",
      data: {
        ...run,
        run_duration_ms:
          new Date(run.updated_at).getTime() - new Date(run.run_started_at).getTime(),
      },
    };
  });
  await ingestBizEvents(bizevents);
  return response;
}

async function ingestRunPages() {
  const initialPage = 1;
  let page = initialPage;
  const pageSize = 50;
  const { total_count: totalCount } = await ingestRuns({ page, pageSize });
  console.log(\`Ingested page \${page}\`);
  page++;
  while (page * pageSize < Math.min(totalCount, initialPage * pageSize + 500)) {
    await ingestRuns({ page, pageSize });
    console.log(\`Ingested page \${page}\`);
    page++;
  }
}

export default async function({ execution_id }) {
  console.log("Fetching workflow runs", GITHUB_REPOSITORY);
  await ingestRunPages();
  console.log("Successfully ingested workflow runs");
}
`;
