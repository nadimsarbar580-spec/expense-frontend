const API_URL = "http://127.0.0.1:5000/expenses";

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
        </div>
      `;
      container.appendChild(card);
    });

    totalEl.textContent = `Total: ₹${total}`;

  } catch (error) {
    container.innerHTML = "<p>Error loading expenses. Is the backend running?</p>";
  }
}

loadExpenses();