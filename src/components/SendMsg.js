import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth, usePosts, useMe } from "../custom-hooks";

//NEEDS AUTHOR ID FROM POST IN QUESTION
export default function SendMsg() {
  const history = useHistory();
  const { meData } = useMe();

  // const { posts } = usePosts;
  // const { post_id } = posts._id;
  // console.log("Post ID:", post_id);

  //pull to from the post you clicked on, pull from from current user's username
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
      // const response = await fetch(
      //   `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${post_id}/messages`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //     body: JSON.stringify({
      //       message: {
      //         content:
      //           "to luckbringer from johnnyappleseed about tamales - using msg form",
      //       },
      //     }),
      //   }
      // );
      // const result = response.json();
      // console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="sendMsgForm">
      <h4>Send a message to the author here.</h4>

      <form onSubmit={handleSubmit}>
        <div className="toWhom">To: author ID/name</div>
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
