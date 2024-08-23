// @deno-types="@types/react"
import React from "react";
// @deno-types="@types/react-dom/client"
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <div
      style={{
        fontFamily: `"IBM Plex Sans", "IBM Plex Sans JP"`,
        backgroundColor: "#999",
        margin: 0,
        padding: 0,
      }}
    >
      <App />
    </div>
  </React.StrictMode>,
);
