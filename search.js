function searchEmployees(event) {
    event.preventDefault(); // Prevent form submission
    const searchInput = document.getElementById('search');
    const searchText = searchInput.value.toLowerCase();
    const tableBody = document.getElementById('employee-table');
    const rows = tableBody.getElementsByTagName('tr');
    let foundMatch = false;
  
    // Iterate over the table rows (skip the header row)
    for (let i = 0; i < rows.length; i++) {
      const nameCell = rows[i].getElementsByTagName('td')[0]; // Assuming name is in the first column (index 0)
      const name = nameCell.textContent.toLowerCase();
      if (name.includes(searchText)) {
        rows[i].style.display = ''; // Show the row
        foundMatch = true;
      } else {
        rows[i].style.display = 'none'; // Hide the row
      }
    }
  
    // Display a message when no search results are found
    const noResultsRow = document.getElementById('no-results-row');
    if (foundMatch) {
      tableBody.style.display = ''; // Show the table body
      noResultsRow.style.display = 'none'; // Hide the "No results" row
    } else {
      tableBody.style.display = 'none'; // Hide the table body
      noResultsRow.style.display = ''; // Show the "No results" row
    }
  }
  