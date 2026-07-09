// Envoi de message texte via l'API Cloud WhatsApp (Meta Graph API).

const GRAPH_VERSION = "v20.0";

async function sendText(to, body) {
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error("Erreur envoi WhatsApp:", res.status, errText);
  }
  return res.ok;
}

module.exports = { sendText };
