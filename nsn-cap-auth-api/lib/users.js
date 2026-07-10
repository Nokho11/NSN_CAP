const bcrypt = require("bcryptjs");
const { redis } = require("./db");

const userKey = (email) => `nsn-cap:user:${email.toLowerCase().trim()}`;

async function getUser(email) {
  const raw = await redis(["get", userKey(email)]);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function saveUser(user) {
  await redis(["set", userKey(user.email), JSON.stringify(user)]);
}

async function createUser({ email, password, companyName, service }) {
  const existing = await getUser(email);
  if (existing) throw new Error("Un compte existe déjà avec cet email.");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email.toLowerCase().trim(),
    passwordHash,
    companyName: companyName || "",
    service: service || "facturation", // le service auquel ce compte donne accès
    accessGranted: false, // débloqué manuellement une fois le paiement confirmé
    createdAt: new Date().toISOString(),
  };
  await saveUser(user);
  return user;
}

async function verifyPassword(email, password) {
  const user = await getUser(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}

async function grantAccess(email) {
  const user = await getUser(email);
  if (!user) throw new Error("Utilisateur introuvable.");
  user.accessGranted = true;
  await saveUser(user);
  return user;
}

function publicUser(user) {
  return {
    email: user.email,
    companyName: user.companyName,
    service: user.service,
    accessGranted: user.accessGranted,
  };
}

module.exports = { getUser, createUser, verifyPassword, grantAccess, publicUser };
