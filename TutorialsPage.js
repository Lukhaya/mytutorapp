
const tutorials = [
    { id: 1, title: "Intro to Programming", dateTime: "2023-08-15 10:00 AM", venue: "Room 101" },
    { id: 2, title: "Web Development Basics", dateTime: "2023-08-20 2:00 PM", venue: "Room 202" }
    // Add more mock tutorial data here
];

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const tutorialTable = document.querySelector('.tutorial-table tbody');

// Display active tab content
tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        tabContents[index].classList.add('active');
    });
});

// Populate the table with mock data
function populateTable() {
    tutorialTable.innerHTML = '';
    tutorials.forEach(tutorial => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tutorial.title}</td>
            <td>${tutorial.dateTime}</td>
            <td>${tutorial.venue}</td>
            <td><button class="sign-up-button">Sign Up</button></td>
        `;
        tutorialTable.appendChild(row);
    });
}

// Call populateTable to show mock data on initial load
populateTable();

// Delete tutorial
tutorialTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('sign-up-button')) {
        const rowIndex = event.target.closest('tr').rowIndex - 1;
        tutorials.splice(rowIndex, 1);
        populateTable();
    }
});
const addButton = document.getElementById("addButton");
const closeButton = document.getElementById("closeButton");
const addForm = document.getElementById("addForm");
// Show the add modal when clicking the "Add" button
addButton.addEventListener("click", () => {
    addModal.style.display = "block";
    // Hide the add modal when clicking the close button or outside the modal
    document.getElementById("closeButton").addEventListener("click", () => {
        addModal.style.display = "none";
    });
    // Handle form submission for adding a tutorial
    document.getElementById("addForm").addEventListener("submit", event => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const dateTime = document.getElementById("dateTime").value;
        const venue = document.getElementById("venue").value;

        const newTutorial = {
            id: tutorials.length + 1,
            title: title,
            dateTime: dateTime,
            venue: venue
        };

        tutorials.push(newTutorial);
        populateTable();
        addModal.style.display = "none";
        addForm.reset();
    });
});

window.addEventListener("click", event => {
    if (event.target === addModal) {
        addModal.style.display = "none";
    }
});


