const mongoose = require("mongoose");


const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: String,
  },
  dateOfJoining: {
    type: String,
  },
  title: {
    type: String,
    enum: ["Employee", "Manager", "Director", "VP"],
  },
  department: {
    type: String,
    enum: ["IT", "Marketing", "HR", "Engineering"],
  },
  employeeType: {
    type: String,
    enum: ["FullTime", "PartTime", "Contract", "Seasonal"],
  },
  currentStatus: {
    type: Boolean,
  },
});

module.exports = mongoose.model("employee", EmployeeSchema);
