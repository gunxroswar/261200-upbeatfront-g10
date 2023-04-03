import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";
import "../styles/Timer.module.css";
import Link from "next/link";

export default function App() {
  const editorRef = useRef(null);
  const [seconds, setSeconds] = useState(1000);
  const [isActive, setIsActive] = useState(true); // set isActive to true

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 0) {
            setIsActive(false); // stop the timer
            alert("Time's up!. You die son."); // notify the user
            return 0;
          } else {
            return seconds - 1;
          }
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    const g = editorRef.current.getValue();
    //alert(g);
    console.log(g);
  }
  return (
    <div className="mx-auto" style={{ background: "#001D3D" }}>
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <p
          className="text-center fst-italic"
          style={{
            fontSize: "100px",
            background: "#FFD60A    " /* Set border width */,
            color: "#FB5607",
          }}
        >
          Construction Plan
        </p>
        <div className="app">
          <div
            className="time text-center"
            style={{
              color: "white",
              fontSize: "50px",
            }}
          >
            {seconds}s
          </div>
        </div>

        <div className="text-center">
          <Editor
            height="73vh"
            length="100px"
            defaultLanguage="javascript"
            defaultValue="/* Write your Plan here */"
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="d-flex justify-content-center  fw-bold h5 p-3 gap-4">
          <button
            onClick={showValue}
            className="btn btn-success"
            style={{
              fontSize: "20px",
              padding: "10px 30px",
            }}
          >
            <Link href="/tert"> Ok</Link>
          </button>
          <button
            className="btn btn-danger"
            style={{
              fontSize: "20px",
              padding: "10px 30px",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
