import React from "react";
import Navbar from "../components/Navbar";

export default function experience() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <div className="vstack  p-lg-4">
          <div className="text-center">
            <span className="fw-bold h3">Experiences</span>
            <br />
            <br />
          </div>
          {/* <!-- Card1111111 --> */}
          <div className="card mb-3 fw-bold" style={{ maxWidth: "900px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src="/kuima.webp" className="img-fluid rounded-start" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">Memes-maker</h3>
                  <p className="card-text" style={{ color: "gray" }}>
                    I make many memes myself by my pictures.I think the one who
                    memes of themselves is the Legendary that's why i decide to
                    make memes myself.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- card 222222222 --> */}
          <div className="card mb-3 fw-bold" style={{ maxWidth: "900px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src="/maga.jpg" className="img-fluid rounded-start" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">Make the Magazine</h3>
                  <p className="card-text" style={{ color: "gray" }}>
                    I had made the magazines while i study in middle and high
                    school.My magazine is Health Magazine and Skeleton organ
                    Magazine.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Credit text --> */}
          <div className="text-center" style={{ color: "#2173de " }}>
            <span> © 2022 gunthirachai.com By Thirachai Ngaoju</span>
          </div>
        </div>
      </div>
    </div>
  );
}
