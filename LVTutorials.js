
const tutorials = [
    { id: 1, title: "CSC3003 Tutorial 1", dateTime: "2023-08-15 10:00 AM", venue: "Ishango Lab" },
    { id: 2, title: "EEE3096S Lab Demo", dateTime: "2023-08-20 2:00 PM", venue: "Menzies White Lab" }
    
];

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const tutorialTable = document.querySelector('.tutorial-table tbody');
let activeTut = '';

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
        row.addEventListener('click',()=>{activeTut = tutorial.title;});
        row.innerHTML = `
            <td>${tutorial.title}</td>
            <td>${tutorial.dateTime}</td>
            <td>${tutorial.venue}</td>
            <td><button class="update-button">Update</button><button class="delete-button">Remove</button></td>
        `;
        tutorialTable.appendChild(row);
    });
}

// Call populateTable to show mock data on initial load
populateTable();

// Delete tutorial
tutorialTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        if(confirm("Do you want to remove item?") === false) return;
        const rowIndex = event.target.closest('tr').rowIndex - 1;
        tutorials.splice(rowIndex, 1);
        populateTable();
    }
    else if (event.target.classList.contains('update-button')){
        
       displayModal("edit");
    }
    
});
const addButton = document.getElementById("addButton");
const closeButton = document.getElementById("closeButton");
const addForm = document.getElementById("addForm");
// Show the add modal when clicking the "Add" button
addButton.addEventListener("click", () => {
    displayModal("add");
});
function displayModal(mode){
    addModal.style.display = "block";
    // Hide the add modal when clicking the close button or outside the modal
    document.getElementById("closeButton").addEventListener("click", () => {
        addModal.style.display = "none";
    });

    //Update mode
    let findIndex = -1;
    if(mode==="edit"){
        const tutObj = tutorials.filter(tutorial=> tutorial.title.includes(activeTut))[0];
        findIndex = tutorials.indexOf(tutObj);
        document.getElementById("title").value = tutObj.title;
        document.getElementById("dateTime").value= formatDateAndTime(tutObj.dateTime);
        document.getElementById("venue").value= tutObj.venue;
    }
    if(mode==="add"){
        document.getElementById("title").value = "";
        document.getElementById("dateTime").value= new Date();
        document.getElementById("venue").value= "";
    }
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
        if (mode==="edit") tutorials[findIndex] = newTutorial;
        tutorials.push(newTutorial);
        populateTable();
        addModal.style.display = "none";
        addForm.reset();
    });
}

// Function to format date and time
function formatDateAndTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
window.addEventListener("click", event => {
    if (event.target === addModal) {
        addModal.style.display = "none";
    }
});
let viewPastButton = document.getElementById("viewPastButton");
let viewUpcoming = document.getElementById("viewUpcoming");
viewUpcoming.addEventListener('click',()=>{
    location.reload();
})
viewPastButton.addEventListener("click", () => {
    const updateButtons = document.querySelectorAll(".update-button");
    const deleteButtons = document.querySelectorAll(".delete-button");
    viewUpcoming.style = "display:block";
    updateButtons.forEach(button => {
        button.style.display = "none";
    });

    deleteButtons.forEach(button => {
        button.style.display = "none";
    });

    const viewReportButton = document.createElement("button");
    viewReportButton.className = "view-report-button";
    viewReportButton.textContent = "View Report";
    viewReportButton.addEventListener("click", () => {
        window.location.href = "AttendanceReport.html";
    });

    const tableRows = document.querySelectorAll(".tutorial-table tbody tr");
    tableRows.forEach(row => {
        row.querySelector("td:last-child").appendChild(viewReportButton);
    });
});

