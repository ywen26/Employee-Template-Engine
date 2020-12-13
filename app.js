const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// const Choice = require("inquirer/lib/objects/choice");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const generalInfo = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of this mumber:',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the ID number of this member:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the Email of this member:',
    },
    {
        type: 'list',
        name: 'role',
        message: 'Please choose the role of this member:',
        choices: ['Manager', 'Engineer', 'Intern'],
    },
];

const managerInfo = [
    {
        type: 'input',
        name: 'officeNimber',
        message: 'Please enter your office number:',
    },
];

const engineerInfo = [
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your github username:',
    },
];

const internInfo = [
    {
        type: 'input',
        name: 'school',
        message: 'Please enter your school:',
    },
];

const addMumber = [
    {
        type: 'list',
        name: 'addMumber',
        message: 'Do you want to add another new member?',
        choices: ['Yes', 'No'],
    },
]

function promptUser() {
    inquirer.prompt(generalInfo)
        .then(function(data) {
            if (data.role === "Manager") {
                return inquirer.prompt(managerInfo);
            } else if (data.role === "Engineer") {
                return inquirer.prompt(engineerInfo);
            } else if (data.role === "Intern") {
                return inquirer.prompt(internInfo);
            }
        }).then(addNewMember);
}

function addNewMember() {
    inquirer.prompt(addMumber)
        .then(function(data) {
            if (data.addMumber === "Yes") {
                promptUser();
            } else if (data.addMumber === "No") {
                console.log("Success!")
            }
        });
}

promptUser();
    

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
