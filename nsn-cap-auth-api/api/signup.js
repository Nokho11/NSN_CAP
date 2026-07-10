const { createUser, publicUser } = require("../lib/users");
const { withCors } = require("../lib/cors");

module.exports = withCors(async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const { email, password, companyName } = req.body || {};

  if (!email || !password) {
    res.status(400).json({ error: "Email et mot de passe requis." });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères." });
    return;
  }

  try {
    const user = await createUser({ email, password, companyName });
    res.status(201).json({ ok: true, user: publicUser(user) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
