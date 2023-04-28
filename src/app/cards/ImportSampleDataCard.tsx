import React from 'react';
import { Card } from '../util/components/Card';
import { Button } from '@dynatrace/strato-components-preview';

type ImportSampleDataCardProps = {
  onClick: () => void;
}

export const ImportSampleDataCard = ({ onClick }: ImportSampleDataCardProps) => {
  return (
    <Card
      title='Import Sample Data'
      subtitle='Generate some synthetic data so you can check out the app immediately.'
      content='Sample app data for the last 7 days will be created and ingested into Grail.'
      action={<Button variant="accent" color="primary" onClick={onClick}>
      Import Sample Data
    </Button>}
    />
  );
};
