import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function AddPost() {
  const history = useHistory();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: false,
  });
  const { token } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // when addPostButton is clicked, use the info in the five input fields to create a new post on the API
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
        // console.log("You did it!! A post has been made.");
        history.push("/posts");
      } else {
        throw new Error("error creating post");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="addPostInputs">
      <h3>What would you like to offer to the interwebs?</h3>

      <form onSubmit={handleSubmit}>
        <div className="titleInput">
          <label style={{ marginRight: 5 + "px" }}>Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="descriptionInput">
          <label style={{ marginRight: 5 + "px" }}>Item Description:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="priceInput">
          <label style={{ marginRight: 5 + "px" }}>Listing Price:</label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div className="locationInput">
          <label style={{ marginRight: 5 + "px" }}>Selling From:</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          <label style={{ marginLeft: 5 + "px" }}>(optional)</label>
        </div>
        <div className="willDeliverInput">
          <label style={{ marginRight: 5 + "px" }}>Willing to deliver?</label>
          <input
            type="text"
            name="willDeliver"
            value={form.willDeliver}
            onChange={handleChange}
          />
          <label style={{ marginLeft: 5 + "px" }}>(false by default)</label>
        </div>
        <input type="submit" value="Add Post" className="addPostButton" />
      </form>
    </main>
  );
}
