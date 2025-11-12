import React from "react";
import { clearToken } from "../auth";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        clearToken();
        window.location.href = "/";
      }}
    >
      Logout
    </button>
  );
}
