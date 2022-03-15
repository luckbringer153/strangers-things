import React from "react";

export default function Messages() {
  const numMsgs = 0;
  return !numMsgs ? (
    <p>You haven't recieved any messages.</p>
  ) : (
    <p>You've got mail!</p>
  );
}
