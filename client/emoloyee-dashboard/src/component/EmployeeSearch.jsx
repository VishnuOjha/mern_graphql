import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_EMPLOYEES } from "../queries/getEmployee";

const EmployeeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchEmployees, { loading, data }] = useLazyQuery(SEARCH_EMPLOYEES);

  const handleSearch = () => {
    searchEmployees({ variables: { searchTerm } });
  };

  return (
    <div>
      <h5>Search Employee</h5>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>search</button>
    </div>
  );
};

export default EmployeeSearch;
