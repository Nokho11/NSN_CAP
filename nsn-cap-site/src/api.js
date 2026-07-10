// Appels au backend d'authentification (nsn-cap-auth-api).
// Renseigne l'URL de ton API une fois déployée, soit ici, soit via la variable
// d'environnement Vite VITE_API_BASE_URL (recommandé pour ne rien coder en dur).
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://REMPLACE-PAR-TON-API.vercel.app";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Une erreur est survenue.");
  return data;
}

export function signup({ email, password, companyName }) {
  return request("/api/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, companyName }),
  });
}

export function login({ email, password }) {
  return request("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function fetchMe(token) {
  return request("/api/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
