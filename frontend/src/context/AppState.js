import { useState } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
