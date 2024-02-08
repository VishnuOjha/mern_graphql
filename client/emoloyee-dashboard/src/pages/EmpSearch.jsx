import React, { useState } from "react";
import "../app.css";
import EmpDetailsTable from "../component/EmployeeDetailsTable";
import AddUserModal from "../Form/AddEmployeeForm";
import { useLazyQuery,  } from "@apollo/client";
import {  SEARCH_EMPLOYEES } from "../queries/getEmployee";

const EmpSearchTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchEmployees, { loading, data,error }] = useLazyQuery(SEARCH_EMPLOYEES);
  const handleSearch = () => {
    searchEmployees({ variables: { searchTerm } });
  };
  if (loading) return <p>Loading.....</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="root">
      <div className="emp-nav">
      <div>
      <h5>Search Employee</h5>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} style={{
        padding: "2px 15px", marginLeft: "10px"
      }}>Search</button>
    </div>
      
      </div>
      <EmpDetailsTable data={data?.searchEmployee} />
    
    </div>
  );
};

export default EmpSearchTable;
