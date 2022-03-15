import React from "react";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const links = [
    { id: 3, to: "/profile/newpost", name: "New Post" },
    { id: 4, to: "/profile/messages", name: "My Messages" },
  ];

  // const { username } = LoginOrRegister;
  //do "Me" logic here to get username and user id and etc.

  return (
    <nav>
      {links.map(({ id, to, name }) => (
        <NavLink key={id} to={to} className="profileLinks">
          {name}
        </NavLink>
      ))}
      <div style={{ marginTop: 40 + "px" }}>Welcome to your profile, !</div>
    </nav>
  );
}
