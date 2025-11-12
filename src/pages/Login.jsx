import React, { useState } from "react";
import { saveToken } from "../auth";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5234/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Login failed");
      }
      const data = await res.json(); // { token: "..." }
      if (!data?.token) throw new Error("Token missing in response");
      saveToken(data.token);
      window.location.href = "/"; // ili navigacija
    } catch (err) {
      setError(err.message ?? "Greska prilikom prijave");
    }
  }

  return (
    <div style={{ padding: 12 }}>
      <h2>Login</h2>
      {error && (
        <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>
      )}
      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 320 }}
      >
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setU(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setP(e.target.value)}
        />
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
}
