import React from "react";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const links = [
    { id: 3, to: "/profile/newpost", name: "My Posts" },
    { id: 4, to: "/profile/messages", name: "My Messages" },
  ];

  return (
    <nav>
      {links.map(({ id, to, name }) => (
        <NavLink key={id} to={to}>
          {name}
        </NavLink>
      ))}
      <div>You're in your profile now</div>
    </nav>
  );
}
