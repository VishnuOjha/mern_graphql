import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const EmpRowTable = ({ data }) => {
  return (
    <>
      {data?.length !== 0 ? (
        data?.map((user, index) => (
          <TableRow key={user._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.dateOfJoining}</TableCell>
            <TableCell>{user.title}</TableCell>
            <TableCell>{user.department}</TableCell>
            <TableCell>{user.employeeType}</TableCell>
            <TableCell>{user.currentStatus ? "1" : "0"}</TableCell>
          </TableRow>
        ))
      ) : (
        <>
          <TableRow>
            <TableCell >No Records</TableCell>
          </TableRow>
        </>
      )}
    </>
  );
};

export default EmpRowTable;
