import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import { Form } from "./components"; //curly brackets for non-default imports

//use isLoggedIn to conditionally render things
function App() {
  const { token, isLoggedin, logout } = useAuth();

  const route = (
    <div>
      <div>token value is: {token || "''".toString()}</div>
      <div>isLoggedIn?: {isLoggedin.toString()}</div>
      <Form />
      <button onClick={() => logout}>Logout</button>
    </div>
  );

  // "/" refers to the root
  return (
    <Router>
      <nav>
        {isLoggedIn && (
          <Link to="/">Link that only shows if you're logged in</Link>
        )}
        {!isLoggedIn && (
          <Link to="/">Link that only shows if you're not logged in</Link>
        )}
      </nav>

      {/* example of route that doesn't have restrictions on seeing it */}
      <Route path="/" component={() => route} />

      {/* this route only renders if you go to localhost:3000/pizza and you're not logged in; message disappears if you go to the same site and log in OR if you press the log-in button on said site; example of an unauthenticated route */}
      {!isLoggedIn && (
        <Route
          path="./pizza"
          component={() => <div>not logged in with pizza</div>}
        />
      )}
    </Router>
  );
}

export default App;

//"''" is called a "string literal"; it demonstrates an empty string in general coding language
