import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const AuthState = () => {
  return useContext(AuthContext);
};
export default AuthContextProvider;
