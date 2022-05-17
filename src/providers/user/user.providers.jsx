import React, { useState, createContext, useMemo } from "react";
import logInUser from "./user.utils";

export const UserContext = createContext({
  user: [],
  LogInUser: () => {},
});

function UserProvider(children) {
  const [user, setUser] = useState([]);

  const LogInUser = (userCredentials) => setUser(logInUser(userCredentials));
  const loginProviderValue = useMemo(() => ({ user, LogInUser }), [user, LogInUser]);
  return <UserContext.Provider value={loginProviderValue}>{children}</UserContext.Provider>;
}

export default UserProvider;
