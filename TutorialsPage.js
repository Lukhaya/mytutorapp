
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
            <td><button class="sign-up-button">Sign Up</button></td>
        `;
        tutorialTable.appendChild(row);
    });
}

// Call populateTable to show mock data on initial load
populateTable();

// Delete tutorial
tutorialTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const rowIndex = event.target.closest('tr').rowIndex - 1;
        tutorials.splice(rowIndex, 1);
        populateTable();
    }
    else if (event.target.classList.contains('sign-up-button')){
        
        window.location.href =  `./TutSignUp.html?data=${activeTut}`;
    }
    
});



