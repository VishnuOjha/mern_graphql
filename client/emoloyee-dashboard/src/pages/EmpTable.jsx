import React, { useState } from "react";
import "../app.css";
import EmpDetailsTable from "../component/EmployeeDetailsTable";
import AddUserModal from "../Form/AddEmployeeForm";
import { useQuery } from "@apollo/client";
import { GET_EMP } from "../queries/getEmployee";
import EmployeeSearch from "../component/EmployeeSearch";

const EmpTable = () => {
  const [open, setOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_EMP);

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="root">
      <div className="emp-nav">
        <div></div>
        <div>
          <button onClick={() => setOpen(true)}>Add Employee</button>
        </div>
      </div>
      <EmpDetailsTable data={data?.employees} />
      <AddUserModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default EmpTable;
