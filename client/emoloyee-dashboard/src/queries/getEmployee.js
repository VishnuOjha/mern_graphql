import { gql } from "@apollo/client";

export const GET_EMP = gql`
  query getEmployees {
    employees {
      id
      firstName
      lastName
      age
      title
      dateOfJoining
      department
      currentStatus
      employeeType
    }
  }
`;

export const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($searchTerm: String!) {
    searchEmployee(searchTerm: $searchTerm) {
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

