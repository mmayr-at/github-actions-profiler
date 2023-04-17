import React, { useEffect, useReducer } from "react";
import { functions } from "@dynatrace/util-app";
import { queryClient } from "@dynatrace-sdk/client-query-v02";
import {
  DQL_QUERY_TIMESTAMP_OFFSET,
  EVENT_TYPE,
  RELOAD_RECORDS_AVAILABLE_INTERVAL_MS,
} from "../util/Constants";
import InitialDataImportSelector from "./InitialDataImportSelector";
import { MainViewCard } from "../util/components/MainViewCard";

/*
 * The query to determine if there is any GitHub Actions workflow run with the matching event.type in the system.
 */
const query = `
fetch bizevents, from: now() - ${DQL_QUERY_TIMESTAMP_OFFSET}
| filter event.type == "${EVENT_TYPE}"
| limit 1
`;

/*
 * The various states of the data import
 */
export type DataImportState =
  | "unknown"
  | "not_available" // We have checked, and there is no matching data available
  | "checking" // Query to check if there is data in Grail in progress
  | "importing" // Generate sample data, and POST it to the "ingest-sample-data" servless function
  | "processing" // The import was successful, but the data is not yet available in Grail
  | "ready" // The data is available
  | "error"; // An error occured during one of the steps

type DataStateAction =
  | { type: "start_check" }
  | { type: "check_result"; recordsCount: number | undefined }
  | { type: "start_import" }
  | { type: "import_success" }
  | { type: "import_error"; message: string };

/*
 * The reducer function implements a very simple state machine to determine the status of the sample data import.
 */
function reducer(state: DataImportState, action: DataStateAction): DataImportState {
  switch (action.type) {
    case "start_check":
      return state === "unknown" ? "checking" : state;
    case "check_result":
      if (action.recordsCount && action.recordsCount > 0) {
        return "ready";
      } else if (action.recordsCount === 0 && state === "processing") {
        return "processing";
      } else if (action.recordsCount === 0 && state === "checking") {
        return "not_available";
      } else {
        return state;
      }
    case "start_import":
      return "importing";
    case "import_success":
      return "processing";
    case "import_error":
      console.log("An error occured while trying to import the sample data: ", action.message);
      return "error";
  }
}

interface InitialDataImportSelectorProps {
  setDataIsReady: (ready: boolean) => void;
}

/**
 * This component checks if there is data available to show in Grail.
 * If not, it offers several options to ingest data. One of the options is to generate
 * sample data and post it into Grail with the help of a serverless function "ingest-sample-data".
 * If that option is chosen, this component also handles the states during the import.
 * If the data is ready, it calls the passed 'setDataIsReady' function to let the parent component know.
 */
export default function DataImport({ setDataIsReady }: InitialDataImportSelectorProps) {
  const [state, dispatch] = useReducer(reducer, "unknown");

  const onImportButtonClick = async () => {
    dispatch({ type: "start_import" });
    try {
      const response = await functions.call("ingest-sample-data", EVENT_TYPE);
      if (response.ok) {
        dispatch({ type: "import_success" });
      } else {
        dispatch({
          type: "import_error",
          message: "Import error, API status code: ${response.status}",
        });
      }
    } catch (e) {
      dispatch({
        type: "import_error",
        message: "Import error: ${e}",
      });
    }
  };

  useEffect(() => {
    const loadNumberOfRecords = async () => {
      dispatch({ type: "start_check" });
      const result = await queryClient.query({ query: query });
      dispatch({ type: "check_result", recordsCount: result?.records?.length });
    };
    loadNumberOfRecords();
    const id = setInterval(loadNumberOfRecords, RELOAD_RECORDS_AVAILABLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (state === "ready") {
      setDataIsReady(true);
    }
  }, [state, setDataIsReady]);

  return (
    <MainViewCard>
      <div style={{ margin: "auto" }}>
        <InitialDataImportSelector
          onImportButtonClick={onImportButtonClick}
          dataImportState={state}
        />
      </div>
    </MainViewCard>
  );
}
