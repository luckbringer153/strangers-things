import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./custom-hooks";
import { Form, Posts, AddPost, Title } from "./components"; //curly brackets for non-default imports

//use isLoggedIn to conditionally render things
function App() {
  const { token, isLoggedIn, logout } = useAuth();

  //router (hash- or browser-router) wraps app providing context while you send user one place or another; those places are defined by routes; links are a tags that communicate with routing system
  //router is parent to everything because when url changes (i.e. localhost:3000/posts to localhost:3000/login), the router component changes state and that re-renders everything else (it's children)
  return (
    <Router>
      {/* title links should be home+login for not logged in and home+profile+logout for logged in */}
      <Title />

      <nav>
        {isLoggedIn && (
          <Link to="/">Link that only shows if you're logged in</Link>
        )}
        {!isLoggedIn && (
          <Link to="/">Link that only shows if you're not logged in</Link>
        )}
      </nav>
      <Switch>
        {!isLoggedIn && (
          <>
            {/* a route is a url path + a component to render at that path (i.e. localhost:3000/profile); using it here lets you swap out component that's being rendered as opposed to making a new url (which would be an MPA thing) */}
            {/* shows all posts from API server - the home page; this can be accessed from any page via links in title banner */}
            <Route path="/posts" component={Posts} />

            {/* route for login+register page, accessible from home page */}
          </>
        )}

        {isLoggedIn && (
          <>
            {/* route for profile page, accessible from home page and login page */}

            {/* route for add new post page, accessible from profile page */}
            <Route path="/profile/newpost" component={AddPost} />

            {/* route for messages page, accessible from profile page */}
          </>
        )}

        {/* catches errors */}
        {/* <Route path="*" component={() => <div>404 Not Found</div>} /> */}
        <Redirect to="/posts" />
      </Switch>
    </Router>
  );
}

export default App;

//"''" is called a "string literal"; it demonstrates an empty string in general coding language
