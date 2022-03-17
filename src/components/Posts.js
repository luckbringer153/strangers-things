import React, { useState, useEffect } from "react";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchMsg, setShowSearchMsg] = useState("false");
  const [showSearchNoneMsg, setShowSearchNoneMsg] = useState("false");

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  // function searchThrough() {
  //   posts.forEach((post) => {
  //     //for each item ("key") in post, see if there's a match with the search term within that key's contents
  //     //if match is found, fetch that specific post and move on to the next one
  //     //at the end, /posts should have a list of posts that match the searchTerm with posts that didn't filtered out
  //     for (const key in post) {
  //       // switch (key) {
  //       //   case "willDeliver":
  //       //   case "active":
  //       //     // keep adding case XXXXXX:
  //       //     continue; //continue is like break - jumps back to loop and ignores that word; applies to for loop not switch or if blocks
  //       // }

  //       const currentPostID = post._id;
  //       const currentField = post[key];

  //       if (typeof currentField !== "string") {
  //         continue;
  //       }

  //       // console.log("key", key);
  //       // console.log("currentField", currentField);

  //       const check = currentField.indexOf("new"); //check is gonna be -1 if nothing matched

  //       if (check >= 0) {
  //         console.log("Found match! It has a post ID of", currentPostID);
  //         success = true;
  //         setShowSearchMsg(true);

  //         const filteredPosts = posts.filter(
  //           (post) => post._id !== currentPostID
  //         );
  //         setPosts(filteredPosts);
  //       }
  //     }
  //   });
  // }

  useEffect(() => {
    setPosts(posts.filter((post) => searchTermFound(post)));

    if (!showSearchMsg) {
      setShowSearchNoneMsg(true);
    }
  }, [searchTerm]);

  // this function returns a boolean that will be used to filter posts in the above useEffect trigger
  function searchTermFound(post) {
    // iterate the post keys
    // post.forEach((post) => {
    for (const key in post) {
      const currentPostID = post._id;
      const currentField = post[key];

      // ignore any non-string post[key] values
      if (typeof currentField !== "string") {
        continue;
      }

      // if there's a match in the substring/indexOf, return true
      // otherwise, after we loop, return false
      const check = currentField.indexOf("new"); //check is gonna be -1 if nothing matched

      if (check >= 0) {
        // console.log("Found match! It has a post ID of", currentPostID);
        // success = true;
        setShowSearchMsg(true);

        return true;
      }
    }
    // });
  }

  return !posts ? (
    <main className="postsList">
      <div>Sorry, no posts today!</div>
    </main>
  ) : (
    <main className="postsList">
      <span style={{ fontSize: 20 + "px" }}>What are you looking for? </span>
      <input
        type="text"
        style={{ fontSize: 15 + "px", marginBottom: 15 + "px" }}
        value={searchTerm}
        onChange={handleChange}
      />
      <span
        className="searchPostsButton"
        style={{ marginLeft: 5 + "px" }}
        // onClick={searchTermFound}
      >
        Search
      </span>

      {showSearchMsg && <div>Post(s) found!</div>}
      {showSearchNoneMsg && <div>There were no posts with that keyword.</div>}

      {/* don't use forEach here because that would alter original array */}
      {posts.map((post) => {
        // use this to pass title, description, and price values to edit post, send message, etc
        // const queryString = `?title=${post.title}&description=${post.description}&price=${post.price}`;

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
              {!post.isAuthor && token ? (
                <NavLink
                  key="7"
                  to={`/sendmessage/?authorUsername=${post.author.username}&post_id=${post._id}`}
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
