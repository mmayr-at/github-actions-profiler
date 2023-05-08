import { createRandomBizEvents } from '../src/app/data_import/functions/generate-sample-data';

/**
 *  For the purpose of getting you up and running fast, the application contains
 *  an option to simply generate a couple of fake github action runs on the fly.
 *
 *  We will then import the data into your Grail database as business events. The rest of this application then reads
 *  this data from Grail to visualize some interesting insights.
 *
 *  Once you are ready to dig a bit deeper, we recommend that you set up a workflow that imports data from an actual
 *  GitHub repository.
 *
 *  You can use our GitHub Ingester Action (TODO: link to ingester) to do this.
 *
 *  Documentation on workflows: https://developer.dynatrace.com/category/workflows .
 */
export default async (eventType: string) => {
  const response = await fetch('/platform/classic/environment-api/v2/bizevents/ingest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/cloudevent-batch+json' },
    body: JSON.stringify(createRandomBizEvents({ eventType, maxRunsPerDay: 50, numberOfDays: 30 })),
  });
  if (response.ok) {
    return 'OK';
  } else {
    throw Error(
      'An error occured when trying to ingest sample data. The API responded with status code [${response.status}] ',
    );
  }
};
