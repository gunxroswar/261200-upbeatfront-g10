import { React, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#001D3D";
  }, []);
  return (
    <div>
      <Navbar />
      <div className="mx-auto">
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
              <Link href="/constructionplan">Start</Link>
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
              <Link href="/setting">Setting</Link>
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
    </div>
  );
}
