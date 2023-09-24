import { useState } from "react";
import Home from "./pages/Home";
import { UserContext, SelectedUserContext } from "./utilities/UserContext";

const App = () => {
  const [data, setData] = useState([]);
  const [currentSelectedUser, setCurrentSelectedUser] = useState([]);

  return (
    <>
      <UserContext.Provider value={{ allData: data, setAllData: setData }}>
        <SelectedUserContext.Provider value={{selectedUser: currentSelectedUser, setSelectedUser: setCurrentSelectedUser}}>
          <Home />
        </SelectedUserContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
