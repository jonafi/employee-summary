const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name,id,email,office) {
        super();
        this.role = "Manager";
        this.officeNumber = office;

               
    }
    
    getOfficeNumber() {
         return this.officeNumber;
     }
  }
  module.exports = Manager; 