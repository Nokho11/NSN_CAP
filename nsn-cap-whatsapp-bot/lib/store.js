// Stockage de la progression de chaque utilisateur (par numéro de téléphone).
// Utilise Upstash Redis (API REST) — gratuit jusqu'à un volume confortable pour un MVP.
// Crée un compte sur https://upstash.com, une base Redis, et renseigne les deux
// variables d'environnement ci-dessous (voir README.md).

const BASE = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  const res = await fetch(`${BASE}/${command.join("/")}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const data = await res.json();
  return data.result;
}

async function getProgress(phone) {
  const raw = await redis(["get", `nsn-cap:progress:${phone}`]);
  if (!raw) return { pillarIndex: 0, questionIndex: 0, score: 0 };
  try {
    return JSON.parse(raw);
  } catch {
    return { pillarIndex: 0, questionIndex: 0, score: 0 };
  }
}

async function setProgress(phone, progress) {
  await redis(["set", `nsn-cap:progress:${phone}`, JSON.stringify(progress)]);
}

module.exports = { getProgress, setProgress };
