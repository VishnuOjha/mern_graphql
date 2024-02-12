import { createContext } from "react";

export const EmpContext = createContext({
  setUpdateEmpData: () => {},
  setOpen: () => {},
  updateEmpData: "",
});
