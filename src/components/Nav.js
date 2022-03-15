import React from "react";
import { useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

const loggedInLinks = [
  { id: 1, to: "/posts", name: "All Posts" },
  { id: 2, to: "/profile", name: "My Profile" },
  // { id: 3, to: "/profile/newpost", name: "My Posts" },
  // { id: 4, to: "/profile/messsages", name: "My Messages" },
  // { id: 5, to: "/logout", name: "Logout" },
];
const loggedOutLinks = [
  { id: 1, to: "/posts", name: "All Posts" },
  { id: 2, to: "/login", name: "Login" },
  { id: 3, to: "/register", name: "Register" },
];

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <nav>
      {navLinks.map(({ id, to, name }) => (
        <NavLink key={id} to={to} className="onScreenLink">
          {name}
        </NavLink>
      ))}
      {isLoggedIn && (
        <button onClick={logout} className="logoutButton">
          Logout
        </button>
      )}
    </nav>
  );
}
