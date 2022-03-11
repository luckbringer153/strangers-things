// follow recording for rest of this!! affects root index.js, context/index.js
import React from "react";

export const AuthContext = React.createContext();

//children in this case will be entire application
export default function AuthProvider({ children }) {
  const providerValue = { pizza: "pizza" };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
