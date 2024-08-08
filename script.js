document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.querySelector('.expense-form form');
    const expenseList = document.querySelector('.expense-list table tbody');
  
    expenseForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const expenseName = document.getElementById('expense-name').value;
      const expenseDate = document.getElementById('expense-date').value;
      const expenseAmount = document.getElementById('expense-amount').value;
      const expenseCategory = document.getElementById('expense-category').value;
      const expenseNotes = document.getElementById('expense-notes').value;
  
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${expenseDate}</td>
        <td>${expenseName}</td>
        <td>${expenseAmount}</td>
        <td>${expenseCategory}</td>
        <td>${expenseNotes}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;
  
      expenseList.appendChild(newRow);
  
      expenseForm.reset();
    });
  
    expenseList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('tr');
        row.remove();
      }
    });
  
    expenseList.addEventListener('click', function(event) {
      if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        const cells = row.getElementsByTagName('td');
  
        document.getElementById('expense-date').value = cells[0].textContent;
        document.getElementById('expense-name').value = cells[1].textContent;
        document.getElementById('expense-amount').value = cells[2].textContent;
        document.getElementById('expense-category').value = cells[3].textContent;
        document.getElementById('expense-notes').value = cells[4].textContent;
  
        row.remove();
      }
    });
  });