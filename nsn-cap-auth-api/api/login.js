const jwt = require("jsonwebtoken");
const { verifyPassword, publicUser } = require("../lib/users");
const { withCors } = require("../lib/cors");

module.exports = withCors(async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: "Email et mot de passe requis." });
    return;
  }

  const user = await verifyPassword(email, password);
  if (!user) {
    res.status(401).json({ error: "Email ou mot de passe incorrect." });
    return;
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.status(200).json({ ok: true, token, user: publicUser(user) });
});
