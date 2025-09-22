import { createContext, useState } from "react";

export const AdminNavContext = createContext(null);

export const ContextProdvider = (props) => {
  const [nav, setNav] = useState(true);

  return (
    <AdminNavContext.Provider value={{nav, setNav}}>
      {props.children}
    </AdminNavContext.Provider>
  );
};
