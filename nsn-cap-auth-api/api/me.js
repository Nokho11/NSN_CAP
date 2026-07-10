const jwt = require("jsonwebtoken");
const { getUser, publicUser } = require("../lib/users");
const { withCors } = require("../lib/cors");

module.exports = withCors(async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) {
    res.status(401).json({ error: "Non authentifié." });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUser(payload.email);
    if (!user) {
      res.status(401).json({ error: "Compte introuvable." });
      return;
    }
    // On revérifie toujours en base pour avoir le statut d'accès à jour,
    // même si le token a été émis avant que l'accès soit débloqué.
    res.status(200).json({ ok: true, user: publicUser(user) });
  } catch {
    res.status(401).json({ error: "Session invalide ou expirée." });
  }
});
