import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
        <Link to="/publishers">Publishers</Link>
        <br />
        <Link to="/books">Books</Link>
        <br />
        <Link to="/books/new">Create Book</Link>
        <br />
      </nav>
      <Outlet />
    </>
  );
}
