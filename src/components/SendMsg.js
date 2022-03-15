import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

//NEEDS AUTHOR ID FROM POST IN QUESTION
export default function SendMsg() {
  const history = useHistory();

  const [form, setForm] = useState({
    to: "",
    from: "",
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
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="sendMsgForm">
      <h4>Send a message to the author here.</h4>

      <form onSubmit={handleSubmit}>
        <div className="toWhom">To: author ID/name</div>
        <div className="fromYou">From: your ID/name</div>
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
