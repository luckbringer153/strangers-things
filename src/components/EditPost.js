import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";
import Posts from "./Posts";

//BRING IN POST ID BASED ON THE POST YOU CHOSE TO EDIT
export default function EditPost() {
  const history = useHistory();

  //unpack fields from Posts
  const { queryString } = Posts;
  console.log(queryString);

  //fields will be equal to the values in the input fields of the listing you want to edit
  //this isn't super easy to do, so leaving it as blank fields for now - the thought is what counts!!
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: "",
  });
  const { token } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        // `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${post_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ post: form }),
        }
      );

      const { success, data, error } = await response.json();

      if (success) {
        console.log("You did it!! A post has been edited.");
        history.push("/posts");
      } else {
        throw new Error("error editing post");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <h4 style={{ marginBottom: 10 + "px" }}>
        Make your changes below, then click "Save Changes".
      </h4>
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
        <input type="submit" value="Save Changes" className="editPostButton" />
      </form>
    </section>
  );
}

// Possible way of thinking about this:
// 1. an "edit post" button only appears if you're the author of that post
// 2. when you click the edit post buton, it takes you back to the same form as AddPost. This time all fields will be filled in by whatever they were on said post
// 3. the user can change whatever they want to change, then click the "save changes" button
// 4. the post is sent to the API as a PATCH while user is taken back to the all posts page; their changes should have been made without duplicating the listing
