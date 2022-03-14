import React, { useEffect, useState } from "react";
import { useAuth } from "../custom-hooks";

export default function Form() {
  //log-in/registration "flow"
  const { updateAuthStatus } = useAuth();

  const [form, setForm] = useState({
    username: "luckbringer",
    password: "griffin",
  });

  useEffect(() => {}, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: form }), //user dictated by API itself; form refers to const [form] above
        }
      );

      const { success, error, data } = await response.json();

      if (success) {
        //save token to local storage
        localStorage.st_token = data.st_token;
        updateAuthStatus();
      } else {
        throw new Error("error registering user");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Login" />
    </form>
  );
}
