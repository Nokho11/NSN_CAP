const { PILLARS } = require("../lib/pillars");
const { getProgress, setProgress } = require("../lib/store");
const { sendText } = require("../lib/whatsapp");

function formatQuestion(pillar, qIndex) {
  const q = pillar.questions[qIndex];
  const opts = q.options
    .map((opt, i) => `${i + 1}️⃣ ${opt}`)
    .join("\n");
  return `*Pilier ${pillar.id} — Question ${qIndex + 1}/${pillar.questions.length}*\n\n${q.q}\n\n${opts}\n\nRéponds avec 1, 2 ou 3.`;
}

const START_WORDS = ["start", "bonjour", "salut", "commencer", "bonsoir", "hello"];
const RESET_WORDS = ["recommencer", "reset"];

module.exports = async function handler(req, res) {
  // ---- Vérification du webhook (étape de configuration Meta) ----
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send("Verification failed");
    }
    return;
  }

  // ---- Réception d'un message WhatsApp ----
  if (req.method === "POST") {
    try {
      const entry = req.body?.entry?.[0];
      const change = entry?.changes?.[0];
      const message = change?.value?.messages?.[0];

      if (!message) {
        // Événement de statut (livré / lu) : rien à faire
        res.status(200).send("ok");
        return;
      }

      const from = message.from; // numéro de l'utilisateur
      const text = (message.text?.body || "").trim().toLowerCase();

      let progress = await getProgress(from);

      // Nouveau parcours ou mot-clé de démarrage
      if (
        START_WORDS.includes(text) ||
        (!progress.awaitingAnswer && progress.pillarIndex === 0 && progress.questionIndex === 0 && !progress.started)
      ) {
        progress = { pillarIndex: 0, questionIndex: 0, awaitingAnswer: true, started: true };
        const pillar = PILLARS[0];
        await sendText(from, `Bienvenue dans le programme *SIRR EXPLORER* !\n\n${pillar.intro}`);
        await sendText(from, formatQuestion(pillar, 0));
        await setProgress(from, progress);
        res.status(200).send("ok");
        return;
      }

      // Parcours terminé : proposer de recommencer
      if (progress.pillarIndex >= PILLARS.length) {
        if (RESET_WORDS.includes(text)) {
          progress = { pillarIndex: 0, questionIndex: 0, awaitingAnswer: true, started: true };
          const pillar = PILLARS[0];
          await sendText(from, pillar.intro);
          await sendText(from, formatQuestion(pillar, 0));
        } else {
          await sendText(from, "Tu as déjà terminé les 7 piliers ! Écris RECOMMENCER pour reprendre le parcours depuis le début.");
        }
        await setProgress(from, progress);
        res.status(200).send("ok");
        return;
      }

      // Réponse à une question en cours
      if (progress.awaitingAnswer) {
        const pillar = PILLARS[progress.pillarIndex];
        const q = pillar.questions[progress.questionIndex];
        const choice = parseInt(text, 10);

        if (!choice || choice < 1 || choice > q.options.length) {
          await sendText(from, "Réponds simplement avec 1, 2 ou 3.");
          res.status(200).send("ok");
          return;
        }

        const chosenIndex = choice - 1;
        if (chosenIndex === q.correct) {
          await sendText(from, "✅ Bonne réponse !");
        } else {
          await sendText(from, `❌ Ce n'est pas ça. La bonne réponse est : ${q.options[q.correct]}`);
        }

        const nextQuestionIndex = progress.questionIndex + 1;

        if (nextQuestionIndex < pillar.questions.length) {
          // Question suivante du même pilier
          progress.questionIndex = nextQuestionIndex;
          await sendText(from, formatQuestion(pillar, nextQuestionIndex));
        } else {
          // Pilier terminé
          await sendText(from, pillar.closing);
          const nextPillarIndex = progress.pillarIndex + 1;
          if (nextPillarIndex < PILLARS.length) {
            const nextPillar = PILLARS[nextPillarIndex];
            progress.pillarIndex = nextPillarIndex;
            progress.questionIndex = 0;
            await sendText(from, nextPillar.intro);
            await sendText(from, formatQuestion(nextPillar, 0));
          } else {
            progress.pillarIndex = PILLARS.length;
            progress.awaitingAnswer = false;
          }
        }
        await setProgress(from, progress);
        res.status(200).send("ok");
        return;
      }

      // Cas par défaut : on ne comprend pas le message
      await sendText(from, "Écris BONJOUR pour démarrer le programme SIRR EXPLORER.");
      res.status(200).send("ok");
    } catch (err) {
      console.error("Erreur webhook:", err);
      // Toujours répondre 200 pour éviter que Meta ne désactive le webhook
      res.status(200).send("ok");
    }
    return;
  }

  res.status(405).send("Method not allowed");
};
