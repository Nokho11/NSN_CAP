import React, { useState, useEffect } from "react";
import { LogIn, UserPlus, LogOut, Lock, CheckCircle2, Clock, Eye, EyeOff } from "lucide-react";
import { signup, login, fetchMe } from "./api.js";
import storage from "./storage.js";

const NAVY = "#1A1A2E";
const GOLD = "#C9A84C";

const TOKEN_KEY = "nsn-cap:auth-token";

export default function Auth() {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Au chargement, on regarde si un jeton est déjà enregistré sur cet appareil.
  useEffect(() => {
    (async () => {
      try {
        const saved = await storage.get(TOKEN_KEY);
        if (saved && saved.value) {
          const data = await fetchMe(saved.value);
          setUser(data.user);
        }
      } catch {
        await storage.delete(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    try {
      if (mode === "signup") {
        await signup({ email, password, companyName });
        setNotice("Compte créé ! Connecte-toi maintenant avec ton email et ton mot de passe.");
        setMode("login");
        setPassword("");
      } else {
        const data = await login({ email, password });
        await storage.set(TOKEN_KEY, data.token);
        setUser(data.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await storage.delete(TOKEN_KEY);
    setUser(null);
    setEmail("");
    setPassword("");
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center" style={{ backgroundColor: NAVY }}>
        <div className="text-white/40 text-sm">Chargement…</div>
      </div>
    );
  }

  // ---- Utilisateur connecté ----
  if (user) {
    return (
      <div className="h-full overflow-y-auto p-6 sm:p-8" style={{ backgroundColor: NAVY }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest" style={{ color: GOLD }}>Mon Compte</div>
            <div className="text-white text-lg font-semibold">{user.companyName || user.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
            style={{ borderColor: "#33344F", color: "white" }}
          >
            <LogOut size={13} /> Déconnexion
          </button>
        </div>

        {user.accessGranted ? (
          <div className="p-5 rounded-xl border" style={{ backgroundColor: "#22233A", borderColor: "#33344F" }}>
            <div className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: GOLD }}>
              <CheckCircle2 size={16} /> Accès débloqué
            </div>
            <div className="text-white text-sm leading-relaxed">
              Bienvenue {user.companyName ? user.companyName : ""} ! Ton interface personnalisée
              ({user.service}) sera affichée ici. C'est l'emplacement prévu pour ton générateur
              de factures dédié à ton entreprise.
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl border" style={{ backgroundColor: "#22233A", borderColor: "#33344F" }}>
            <div className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: GOLD }}>
              <Clock size={16} /> Accès en attente
            </div>
            <div className="text-white/70 text-sm leading-relaxed">
              Ton compte est bien créé, mais l'accès à ton interface personnalisée n'est pas encore
              débloqué. Termine ton paiement via le lien WhatsApp reçu lors de ta commande —
              l'accès s'active dès la confirmation.
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---- Formulaire connexion / inscription ----
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ backgroundColor: NAVY }}>
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: GOLD }}>
            <Lock size={16} color={NAVY} />
          </div>
          <div className="text-white text-lg font-semibold">
            {mode === "login" ? "Connexion" : "Créer un compte"}
          </div>
        </div>

        {notice && <div className="text-xs px-3 py-2 rounded-lg bg-emerald-950 text-emerald-300">{notice}</div>}
        {error && <div className="text-xs px-3 py-2 rounded-lg bg-red-950 text-red-300">{error}</div>}

        {mode === "signup" && (
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Nom de ton entreprise"
            className="text-sm px-3 py-2.5 rounded-lg outline-none"
            style={{ backgroundColor: "#22233A", color: "white", border: "1px solid #33344F" }}
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="Email"
          className="text-sm px-3 py-2.5 rounded-lg outline-none"
          style={{ backgroundColor: "#22233A", color: "white", border: "1px solid #33344F" }}
        />
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            placeholder="Mot de passe (6 caractères min.)"
            className="w-full text-sm pl-3 pr-10 py-2.5 rounded-lg outline-none"
            style={{ backgroundColor: "#22233A", color: "white", border: "1px solid #33344F" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-semibold mt-1"
          style={{ backgroundColor: GOLD, color: NAVY }}
        >
          {mode === "login" ? <LogIn size={15} /> : <UserPlus size={15} />}
          {mode === "login" ? "Se connecter" : "Créer mon compte"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
            setNotice("");
          }}
          className="text-xs text-white/50 mt-1"
        >
          {mode === "login" ? "Pas encore de compte ? Crée-en un" : "Déjà un compte ? Connecte-toi"}
        </button>
      </form>
    </div>
  );
}
