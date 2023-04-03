import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div
      className="d-flex justify-content-center  fw-bold h5 p-3 gap-4"
      style={{ color: "#2173de" }}
    >
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/constructionplan">
        <a>Plan</a>
      </Link>
      <Link href="/tert">
        <a>tert</a>
      </Link>
    </div>
  );
}
