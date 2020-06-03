const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name,id,email,gitHubUser) {
        super();
        this.role = "Engineer";
        this.github = gitHubUser;

               
    }
    
    getGithub() {
         return this.github;
     }
  }
  module.exports = Engineer; 