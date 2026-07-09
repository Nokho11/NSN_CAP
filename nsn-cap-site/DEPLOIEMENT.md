# SIRR EXPLORER — Site autonome (Motivation, Test de personnalité, Soft Skills, Simulateur)

Ce dossier est ton app, sortie de Claude et prête à devenir un vrai site, comme
portfolio-nsn ou NSN Sénégal+. Elle a été testée : `npm run build` fonctionne sans erreur.

## Ce qui a changé par rapport à la version dans Claude

Le stockage (progression du simulateur, dernier résultat du test de personnalité)
utilisait `window.storage`, une fonctionnalité propre aux artifacts Claude qui
n'existe pas en dehors. Elle est remplacée ici par `localStorage` du navigateur
(fichier `src/storage.js`) — même comportement, mais autonome. Chaque visiteur
garde sa progression sur son propre téléphone/navigateur.

## Déployer en 10 minutes (comme tes projets précédents)

1. **Créer le dépôt GitHub**
   ```bash
   cd sirr-explorer-site
   git init
   git add .
   git commit -m "Premier envoi du site SIRR EXPLORER"
   ```
   Crée un dépôt vide sur GitHub (ex. `sirr-explorer-site`), puis :
   ```bash
   git remote add origin https://github.com/Nokho11/sirr-explorer-site.git
   git branch -M main
   git push -u origin main
   ```

2. **Déployer sur Vercel**
   - Sur [vercel.com](https://vercel.com), **Add New > Project**, importe le dépôt.
   - Vercel détecte Vite automatiquement (build command : `npm run build`, output : `dist`).
   - Clique **Deploy**.
   - Ton site est en ligne à `https://sirr-explorer-site.vercel.app` (ou le nom que tu choisis).

3. **Nom de domaine (optionnel)**
   Dans Vercel > Settings > Domains, tu peux relier un nom acheté (ex. `sirr-explorer.com`)
   ou garder le sous-domaine `.vercel.app` gratuit pour démarrer.

## Tester en local avant de déployer

```bash
npm install
npm run dev
```
Puis ouvre `http://localhost:5173`.

## Prochaines briques à ajouter (quand tu seras prête)

- **Paywall** : bloquer les piliers 2 à 7 et le certificat tant qu'un paiement Wave/OM n'est pas confirmé.
- **Certificat PDF** téléchargeable à la fin du parcours.
- **Lien vers le bot WhatsApp** (`nsn-cap-whatsapp-bot`) pour ceux qui préfèrent WhatsApp au site web.
