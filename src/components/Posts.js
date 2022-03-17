import React, { useState } from "react";
import { usePosts, useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

// posts sole job is rendering a list of posts from /api/cohort-name/posts
// whenever React mounts this component, meaning, behind the scenes, the react machinery is managing whether we "see" this combo of JSX + functionality based on whether data is available and whether this route is activated
// we need to track state and the shape of that state
// and we need a side-effect container to perform the long-running operations associated with resolving that data from an external server
// this is where we write the stuff that compiles to a hydrated version of the DOM, where our HTML is listening for user interactions

export default function Posts() {
  const { posts, setPosts } = usePosts();
  const { token } = useAuth();

  // console.log("this is what's inside of posts right now:", posts);

  // const stringPosts = JSON.stringify(posts); // converting object or value to a JSON string
  // console.log(stringPosts);

  // if (posts[0]) console.log("price is", posts[0].price);

  const [form, setForm] = useState({
    searchTerm: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function searchThrough(postId) {
    // console.log("Searching...");

    // try {
    //   const response = await fetch(
    //     `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${postId}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );if (success) {
    //   <p>Post(s) found!</p>;

    //   const filteredPosts = posts.filter((post) => post._id !== postId);
    //   setPosts({ ...posts, posts: filteredPosts });
    // } else {
    //   <p>No posts were found with that keyword.</p>;
    // }
    // } catch (err) {
    //   console.error(err);
    // }

    // const { success } = await response.json();

    console.log(posts);
    // const stringPosts = JSON.stringify(posts);

    //make forEach/map/for-loop that does this: for each post, stringify it and search for searchTerm with .includes; if match is found, return that post's post._id (and/or fetch that post)
    // forEach((post) => {
    //   const stringedPost = JSON.stringify(post);
    //   const success = stringedPost.includes("new");

    //   if (success) {
    //     console.log("found match! It has a post ID of", post._id);
    //   } else {
    //     console.log("no matches found");
    //   }
    // });
  }

  return !posts ? (
    <main className="postsList">
      <div>Sorry, no posts today!</div>
    </main>
  ) : (
    <main className="postsList">
      {/* <div>Look at these posts!</div> */}

      {/* CURRENTLY: I haven't gotten search functionality to work */}
      <span style={{ fontSize: 20 + "px" }}>What are you looking for? </span>
      <input
        type="text"
        style={{ fontSize: 15 + "px", marginBottom: 15 + "px" }}
        value={form.searchTerm}
        onChange={handleChange}
      ></input>
      <span
        className="searchPostsButton"
        style={{ marginLeft: 5 + "px" }}
        onClick={() => searchThrough()}
      >
        Search
      </span>

      {/* don't use forEach here because that would alter original array */}
      {posts.map((post) => {
        // use this to pass title, description, and price values to edit post, send message, etc
        const queryString = `?title=${post.title}&description=${post.description}&price=${post.price}`;

        return (
          <section className="eachPost" key={post._id}>
            <h2>{post.title}</h2>
            <h4>{post.description}</h4>
            <p>Listing Price: {post.price}</p>
            <p>Sold From: {post.location ? post.location : "[On Request]"}</p>
            <p>Will deliver? {post.willDeliver ? "Yes" : "No"}</p>
            {/* <p>Post ID:{post._id}</p> */}
            {/* <p>Author ID:{post.author._id}</p> */}
            {/* <p>Author Username:{post.author.username}</p> */}
            {/* <p>Are you the author? {post.isAuthor ? "Yes" : "No"}</p> */}
            <p>
              {!post.isAuthor ? (
                <NavLink
                  key="7"
                  to="/sendmessage"
                  className="createMessageButton"
                >
                  I'm Interested!
                </NavLink>
              ) : null}
            </p>
          </section>
        );
      })}
    </main>
  );
}
