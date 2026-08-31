// Renders stored users as cards + a table, and wires up
// search (input event), delete (click event, event delegation),
// and clear all (click event).

const cardContainer = document.getElementById("cardContainer");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const clearAllBtn = document.getElementById("clearAllBtn");
const emptyMessage = document.getElementById("emptyMessage");
const userTable = document.getElementById("userTable");

function render(filterText = "") {
  const users = getUsers();
  const term = filterText.trim().toLowerCase();

  const filtered = term
    ? users.filter(
        (u) =>
          u.fullname.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      )
    : users;

  const hasUsers = users.length > 0;
  emptyMessage.style.display = hasUsers ? "none" : "block";
  cardContainer.style.display = hasUsers ? "grid" : "none";
  userTable.style.display = hasUsers ? "table" : "none";

  // Cards
  cardContainer.innerHTML = filtered
    .map(
      (u) => `
      <div class="card" data-id="${u.id}">
        <h3>${u.fullname}</h3>
        <p>${u.email}</p>
        <p><span class="badge">${u.role}</span> · Age ${u.age}</p>
        <p class="card-date">Joined ${u.registeredAt}</p>
        <button class="delete-btn" data-id="${u.id}">Remove</button>
      </div>`
    )
    .join("");

  // Table
  tableBody.innerHTML = filtered
    .map(
      (u) => `
      <tr data-id="${u.id}">
        <td>${u.fullname}</td>
        <td>${u.email}</td>
        <td>${u.age}</td>
        <td>${u.role}</td>
        <td>${u.registeredAt}</td>
        <td><button class="delete-btn" data-id="${u.id}">Remove</button></td>
      </tr>`
    )
    .join("");
}

// Live search as the user types
searchInput.addEventListener("input", () => render(searchInput.value));

// Event delegation: one listener handles delete clicks for every
// card/row, including ones added after page load.
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.dataset.id);
    deleteUser(id);
    render(searchInput.value);
  }
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Remove all registered users?")) {
    clearUsers();
    render();
  }
});

render();
