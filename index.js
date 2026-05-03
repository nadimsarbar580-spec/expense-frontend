const API_URL = "https://expense-backend-716i.onrender.com/expenses";

async function loadExpenses() {
  const container = document.getElementById("expense-list");
  const totalEl = document.getElementById("total");

  try {
    const response = await fetch(API_URL);
    const expenses = await response.json();

    if (expenses.length === 0) {
      container.innerHTML = "<p>No expenses yet. Add one!</p>";
      return;
    }

    container.innerHTML = "";
    let total = 0;

    expenses.forEach(exp => {
      total += exp.amount;

      const card = document.createElement("div");
      card.classList.add("expense-card");
      card.innerHTML = `
  <div class="card-left">
    <h3>${exp.title}</h3>
    <span class="badge">${exp.category}</span>
  </div>
  <div class="card-right">
    ₹${exp.amount}
    <button class="delete-btn" data-id="${exp.id}">Delete</button>
  </div>
`;
      container.appendChild(card);
      card.querySelector(".delete-btn").addEventListener("click", async () => {
  const id = exp.id;
  try {
    const res = await fetch(`http://127.0.0.1:5000/expenses/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      loadExpenses(); // refresh the list
    }
  } catch (error) {
    alert("Could not delete. Is backend running?");
  }
});
    });

    totalEl.textContent = `Total: ₹${total}`;

  } catch (error) {
    container.innerHTML = "<p>Error loading expenses. Is the backend running?</p>";
  }
}

loadExpenses();