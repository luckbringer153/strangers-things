import React, { useState, useEffect } from "react";

// use AuthProvider for, say, authentication info
// create token, log token into this AuthContext.js to make it available to providerValue, that way every component in app knows about it because the components are the children to app
export const AuthContext = React.createContext();

//children in this case will be entire application
//wraps provider around app
//creates React "context", which is a general computer science concept of having shared piece data for a sprawling application
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(""); //if empty string is found, we'll be logged out because it's not truthy
  const [shouldUpdate, setShouldUpdate] = useState(false);

  //final [] value is called a dependency
  //works like this: when updateAuthStatus is called, it flips shouldUpdate's boolean. This triggers useEffect due to its dependency and that calls setToken. Once a token is set, that'll update everything else in the application because it's wrapped in this provider.
  useEffect(() => {
    //*try* to retrieve a possible token from local storage; if undefined, use empty string to prevent errors; gets status of token
    //this retains the token *even if you reload the page*. This is what happens when you close a page and then reopen it seconds later - some internal timer was ticking to erase that token from local storage and you just beat it
    //don't actually store anything in local storage in industry because it's a huge security risk!
    setToken(localStorage.st_token || "");
  }, [shouldUpdate]);

  //for updates to occur, invoke setShouldUpdate and flip boolean
  const updateAuthStatus = () => setShouldUpdate(!shouldUpdate);

  const logout = () => {
    delete localStorage.st_token;
    updateAuthStatus();
    /////////////////send user to home page "/" after logging out
  };

  // const providerValue = { pizza: "pizza" };
  //this function and its info inside will be used throughout application to check for logged-in status
  const providerValue = {
    token,
    isLoggedIn: !!token,
    updateAuthStatus,
    logout,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
