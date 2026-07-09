# NSN CAP — Bot WhatsApp (7 piliers, QCM)

Ce dossier est un vrai bot WhatsApp, indépendant de Claude, à déployer sur Vercel.
Il fait passer le programme SIRR EXPLORER (7 piliers, 4 QCM chacun) directement dans
une conversation WhatsApp — exactement le contenu du simulateur, mais connecté à un
vrai numéro.

## Ce dont tu as besoin

- Un compte [Meta for Developers](https://developers.facebook.com)
- Un compte [Vercel](https://vercel.com) (le même que pour portfolio-nsn ou NSN Sénégal+)
- Un compte [Upstash](https://upstash.com) (gratuit) pour stocker la progression de chaque utilisateur

## Étape 1 — Créer l'app Meta et récupérer les identifiants

1. Va sur [developers.facebook.com](https://developers.facebook.com) → **Mes Apps** → **Créer une app** → type "Business".
2. Ajoute le produit **WhatsApp** à l'app.
3. Dans **WhatsApp > Démarrage rapide (API Setup)**, tu trouveras :
   - un **numéro de test gratuit** fourni par Meta (utilisable tout de suite pour tester),
   - un **Token d'accès temporaire** (valable 24h — à remplacer plus tard par un token permanent),
   - le **Phone Number ID**.
4. Copie ces deux valeurs dans `WHATSAPP_TOKEN` et `WHATSAPP_PHONE_NUMBER_ID`.
5. Dans **API Setup**, ajoute ton propre numéro WhatsApp comme destinataire de test pour pouvoir t'envoyer des messages à toi-même pendant les essais.

## Étape 2 — Créer la base Upstash (stockage progression)

1. Crée une base Redis gratuite sur [upstash.com](https://upstash.com).
2. Dans l'onglet **REST API** de la base, copie `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`.

## Étape 3 — Déployer sur Vercel

1. Pousse ce dossier sur un dépôt GitHub (comme tes autres projets).
2. Sur [vercel.com](https://vercel.com), **Import Project** depuis ce dépôt.
3. Dans **Settings > Environment Variables**, ajoute les 5 variables du fichier `.env.example`
   avec tes vraies valeurs.
4. Déploie. Ton webhook sera accessible à :
   `https://TON-PROJET.vercel.app/api/webhook`

## Étape 4 — Connecter le webhook à Meta

1. Choisis toi-même une phrase secrète quelconque et mets-la dans `VERIFY_TOKEN`
   (ex. `sirr-explorer-verify-2026`) — la même valeur doit être dans Vercel ET à l'étape suivante.
2. Sur developers.facebook.com → **WhatsApp > Configuration** → **Webhook** :
   - URL de rappel : `https://TON-PROJET.vercel.app/api/webhook`
   - Verify Token : la même phrase secrète que ci-dessus
   - Clique **Vérifier et enregistrer**
3. Abonne le webhook au champ **messages**.

## Étape 5 — Tester

Depuis ton téléphone, envoie **"Bonjour"** au numéro de test WhatsApp fourni par Meta.
Le bot doit répondre avec l'intro du Pilier 1 puis la première question. Réponds avec
**1**, **2** ou **3** pour enchaîner.

## Étape 6 — Passer en production (numéro réel)

Le numéro de test Meta ne peut envoyer des messages qu'aux numéros que tu as explicitement
ajoutés en test. Pour un vrai lancement :

1. Vérifie ton **Meta Business Manager** (documents d'entreprise).
2. Ajoute ton propre numéro professionnel (ou un numéro dédié) dans WhatsApp > Numéros de téléphone.
3. Génère un **token d'accès permanent** via un **System User** (Business Settings > System Users),
   plutôt que le token temporaire de 24h utilisé en test.
4. Remplace `WHATSAPP_TOKEN` sur Vercel par ce token permanent.

## Limites de cette version (MVP)

- Réponses par numéro (1, 2, 3) en texte simple — pas encore de boutons interactifs tactiles.
- Pas de tableau de bord d'administration (les données sont dans Upstash, consultables
  manuellement pour l'instant) — c'est la brique "dashboard" prévue dans le cahier des charges,
  à construire dans un second temps.
- Un seul parcours linéaire ; pas encore de reprise "au milieu d'un pilier" après une longue pause.

## Structure du projet

```
nsn-cap-whatsapp-bot/
├── api/
│   └── webhook.js       ← reçoit les messages, envoie les réponses
├── lib/
│   ├── pillars.js       ← contenu des 7 piliers et des QCM
│   ├── store.js         ← lecture/écriture de la progression (Upstash)
│   └── whatsapp.js       ← envoi de message via l'API Graph
├── package.json
└── .env.example
```
