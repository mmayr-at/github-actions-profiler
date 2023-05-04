import React from 'react';
import { Card } from '../util/components/Card';
import { ExternalLink } from '@dynatrace/strato-components-preview';

export const GithubIngesterActionCard = () => {
  return (
    <Card
      title='GitHub Ingester Action'
      subtitle='Use our ingester GitHub Action to observe your workflows as they happen.'
      content='This is a GitHub Action for ingesting the information about a completed GitHub Actions Workflow as a Business
      Event into Dynatrace Grail.'
      action={
        <ExternalLink href='https://github.com/SemanticlabsGmbH/dynatrace-workflow-ingester'>Go to GitHub</ExternalLink>
      }
    />
  );
};
