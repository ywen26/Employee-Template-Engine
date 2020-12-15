const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const htmlBlock = [];

const roleInfo = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Please choose the role of this member:',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
    ]);
}

const managerInfo = () => { 
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of this member:',
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
            type: 'input',
            name: 'officeNumber',
            message: 'Please enter your office number:',
        },
    ]);
}

const engineerInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of this member:',
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
            type: 'input',
            name: 'github',
            message: 'Please enter your github username:',
        },
    ]);
}

const internInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of this member:',
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
            type: 'input',
            name: 'school',
            message: 'Please enter your school:',
        },
    ]);
}

const addMember = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'addMember',
            message: 'Do you want to add another new member?',
            choices: ['Yes', 'No'],
        },
    ]);
}

async function promptUser() {
    console.log("-----------------------");
    const roleType = await roleInfo();
    
    if (roleType.role === "Manager") {
        const managerData = await managerInfo();
        const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
        htmlBlock.push(manager);
    } else if (roleType.role === "Engineer") {
        const engineerData = await engineerInfo();
        const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
        htmlBlock.push(engineer);
    } else if (roleType.role === "Intern") {
        const internData = await internInfo();
        const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
        htmlBlock.push(intern);
    }

    addNewMember();
}

async function addNewMember() {
    const newMember = await addMember();

    if (newMember.addMember === "Yes") {
        console.log("-----------------------");
        promptUser();
    } else if (newMember.addMember === "No") {
        const team = render(htmlBlock);
        fs.writeFileSync(outputPath, team);
        console.log("-----------------------");
        console.log("Team summary is generated successfully!")
    }
}

promptUser();
