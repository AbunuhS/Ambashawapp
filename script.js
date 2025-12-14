let totalIncome = 0;
let totalExpense = 0;
let transactions = [];
let showAllTransactions = false;

function addTransaction() {
  const description = document.getElementById("description").value;
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!description || amount <= 0) {
    alert("Please enter valid data");
    return;
  }

  transactions.unshift({ description, amount, type });

  if (type === "income") {
    totalIncome += amount;
  } else {
    totalExpense += amount;
  }

  updateSummary();
  renderTransactions();

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

function updateSummary() {
  document.getElementById("income").innerText = totalIncome + " Birr";
  document.getElementById("expense").innerText = totalExpense + " Birr";
  document.getElementById("balance").innerText =
    (totalIncome - totalExpense) + " Birr";
}

function renderTransactions() {
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  const displayList = showAllTransactions
    ? transactions
    : transactions.slice(0, 5);

  displayList.forEach(t => {
    const div = document.createElement("div");
    div.className = "transaction " + t.type;
    div.innerHTML = `
      <span>${t.description}</span>
      <span>${t.type === "income" ? "+" : "-"}${t.amount} Birr</span>
    `;
    list.appendChild(div);
  });

  const seeMoreBtn = document.getElementById("seeMoreBtn");
  seeMoreBtn.style.display =
    transactions.length > 5 && !showAllTransactions ? "block" : "none";
}

function showAll() {
  showAllTransactions = true;
  renderTransactions();
}