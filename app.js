const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees =[];

function buildTeam() {

    inquirer.prompt([
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
        

        {
            type: "list",
            message: "Employee Type:",
            name: "role",
            choices: [
                "Intern",
                "Engineer",
                "Manager"
            ]
        },

    ]).then(function (data) {
        if(data.role==="Manager"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "office",
                    message: "Please enter office number:"
                },
            ]).then(function(answer){
                const newManager = new Manager(data.name,data.id, data.email, answer.office)
                employees.push(newManager);
                employees.push(newManager);
                buildPage(employees);
                
            })
        }

        else if(data.role==="Engineer"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "github",
                    message: "Please enter GitHub username:"
                },
            ]).then(function(answer){
                const newEngineer = new Engineer(data.name,data.id, data.email, answer.github)
                employees.push(newEngineer);
                employees.push(newEngineer);
                employees.push(newEngineer);
                employees.push(newEngineer);
                employees.push(newEngineer);
                employees.push(newEngineer);
                buildPage(employees);
            })
        }
        else if(data.role==="Intern"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "school",
                    message: "Please enter school name:"
                },
            ]).then(function(answer){
                const newIntern = new Intern(data.name,data.id, data.email, answer.school)
                employees.push(newIntern);
                //console.log(employees);
                buildPage(employees);
                
            })
        }
        

    })
    

}


buildTeam();
//console.log(employees);

function buildPage(employees) {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8");
  }


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
