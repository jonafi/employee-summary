const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function buildTeam() {
  try {
    const  userInput  = await inquirer.prompt([
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
    ]);


    // fs.writeFile("log.txt", JSON.stringify(userInput), function(err) {

    //   if (err) {
    //     return console.log(err);
    //   }
    
    // });
    
   
  } catch (err) {
    console.log(err);
  }



}


buildTeam();




