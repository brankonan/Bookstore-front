import React, { useEffect, useRef } from "react";
import { saveToken } from "../auth";

export default function GoogleLoginButton() {
  const divRef = useRef(null);

  useEffect(() => {
    if (!window.google || !divRef.current) return;

    window.google.accounts.id.initialize({
      client_id:
        "436483457309-ll7kfh3d1gl2ht9bbmijscet054hjd3s.apps.googleusercontent.com",
      callback: async (response) => {
        console.log("GOOGLE ID TOKEN:", response.credential);
        try {
          const res = await fetch("http://localhost:5234/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: response.credential }),
          });
          if (!res.ok) throw new Error("Google login failed");
          const data = await res.json();
          saveToken(data.token);
          window.location.href = "/";
        } catch {
          alert("Neuspesna Google prijava");
        }
      },
      ux_mode: "popup",
    });

    window.google.accounts.id.renderButton(divRef.current, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "rectangular",
    });
  }, []);

  return <div ref={divRef} />;
}
