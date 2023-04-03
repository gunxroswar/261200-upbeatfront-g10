import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";

export default function App() {
  return (
    <div
      className="mx-auto"
      style={{
        background: "#001D3D",
      }}
    >
      <div className="d-flex justify-content-center  fw-bold h5 p-3 gap-4">
        <img
          src="./logo.png"
          style={{
            width: 750,
            height: 250,
          }}
        />
      </div>
      <div className="text-center  fw-bold h5 p-5 gap-4">
        <div className="p-4 gap-4">
          <button
            className="btn btn-success"
            style={{
              fontSize: "70px",
              padding: "20px 200px",
              backgroundColor: "Cyan",
            }}
          >
            Start
          </button>
        </div>

        <div className="p-4 gap-4">
          <button
            className="btn btn-success"
            style={{
              fontSize: "70px",
              padding: "20px 163px",
              backgroundColor: "Cyan",
            }}
          >
            Setting
          </button>
        </div>
        <div className="p-4 gap-4">
          <button
            className="btn btn-danger"
            style={{
              fontSize: "70px",
              padding: "20px 210px",
            }}
          >
            quit
          </button>
        </div>
      </div>
    </div>
  );
}
