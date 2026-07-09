// Contenu du programme SIRR EXPLORER — 7 piliers, QCM uniquement.
// Même contenu que l'artifact de démo (nsn-cap-app.jsx), adapté pour le bot WhatsApp réel.

const PILLARS = [
  {
    id: 1,
    title: "L'Identité Personnelle",
    intro: "Pilier 1 : L'Identité Personnelle. Quiz de validation — 4 questions.",
    questions: [
      {
        q: "La Cartographie des Valeurs sert avant tout à :",
        options: ["Choisir un métier à la mode", "Identifier tes moteurs fondamentaux et tes freins invisibles", "Copier les choix des autres"],
        correct: 1,
      },
      {
        q: "Agir en cohérence avec tes valeurs a pour effet de :",
        options: ["Augmenter le stress", "Diminuer le stress et renforcer la confiance", "N'avoir aucun effet"],
        correct: 1,
      },
      {
        q: "Un frein invisible est :",
        options: ["Un objectif clair", "Un conflit interne qui limite tes décisions", "Une valeur assumée"],
        correct: 1,
      },
      {
        q: "La première étape de tout développement personnel est de :",
        options: ["Fixer un objectif avant tout", "Identifier ses valeurs avant de fixer un objectif", "Copier la vision d'un autre"],
        correct: 1,
      },
    ],
    closing: "Bravo, Pilier 1 terminé ! On passe au potentiel en action.",
  },
  {
    id: 2,
    title: "Le Potentiel en Action",
    intro: "Pilier 2 : Le Potentiel en Action. Quiz de validation — 4 questions.",
    questions: [
      {
        q: "La Méthode CAP se compose de :",
        options: ["Calcul, Analyse, Prévision", "Conscience, Action, Progression", "Contrôle, Autorité, Performance"],
        correct: 1,
      },
      {
        q: "Chaque tour de la Roue du Potentiel permet de :",
        options: ["Revenir au point de départ", "Faire évoluer ton potentiel vers un niveau supérieur", "Réduire ta confiance"],
        correct: 1,
      },
      {
        q: "Dans la Méthode CAP, l'étape Action consiste à :",
        options: ["Attendre que tout soit parfait", "Transformer la conscience en actions concrètes et régulières", "Éviter de prendre des risques"],
        correct: 1,
      },
      {
        q: "L'étape Progression sert à :",
        options: ["Ignorer les résultats obtenus", "Observer les résultats et renforcer sa confiance", "Revenir au point de départ"],
        correct: 1,
      },
    ],
    closing: "Excellent ! Prochain pilier : l'intelligence relationnelle.",
  },
  {
    id: 3,
    title: "L'Intelligence Relationnelle",
    intro: "Pilier 3 : L'Intelligence Relationnelle. Quiz de validation — 4 questions.",
    questions: [
      {
        q: "Face à une situation tendue, la première étape est de :",
        options: ["Répondre immédiatement sur le même ton", "Identifier ton émotion avec le Thermomètre émotionnel", "Ignorer complètement la personne"],
        correct: 1,
      },
      {
        q: "Le Radar relationnel sert à :",
        options: ["Deviner l'avenir", "Repérer les signaux et besoins non exprimés de l'autre", "Éviter tout contact avec les autres"],
        correct: 1,
      },
      {
        q: "Le Thermomètre émotionnel sert à :",
        options: ["Ignorer ses émotions", "Identifier son état émotionnel en temps réel", "Prédire les émotions des autres"],
        correct: 1,
      },
      {
        q: "L'intelligence relationnelle permet surtout de :",
        options: ["Éviter tout contact humain", "Construire des relations professionnelles saines et efficaces", "Imposer son point de vue"],
        correct: 1,
      },
    ],
    closing: "Très bien, on passe à la création de valeur.",
  },
  {
    id: 4,
    title: "La Création de Valeur",
    intro: "Pilier 4 : La Création de Valeur. Quiz de validation — 4 questions.",
    questions: [
      {
        q: "Le Triangle de la Valeur repose sur :",
        options: ["Prix, Rapidité, Volume", "Utilité, Différenciation, Impact", "Chance, Réseau, Diplôme"],
        correct: 1,
      },
      {
        q: "La Différenciation, c'est :",
        options: ["Faire exactement comme les autres", "Apporter un « plus » unique que le marché n'a pas encore proposé", "Baisser ses prix au maximum"],
        correct: 1,
      },
      {
        q: "L'Utilité, dans le Triangle de la Valeur, signifie :",
        options: ["Répondre à un besoin réel", "Vendre au prix le plus bas", "Copier un concurrent"],
        correct: 0,
      },
      {
        q: "L'Impact, dans le Triangle de la Valeur, désigne :",
        options: ["Un bénéfice mesurable pour les autres", "Un profit uniquement personnel", "Une absence de résultat"],
        correct: 0,
      },
    ],
    closing: "Bravo ! Prochain pilier : la performance durable.",
  },
  {
    id: 5,
    title: "La Performance Durable",
    intro: "Pilier 5 : La Performance Durable. Quiz de validation — 4 questions.",
    questions: [
      {
        q: "La zone de haute valeur regroupe :",
        options: ["Les distractions et réseaux sociaux", "L'apprentissage, la planification et l'innovation", "Les tâches à éliminer"],
        correct: 1,
      },
      {
        q: "La performance dépend surtout de :",
        options: ["Du nombre d'heures travaillées", "De la qualité des priorités et de l'énergie investie", "De la chance"],
        correct: 1,
      },
      {
        q: "La Boussole des Décisions sert à :",
        options: ["Ignorer les priorités", "Classer les activités selon leur importance et leur impact", "Éliminer toute planification"],
        correct: 1,
      },
      {
        q: "Les distractions doivent être :",
        options: ["Traitées en priorité", "Éliminées ou fortement limitées", "Planifiées chaque matin"],
        correct: 1,
      },
    ],
    closing: "Exact ! On passe au leadership et à l'impact.",
  },
  {
    id: 6,
    title: "Le Leadership et l'Impact",
    intro: "Pilier 6 : Le Leadership et l'Impact. Quiz de validation — 4 questions.",
    questions: [
      {
        q: "La Spirale de Croissance repose sur une vision claire et :",
        options: ["L'improvisation totale", "La cohérence et l'exemplarité", "L'absence de décision"],
        correct: 1,
      },
      {
        q: "Chaque décision pertinente d'un leader :",
        options: ["Fragilise sa crédibilité", "Renforce sa crédibilité et crée une nouvelle dynamique", "N'a aucun effet"],
        correct: 1,
      },
      {
        q: "Le leadership se définit par la capacité à :",
        options: ["Imposer ses décisions sans explication", "Mobiliser les autres autour d'une vision commune", "Éviter toute prise de décision"],
        correct: 1,
      },
      {
        q: "Un des quatre principes de la Spirale de Croissance est :",
        options: ["Improviser sans direction", "Inspirer par l'exemple", "Éviter tout engagement"],
        correct: 1,
      },
    ],
    closing: "Très bien, dernier pilier : le système de progression.",
  },
  {
    id: 7,
    title: "Le Système de Progression",
    intro: "Pilier 7 : Le Système de Progression. Quiz de validation — 4 questions.",
    questions: [
      {
        q: "Le Tableau d'Impact Quotidien sert à :",
        options: ["Ne rien suivre", "Suivre les actions réalisées chaque jour et mesurer les progrès", "Remplacer les objectifs"],
        correct: 1,
      },
      {
        q: "Le Plan de Croissance se déploie sur :",
        options: ["7 jours", "90 jours", "3 ans"],
        correct: 1,
      },
      {
        q: "Le Plan de Croissance sur 90 jours permet de :",
        options: ["Structurer un objectif dans le temps", "Remplacer complètement les objectifs", "Éviter tout suivi"],
        correct: 0,
      },
      {
        q: "L'auto-évaluation hebdomadaire se note sur une échelle de :",
        options: ["1 à 5", "1 à 10", "1 à 100"],
        correct: 1,
      },
    ],
    closing: "Bravo, tu as terminé les 7 piliers du programme SIRR EXPLORER !",
  },
];

module.exports = { PILLARS };
