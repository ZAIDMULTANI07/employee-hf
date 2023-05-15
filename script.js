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


// Function to toggle the navigation menu for small screens
function toggleNav() {
    var navMenu = document.getElementById("nav-menu");
    if (navMenu.style.display === "block") {
        navMenu.style.display = "none";
    } else {
        navMenu.style.display = "block";
    }
}

// Function to delete an employee from the table and localStorage
function deleteEmployee(index) {
    if (confirm("Are you sure you want to delete this employee?")) {
        // Retrieve the employees array from localStorage
        var employees = JSON.parse(localStorage.getItem("employees"));

        // Remove the employee at the given index
        employees.splice(index, 1);

        // Update the employees array in localStorage
        localStorage.setItem("employees", JSON.stringify(employees));

        // Reload the page to update the table
        location.reload();
    }
}

// Function to display the employees in the table
function displayEmployees() {
    // Retrieve the employees array from localStorage
    var employees = JSON.parse(localStorage.getItem("employees"));

    // Get the table body element
    var tableBody = document.getElementById("employee-table-body");

    // Loop through the employees and add them to the table
    for (var i = 0; i < employees.length; i++) {
        var employee = employees[i];

        // Create a new row element
        var row = document.createElement("tr");

        // Add the employee name to the row
        var nameCell = document.createElement("td");
        nameCell.textContent = employee.name;
        row.appendChild(nameCell);

        // Add the employee position to the row
        var positionCell = document.createElement("td");
        positionCell.textContent = employee.position;
        row.appendChild(positionCell);

        // Add the employee about to the row
        var aboutCell = document.createElement("td");
        aboutCell.textContent = employee.about;
        row.appendChild(aboutCell);

        // Add the employee joining date to the row
        var joiningDateCell = document.createElement("td");
        joiningDateCell.textContent = employee.joiningDate;
        row.appendChild(joiningDateCell);

        // Add the delete button to the row
        var deleteButtonCell = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = (function(index) {
            return function() {
                deleteEmployee(index);
            }
        })(i);
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        // Add the row to the table body
        tableBody.appendChild(row);
    }
}

// Call the displayEmployees function on page load
window.onload = function() {
    displayEmployees();
};
