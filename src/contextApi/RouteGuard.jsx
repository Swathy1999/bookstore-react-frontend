import React, { createContext, useEffect } from "react";
import { useState } from "react";

export const routeContext = createContext("");
function RouteGuard({ children }) {
  const [role, setRole] = useState("");
  const [authorisedUser, setAuthorisedUser] = useState(false);
  
  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setAuthorisedUser(true);
      setRole(user.role);
    }
  }, [role, authorisedUser]);
  return (
    <routeContext.Provider
      value={{ role, setRole, authorisedUser, setAuthorisedUser }}
    >
      {children}
    </routeContext.Provider>
  );
}
export default RouteGuard;
