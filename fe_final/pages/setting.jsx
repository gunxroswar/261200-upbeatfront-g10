import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";
import Link from "next/link";

export default function App() {
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
          SETTING
        </p>
        <div className=" align-items-center gap-2">
          <div>
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Row
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert row here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Column
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert column here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Plan minute
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert plan minute here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Plan second
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert plan second here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Start budget
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert start budget here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Center deposit
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert center deposit here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Time for edit plan(min)
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert time for edit plan here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Time for edit plan(sec)
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert time for edit plan here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Cost for edit plan
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert cost for edit plan here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Max deposit
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert max deposit here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
            <p
              style={{
                fontSize: "30px",
                color: "white",
              }}
            >
              Interest
            </p>
            <input
              className="form-control mb-1 fs-4"
              placeholder="insert interest here..."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center  fw-bold h5 p-3 gap-4">
          <button
            className="btn btn-success"
            style={{
              fontSize: "20px",
              padding: "10px 30px",
            }}
          >
            <Link href="/">Ok</Link>
          </button>
          <button
            className="btn btn-danger"
            style={{
              fontSize: "20px",
              padding: "10px 30px",
            }}
          >
            <Link href="/">Cancel</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
