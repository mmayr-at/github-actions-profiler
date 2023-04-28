import React from "react";
import { Strong } from "@dynatrace/strato-components-preview";
import { LabeledLoadingIndicator } from "../util/components/LabeledLoadingIndicator";
import { DataImportState } from "./useCheckData";
import { ImportSampleDataCard } from "../cards/ImportSampleDataCard";

interface InitialDataImportSelectorProps {
  dataImportState: DataImportState;
  onImportButtonClick: () => void;
}

export const InitialDataImportSelector = ({
  dataImportState,
  onImportButtonClick,
}: InitialDataImportSelectorProps) => {
  switch (dataImportState) {
    case "not_available":
      return (
        <ImportSampleDataCard onClick={onImportButtonClick}/>
      );
    case "checking":
      return <LabeledLoadingIndicator message="Checking if there is data available ..." />;
    case "importing":
      return <LabeledLoadingIndicator message="Ingesting sample data ..." />;
    case "processing":
      return (
        <LabeledLoadingIndicator message="Import successful, events are being processed ..." />
      );
    case "error":
      return <Strong>An error occured when importing the sample data!</Strong>;
    default:
      return null;
  }
}
