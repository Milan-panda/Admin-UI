import { createContext } from "react";

const UserContext = createContext({
  allData: {},
});

const SelectedUserContext = createContext({
  selectedUser: {},
});
export {UserContext, SelectedUserContext};
