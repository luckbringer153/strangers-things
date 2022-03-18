import React from "react";
import { useMe } from "../custom-hooks";

export default function Messages() {
  const { meData } = useMe();
  const { messages } = meData;

  // console.log(meData);

  //currently doesn't distinguish between paths because it yells at me when I try to "measure" the length of an empty array; weird LOL
  return !meData.messages ? (
    <p>You haven't recieved any messages.</p>
  ) : (
    <>
      <section>You've got mail!</section>
      {messages.map((msg) => (
        <div key="uniqueKey" className="recievedMsgs">
          <p>Post ID: {msg._id}</p>
          <p>Message Content: {msg.content}</p>
        </div>
      ))}
    </>
  );
}

// curl http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/6230dfd1b8f8e00017e40f62/messages -X POST -H 'Content-Type:application/json' -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmYzE2MzdiNGY0MTAwMTdkYTE3YzYiLCJ1c2VybmFtZSI6ImpvaG5ueWFwcGxlc2VlZCIsImlhdCI6MTY0NzU0MDQ1M30.6kOwTOI0pLYOiZAkdKWlRhNQMvzVICdPVrcm475JUq8' -d '{"message":{"content":"from johnnyappleseed to luckbringer about tamales"}}'
