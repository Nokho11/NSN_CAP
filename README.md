# NSN CAP — Backend d'authentification (comptes + accès personnalisé)

Ce backend gère la création de compte, la connexion, et le déblocage d'accès
après paiement — la brique qui manquait pour que "l'utilisateur crée un login,
paie, et accède à son interface personnalisée" devienne réel.

## Comment ça marche, de bout en bout

1. Un client clique sur une offre (ex. "Facturation — Générateur simple") dans NSN Business.
2. Il crée un compte (email + mot de passe) via le formulaire "Mon Compte" du site.
3. Il te contacte sur WhatsApp et paie via Wave/Orange Money (comme aujourd'hui).
4. **Toi**, une fois le paiement confirmé, tu appelles `/api/grant-access` avec son
   email et ton mot de passe admin — son compte passe alors en "accès débloqué".
5. La prochaine fois qu'il se connecte, il voit son interface personnalisée
   (aujourd'hui un écran d'accueil ; à terme, ton générateur de factures ABC Facture Pro,
   personnalisé à son entreprise).

Il n'y a **pas encore de paiement automatique** — l'étape 4 est manuelle, volontairement,
tant que tu n'as pas intégré une vraie API de paiement Wave/Orange Money. C'est la
façon la plus simple et fiable de démarrer.

## Débloquer l'accès d'un client (étape 4), en pratique

Une fois déployé, appelle cette commande depuis ton Mac (remplace les valeurs) :

```bash
curl -X POST https://TON-PROJET-AUTH.vercel.app/api/grant-access \
  -H "Content-Type: application/json" \
  -d '{"email":"client@example.com","adminSecret":"TON_ADMIN_SECRET"}'
```

Tu peux aussi le faire depuis un outil comme Postman ou Insomnia si tu préfères une interface.

## Déploiement (même principe que nsn-cap-whatsapp-bot)

1. Crée (ou réutilise) une base **Upstash Redis**.
2. Pousse ce dossier sur GitHub, importe-le dans **Vercel**.
3. Renseigne les variables d'environnement du fichier `.env.example` dans
   Vercel > Settings > Environment Variables.
4. Déploie. Ton API sera disponible à `https://TON-PROJET-AUTH.vercel.app`.
5. Copie cette URL dans le site `nsn-cap-site` (variable `VITE_API_BASE_URL`,
   voir son propre README) pour que le formulaire "Mon Compte" puisse l'appeler.

## Endpoints

| Route | Méthode | Rôle |
|---|---|---|
| `/api/signup` | POST `{email, password, companyName}` | Crée un compte (accès non débloqué par défaut) |
| `/api/login` | POST `{email, password}` | Connecte, renvoie un jeton de session |
| `/api/me` | GET (avec `Authorization: Bearer <token>`) | Renvoie le profil et le statut d'accès à jour |
| `/api/grant-access` | POST `{email, adminSecret}` | **Toi uniquement** — débloque l'accès après paiement |

## Sécurité

- Les mots de passe ne sont jamais stockés en clair : ils sont hachés avec bcrypt.
- Le jeton de session (JWT) est signé avec `JWT_SECRET` — garde cette valeur secrète,
  ne la commite jamais dans Git.
- `ADMIN_SECRET` protège `/api/grant-access` — ne le partage avec personne, et
  change-le si tu soupçonnes qu'il a fuité.
