let transactions = [];
let filteredTransactions = [];

function addTransaction() {
    const dateInput = document.getElementById('date').value;
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!dateInput || !category || isNaN(amount) || amount <= 0) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const date = new Date(dateInput);
    const transaction = { date: date.toISOString().split('T')[0], type, category, amount };

    // Add transaction to the list
    transactions.push(transaction);
    filteredTransactions.push(transaction);

    // Update table and summary
    updateTransactionTable();
    updateSummary();

    // Show money-saving tip based on category
    showSavingTip(category);
}

function updateTransactionTable() {
    const tableBody = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    filteredTransactions.forEach(transaction => {
        const row = tableBody.insertRow();
        row.innerHTML = `<td>${transaction.date}</td><td>${transaction.type}</td><td>${transaction.category}</td><td>$${transaction.amount.toFixed(2)}</td>`;
    });
}

function updateSummary() {
    const selectedMonth = document.getElementById('month').value;
    const selectedYear = document.getElementById('year').value;

    // Filter transactions for the selected month and year
    const filteredForMonth = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getFullYear() == selectedYear && (transactionDate.getMonth() + 1) == selectedMonth;
    });

    const totalIncome = filteredForMonth.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = filteredForMonth.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpense;

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function showSavingTip(category) {
    const tipContainer = document.getElementById('tipText');
    let tip = '';

    if (category.toLowerCase().includes('food')) {
        tip = 'Try cooking meals at home to save on food expenses.';
    } else if (category.toLowerCase().includes('shopping')) {
        tip = 'Avoid impulsive shopping. Stick to a list.';
    } else if (category.toLowerCase().includes('entertainment')) {
        tip = 'Look for free or low-cost entertainment options.';
    } else {
        tip = 'Review your expenses monthly to find areas to save.';
    }

    tipContainer.textContent = tip;
}

function filterTransactions() {
    const selectedMonth = document.getElementById('month').value;
    const selectedYear = document.getElementById('year').value;

    // Filter transactions for the selected month and year
    filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getFullYear() == selectedYear && (transactionDate.getMonth() + 1) == selectedMonth;
    });

    updateTransactionTable();
    updateSummary();
}
