import React from 'react';
import { Card } from '../util/components/Card';
import { CreateNotificationWorkflowButton } from '../workflows/CreateNotificationWorkflowButton';

export const GetNotifiedCard = () => {
  return (
    <Card
      title='Get Notified'
      subtitle='Set up an workflow that sends you a slack notification every day.'
      content='Dynatrace Automations lets you create workflows on the fly. Here we create a simple workflow that sends you a
  slack message every morning, if the success rate of one of your GitHub workflows was below 75% for the
  previous day.'
      action={<CreateNotificationWorkflowButton />}
    />
  );
};
