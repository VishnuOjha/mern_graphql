import { gql } from "@apollo/client";

export const ADD_EMP = gql`
  mutation addEmployee(
    $firstName: String!
    $lastName: String!
    $age: String!
    $dateOfJoining: String!
    $title: EmployeeTitle!
    $department: EmployeeDepartment!
    $employeeType: EmployeeType!
    $currentStatus: Boolean!
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      age: $age
      dateOfJoining: $dateOfJoining
      title: $title
      department: $department
      employeeType: $employeeType
      currentStatus: $currentStatus
    ) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

export const UPDATE_EMP = gql`
  mutation updateEmployee(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $age: String!
    $dateOfJoining: String!
    $title: EmployeeTitleUpdate!
    $department: EmployeeDepartmentUpdate!
    $employeeType: EmployeeTypeUpdate!
    $currentStatus: Boolean!
  ) {
    updateEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      age: $age
      dateOfJoining: $dateOfJoining
      title: $title
      department: $department
      employeeType: $employeeType
      currentStatus: $currentStatus
    ) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

export const DELETE_EMP = gql`
    mutation deleteEmployee($id: ID!){
        deleteEmployee(id: $id){
            id
            firstName
            lastName
            age
            dateOfJoining
            department
            title
            employeeType
            currentStatus
        }
    }

`;
