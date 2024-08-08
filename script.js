document.addEventListener('DOMContentLoaded', function() {
  const expenseForm = document.querySelector('.expense-form form');
  const expenseList = document.querySelector('.expense-list table tbody');
  const cancelBtn = document.getElementById('cancel-btn');
  const expenseChart = document.querySelector('.expense-chart');
  const expenseAnalysis = document.querySelector('.expense-analysis');

  let expenses = [];

  function renderExpenseList() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.notes}</td>
        <td>
          <button class="edit-btn btn-primary" data-index="${index}">Edit</button>
          <button class="delete-btn btn-secondary" data-index="${index}">Delete</button>
        </td>
      `;
      expenseList.appendChild(newRow);
    });
  }

  function renderExpenseChart() {
    expenseChart.innerHTML = '';
    const categories = ['Housing', 'Transportation', 'Food', 'Entertainment', 'Other'];
    const categoryExpenses = categories.map(category => {
      return expenses.filter(expense => expense.category === category.toLowerCase()).reduce((total, expense) => total + expense.amount, 0);
    });

    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');

    categories.forEach((category, index) => {
      const categoryBar = document.createElement('div');
      categoryBar.classList.add('category-bar');
      categoryBar.style.height = `${categoryExpenses[index] * 2}px`;
      categoryBar.textContent = `${category}: $${categoryExpenses[index].toFixed(2)}`;
      chartContainer.appendChild(categoryBar);
    });

    expenseChart.appendChild(chartContainer);
  }

  function renderExpenseAnalysis() {
    expenseAnalysis.innerHTML = '';
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
    const highestExpense = expenses.reduce((max, expense) => expense.amount > max ? expense.amount : max, 0);
    const lowestExpense = expenses.length > 0 ? Math.min(...expenses.map(expense => expense.amount)) : 0;

    const analysisHtml = `
      <h2>Expense Analysis</h2>
      <p>Total Expenses: $${totalExpenses.toFixed(2)}</p>
      <p>Average Expense: $${averageExpense.toFixed(2)}</p>
      <p>Highest Expense: $${highestExpense.toFixed(2)}</p>
      <p>Lowest Expense: $${lowestExpense.toFixed(2)}</p>
    `;

    expenseAnalysis.innerHTML = analysisHtml;
  }

  expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const expenseName = document.getElementById('expense-name').value;
    const expenseDate = document.getElementById('expense-date').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseCategory = document.getElementById('expense-category').value;
    const expenseNotes = document.getElementById('expense-notes').value;

    const newExpense = {
      name: expenseName,
      date: expenseDate,
      amount: expenseAmount,
      category: expenseCategory,
      notes: expenseNotes
    };

    expenses.push(newExpense);
    renderExpenseList();
    renderExpenseChart();
    renderExpenseAnalysis();
    expenseForm.reset();
  });

  expenseList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const index = event.target.dataset.index;
      expenses.splice(index, 1);
      renderExpenseList();
      renderExpenseChart();
      renderExpenseAnalysis();
    } else if (event.target.classList.contains('edit-btn')) {
      const index = event.target.dataset.index;
      const expense = expenses[index];
      document.getElementById('expense-date').value = expense.date;
      document.getElementById('expense-name').value = expense.name;
      document.getElementById('expense-amount').value = expense.amount;
      document.getElementById('expense-category').value = expense.category;
      document.getElementById('expense-notes').value = expense.notes;
      expenses.splice(index, 1);
      renderExpenseList();
      renderExpenseChart();
      renderExpenseAnalysis();
    }
  });

  cancelBtn.addEventListener('click', function() {
    expenseForm.reset();
  });

  renderExpenseList();
  renderExpenseChart();
  renderExpenseAnalysis();
});