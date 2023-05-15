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
