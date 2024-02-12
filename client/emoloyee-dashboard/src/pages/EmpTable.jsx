import React, { useState } from "react";
import "../app.css";
import EmpDetailsTable from "../component/EmployeeDetailsTable";
import AddUserModal from "../Form/AddEmployeeForm";
import { useQuery } from "@apollo/client";
import { GET_EMP } from "../queries/getEmployee";
import { EmpContext } from "../context/EmpContext";

const EmpTable = () => {
  const [open, setOpen] = useState(false);
  const [updateEmpData, setUpdateEmpData] = useState("");
  const { loading, error, data } = useQuery(GET_EMP);

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>Something went wrong</p>;

  const contextValue = {
    updateEmpData,
    setUpdateEmpData,
    setOpen,
  };


  return (
    <EmpContext.Provider value={contextValue}>
      <div className="root">
        <div className="emp-nav">
          <div></div>
          <div>
            <button onClick={() => setOpen(true)}>Add Employee</button>
          </div>
        </div>
        <EmpDetailsTable
          data={data?.employees}
          setOpen={setOpen}
        />
        <AddUserModal
          open={open}
          handleClose={handleClose}
          updateData={updateEmpData}
        />
      </div>
    </EmpContext.Provider>
  );
};

export default EmpTable;
