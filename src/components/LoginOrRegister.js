import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import { useAuth } from "../custom-hooks";
import { useHistory } from "react-router-dom";

export default function LoginOrRegister() {
  //history can be used to send the user somewhere else once an action is complete
  const history = useHistory();

  //log-in/registration "flow"
  const { updateAuthStatus } = useAuth();

  //used this to get login vs register because useLocation wasn't working for some reason
  const currentURL = window.location.href;
  const loginOrRegister = currentURL.slice(22);
  // console.log(loginOrRegister);

  // const { pathname } = useLocation; //shows its url path (i.e. localhost:3000/profile)
  // const loginOrRegister = pathname.slice(1);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  async function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        //register only works once for each username/password pair; use /login for further calls
        //change last word from "login" to "&{loginOrRegister}" - making that change elsewhere, too - to distinguish between register and login
        `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/users/${loginOrRegister}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: form }), //user dictated by API itself; form refers to const [form] above
        }
      );

      //success is true or false; error and data can either be falsey/empty string or truthy/string message; removed error here because it wasn't being used
      const { success, error, data } = await response.json();

      if (success) {
        // console.log(data);

        //save token to local storage
        localStorage.st_token = data.token;
        updateAuthStatus();
        history.push("./profile");
      } else {
        window.alert(
          "Please enter a valid username and/or password combination."
        );
        throw new Error(`error with user action, "${loginOrRegister}"`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="userInfoInputs">
      <div className="usernameInput">
        <label style={{ marginRight: 5 + "px" }}>
          {loginOrRegister === "register" && "Choose "}Username:
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className="passwordInput">
        <label style={{ marginRight: 5 + "px" }}>
          {loginOrRegister === "register" && "Choose "}Password:
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value={loginOrRegister === "register" ? "Register" : "Login"}
        className="loginRegButton"
      />
    </form>
  );
}
