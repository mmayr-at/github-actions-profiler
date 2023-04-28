import { AppRoot } from "@dynatrace/strato-components-preview";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app/App";

ReactDOM.render(
  <AppRoot>
    <App />
  </AppRoot>,
  document.getElementById("root"),
);
