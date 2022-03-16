import React from "react";
import { usePosts } from "../custom-hooks";
import { NavLink } from "react-router-dom";
// import { useAuth } from "./useAuth";

// posts sole job is rendering a list of posts from /api/cohort-name/posts
// whenever React mounts this component, meaning, behind the scenes, the react machinery is managing whether we "see" this combo of JSX + functionality based on whether data is available and whether this route is activated
// we need to track state and the shape of that state
// and we need a side-effect container to perform the long-running operations associated with resolving that data from an external server
// this is where we write the stuff that compiles to a hydrated version of the DOM, where our HTML is listening for user interactions

export default function Posts() {
  const { posts } = usePosts();
  // const { token } = useAuth();

  // console.log("this is what's inside of posts right now:", posts);

  // const stringPosts = JSON.stringify(posts); // converting object or value to a JSON string
  // console.log(stringPosts);

  // if (posts[0]) console.log("price is", posts[0].price);

  async function clickDelete(post_id) {
    let answer = false;
    answer = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );
    if (answer) {
      console.log("The post was deleted.");

      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${post_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      // console.log("The post was not deleted.");
    }
  }

  //ideally, this will prevent errors by enabling the return to be empty if posts is empty
  return !posts ? (
    <main className="postsList">
      <div>Sorry, no posts today!</div>
    </main>
  ) : (
    <main className="postsList">
      {/* <div>Look at these posts!</div> */}

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
            <p>Post ID:{post._id}</p>
            <p>Author ID:{post.author._id}</p>
            <p>Author Username:{post.author.username}</p>
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
              ) : (
                <>
                  <NavLink key="6" to="/editpost" className="editPostButton">
                    Edit
                  </NavLink>
                  <button className="deletePostButton" onClick={clickDelete}>
                    Delete
                  </button>
                </>
              )}
            </p>
          </section>
        );
      })}
    </main>
  );
}
