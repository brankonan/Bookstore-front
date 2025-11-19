import React from "react";
import { Outlet, Link } from "react-router-dom";
import { isLoggedIn } from "../auth";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const logged = isLoggedIn();

  return (
    <>
      <nav
        style={{
          padding: "12px",
          borderBottom: "1px solid #eee",
          display: "flex",
          gap: 12,
        }}
      >
        <Link to="/publishers">Publishers</Link>
        <Link to="/books">Books</Link>

        {logged && <Link to="/books/new">Create Book</Link>}

        {logged && <Link to="/volumes/search">Search volumes</Link>}

        <span style={{ flex: 1 }} />
        {!logged ? <Link to="/login">Login</Link> : <LogoutButton />}
      </nav>
      <Outlet />
    </>
  );
}
