'use strict';

function toggleNav() {
    var navMenu = document.getElementById("nav-menu");
    navMenu.classList.toggle("hidden");
  }
  
  const employeeForm = document.getElementById('employee-form');
  
employeeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const about = document.getElementById('about').value;
  const joiningDate = document.getElementById('joining-date').value;

  if (!name || !position || !about || !joiningDate) {
    alert('Please fill in all the required fields.');
    return;
  }


  // Validation for name field
  if (name.length < 3 || /[^a-zA-Z\s]/.test(name)) {
    alert('Name should be at least 3 characters long and should not contain special characters.');
    nameInput.focus();
    return;
  }

  // Validation for position field
  if (position.length === 0 || /^[^a-zA-Z0-9\s]+$/.test(position)) {
    alert('Position should contain alphabets and may include numbers or special characters.');
    positionInput.focus();
    return;
  }

  // Validation for about field
  if (about.length < 5 || /^[^a-zA-Z0-9\s]+$/.test(about)) {
    alert('About should be at least 5 characters long and should contain alphabets and may include numbers or special characters.');
    aboutInput.focus();
    return;
  }

  // Validation for joining date
const currentDate = new Date();
const selectedDate = new Date(joiningDate);

if (selectedDate.getFullYear() > currentDate.getFullYear() ||
    (selectedDate.getFullYear() === currentDate.getFullYear() && selectedDate.getMonth() > currentDate.getMonth()) ||
    (selectedDate.getFullYear() === currentDate.getFullYear() && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getDate() > currentDate.getDate())) {
  alert('Joining date should not be a future date.');
  joiningDateInput.focus();
  return;
}


  const employeeData = {
    name,
    position,
    about,
    joiningDate,
  };

  let employees = [];

  if (localStorage.getItem('employees')) {
    employees = JSON.parse(localStorage.getItem('employees'));
  }

  employees.push(employeeData);
  localStorage.setItem('employees', JSON.stringify(employees));
  window.location.href = '/employee-listing.html';
});

//EMPLOYEE-LISTING
// get the table element
const table = document.getElementById('employee-table');

// attach event listener to the table
table.addEventListener('click', function(event) {
  // check if the clicked element is a delete button
  if (event.target.classList.contains('delete-btn')) {
    // get the row element to be deleted
    const row = event.target.closest('tr');
    // remove the row from the table
    row.remove();
    // get the id of the employee to be deleted
    const id = row.dataset.id;
    // remove the employee from the browser storage
    const employees = JSON.parse(localStorage.getItem('employees'));
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  }
});



