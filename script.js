document.addEventListener('DOMContentLoaded', function() {
  const expenseForm = document.querySelector('.expense-form form');
  const expenseList = document.querySelector('.expense-list table tbody');
  const cancelBtn = document.getElementById('cancel-btn');
  const expenseChartCanvas = document.getElementById('expenseChart');
  const categoryInput = document.getElementById('new-category');
  const addCategoryBtn = document.getElementById('add-category');
  const categoryList = document.getElementById('category-list');

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let categories = JSON.parse(localStorage.getItem('categories')) || ['Housing', 'Transportation', 'Food', 'Entertainment', 'Other'];

  function renderExpenseList() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.name}</td>
        <td>$${expense.amount.toFixed(2)}</td>
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
    const categoryExpenses = categories.map(category => {
      return expenses.filter(expense => expense.category === category).reduce((total, expense) => total + expense.amount, 0);
    });

    new Chart(expenseChartCanvas, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          data: categoryExpenses,
          backgroundColor: ['#6c63ff', '#f44336', '#ffa500', '#00b3b3', '#9b59b6']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Expense Analysis'
          }
        }
      }
    });
  }

  function renderCategoryList() {
    categoryList.innerHTML = '';
    categories.forEach(category => {
      const categoryItem = document.createElement('li');
      categoryItem.textContent = category;
      categoryItem.addEventListener('click', () => {
        const expenseCategory = document.getElementById('expense-category');
        expenseCategory.value = category;
      });
      categoryList.appendChild(categoryItem);
    });
  }

  expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const expenseDate = document.getElementById('expense-date').value;
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseCategory = document.getElementById('expense-category').value;
    const expenseNotes = document.getElementById('expense-notes').value;

    const newExpense = {
      date: expenseDate,
      name: expenseName,
      amount: expenseAmount,
      category: expenseCategory,
      notes: expenseNotes
    };

    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenseList();
    renderExpenseChart();
    expenseForm.reset();
  });

  expenseList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const index = event.target.dataset.index;
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenseList();
      renderExpenseChart();
    } else if (event.target.classList.contains('edit-btn')) {
      const index = event.target.dataset.index;
      const expense = expenses[index];
      document.getElementById('expense-date').value = expense.date;
      document.getElementById('expense-name').value = expense.name;
      document.getElementById('expense-amount').value = expense.amount;
      document.getElementById('expense-category').value = expense.category;
      document.getElementById('expense-notes').value = expense.notes;
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenseList();
      renderExpenseChart();
    }
  });

  cancelBtn.addEventListener('click', function() {
    expenseForm.reset();
  });

  addCategoryBtn.addEventListener('click', function() {
    const newCategory = categoryInput.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
      categories.push(newCategory);
      localStorage.setItem('categories', JSON.stringify(categories));
      renderCategoryList();
      const expenseCategory = document.getElementById('expense-category');
      const newOption = document.createElement('option');
      newOption.value = newCategory;
      newOption.textContent = newCategory;
      expenseCategory.appendChild(newOption);
      expenseCategory.value = newCategory;
      categoryInput.value = '';
    }
  });

  renderExpenseList();
  renderExpenseChart();
  renderCategoryList();
});