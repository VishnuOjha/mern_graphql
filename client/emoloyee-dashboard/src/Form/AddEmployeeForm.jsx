import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import "../app.css";
import { useMutation } from "@apollo/client";
import { ADD_EMP } from "../mutation/clientMutation";
import GET_EMP from "../queries/getEmployee";

const AddUserModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    DateOfJoining: "",
    Title: "Employee", // Default value
    Department: "IT", // Default value
    EmployeeType: "FullTime", // Default value
    CurrentStatus: false,
  });
  // const EmpData = parseEmpData(formData);
  // const [addEmployee] = useMutation(ADD_EMP, {
  //   variables: {
      
  //   },
  //   // update(cache, { data: { addEmployee } }) {
  //   //   const { employees } = cache.readQuery({ query: GET_EMP });
  //   //   cache.writeQuery({
  //   //     query: GET_EMP,
  //   //     data: {
  //   //       employees: [...employees, addEmployee],
  //   //     },
  //   //   });
  //   // },
  // });

  const [ageError, setAgeError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    if (name === "Age") {
      // Age validation
      const age = parseInt(inputValue, 10);
      if (isNaN(age) || age < 20 || age > 70) {
        setAgeError("Age must be between 20 and 70 years");
      } else {
        setAgeError("");
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  useEffect(() => {
    if (open || handleClose) {
      setFormData({
        FirstName: "",
        LastName: "",
        Age: "",
        DateOfJoining: "",
        Title: "",
        Department: "",
        EmployeeType: "",
        CurrentStatus: true,
      });
      setAgeError("");
    }
  }, [open, handleClose]);

  const handleSave = () => {
    // Call the function to save the user
    // addEmployee(formData);

    // Reset the form and close the modal
    setFormData({
      FirstName: "",
      LastName: "",
      Age: "",
      DateOfJoining: "",
      Title: "",
      Department: "",
      EmployeeType: "",
      CurrentStatus: false,
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title">Add User</DialogTitle>
      <DialogContent>
        <div className="input-container">
          <div className="inputField">
            <label>First Name:</label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputField">
            <label>Last Name:</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br />
        <div className="input-container">
          <div className="inputField">
            <label>Age:</label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleInputChange}
              minLength={20}
              maxLength={70}
            />
            {ageError && <p style={{ color: "red" }}>{ageError}</p>}
          </div>
          <br />
          <div className="inputField">
            <label>Date of Joining:</label>
            <input
              type="date"
              name="DateOfJoining"
              value={formData.DateOfJoining}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br />
        <div className="input-container">
          <div className="inputField">
            <label>Title:</label>
            <select
              name="Title"
              value={formData.Title}
              onChange={handleInputChange}
              className="selectField"
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <br />
          <div className="inputField">
            <label>Department:</label>
            <select
              name="Department"
              value={formData.Department}
              className="selectField"
              onChange={handleInputChange}
            >
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
        </div>

        <br />
        <div className="input-container">
          <div className="inputField">
            <label>Employee Type:</label>
            <select
              name="EmployeeType"
              value={formData.EmployeeType}
              onChange={handleInputChange}
              className="selectField"
            >
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <br />
          <div className="inputField">
            <label>Current Status:</label>
            <input
              type="checkbox"
              name="CurrentStatus"
              checked={formData.CurrentStatus}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <br />
        {/* Add other fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;

function parseEmpData(data) {
  return {
    firstName: data?.FirstName,
    lastName: data?.LastName,
    age: data?.age,
    dateOfJoining: data?.DateOfJoining,
    title: data?.Title,
    department: data?.Department,
    employeeType: data?.EmployeeType,
    currentStatus: data?.CurrentStatus,
  };
}
