function toggleNav() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}

// Initialize listing page
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("listing.html")) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    displayEmployees(employees);
    changePage(current_page);
  } else {
    document
      .getElementById("employee-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const position = document.getElementById("position").value;
        const about = document.getElementById("about").value;
        const joiningDate = document.getElementById("joining-date").value;

        if (name && position && about && joiningDate) {
          const newEmployee = {
            id: Date.now(),
            name,
            position,
            about,
            joiningDate,
          };
          const employees = JSON.parse(localStorage.getItem("employees")) || [];
          employees.push(newEmployee);
          localStorage.setItem("employees", JSON.stringify(employees));

          window.location.href = "listing.html";
          displayEmployees(JSON.parse(localStorage.getItem("employees")) || []);
        } else {
          alert("All fields are required.");
        }
      });
  }
});

// Handle search functionality
document
  .getElementById("searchInput")
  .addEventListener("input", function (event) {
    const searchQuery = event.target.value.toLowerCase();
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const filteredEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchQuery)
    );
    displayEmployees(filteredEmployees);
  });

// Display employees in the listing page
function displayEmployees(employees) {
  const employeeTableBody = document.querySelector("#employee-table tbody");
  employeeTableBody.innerHTML = "";

  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.about}</td>
            <td>${employee.joiningDate}</td>
            <td><button class="deleteBtn" onclick="deleteEmployee(${employee.id})">Delete</button></td>
        `;
    employeeTableBody.appendChild(row);
  });
}

// Delete an employee from the list
function deleteEmployee(id) {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees = employees.filter((employee) => employee.id !== id);
  localStorage.setItem("employees", JSON.stringify(employees));
  displayEmployees(employees); // Re-render employee list
  changePage(current_page);
}

// Pagination (5 employees per page)
var current_page = 1;
var emp_per_page = 5;
var total = JSON.parse(localStorage.getItem("employees")).length;

function numPages() {
  return Math.ceil((total - 1) / emp_per_page);
}

function prevPage() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
}

function nextPage() {
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
  }
}

function changePage(page) {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const startIndex = (page - 1) * emp_per_page;
  const endIndex = startIndex + emp_per_page;
  const paginatedEmployees = employees.slice(startIndex, endIndex);

  displayEmployees(paginatedEmployees);
}
