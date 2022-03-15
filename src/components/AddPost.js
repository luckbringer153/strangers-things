import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function AddPost() {
  const history = useHistory();
  //add location and willDeliver fields later, they're optional
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });
  const { token } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      //fetch to get response whether POST action was successful; resolve data; leverage history api to make user go elsewhere after successful POST
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ post: form }),
        }
      );

      const { success, data, error } = await response.json();

      if (success) {
        history.push("/posts");
      } else {
        throw new Error("error creating post");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return <div>Create a post here</div>;
}
