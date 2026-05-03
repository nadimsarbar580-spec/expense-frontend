const API_URL = "https://expense-backend-716i.onrender.com/expenses";

document.getElementById("submit-btn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const message = document.getElementById("message");

  if (!title) {
    message.style.color = "red";
    message.textContent = "Please enter a title.";
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    message.style.color = "red";
    message.textContent = "Please enter a valid amount greater than 0.";
    return;
  }
  if (!category) {
    message.style.color = "red";
    message.textContent = "Please select a category.";
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount, category })
    });

    const data = await response.json();

    if (response.ok) {
      message.style.color = "green";
      message.textContent = `"${data.title}" of ₹${data.amount} added!`;
      document.getElementById("title").value = "";
      document.getElementById("amount").value = "";
      document.getElementById("category").value = "";
    } else {
      message.style.color = "red";
      message.textContent = data.error || "Something went wrong.";
    }

  } catch (error) {
    message.style.color = "red";
    message.textContent = "Cannot connect to backend. Is Flask running?";
  }
});