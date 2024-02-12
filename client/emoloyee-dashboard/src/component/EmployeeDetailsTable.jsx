// UserTable.js
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmpRowTable from "./EmpRowTable";

const EmpDetailsTable = ({ data }) => {
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sr.No.</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Date of Joining</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Employee Type</TableCell>
            <TableCell>Current Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length !== 0 ? (
            data?.map((user, index) => (
              <EmpRowTable key={user.id} user={user} index={index} />
            ))
          ) : (
            <>
              <TableRow>
                <TableCell>No Records</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmpDetailsTable;
