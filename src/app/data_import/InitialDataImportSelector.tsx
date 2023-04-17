import React from "react";
import { Flex, Strong } from "@dynatrace/strato-components-preview";
import LabeledLoadingIndicator from "../util/components/LabeledLoadingIndicator";
import { DataImportState } from "./DataImport";
import LinkIngesterActionButton from "../workflows/LinkIngesterActionButton";
import ImportSampleDataButton from "./ImportSampleDataButton";
import styled from "styled-components";

interface InitialDataImportSelectorProps {
  dataImportState: DataImportState;
  onImportButtonClick: () => void;
}

const ImportOptionDiv = styled.div`
  flex: 1;
`;

export default function InitialDataImportSelector({
  dataImportState,
  onImportButtonClick,
}: InitialDataImportSelectorProps) {
  switch (dataImportState) {
    case "not_available":
      return (
        <Flex flexDirection="column">
          <Flex gap={16}>
            <ImportOptionDiv>
              <ImportSampleDataButton onClick={onImportButtonClick} />
            </ImportOptionDiv>
            <ImportOptionDiv>
              <LinkIngesterActionButton />
            </ImportOptionDiv>
          </Flex>
        </Flex>
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
