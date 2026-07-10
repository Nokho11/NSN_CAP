import React, { useState, useEffect, useRef } from "react";
import storage from "./storage.js";
import Auth from "./Auth.jsx";
import {
  MessageCircle, CheckCircle2, Circle, ChevronRight, Check,
  RotateCcw, Zap, ListChecks, ArrowLeft, Star, TrendingDown,
  GraduationCap, Quote, Shuffle,
  Globe, Palette, Receipt, Landmark, Briefcase, User,
} from "lucide-react";

const NAVY = "#1A1A2E";
const GOLD = "#C9A84C";
const BUBBLE = "#3E7C63";
const PAPER = "#F7F5F0";

const MODULES = [
  {
    id: 1,
    title: "L'Identité Personnelle",
    messages: [
      { from: "bot", text: "Pilier 1 : L'Identité Personnelle. Quiz de validation — 4 questions." },
      { type: "quiz", q: "La Cartographie des Valeurs sert avant tout à :", options: ["Choisir un métier à la mode", "Identifier tes moteurs fondamentaux et tes freins invisibles", "Copier les choix des autres"], correct: 1 },
      { type: "quiz", q: "Agir en cohérence avec tes valeurs a pour effet de :", options: ["Augmenter le stress", "Diminuer le stress et renforcer la confiance", "N'avoir aucun effet"], correct: 1 },
      { type: "quiz", q: "Un frein invisible est :", options: ["Un objectif clair", "Un conflit interne qui limite tes décisions", "Une valeur assumée"], correct: 1 },
      { type: "quiz", q: "La première étape de tout développement personnel est de :", options: ["Fixer un objectif avant tout", "Identifier ses valeurs avant de fixer un objectif", "Copier la vision d'un autre"], correct: 1 },
      { from: "bot", text: "Bravo, Pilier 1 terminé ! On passe au potentiel en action." },
    ],
  },
  {
    id: 2,
    title: "Le Potentiel en Action",
    messages: [
      { from: "bot", text: "Pilier 2 : Le Potentiel en Action. Quiz de validation — 4 questions." },
      { type: "quiz", q: "La Méthode CAP se compose de :", options: ["Calcul, Analyse, Prévision", "Conscience, Action, Progression", "Contrôle, Autorité, Performance"], correct: 1 },
      { type: "quiz", q: "Chaque tour de la Roue du Potentiel permet de :", options: ["Revenir au point de départ", "Faire évoluer ton potentiel vers un niveau supérieur", "Réduire ta confiance"], correct: 1 },
      { type: "quiz", q: "Dans la Méthode CAP, l'étape Action consiste à :", options: ["Attendre que tout soit parfait", "Transformer la conscience en actions concrètes et régulières", "Éviter de prendre des risques"], correct: 1 },
      { type: "quiz", q: "L'étape Progression sert à :", options: ["Ignorer les résultats obtenus", "Observer les résultats et renforcer sa confiance", "Revenir au point de départ"], correct: 1 },
      { from: "bot", text: "Excellent ! Prochain pilier : l'intelligence relationnelle." },
    ],
  },
  {
    id: 3,
    title: "L'Intelligence Relationnelle",
    messages: [
      { from: "bot", text: "Pilier 3 : L'Intelligence Relationnelle. Quiz de validation — 4 questions." },
      { type: "quiz", q: "Face à une situation tendue, la première étape est de :", options: ["Répondre immédiatement sur le même ton", "Identifier ton émotion avec le Thermomètre émotionnel", "Ignorer complètement la personne"], correct: 1 },
      { type: "quiz", q: "Le Radar relationnel sert à :", options: ["Deviner l'avenir", "Repérer les signaux et besoins non exprimés de l'autre", "Éviter tout contact avec les autres"], correct: 1 },
      { type: "quiz", q: "Le Thermomètre émotionnel sert à :", options: ["Ignorer ses émotions", "Identifier son état émotionnel en temps réel", "Prédire les émotions des autres"], correct: 1 },
      { type: "quiz", q: "L'intelligence relationnelle permet surtout de :", options: ["Éviter tout contact humain", "Construire des relations professionnelles saines et efficaces", "Imposer son point de vue"], correct: 1 },
      { from: "bot", text: "Très bien, on passe à la création de valeur." },
    ],
  },
  {
    id: 4,
    title: "La Création de Valeur",
    messages: [
      { from: "bot", text: "Pilier 4 : La Création de Valeur. Quiz de validation — 4 questions." },
      { type: "quiz", q: "Le Triangle de la Valeur repose sur :", options: ["Prix, Rapidité, Volume", "Utilité, Différenciation, Impact", "Chance, Réseau, Diplôme"], correct: 1 },
      { type: "quiz", q: "La Différenciation, c'est :", options: ["Faire exactement comme les autres", "Apporter un « plus » unique que le marché n'a pas encore proposé", "Baisser ses prix au maximum"], correct: 1 },
      { type: "quiz", q: "L'Utilité, dans le Triangle de la Valeur, signifie :", options: ["Répondre à un besoin réel", "Vendre au prix le plus bas", "Copier un concurrent"], correct: 0 },
      { type: "quiz", q: "L'Impact, dans le Triangle de la Valeur, désigne :", options: ["Un bénéfice mesurable pour les autres", "Un profit uniquement personnel", "Une absence de résultat"], correct: 0 },
      { from: "bot", text: "Bravo ! Prochain pilier : la performance durable." },
    ],
  },
  {
    id: 5,
    title: "La Performance Durable",
    messages: [
      { from: "bot", text: "Pilier 5 : La Performance Durable. Quiz de validation — 4 questions." },
      { type: "quiz", q: "La zone de haute valeur regroupe :", options: ["Les distractions et réseaux sociaux", "L'apprentissage, la planification et l'innovation", "Les tâches à éliminer"], correct: 1 },
      { type: "quiz", q: "La performance dépend surtout de :", options: ["Du nombre d'heures travaillées", "De la qualité des priorités et de l'énergie investie", "De la chance"], correct: 1 },
      { type: "quiz", q: "La Boussole des Décisions sert à :", options: ["Ignorer les priorités", "Classer les activités selon leur importance et leur impact", "Éliminer toute planification"], correct: 1 },
      { type: "quiz", q: "Les distractions doivent être :", options: ["Traitées en priorité", "Éliminées ou fortement limitées", "Planifiées chaque matin"], correct: 1 },
      { from: "bot", text: "Exact ! On passe au leadership et à l'impact." },
    ],
  },
  {
    id: 6,
    title: "Le Leadership et l'Impact",
    messages: [
      { from: "bot", text: "Pilier 6 : Le Leadership et l'Impact. Quiz de validation — 4 questions." },
      { type: "quiz", q: "La Spirale de Croissance repose sur une vision claire et :", options: ["L'improvisation totale", "La cohérence et l'exemplarité", "L'absence de décision"], correct: 1 },
      { type: "quiz", q: "Chaque décision pertinente d'un leader :", options: ["Fragilise sa crédibilité", "Renforce sa crédibilité et crée une nouvelle dynamique", "N'a aucun effet"], correct: 1 },
      { type: "quiz", q: "Le leadership se définit par la capacité à :", options: ["Imposer ses décisions sans explication", "Mobiliser les autres autour d'une vision commune", "Éviter toute prise de décision"], correct: 1 },
      { type: "quiz", q: "Un des quatre principes de la Spirale de Croissance est :", options: ["Improviser sans direction", "Inspirer par l'exemple", "Éviter tout engagement"], correct: 1 },
      { from: "bot", text: "Très bien, dernier pilier : le système de progression." },
    ],
  },
  {
    id: 7,
    title: "Le Système de Progression",
    messages: [
      { from: "bot", text: "Pilier 7 : Le Système de Progression. Quiz de validation — 4 questions." },
      { type: "quiz", q: "Le Tableau d'Impact Quotidien sert à :", options: ["Ne rien suivre", "Suivre les actions réalisées chaque jour et mesurer les progrès", "Remplacer les objectifs"], correct: 1 },
      { type: "quiz", q: "Le Plan de Croissance se déploie sur :", options: ["7 jours", "90 jours", "3 ans"], correct: 1 },
      { type: "quiz", q: "Le Plan de Croissance sur 90 jours permet de :", options: ["Structurer un objectif dans le temps", "Remplacer complètement les objectifs", "Éviter tout suivi"], correct: 0 },
      { type: "quiz", q: "L'auto-évaluation hebdomadaire se note sur une échelle de :", options: ["1 à 5", "1 à 10", "1 à 100"], correct: 1 },
      { from: "bot", text: "Bravo, tu as terminé les 7 quiz du programme SIRR EXPLORER !" },
    ],
  },
];


function useChatSequence(messages, onDone) {
  const [shown, setShown] = useState([]);
  const [typing, setTyping] = useState(false);
  const idxRef = useRef(0);
  const cancelledRef = useRef(false);

  const advance = () => {
    if (cancelledRef.current) return;
    const msg = messages[idxRef.current];
    if (!msg) {
      onDone && onDone();
      return;
    }
    if (msg.type === "quiz") {
      setShown((s) => [...s, msg]);
      return; // pause, wait for user answer via submitQuizAnswer
    }
    setTyping(true);
    setTimeout(() => {
      if (cancelledRef.current) return;
      setTyping(false);
      setShown((s) => [...s, msg]);
      idxRef.current += 1;
      setTimeout(advance, 400);
    }, 700);
  };

  useEffect(() => {
    cancelledRef.current = false;
    setShown([]);
    idxRef.current = 0;
    advance();
    return () => { cancelledRef.current = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const submitQuizAnswer = () => {
    idxRef.current += 1;
    advance();
  };

  return { shown, typing, submitQuizAnswer };
}

function PhoneChat({ moduleIndex, onModuleComplete, completedModules, onNext, isLastModule, onSelectModule }) {
  const mod = MODULES[moduleIndex];
  const [answers, setAnswers] = useState({});
  const { shown, typing, submitQuizAnswer } = useChatSequence(
    mod.messages,
    () => onModuleComplete(mod.id)
  );

  useEffect(() => setAnswers({}), [moduleIndex]);

  return (
    <div className="flex flex-col h-full">
      {/* status bar */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: BUBBLE }}>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
          CS
        </div>
        <div className="flex-1">
          <div className="text-white text-sm font-semibold leading-tight">Coach Soft Skills</div>
          <div className="text-white/70 text-xs">{typing ? "en train d'écrire…" : "en ligne"}</div>
        </div>
      </div>

      {/* chat body */}
      <div
        className="flex-1 overflow-y-auto px-3 py-4 space-y-2"
        style={{
          backgroundColor: "#DDE5D8",
          backgroundImage:
            "radial-gradient(circle at 20px 20px, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        {shown.map((m, i) => {
          if (m.type === "quiz") {
            return (
              <div key={i} className="flex flex-col items-start gap-1.5 max-w-[85%]">
                <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm">
                  <div className="text-xs uppercase tracking-wide font-semibold mb-1" style={{ color: GOLD }}>
                    Quiz éclair
                  </div>
                  <div className="text-sm font-medium mb-2" style={{ color: "#1A1A2E" }}>
                    {m.q}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {m.options.map((opt, oi) => {
                      const isCorrect = oi === m.correct;
                      const chosen = answers[i];
                      const isChosen = chosen === oi;
                      const answered = chosen !== undefined;
                      return (
                        <button
                          key={oi}
                          disabled={answered}
                          onClick={() => {
                            setAnswers((a) => ({ ...a, [i]: oi }));
                            setTimeout(() => submitQuizAnswer(), 400);
                          }}
                          className={`flex items-center justify-between gap-2 text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                            !answered
                              ? "border-gray-300 hover:border-[#3E7C63] bg-white"
                              : isCorrect
                              ? "bg-emerald-100 border-emerald-400"
                              : isChosen
                              ? "bg-red-50 border-red-300"
                              : "border-gray-200 opacity-60"
                          }`}
                        >
                          <span>{opt}</span>
                          {answered && isCorrect && <Check size={14} className="shrink-0 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>
                  {answers[i] !== undefined && answers[i] !== m.correct && (
                    <div className="text-xs mt-2 px-1" style={{ color: "#3E7C63" }}>
                      Bonne réponse : {m.options[m.correct]}
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="flex justify-start">
              <div
                className="max-w-[80%] text-white text-sm px-3 py-2 rounded-2xl rounded-tl-sm shadow-sm"
                style={{ backgroundColor: BUBBLE }}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        {typing && (
          <div className="flex justify-start">
            <div
              className="px-3 py-2 rounded-2xl rounded-tl-sm shadow-sm flex gap-1"
              style={{ backgroundColor: BUBBLE }}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {completedModules.includes(mod.id) && !isLastModule && (
        <div className="px-3 pt-2.5 bg-white border-t border-gray-200">
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-semibold"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            Pilier suivant <ChevronRight size={15} />
          </button>
        </div>
      )}
      {completedModules.includes(mod.id) && isLastModule && (
        <div className="px-3 pt-2.5 pb-1 bg-white border-t border-gray-200 flex items-center justify-center gap-1.5 text-sm font-medium" style={{ color: BUBBLE }}>
          <Check size={16} /> Parcours de démonstration terminé
        </div>
      )}

      {/* module switcher */}
      <div className="px-3 py-2.5 bg-white border-t border-gray-200 flex gap-2 overflow-x-auto">
        {MODULES.map((m, i) => {
          const done = completedModules.includes(m.id);
          const isCurrent = i === moduleIndex;
          return (
            <button
              key={m.id}
              onClick={() => onSelectModule(i)}
              className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                isCurrent ? "border-[#3E7C63] text-[#3E7C63]" : "border-gray-200 text-gray-400 hover:border-gray-300"
              }`}
            >
              {done ? <CheckCircle2 size={13} /> : <Circle size={13} />}
              M{i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Rendu markdown léger (titres ###, gras **, listes *) façon WhatsApp ----------
function renderInline(str, keyPrefix) {
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={`${keyPrefix}-${i}`}>{p.slice(2, -2)}</strong>
    ) : (
      <React.Fragment key={`${keyPrefix}-${i}`}>{p}</React.Fragment>
    )
  );
}

function MarkdownLite({ text }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} className="h-1" />;
        if (t.startsWith("### ") || t.startsWith("## ")) {
          const content = t.replace(/^#{2,3}\s+/, "");
          return (
            <div key={i} className="text-sm font-bold mt-1" style={{ color: GOLD }}>
              {renderInline(content, i)}
            </div>
          );
        }
        if (t.startsWith("* ") || t.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span style={{ color: GOLD }}>•</span>
              <span>{renderInline(t.slice(2), i)}</span>
            </div>
          );
        }
        return <div key={i}>{renderInline(t, i)}</div>;
      })}
    </div>
  );
}

const PROGRAM_PHILOSOPHY = "Ce programme repose sur une conviction simple : les compétences comportementales ne consistent pas à devenir quelqu'un d'autre, mais à développer pleinement son potentiel afin de créer davantage de valeur pour soi, pour les autres et pour son environnement.";

const COURSES = [
  {
    title: "L'Identité Personnelle",
    subtitle: "Cartographie des Valeurs · Vision personnelle",
    content: `### 🎯 Pilier 1 : L'Identité Personnelle
Cours 1 — La Cartographie des Valeurs et la Vision Personnelle
Par le programme de soft skills de SIRR EXPLORER

Les compétences comportementales (soft skills) ne se limitent pas à des techniques de communication. Elles représentent l'alignement profond entre ton identité et tes actions professionnelles, pour te permettre d'oser être toi-même avec assurance, authenticité et sérénité.

### Le mécanisme
* La performance durable découle de la **cohérence interne**.
* La **Cartographie des Valeurs** consiste à identifier tes moteurs fondamentaux — tes forces naturelles — tout en repérant les freins invisibles susceptibles de créer des conflits internes.
* Lorsque tes décisions sont alignées avec ta vision personnelle, ta confiance augmente, ton stress diminue, et tes relations deviennent plus naturelles.

**Plan d'action :**
* Identifie tes trois valeurs fondamentales.
* Définis ta vision personnelle à moyen et long terme.
* Évalue chaque projet ou décision à partir de ces trois valeurs.
* Réajuste tes actions lorsqu'elles s'éloignent de cette direction.`,
  },
  {
    title: "Le Potentiel en Action",
    subtitle: "Roue du Potentiel · Méthode CAP",
    content: `### 🎯 Pilier 2 : Le Potentiel en Action
Cours 1 — La Roue du Potentiel et la Méthode CAP
Par le programme de soft skills de SIRR EXPLORER

Ton potentiel est une ressource évolutive qui se développe grâce à une démarche progressive : la **Méthode CAP** — Conscience, Action, Progression.

### Le mécanisme
La **Roue du Potentiel** fonctionne selon trois étapes.
* **Conscience :** prendre conscience de tes capacités, de tes ressources et de ton potentiel.
* **Action :** transformer cette prise de conscience en actions concrètes, régulières et courageuses.
* **Progression :** observer les résultats obtenus, apprendre de l'expérience et renforcer progressivement ta confiance.

Chaque progression alimente naturellement un nouveau cycle d'amélioration continue, faisant évoluer ton potentiel vers un niveau supérieur.

**Plan d'action :**
* Choisis un objectif actuellement bloqué.
* Réalise immédiatement une action réalisable en moins de dix minutes.
* Observe le résultat obtenu.
* Recommence jusqu'à créer une dynamique positive.`,
  },
  {
    title: "L'Intelligence Relationnelle",
    subtitle: "Radar relationnel · Thermomètre émotionnel",
    content: `### 🎯 Pilier 3 : L'Intelligence Relationnelle
Cours 1 — Le Radar Relationnel et le Thermomètre Émotionnel
Par le programme de soft skills de SIRR EXPLORER

L'intelligence relationnelle est ta capacité à comprendre les autres tout en maîtrisant tes propres réactions, pour construire des relations professionnelles saines et efficaces.

### Le mécanisme
Ce pilier repose sur deux outils complémentaires.
* **Le Thermomètre émotionnel :** identifier ton état émotionnel en temps réel afin d'éviter que les émotions ne prennent le contrôle de tes décisions.
* **Le Radar relationnel :** observer les signaux verbaux et non verbaux, écouter activement et comprendre les besoins parfois non exprimés de ton interlocuteur pour favoriser une communication constructive.

**Plan d'action :** Lors d'une situation tendue :
* identifie ton émotion ;
* prends une respiration profonde pendant quelques secondes ;
* reformule les propos de l'autre avant de répondre ;
* privilégie les faits plutôt que les réactions impulsives.`,
  },
  {
    title: "La Création de Valeur",
    subtitle: "Triangle de la Valeur · Esprit entrepreneurial",
    content: `### 🎯 Pilier 4 : La Création de Valeur
Cours 1 — Le Triangle de la Valeur et l'Esprit Entrepreneurial
Par le programme de soft skills de SIRR EXPLORER

Ta réussite professionnelle repose sur ta capacité à créer une valeur utile, différenciante et durable.

### Le mécanisme
Toute contribution de qualité repose sur trois dimensions.
* **Utilité :** répondre à un besoin réel.
* **Différenciation :** apporter une approche, une méthode ou une qualité qui distingue clairement ton travail.
* **Impact :** créer des bénéfices mesurables pour les personnes, l'organisation ou la société.

**Plan d'action :** Analyse ton activité actuelle et identifie l'élément qui constitue ta véritable valeur ajoutée par rapport aux solutions existantes.`,
  },
  {
    title: "La Performance Durable",
    subtitle: "Boussole des Décisions · Gestion de l'énergie",
    content: `### 🎯 Pilier 5 : La Performance Durable
Cours 1 — La Boussole des Décisions et la Gestion de l'Énergie
Par le programme de soft skills de SIRR EXPLORER

Ta performance ne dépend pas du nombre d'heures travaillées, mais de la qualité de tes priorités et de l'utilisation intelligente de ton énergie.

### Le mécanisme
La **Boussole des Décisions** classe tes activités selon leur importance et leur impact.
* **Les priorités immédiates :** actions importantes nécessitant une intervention rapide.
* **La zone de haute valeur :** activités stratégiques — apprentissage, préparation, innovation, développement personnel, planification. C'est le cœur de la performance durable.
* **Les sollicitations secondaires :** demandes pouvant être déléguées, regroupées ou reportées.
* **Les distractions :** activités qui consomment du temps sans créer de valeur significative.

**Plan d'action :** Réserve chaque jour une période de concentration profonde, sans notifications ni interruptions, pour avancer sur une activité de ta zone de haute valeur.`,
  },
  {
    title: "Le Leadership et l'Impact",
    subtitle: "Spirale de Croissance · Prise de décision",
    content: `### 🎯 Pilier 6 : Le Leadership et l'Impact
Cours 1 — La Spirale de Croissance et la Prise de Décision
Par le programme de soft skills de SIRR EXPLORER

Le leadership est ta capacité à mobiliser les autres autour d'une vision commune, à prendre des décisions éclairées et à favoriser le développement de ceux qui t'entourent.

### Le mécanisme
La **Spirale de Croissance** repose sur quatre principes.
* Développer une vision claire.
* Agir avec cohérence.
* Inspirer par l'exemple.
* Faire progresser continuellement les personnes et les projets.

Chaque décision pertinente renforce ta crédibilité et crée une nouvelle dynamique de progrès.

**Plan d'action :** Face à une décision importante :
* identifie les principales options ;
* analyse leurs conséquences à moyen terme ;
* choisis la solution la plus cohérente avec ta vision ;
* agis avec constance.`,
  },
  {
    title: "Le Système de Progression",
    subtitle: "Tableau d'Impact Quotidien · Plan 90 jours",
    content: `### 🎯 Pilier 7 : Le Système de Progression
Cours 1 — Le Tableau d'Impact Quotidien et le Plan de Croissance sur 90 Jours
Par le programme de soft skills de SIRR EXPLORER

Le développement de tes compétences comportementales nécessite un système de suivi qui transforme les apprentissages en habitudes durables.

### Le mécanisme
Tu déploies un **Plan de Croissance sur 90 Jours**, soutenu par un **Tableau d'Impact Quotidien**. Ce système te permet de :
* définir un objectif clair ;
* suivre les actions réalisées chaque jour ;
* mesurer régulièrement tes progrès ;
* ajuster tes habitudes selon les résultats obtenus.

**Plan d'action :**
* Choisis une compétence comportementale à développer.
* Définis ton indicateur de progression.
* Complète quotidiennement ton tableau de suivi.
* Réalise une auto-évaluation hebdomadaire sur une échelle de 1 à 10.
* Ajuste ton plan de progression jusqu'à atteindre l'objectif fixé.`,
  },
];

function SoftSkillsCourse() {
  const [selected, setSelected] = useState(null);

  if (selected === null) {
    return (
      <div className="h-full overflow-y-auto p-6 sm:p-8" style={{ backgroundColor: NAVY }}>
        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: GOLD }}>
          Programme Soft Skills — SIRR EXPLORER
        </div>
        <div className="text-white text-lg font-semibold mb-2">Choisis un pilier pour lire le cours complet</div>
        <div className="text-white/50 text-xs max-w-xl mb-4 leading-relaxed">{PROGRAM_PHILOSOPHY}</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {COURSES.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="flex flex-col items-start gap-1.5 p-4 rounded-xl border text-left transition-colors hover:border-[#C9A84C]"
              style={{ backgroundColor: "#22233A", borderColor: "#33344F" }}
            >
              <div className="flex items-center gap-2">
                <GraduationCap size={15} style={{ color: GOLD }} />
                <span className="text-xs font-semibold" style={{ color: GOLD }}>Pilier {i + 1}</span>
              </div>
              <div className="text-white font-semibold text-sm">{c.title}</div>
              <div className="text-white/40 text-xs">{c.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const course = COURSES[selected];
  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: NAVY }}>
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#33344F" }}>
        <button onClick={() => setSelected(null)} className="text-white/50 hover:text-white">
          <ArrowLeft size={18} />
        </button>
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: GOLD }}>
          <GraduationCap size={18} color={NAVY} />
        </div>
        <div>
          <div className="text-white text-sm font-semibold leading-tight">Pilier {selected + 1}</div>
          <div className="text-white/50 text-xs">Programme SIRR EXPLORER — SIRR TECH</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div
          className="max-w-2xl mx-auto text-sm px-4 py-4 rounded-2xl"
          style={{ backgroundColor: "#22233A", color: "white" }}
        >
          <MarkdownLite text={course.content} />
        </div>
        <div className="max-w-2xl mx-auto flex justify-between mt-4 pb-2">
          <button
            disabled={selected === 0}
            onClick={() => setSelected(selected - 1)}
            className="text-xs px-3 py-1.5 rounded-full border disabled:opacity-30"
            style={{ borderColor: "#33344F", color: GOLD }}
          >
            ← Pilier précédent
          </button>
          <button
            disabled={selected === COURSES.length - 1}
            onClick={() => setSelected(selected + 1)}
            className="text-xs px-3 py-1.5 rounded-full border disabled:opacity-30"
            style={{ borderColor: "#33344F", color: GOLD }}
          >
            Pilier suivant →
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Motivation : proverbes et pensées, organisés par thème ----------
const PROVERBS = [
  // Persévérance
  { c: "Persévérance", t: "La rivière qui persévère finit par percer la montagne." },
  { c: "Persévérance", t: "Ce n'est pas la hauteur de la chute qui compte, mais la vitesse à laquelle tu te relèves." },
  { c: "Persévérance", t: "Petit à petit, l'oiseau fait son nid." },
  { c: "Persévérance", t: "Celui qui marche lentement mais sans jamais s'arrêter va plus loin que celui qui court puis abandonne." },
  { c: "Persévérance", t: "La patience du pêcheur nourrit tout le village." },
  { c: "Persévérance", t: "Un mur ne tombe pas au premier coup de pioche." },
  { c: "Persévérance", t: "La graine qui doute d'elle-même ne devient jamais arbre." },
  { c: "Persévérance", t: "Continuer quand c'est difficile, voilà ce qui distingue le champion du spectateur." },
  { c: "Persévérance", t: "L'eau qui goutte chaque jour finit par creuser la pierre." },
  { c: "Persévérance", t: "Ne mesure pas ta réussite au nombre de chutes, mais au nombre de fois où tu t'es relevé." },
  { c: "Persévérance", t: "Le chemin le plus long commence toujours par un seul pas répété chaque jour." },
  { c: "Persévérance", t: "La corde tressée fil après fil devient assez forte pour tirer un éléphant." },
  { c: "Persévérance", t: "Rien ne pousse sans qu'on l'arrose chaque jour, même quand le ciel est sec." },
  { c: "Persévérance", t: "Le sculpteur ne voit pas la pierre s'user ; il ne voit que la statue qui apparaît." },
  { c: "Persévérance", t: "Un fleuve qui doute de sa course n'atteint jamais la mer." },
  { c: "Persévérance", t: "La ténacité transforme un ruisseau en océan." },

  // Action
  { c: "Action", t: "On ne récolte jamais un champ qu'on n'a pas semé." },
  { c: "Action", t: "Le meilleur moment pour agir était hier ; le second meilleur, c'est maintenant." },
  { c: "Action", t: "Une idée sans action reste un rêve ; une action sans idée devient de l'agitation." },
  { c: "Action", t: "Celui qui attend le vent parfait ne prend jamais la mer." },
  { c: "Action", t: "Mille pensées ne valent pas un seul geste." },
  { c: "Action", t: "Le pas le plus difficile est toujours le premier, jamais le dixième." },
  { c: "Action", t: "On n'apprend pas à nager en restant sur la rive." },
  { c: "Action", t: "L'artisan qui hésite laisse le bois brut ; celui qui ose sculpte une œuvre." },
  { c: "Action", t: "Une action imparfaite aujourd'hui vaut mieux qu'un plan parfait jamais commencé." },
  { c: "Action", t: "Le feu ne se juge pas à la fumée, mais à la chaleur qu'il donne quand on l'allume." },
  { c: "Action", t: "Qui sème dans la peur récolte dans le regret." },
  { c: "Action", t: "Avancer d'un pas de fourmi vaut mieux que rêver d'un bond de lion." },
  { c: "Action", t: "La route se dessine sous les pieds de celui qui marche, pas sous ceux qui l'observent." },
  { c: "Action", t: "Le potier ne façonne jamais l'argile en la regardant seulement." },
  { c: "Action", t: "Rien ne se construit dans l'attente, tout se construit dans le geste." },
  { c: "Action", t: "Le vent ne pousse que les voiles déjà déployées." },

  // Échec et apprentissage
  { c: "Échec et apprentissage", t: "L'échec n'est pas l'opposé du succès, il en fait partie." },
  { c: "Échec et apprentissage", t: "Celui qui n'a jamais trébuché n'a jamais marché assez loin." },
  { c: "Échec et apprentissage", t: "On n'apprend pas à forger sans se brûler un peu." },
  { c: "Échec et apprentissage", t: "Une chute enseigne plus qu'une centaine de conseils." },
  { c: "Échec et apprentissage", t: "L'erreur d'hier est le maître silencieux d'aujourd'hui." },
  { c: "Échec et apprentissage", t: "Le potier casse dix pots pour en réussir un seul, et ce seul pot vaut tous les autres." },
  { c: "Échec et apprentissage", t: "Ne crains pas l'échec, crains de ne jamais essayer." },
  { c: "Échec et apprentissage", t: "Chaque cicatrice raconte une leçon que la théorie n'aurait jamais pu enseigner." },
  { c: "Échec et apprentissage", t: "Le vent brise la branche rigide, mais plie sans casser la branche souple qui a appris à céder." },
  { c: "Échec et apprentissage", t: "Celui qui tombe sept fois et se relève huit connaît le chemin mieux que quiconque." },
  { c: "Échec et apprentissage", t: "L'échec est une porte fermée qui pousse à en chercher une autre, jamais un mur." },
  { c: "Échec et apprentissage", t: "On ne devient pas sage en évitant les erreurs, mais en les écoutant." },
  { c: "Échec et apprentissage", t: "Le forgeron aime le feu, car c'est lui qui donne sa forme au métal." },
  { c: "Échec et apprentissage", t: "Une défaite bien comprise vaut mieux qu'une victoire mal expliquée." },
  { c: "Échec et apprentissage", t: "Le fruit tombé nourrit la terre qui fera pousser l'arbre suivant." },
  { c: "Échec et apprentissage", t: "Rien n'est perdu tant que la leçon est gardée." },

  // Temps
  { c: "Temps", t: "Le temps perdu ne se rachète jamais, mais le temps investi se multiplie." },
  { c: "Temps", t: "L'arbre qu'on n'a pas planté hier ne donnera pas d'ombre aujourd'hui." },
  { c: "Temps", t: "Un jour bien vécu vaut mieux qu'une année gaspillée à attendre." },
  { c: "Temps", t: "Le sablier ne s'arrête jamais pour attendre celui qui hésite." },
  { c: "Temps", t: "Ce que tu remets à demain, la vie ne te le rendra pas." },
  { c: "Temps", t: "Le fleuve n'attend jamais celui qui traîne sur la rive." },
  { c: "Temps", t: "Une heure de discipline vaut plus qu'une semaine de bonnes intentions." },
  { c: "Temps", t: "Le temps est un champ : ce que tu n'y sèmes pas, personne d'autre ne le récoltera pour toi." },
  { c: "Temps", t: "Chaque instant gaspillé est une graine qu'on refuse de planter." },
  { c: "Temps", t: "Le soleil ne repasse jamais deux fois par le même endroit du ciel." },
  { c: "Temps", t: "Qui court après deux lièvres à la fois n'en attrape aucun." },
  { c: "Temps", t: "Le temps ne se garde pas dans les mains, seulement dans les actes." },
  { c: "Temps", t: "Une minute de préparation vaut une heure de réparation." },
  { c: "Temps", t: "L'horloge n'a pas de mémoire ; elle avance, que tu sois prêt ou non." },
  { c: "Temps", t: "Chaque matin est une page blanche ; ne la laisse pas vide par paresse." },
  { c: "Temps", t: "Ce que tu fais aujourd'hui décide de ce que tu seras dans dix ans." },

  // Travail et valeur
  { c: "Travail et valeur", t: "Le travail bien fait parle plus fort que mille promesses." },
  { c: "Travail et valeur", t: "On ne juge pas l'artisan à ses outils, mais à la qualité de son ouvrage." },
  { c: "Travail et valeur", t: "La sueur d'aujourd'hui est la récolte de demain." },
  { c: "Travail et valeur", t: "Un travail fait avec le cœur laisse une trace que l'argent seul ne peut effacer." },
  { c: "Travail et valeur", t: "Le vrai salaire d'un travail bien fait, c'est la fierté qu'il laisse derrière lui." },
  { c: "Travail et valeur", t: "Celui qui soigne les petites tâches mérite qu'on lui confie les grandes." },
  { c: "Travail et valeur", t: "La valeur d'un homme se mesure à ce qu'il donne, pas à ce qu'il garde." },
  { c: "Travail et valeur", t: "Un bon ouvrage se reconnaît même dans l'obscurité." },
  { c: "Travail et valeur", t: "Ce que tu construis avec rigueur résiste aux tempêtes que subissent les bâtisseurs pressés." },
  { c: "Travail et valeur", t: "Le travail honnête ne craint ni la lumière du jour ni le jugement du temps." },
  { c: "Travail et valeur", t: "On ne mesure pas la valeur d'un puits à sa profondeur visible, mais à l'eau qu'il donne au village." },
  { c: "Travail et valeur", t: "La qualité se voit dans les détails que personne ne pense à regarder." },
  { c: "Travail et valeur", t: "Un travail négligé aujourd'hui coûte toujours plus cher demain." },
  { c: "Travail et valeur", t: "La différence entre bon et excellent tient souvent à un dernier effort que peu acceptent de fournir." },
  { c: "Travail et valeur", t: "Ce que les mains construisent avec soin, le cœur le porte avec fierté." },
  { c: "Travail et valeur", t: "Servir avec excellence, c'est déjà mener." },

  // Ambition et vision
  { c: "Ambition et vision", t: "Celui qui ne vise rien touche toujours sa cible." },
  { c: "Ambition et vision", t: "Un rêve sans plan reste une étoile qu'on regarde sans jamais atteindre." },
  { c: "Ambition et vision", t: "La montagne se gravit toujours par ceux qui la regardent en marchant, jamais d'un bond." },
  { c: "Ambition et vision", t: "Voir loin, c'est déjà commencer à avancer." },
  { c: "Ambition et vision", t: "L'ambition sans discipline est un feu de paille ; l'ambition avec méthode est une braise qui dure." },
  { c: "Ambition et vision", t: "Un grand arbre n'a jamais douté qu'il était une graine." },
  { c: "Ambition et vision", t: "Ceux qui construisent l'avenir commencent toujours par l'imaginer avec précision." },
  { c: "Ambition et vision", t: "La vision trace le chemin que la volonté doit ensuite parcourir." },
  { c: "Ambition et vision", t: "On ne devient pas grand en visant petit." },
  { c: "Ambition et vision", t: "Rêver haut engage à marcher longtemps, mais mène toujours plus loin que ne pas rêver du tout." },
  { c: "Ambition et vision", t: "L'horizon recule pour celui qui avance, jamais pour celui qui reste immobile." },
  { c: "Ambition et vision", t: "Ambitionner sans agir, c'est cultiver un champ qu'on ne sème jamais." },
  { c: "Ambition et vision", t: "La grandeur d'un projet se mesure à la clarté de celui qui le porte." },
  { c: "Ambition et vision", t: "Ceux qui changent le monde commencent toujours par changer leur propre journée." },
  { c: "Ambition et vision", t: "Une vision claire éclaire même les nuits les plus sombres." },
  { c: "Ambition et vision", t: "Il faut viser la lune pour, même en cas d'échec, atterrir parmi les étoiles." },

  // Patience
  { c: "Patience", t: "Le fruit mûrit dans le temps de l'arbre, pas dans celui du cueilleur pressé." },
  { c: "Patience", t: "La patience est une graine amère qui donne un fruit doux." },
  { c: "Patience", t: "Rien de grand ne pousse en une nuit, ni le baobab ni la sagesse." },
  { c: "Patience", t: "Celui qui sait attendre voit souvent ce que les autres n'ont pas eu la patience de voir." },
  { c: "Patience", t: "L'eau finit toujours par trouver son chemin, même à travers la roche la plus dure." },
  { c: "Patience", t: "La patience du chasseur nourrit le foyer entier." },
  { c: "Patience", t: "Ce qui vient trop vite repart souvent aussi vite." },
  { c: "Patience", t: "Le vin se bonifie en attendant ; l'homme aussi." },
  { c: "Patience", t: "La précipitation gâte plus d'ouvrages que la lenteur n'en retarde." },
  { c: "Patience", t: "Semer demande de la foi, attendre demande de la patience, récolter demande de la persévérance." },
  { c: "Patience", t: "La lune met un mois à se remplir ; elle n'en est pas moins fidèle chaque nuit." },
  { c: "Patience", t: "Ne bouscule pas la graine qui dort encore sous la terre." },
  { c: "Patience", t: "Ce que la patience construit, l'impatience ne peut le détruire." },
  { c: "Patience", t: "L'arbre le plus solide est souvent celui qui a mis le plus de temps à pousser." },
  { c: "Patience", t: "La sagesse arrive rarement en courant." },
  { c: "Patience", t: "Qui sait attendre le bon moment gagne souvent deux fois plus que celui qui se précipite." },

  // Courage
  { c: "Courage", t: "Le courage n'est pas l'absence de peur, mais la décision d'avancer malgré elle." },
  { c: "Courage", t: "On ne traverse jamais une rivière en restant sur la rive à la mesurer." },
  { c: "Courage", t: "Le lion n'annonce pas sa chasse, il agit." },
  { c: "Courage", t: "Il faut du courage pour rester debout quand tout pousse à s'asseoir." },
  { c: "Courage", t: "La peur grandit dans l'immobilité et rétrécit dans l'action." },
  { c: "Courage", t: "Celui qui n'ose jamais ne sait jamais ce qu'il aurait pu devenir." },
  { c: "Courage", t: "Le courage d'aujourd'hui écrit la légende de demain." },
  { c: "Courage", t: "Ce n'est pas la taille du guerrier qui compte, mais la taille de sa détermination." },
  { c: "Courage", t: "Avancer malgré le doute, voilà la vraie bravoure." },
  { c: "Courage", t: "La peur est une ombre : elle disparaît dès qu'on marche vers la lumière." },
  { c: "Courage", t: "Un cœur courageux transforme l'obstacle en simple étape." },
  { c: "Courage", t: "Il vaut mieux tenter et trembler que regretter d'être resté immobile." },
  { c: "Courage", t: "Le courage ne rugit pas toujours ; parfois, il se contente de se lever chaque matin." },
  { c: "Courage", t: "Celui qui affronte la tempête découvre une force qu'il ignorait posséder." },
  { c: "Courage", t: "La bravoure, c'est avancer d'un pas de plus quand tous les autres reculent." },
  { c: "Courage", t: "Rien ne teste le courage comme le silence avant la première tentative." },

  // Collectif et entraide
  { c: "Collectif et entraide", t: "Seul on va plus vite, ensemble on va plus loin." },
  { c: "Collectif et entraide", t: "Une seule main ne peut applaudir." },
  { c: "Collectif et entraide", t: "Le baobab protège toute la savane de son ombre, pas seulement ses propres racines." },
  { c: "Collectif et entraide", t: "L'union de plusieurs bras soulève ce qu'un seul ne pourrait jamais porter." },
  { c: "Collectif et entraide", t: "Le tissage le plus solide est fait de plusieurs fils, jamais d'un seul." },
  { c: "Collectif et entraide", t: "Aide ton voisin à traverser la rivière, et tu trouveras un pont pour toi-même au retour." },
  { c: "Collectif et entraide", t: "Un village se construit brique après brique, main après main." },
  { c: "Collectif et entraide", t: "La force du troupeau protège même le plus jeune de ses membres." },
  { c: "Collectif et entraide", t: "Ce que la communauté sème ensemble, elle le récolte ensemble." },
  { c: "Collectif et entraide", t: "Nul ne devient grand seul ; chacun porte les épaules de ceux qui l'ont précédé." },
  { c: "Collectif et entraide", t: "Le feu partagé réchauffe plus longtemps que le feu gardé pour soi seul." },
  { c: "Collectif et entraide", t: "Le succès qui isole vaut moins que la réussite qui rassemble." },
  { c: "Collectif et entraide", t: "Un panier tressé à plusieurs mains tient mieux la charge du chemin." },
  { c: "Collectif et entraide", t: "Celui qui marche seul avance vite ; celui qui marche accompagné arrive loin." },
  { c: "Collectif et entraide", t: "La sagesse d'un seul grandit quand elle circule dans la bouche de plusieurs." },
  { c: "Collectif et entraide", t: "On reconnaît un bon chef à la force de ceux qu'il a élevés autour de lui." },

  // Sagesse
  { c: "Sagesse", t: "Celui qui écoute apprend deux fois ; celui qui parle n'apprend qu'une fois." },
  { c: "Sagesse", t: "La sagesse ne s'achète pas, elle se cultive dans le silence de l'expérience." },
  { c: "Sagesse", t: "Un esprit calme voit clair là où un esprit agité ne voit que confusion." },
  { c: "Sagesse", t: "Mieux vaut une vérité qui dérange qu'un mensonge qui rassure." },
  { c: "Sagesse", t: "Le sage observe deux fois avant d'agir une fois." },
  { c: "Sagesse", t: "La connaissance est une lampe ; elle n'éclaire que ceux qui acceptent de l'allumer." },
  { c: "Sagesse", t: "On ne remplit jamais une tasse déjà pleine de certitudes." },
  { c: "Sagesse", t: "L'humilité est la porte par laquelle entre toute grande leçon." },
  { c: "Sagesse", t: "Le silence bien placé vaut plus que mille paroles mal choisies." },
  { c: "Sagesse", t: "Celui qui pense tout savoir a fermé la porte à tout ce qu'il lui restait à apprendre." },
  { c: "Sagesse", t: "La vraie force ne se montre pas, elle se ressent." },
  { c: "Sagesse", t: "Un esprit qui doute avec méthode voit plus clair qu'un esprit qui croit sans réfléchir." },
  { c: "Sagesse", t: "La parole donnée pèse plus lourd que l'or promis." },
  { c: "Sagesse", t: "On reconnaît un chêne à ses racines, un homme à sa parole tenue." },
  { c: "Sagesse", t: "L'expérience est une école dont les frais se paient après la leçon." },
  { c: "Sagesse", t: "Le sage sème des questions ; l'ignorant ne récolte que des certitudes." },
];

const PROVERB_CATEGORIES = [...new Set(PROVERBS.map((p) => p.c))];

function MotivationTab() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * PROVERBS.length));
  const [filter, setFilter] = useState(null);

  const shuffle = () => setIndex(Math.floor(Math.random() * PROVERBS.length));
  const current = PROVERBS[index];
  const list = filter ? PROVERBS.filter((p) => p.c === filter) : PROVERBS;

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8" style={{ backgroundColor: NAVY }}>
      <div className="text-xs uppercase tracking-widest mb-4" style={{ color: GOLD }}>
        Motivation — SIRR EXPLORER · {PROVERBS.length} proverbes
      </div>

      <div className="rounded-2xl p-6 mb-5 relative" style={{ backgroundColor: "#22233A" }}>
        <Quote size={22} style={{ color: GOLD }} />
        <div className="text-white text-lg leading-relaxed mt-2">{current.t}</div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs uppercase tracking-widest" style={{ color: GOLD }}>{current.c}</span>
          <button
            onClick={shuffle}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
            style={{ borderColor: "#33344F", color: GOLD }}
          >
            <Shuffle size={13} /> Un autre proverbe
          </button>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-2">
        <button
          onClick={() => setFilter(null)}
          className="shrink-0 text-xs px-3 py-1.5 rounded-full border whitespace-nowrap"
          style={{
            borderColor: "#33344F",
            backgroundColor: filter === null ? GOLD : "transparent",
            color: filter === null ? NAVY : "white",
          }}
        >
          Tous
        </button>
        {PROVERB_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="shrink-0 text-xs px-3 py-1.5 rounded-full border whitespace-nowrap"
            style={{
              borderColor: "#33344F",
              backgroundColor: filter === cat ? GOLD : "transparent",
              color: filter === cat ? NAVY : "white",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2 pb-2">
        {list.map((p, i) => (
          <div key={i} className="flex gap-2.5 p-3 rounded-lg" style={{ backgroundColor: "#22233A" }}>
            <Quote size={14} className="mt-0.5 shrink-0" style={{ color: GOLD }} />
            <div>
              <div className="text-white/90 text-sm leading-relaxed">{p.t}</div>
              <div className="text-white/30 text-xs mt-1">{p.c}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- NSN Business & NSN Admin : annuaire de services ----------
const NSN_CONTACT_NUMBER = "221778370001";

function waLink(service) {
  const text = encodeURIComponent(`Bonjour, je suis intéressé(e) par : ${service}.`);
  return `https://wa.me/${NSN_CONTACT_NUMBER}?text=${text}`;
}

const BUSINESS_CATEGORIES = [
  {
    icon: Globe,
    title: "Création de site web",
    intro: "Le prix dépend de la complexité et du nombre de pages.",
    offers: [
      { name: "Site vitrine simple", detail: "1 à 3 pages, présentation de ton activité", price: "50 000 – 75 000 FCFA" },
      { name: "Site vitrine professionnel", detail: "5 à 8 pages, design sur mesure", price: "100 000 – 150 000 FCFA" },
      { name: "Site e-commerce", detail: "Boutique en ligne, paiement intégré", price: "200 000 – 350 000 FCFA" },
    ],
  },
  {
    icon: Palette,
    title: "Logo",
    intro: "Le prix dépend du nombre de propositions et de la charte graphique.",
    offers: [
      { name: "Logo simple", detail: "1 concept, formats de base (PNG, JPG)", price: "15 000 FCFA" },
      { name: "Logo professionnel", detail: "3 concepts au choix, couleurs déclinées", price: "30 000 FCFA" },
      { name: "Identité visuelle complète", detail: "Logo + charte graphique + déclinaisons réseaux sociaux", price: "50 000 FCFA" },
    ],
  },
  {
    icon: Receipt,
    title: "Génération de factures",
    intro: "Le prix dépend du niveau d'automatisation de l'application.",
    offers: [
      { name: "Générateur simple", detail: "Mono-utilisateur, export PDF", price: "25 000 FCFA" },
      { name: "Générateur avancé", detail: "Multi-produits, calculs automatiques, export Excel", price: "50 000 FCFA" },
      { name: "Application complète", detail: "Multi-utilisateurs, suivi clients, tableau de bord", price: "100 000 FCFA" },
    ],
  },
];

const DEMARCHES = [
  {
    icon: Landmark,
    title: "Carte Nationale d'Identité (CNI biométrique CEDEAO)",
    where: "Commissariat de police, brigade de gendarmerie, ou préfecture/sous-préfecture de ton domicile. À l'étranger : consulats du Sénégal (Paris, Madrid, Milan, New York, Abidjan...).",
    pieces: "Ancienne CNI ou extrait de naissance de moins de 3 mois, certificat de nationalité en cas de doute, copie de la CNI d'un parent pour un mineur.",
    cost: "500 FCFA (première demande ou renouvellement) — 10 000 FCFA en cas de perte ou de vol. Duplicata gratuit en cas de détérioration.",
    delay: "Environ 2 semaines, délai variable selon l'affluence.",
  },
  {
    icon: Landmark,
    title: "Passeport biométrique",
    where: "Commissariat de police de ton domicile (rendez-vous obligatoire à Dakar). À l'étranger : ambassade ou consulat du Sénégal.",
    pieces: "CNI biométrique CEDEAO en cours de validité (original + copie), justificatif de profession ou certificat de scolarité, quittance de paiement.",
    cost: "20 000 FCFA (adulte) — 10 000 FCFA (élève/étudiant sur justificatif).",
    delay: "Délai officiel : 30 jours ouvrables. En pratique à Dakar : souvent 3 à 8 semaines.",
  },
  {
    icon: Landmark,
    title: "Extrait de naissance",
    where: "Centre d'état civil (mairie) du lieu de naissance. Pour une naissance à l'étranger : ministère des Affaires étrangères ou représentation diplomatique du Sénégal.",
    pieces: "CNI du demandeur, informations sur l'acte d'origine (numéro, année, centre d'enregistrement).",
    cost: "Environ 150 à 500 FCFA selon les communes.",
    delay: "Généralement quelques jours.",
  },
  {
    icon: Landmark,
    title: "Casier judiciaire (extrait du bulletin n°3)",
    where: "Greffe du tribunal régional du lieu de naissance. Pour les Sénégalais nés à l'étranger : greffe de la Cour d'Appel de Dakar.",
    pieces: "Extrait d'acte de naissance ou copie certifiée de la CNI.",
    cost: "Environ 200 FCFA (timbre fiscal).",
    delay: "Obtention rapide ; le document reste valable 3 mois.",
  },
  {
    icon: Briefcase,
    title: "Création d'entreprise (NINEA + Registre du Commerce)",
    where: "Bureau d'Appui à la Création d'Entreprise (BCE) de l'APIX, Dakar (antennes aussi à Saint-Louis, Ziguinchor, Touba, Kaolack, Tambacounda, Saly).",
    pieces: "Copie de la CNI (ou passeport pour les étrangers), certificat de résidence, casier judiciaire de moins de 3 mois (ou déclaration sur l'honneur disponible à l'APIX), timbres fiscaux.",
    cost: "Entreprise individuelle : environ 16 000 FCFA (sans nom commercial) à 26 000 FCFA (avec nom commercial). SARL/SA : montants plus élevés selon le capital.",
    delay: "24 à 48 heures pour un dossier complet.",
  },
  {
    icon: Landmark,
    title: "Permis de conduire",
    where: "Inscription en auto-école agréée, puis examen et délivrance via la Direction Régionale des Transports Terrestres (DRTT) de ta région.",
    pieces: "4 photos d'identité, pièce d'identité, certificat médical d'aptitude, certificat de résidence, timbres fiscaux.",
    cost: "Timbres : environ 10 000 FCFA. Frais d'examen : 10 000 FCFA (poids lourd) à 20 000 FCFA (véhicule léger), hors frais d'auto-école (variables).",
    delay: "Environ 6 à 8 semaines au total (formation, examen, délivrance).",
  },
  {
    icon: Landmark,
    title: "Carte grise (certificat d'immatriculation)",
    where: "Bureau régional des transports routiers dont dépend ton domicile.",
    pieces: "Facture d'achat ou acte de vente, certificat de dédouanement (véhicule importé), pièce d'identité du propriétaire, visite technique du véhicule.",
    cost: "Variable selon la puissance fiscale du véhicule — en moyenne entre 50 000 et 200 000 FCFA (hors frais de dédouanement pour un véhicule importé).",
    delay: "Quelques jours ouvrés après dépôt du dossier complet.",
  },
];

function NSNDemarches() {
  const [open, setOpen] = useState(null);

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8" style={{ backgroundColor: NAVY }}>
      <div className="text-xs uppercase tracking-widest mb-1" style={{ color: GOLD }}>
        NSN Démarches
      </div>
      <div className="text-white text-lg font-semibold mb-1">
        Le guide des démarches administratives les plus courantes au Sénégal
      </div>
      <div className="text-white/40 text-xs mb-6">
        Informations basées sur les sources officielles (service-public.gouv.sn, senegalservices.sn, APIX) — vérifie toujours les montants et délais en vigueur, ils peuvent évoluer.
      </div>

      <div className="flex flex-col gap-2.5 mb-6">
        {DEMARCHES.map((d, i) => {
          const Icon = d.icon;
          const isOpen = open === i;
          return (
            <div key={i} className="rounded-xl border overflow-hidden" style={{ backgroundColor: "#22233A", borderColor: "#33344F" }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: GOLD }}>
                  <Icon size={15} color={NAVY} />
                </div>
                <div className="text-white font-semibold text-sm flex-1">{d.title}</div>
                <ChevronRight size={16} className="text-white/40 transition-transform" style={{ transform: isOpen ? "rotate(90deg)" : "none" }} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 flex flex-col gap-2.5 text-xs">
                  <div>
                    <span className="font-semibold" style={{ color: GOLD }}>Où s'adresser : </span>
                    <span className="text-white/70">{d.where}</span>
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: GOLD }}>Pièces à fournir : </span>
                    <span className="text-white/70">{d.pieces}</span>
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: GOLD }}>Coût : </span>
                    <span className="text-white/70">{d.cost}</span>
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: GOLD }}>Délai : </span>
                    <span className="text-white/70">{d.delay}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <a
        href={waLink("Aide personnalisée pour une démarche administrative")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 p-4 rounded-xl border transition-colors hover:border-[#C9A84C]"
        style={{ backgroundColor: "#22233A", borderColor: "#33344F" }}
      >
        <div>
          <div className="text-white font-semibold text-sm">Besoin d'être accompagné(e) pas à pas ?</div>
          <div className="text-white/50 text-xs mt-0.5">On t'aide à préparer ton dossier et à comprendre chaque étape.</div>
        </div>
        <span className="text-xs font-medium shrink-0" style={{ color: GOLD }}>
          Demander de l'aide →
        </span>
      </a>
    </div>
  );
}

function NSNBusiness() {
  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8" style={{ backgroundColor: NAVY }}>
      <div className="text-xs uppercase tracking-widest mb-1" style={{ color: GOLD }}>
        NSN Business
      </div>
      <div className="text-white text-lg font-semibold mb-1">
        Des services professionnels pour lancer et développer ton activité
      </div>
      <div className="text-white/40 text-xs mb-6">
        Choisis une offre pour être mis en relation directement sur WhatsApp, avec le prix déjà indiqué.
      </div>

      <div className="flex flex-col gap-7">
        {BUSINESS_CATEGORIES.map((cat, ci) => {
          const Icon = cat.icon;
          return (
            <div key={ci}>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: GOLD }}>
                  <Icon size={15} color={NAVY} />
                </div>
                <div className="text-white font-semibold text-sm">{cat.title}</div>
              </div>
              <div className="text-white/40 text-xs mb-3 ml-10">{cat.intro}</div>
              <div className="grid sm:grid-cols-3 gap-3">
                {cat.offers.map((o, oi) => (
                  <a
                    key={oi}
                    href={waLink(`${cat.title} — ${o.name} (${o.price})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1.5 p-4 rounded-xl border text-left transition-colors hover:border-[#C9A84C]"
                    style={{ backgroundColor: "#22233A", borderColor: "#33344F" }}
                  >
                    <div className="text-white font-semibold text-sm">{o.name}</div>
                    <div className="text-white/50 text-xs leading-relaxed">{o.detail}</div>
                    <div className="text-sm font-semibold mt-1" style={{ color: GOLD }}>{o.price}</div>
                    <span className="text-xs font-medium mt-1" style={{ color: GOLD }}>
                      Demander cette offre →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NSNAdmin() {
  return <NSNDemarches />;
}

export default function App() {
  const [tab, setTab] = useState("motivation");
  const [moduleIndex, setModuleIndex] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await storage.get("nsn-cap:whatsapp-progress");
        if (saved && saved.value) {
          const data = JSON.parse(saved.value);
          if (Array.isArray(data.completed)) setCompleted(data.completed);
          if (typeof data.moduleIndex === "number") setModuleIndex(data.moduleIndex);
        }
      } catch (e) {
        // pas de progression sauvegardée, on démarre à zéro
      } finally {
        setProgressLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!progressLoaded) return;
    storage
      .set("nsn-cap:whatsapp-progress", JSON.stringify({ completed, moduleIndex }))
      .catch(() => {});
  }, [completed, moduleIndex, progressLoaded]);

  const handleComplete = (id) => {
    setCompleted((c) => (c.includes(id) ? c : [...c, id]));
  };

  const nextModule = () => {
    if (moduleIndex < MODULES.length - 1) setModuleIndex(moduleIndex + 1);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: PAPER }}>
      <div className="w-full max-w-5xl">
        <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: GOLD }}>
              SIRR TECH — Démonstrateur
            </div>
            <h1 className="text-2xl font-semibold" style={{ color: NAVY }}>
              NSN CAP : micro-learning WhatsApp + pilotage d'impact
            </h1>
          </div>
          <div className="flex rounded-full border overflow-x-auto" style={{ borderColor: NAVY }}>
            <button
              onClick={() => setTab("motivation")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: tab === "motivation" ? NAVY : "transparent",
                color: tab === "motivation" ? "white" : NAVY,
              }}
            >
              <Quote size={15} /> Motivation
            </button>
            <button
              onClick={() => setTab("business")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: tab === "business" ? NAVY : "transparent",
                color: tab === "business" ? "white" : NAVY,
              }}
            >
              <Briefcase size={15} /> NSN Business
            </button>
            <button
              onClick={() => setTab("admin")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: tab === "admin" ? NAVY : "transparent",
                color: tab === "admin" ? "white" : NAVY,
              }}
            >
              <Landmark size={15} /> NSN Démarches
            </button>
            <button
              onClick={() => setTab("account")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: tab === "account" ? NAVY : "transparent",
                color: tab === "account" ? "white" : NAVY,
              }}
            >
              <User size={15} /> Mon Compte
            </button>
            <button
              onClick={() => setTab("softskills")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: tab === "softskills" ? NAVY : "transparent",
                color: tab === "softskills" ? "white" : NAVY,
              }}
            >
              <GraduationCap size={15} /> Soft Skills
            </button>
            <button
              onClick={() => setTab("chat")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: tab === "chat" ? NAVY : "transparent",
                color: tab === "chat" ? "white" : NAVY,
              }}
            >
              <MessageCircle size={15} /> Simulateur WhatsApp
            </button>
          </div>
        </div>

        <div
          className="rounded-2xl overflow-hidden shadow-xl border"
          style={{ borderColor: "#E5E1D6", height: "640px" }}
        >
          {tab === "business" ? (
            <NSNBusiness />
          ) : tab === "admin" ? (
            <NSNAdmin />
          ) : tab === "account" ? (
            <Auth />
          ) : tab === "softskills" ? (
            <SoftSkillsCourse />
          ) : tab === "motivation" ? (
            <MotivationTab />
          ) : (
            <div className="flex h-full">
              <div className="w-full sm:w-[380px] mx-auto h-full flex flex-col bg-white">
                <PhoneChat
                  moduleIndex={moduleIndex}
                  onModuleComplete={handleComplete}
                  completedModules={completed}
                  onNext={nextModule}
                  isLastModule={moduleIndex === MODULES.length - 1}
                  onSelectModule={setModuleIndex}
                />
              </div>
              <div className="hidden sm:flex flex-col justify-center gap-4 px-6 py-6 flex-1" style={{ backgroundColor: NAVY }}>
                <div className="text-xs uppercase tracking-widest" style={{ color: GOLD }}>
                  Module en cours
                </div>
                <div className="text-white text-lg font-semibold">{MODULES[moduleIndex].title}</div>
                <div className="text-white/50 text-sm leading-relaxed">
                  Chaque pilier propose un quiz de 4 questions à choix multiples. Réponds à toutes
                  les questions pour débloquer le pilier suivant. Le bouton "Pilier suivant" apparaît
                  directement dans le chat, une fois le quiz terminé.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 text-xs text-center" style={{ color: "#8C8A7D" }}>
          Prototype de démonstration — SIRR TECH
        </div>
      </div>
    </div>
  );
}
