// src/auth.js
export function saveToken(token) {
  localStorage.setItem("token", token);
}
export function getToken() {
  return localStorage.getItem("token");
}
export function clearToken() {
  localStorage.removeItem("token");
}

function decodeBase64Url(str) {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function decodePayload() {
  const token = getToken();
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  return decodeBase64Url(parts[1]);
}

function extractRoles(payload) {
  if (!payload) return [];
  // najcešće: "role" kao string ili niz
  if (Array.isArray(payload.role)) return payload.role;
  if (typeof payload.role === "string") return [payload.role];

  // ponekad biblioteke upisu "roles"
  if (Array.isArray(payload.roles)) return payload.roles;
  if (typeof payload.roles === "string") return [payload.roles];

  // ClaimTypes.Role (schematized)
  const schemaRole =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  if (Array.isArray(schemaRole)) return schemaRole;
  if (typeof schemaRole === "string") return [schemaRole];

  return [];
}

export function isLoggedIn() {
  const p = decodePayload();
  if (!p) return false;
  if (!p.exp) return true; // ako ne generišeš exp
  const now = Math.floor(Date.now() / 1000);
  return p.exp > now;
}

export function hasRole(role) {
  const roles = extractRoles(decodePayload());
  return roles.includes(role);
}
