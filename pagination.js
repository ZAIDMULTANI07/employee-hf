const employeesPerPage = 5;
let currentPage = 1;

function displayEmployees(employees, page) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  const startIndex = (page - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  currentEmployees.forEach((employee, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.classList.add("text-center", "text-gray-800", "font-small");
    nameCell.textContent = employee.name;
    row.appendChild(nameCell);

    const positionCell = document.createElement("td");
    positionCell.classList.add("text-center", "text-gray-800", "font-small");
    positionCell.textContent = employee.position;
    row.appendChild(positionCell);

    const aboutCell = document.createElement("td");
    aboutCell.classList.add("text-center", "text-gray-800", "font-small");
    aboutCell.textContent = employee.about;
    row.appendChild(aboutCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = employee.joiningDate;
    dateCell.classList.add("text-center", "text-gray-800", "font-small");
    row.appendChild(dateCell);

    const actionCell = document.createElement("td");
    actionCell.classList.add("flex", "justify-center", "items-center", "p-2");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add(
      "bg-red-500",
      "text-white",
      "px-4",
      "py-2",
      "rounded"
    );
    removeButton.addEventListener("click", () => {
      const employees = JSON.parse(localStorage.getItem("employees"));
      employees.splice(startIndex + index, 1);
      localStorage.setItem("employees", JSON.stringify(employees));
      displayEmployees(employees, currentPage);
    });
    actionCell.appendChild(removeButton);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

// Get the table element
const table = document.getElementById("employee-table");

// Get the pagination container
const paginationContainer = document.getElementById("employee-pagination");

// Number of entries per page
const entriesPerPage = 5;

// Calculate the number of pages
const totalPages = Math.ceil(employees.length / entriesPerPage);

// Generate pagination buttons
for (let i = 1; i <= totalPages; i++) {
  const button = document.createElement("button");
  button.textContent = i;
  button.classList.add(
    "px-4",
    "py-2",
    "mr-2",
    "bg-blue-500",
    "text-white",
    "rounded"
  );

  // Add event listener to each button
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    const paginationButtons = document.querySelectorAll(
      "#employee-pagination button"
    );
    paginationButtons.forEach((btn) => {
      btn.classList.remove("bg-blue-800", "font-bold");
    });

    // Add active class to the clicked button
    this.classList.add("bg-blue-800", "font-bold");

    // Set the current page
    currentPage = i;

    // Display the employees for the current page
    displayEmployees(employees, currentPage);
  });

// Add the button to the pagination container
paginationContainer.appendChild(button);
}

// Initially display the employees for the first page
displayEmployees(employees, currentPage);