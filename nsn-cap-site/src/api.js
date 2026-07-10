// Appels au backend d'authentification (nsn-cap-auth-api).
// Renseigne l'URL de ton API une fois déployée, via la variable d'environnement
// Vite VITE_API_BASE_URL (fichier .env.local, ou variable d'environnement sur Vercel).
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  if (!API_BASE) {
    throw new Error(
      "Le backend n'est pas encore connecté. Déploie nsn-cap-auth-api puis renseigne VITE_API_BASE_URL."
    );
  }
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    });
  } catch (networkErr) {
    throw new Error(
      "Impossible de joindre le serveur. Vérifie que nsn-cap-auth-api est bien déployé et que l'URL est correcte."
    );
  }
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
