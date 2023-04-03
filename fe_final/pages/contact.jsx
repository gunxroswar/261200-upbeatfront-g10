import React from "react";
import Navbar from "../components/Navbar";
import Canvas from "../components/Canvas";

export default function contact() {
  return (
    <div>
      <Navbar />
      
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <div className="vstack  p-lg-4">
          <div className="text-center h3">
            <span>Contact Me</span>
            <br />
            <br />
          </div>
          <div className="text-center">
            <img
              src="/kodtae.jpg"
              width="200"
              height="200"
              style={{ objectFit: "cover", minWidth: "200px" }}
              className="rounded-circle border-2 center"
            />
          </div>
          <div className="d-flex flex-column p-2 rounded-3 ms-3 gap-3">
            <table className="table fw-bold">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>Thirachai Ngaoju</td>
                </tr>
                <tr>
                  <td>Nickname</td>
                  <td>Gun</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>It's a Secret.</td>
                </tr>
                <tr>
                  <td>Facebook</td>
                  <td>
                    <a
                      href="https://www.facebook.com/gunvarel/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://www.facebook.com/gunvarel/
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <a href="mailto:thirachai_n@cmu.ac.th">
                      thirachai_n@cmu.ac.th
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>0624193241</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>Single</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center" style={{ color: "#2173de" }}>
            <span> © 2022 gunthirachai.com By Thirachai Ngaoju</span>
          </div>
        </div>
      </div>
    </div>
  );
}
