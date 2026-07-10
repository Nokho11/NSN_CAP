// Autorise les appels depuis le site (autre domaine Vercel).
// Restreins CORS_ORIGIN à l'URL exacte de ton site une fois en production.
function withCors(handler) {
  return async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return handler(req, res);
  };
}

module.exports = { withCors };
