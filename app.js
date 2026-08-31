// Shared helpers for reading/writing users to localStorage.
// Both register.js and dashboard.js rely on these.

const STORAGE_KEY = "users";

function getUsers() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function addUser(user) {
  const users = getUsers();
  user.id = Date.now();
  user.registeredAt = new Date().toLocaleString();
  users.push(user);
  saveUsers(users);
  return user;
}

function deleteUser(id) {
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);
}

function clearUsers() {
  saveUsers([]);
}
