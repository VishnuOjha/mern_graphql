import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import "../app.css";
import { useMutation } from "@apollo/client";
import { ADD_EMP, UPDATE_EMP } from "../mutation/clientMutation";
import { GET_EMP } from "../queries/getEmployee";
import { EmpContext } from "../context/EmpContext";

const AddUserModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    DateOfJoining: "",
    Title: "employee", // Default value
    Department: "it", // Default value
    EmployeeType: "full", // Default value
    CurrentStatus: true,
  });
  const { updateEmpData } = useContext(EmpContext);

  const EmpData = parseEmpData(formData, updateEmpData);

  // add Employee
  const [addEmployee] = useMutation(ADD_EMP, {
    variables: {
      ...EmpData,
    },
    update(cache, { data: { addEmployee } }) {
      const { employees } = cache.readQuery({ query: GET_EMP });
      cache.writeQuery({
        query: GET_EMP,
        data: {
          employees: [...employees, addEmployee],
        },
      });
    },
  });

  // update employee
  const [updateEmployee] = useMutation(UPDATE_EMP, {
    variables: {
      ...EmpData,
    },
    refetchQueries: [{ query: GET_EMP, variables: { id: updateEmpData?.id } }],
  });

  console.log("UPDATE", EmpData);

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

  const handleSave = () => {
    // Call the function to save the user

    if (updateEmpData?.id && updateEmpData) {
      if (
        formData.FirstName === "" ||
        formData.LastName === "" ||
        formData.Age === "" ||
        formData.DateOfJoining === "" ||
        formData.Title === "" ||
        formData.Department === "" ||
        formData.EmployeeType === "" ||
        formData.CurrentStatus === ""
      ) {
        alert("Please fill the form properly.");
      } else {
        addEmployee(formData);
        // Reset the form and close the modal
        setFormData({
          FirstName: "",
          LastName: "",
          Age: "",
          DateOfJoining: "",
          Title: "employee", // Default value
          Department: "it", // Default value
          EmployeeType: "full", // Default value
          CurrentStatus: true,
        });
        handleClose();
      }
    
    } else {
      if (
        formData.FirstName === "" ||
        formData.LastName === "" ||
        formData.Age === "" ||
        formData.DateOfJoining === "" ||
        formData.Title === "" ||
        formData.Department === "" ||
        formData.EmployeeType === "" ||
        formData.CurrentStatus === ""
      ) {
        alert("Please fill the form properly.");
      } else {
        addEmployee(formData);
        // Reset the form and close the modal
        setFormData({
          FirstName: "",
          LastName: "",
          Age: "",
          DateOfJoining: "",
          Title: "employee", // Default value
          Department: "it", // Default value
          EmployeeType: "full", // Default value
          CurrentStatus: true,
        });
        handleClose();
      }
    }
  };

  useEffect(() => {
    if (updateEmpData !== "" && updateEmpData?.id) {
      setFormData({
        id: updateEmpData?.id,
        FirstName: updateEmpData?.firstName,
        LastName: updateEmpData?.lastName,
        Age: updateEmpData?.age,
        DateOfJoining: updateEmpData?.dateOfJoining,
        Title: updateEmpData?.title, // Default value
        Department: updateEmpData?.department, // Default value
        EmployeeType: updateEmpData?.employeeType, // Default value
        CurrentStatus: updateEmpData?.currentStatus,
      });
    }
  }, [updateEmpData]);

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
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="director">Director</option>
              <option value="vp">VP</option>
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
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
              <option value="hr">HR</option>
              <option value="engineering">Engineering</option>
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
              <option value="full">FullTime</option>
              <option value="part">PartTime</option>
              <option value="contract">Contract</option>
              <option value="seasonal">Seasonal</option>
            </select>
          </div>
          <br />
          <div className="inputField">
            <label>Current Status:</label>
            <input
              type="checkbox"
              name="CurrentStatus"
              defaultChecked
              // checked={formData.CurrentStatus}
              // onChange={handleInputChange} // leave for update
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
    age: data?.Age,
    dateOfJoining: data?.DateOfJoining,
    title: data?.Title,
    department: data?.Department,
    employeeType: data?.EmployeeType,
    currentStatus: data?.CurrentStatus,
  };
}
