import React from "react";
import { useMe } from "../custom-hooks";

export default function Messages() {
  const { meData } = useMe();
  const { messages } = meData;

  return !meData.Messages ? (
    <p>You haven't recieved any messages.</p>
  ) : (
    <>
      <p>You've got mail!</p>
      {messages.map((msg) => (
        <p key="post._id">
          <div>Post ID: {msg._id}</div>
          <div>Post Title: {msg.title}</div>
        </p>
      ))}
    </>
  );
}

// curl http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/6230dfd1b8f8e00017e40f62/messages -X POST -H 'Content-Type:application/json' -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…k4MH0.Wg0t_6JJomdScSgKhhbMcaH1fH7sJIgNYyA7oiuliMw' -d {"message":"content":"from johnnyappleseed to luckbringer about tamales"}}'
