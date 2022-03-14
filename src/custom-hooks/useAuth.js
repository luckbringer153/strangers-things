//hooks all have "use" before them
//use this kind of declaration for token so that every componenet has access to the variable token, allowing you to do conditional rendering based on logged in vs not logged in

import { useContext } from "react";
import { AuthContext } from "../context";

export function useAuth() {
  //useContext fetches AuthContext value from AuthContext.js (in this case)
  const { token, isLoggedIn, updateAuthStatus, logout } =
    useContext(AuthContext);

  return { token, isLoggedIn, updateAuthStatus, logout };
}
