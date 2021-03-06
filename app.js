const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];

function setManager() {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Manager Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Manager ID #:"
        },
        {
            type: "input",
            name: "email",
            message: "Manager e-mail:"
        },

        {
            type: "input",
            name: "office",
            message: "Please enter office number:"
        },

    ]).then(function (data) {
        const newManager = new Manager(data.name, data.id, data.email, data.office)
        addToTeam(newManager);
    })
}

function buildTeam() {

    inquirer.prompt([
        {
            type: "list",
            message: "Employee Type:",
            name: "role",
            choices: [
                "Intern",
                "Engineer"
            ]
        },
        {
            type: "input",
            name: "name",
            message: "Employee Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID #:"
        },
        {
            type: "input",
            name: "email",
            message: "Employee e-mail:"
        },
    ]).then(function (data) {
        if (data.role === "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "github",
                    message: "Please enter GitHub username:"
                },
            ]).then(function (answer) {
                const newEngineer = new Engineer(data.name, data.id, data.email, answer.github)
                addToTeam(newEngineer);

            })
        }
        else if (data.role === "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "school",
                    message: "Please enter school name:"
                },
            ]).then(function (answer) {
                const newIntern = new Intern(data.name, data.id, data.email, answer.school)
                addToTeam(newIntern);
            })
        }
    })
}

function addToTeam(newMember) {
    employees.push(newMember);
    inquirer.prompt([
        {
            type: "list",
            name: "next",
            message: "What would you like to do now?",
            choices: [
                "Add another team member",
                "Export completed team"
            ]
        },
    ]).then(function (response) {
        if (response.next === "Add another team member") {
            buildTeam();
        }
        else {
            buildPage(employees)
        }
    });
}

function buildPage(employees) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8");
    console.log(`Output is available at: ${outputPath}`)

}

setManager();