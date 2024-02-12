import React, { useContext } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { EmpContext } from "../context/EmpContext";
import { useMutation } from "@apollo/client";
import { DELETE_EMP } from "../mutation/clientMutation";
import { GET_EMP } from "../queries/getEmployee";

const EmpRowTable = ({ user, index }) => {
  const { setUpdateEmpData, setOpen } = useContext(EmpContext);
  const [deleteEmployee] = useMutation(DELETE_EMP, {
    variables: { id: user?.id },
    update(cache, { data: { deleteEmployee } }) {
      const { employees } = cache.readQuery({ query: GET_EMP });
      cache.writeQuery({
        query: GET_EMP,
        data: {
          employees : employees.filter((emp) => emp.id !== deleteEmployee.id),
        },
      });
    },
  });

  return (
    <>
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
        <TableCell>
          <FaEdit
            onClick={() => {
              setOpen(true);
              setUpdateEmpData(user);
            }}
            size={24}
            style={{ cursor: "pointer", marginRight: 5 }}
          />
          <MdDelete size={24} color="red" onClick={deleteEmployee} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default EmpRowTable;
