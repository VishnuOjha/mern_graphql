// UserTable.js
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const MyTable = ({ data }) => {
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
          </TableRow>
        </TableHead>
        <TableBody>
          { data?.length !== 0 ?  data?.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.dateOfJoining}</TableCell>
              <TableCell>{user.title}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.employeeType}</TableCell>
              <TableCell>
                {user.CurrentStatus ? "Working" : "Retired"}
              </TableCell>
            </TableRow> 
          )):  <>
            <TableRow>
              <TableCell>No Records</TableCell>
            </TableRow>
          </>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
