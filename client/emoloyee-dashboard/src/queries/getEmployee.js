import { gql } from "@apollo/client";

const GET_EMP = gql`
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

export default GET_EMP