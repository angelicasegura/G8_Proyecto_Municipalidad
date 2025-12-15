// =====================================
// Autenticación 
// =====================================

const USERS_KEY = "eco_users";
const SESSION_KEY = "eco_session";

function seedUsers() {
  const existing = JSON.parse(localStorage.getItem(USERS_KEY) || "null");
  if (existing && Array.isArray(existing) && existing.length > 0) return;

  const users = [
    { id: 1, nombre: "Admin", email: "admin@muni.cr", password: "1234", rol: "Administrador", activo: true },
    { id: 2, nombre: "Emprendedor", email: "empre@muni.cr", password: "1234", rol: "Emprendedor", activo: true },
    { id: 3, nombre: "Comprador", email: "user@muni.cr", password: "1234", rol: "Comprador", activo: true }
  ];

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  seedUsers();
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ id: user.id, nombre: user.nombre, email: user.email, rol: user.rol })
  );
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// =======================
// LOGIN (RF-016-1)
// =======================
function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return { ok: false, msg: "Usuario o contraseña incorrectos." };
  if (!user.activo) return { ok: false, msg: "Cuenta bloqueada. Contacte al administrador." };

  setSession(user);
  return { ok: true, user };
}
