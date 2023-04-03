import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import ReactDOM from "react-dom";

export default function Construction() {
  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </div>
  );
}
