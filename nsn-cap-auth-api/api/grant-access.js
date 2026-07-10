// Endpoint que TOI seule utilises (jamais depuis l'app publique) pour débloquer
// l'accès d'un client une fois son paiement Wave/Orange Money confirmé.
const { grantAccess, publicUser } = require("../lib/users");
const { withCors } = require("../lib/cors");

module.exports = withCors(async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const { email, adminSecret } = req.body || {};

  if (adminSecret !== process.env.ADMIN_SECRET) {
    res.status(403).json({ error: "Non autorisé." });
    return;
  }
  if (!email) {
    res.status(400).json({ error: "Email requis." });
    return;
  }

  try {
    const user = await grantAccess(email);
    res.status(200).json({ ok: true, user: publicUser(user) });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
