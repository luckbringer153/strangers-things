import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth, useMe } from "../custom-hooks";

//NEEDS AUTHOR ID FROM POST IN QUESTION
export default function SendMsg() {
  const history = useHistory();
  const { search } = useLocation();
  const { meData } = useMe();

  //pull to from the post you clicked on, pull from from current user's username
  const searchObject = new URLSearchParams(search);
  const authorUsername = searchObject.get("authorUsername") || "";
  // console.log(authorUsername);
  const post_id = searchObject.get("post_id");

  const [form, setForm] = useState({
    msg: "",
  });
  //set form.to and form.from equal to their respective info based on post that was clicked and the current user
  const { token } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.PreventDefault();

    try {
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${post_id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: {
              content:
                "to luckbringer from johnnyappleseed about tamales - using msg form",
            },
          }),
        }
      );

      const { success, data, error } = await response.json();

      if (success) {
        console.log("Message sent!");
      } else {
        console.log("Message not sent - there must have been an error.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="sendMsgForm">
      <h4>Send a message to the author here.</h4>

      <form onSubmit={handleSubmit}>
        <div className="toWhom">To: {authorUsername}</div>
        <div className="fromYou">From: {meData.username}</div>
        <div className="msgInput">
          <label style={{ marginRight: 5 + "px" }}>Your Message:</label>
          <input
            type="text"
            name="msg"
            value={form.msg}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Send Message" className="sendMsgButton" />
      </form>
    </section>
  );
}
