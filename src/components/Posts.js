import React from "react";
import { usePosts } from "../custom-hooks";

// posts sole job is rendering a list of posts from /api/cohort-name/posts
// whenever React mounts this component, meaning, behind the scenes, the react machinery is managing whether we "see" this combo of JSX + functionality based on whether data is available and whether this route is activated
// we need to track state and the shape of that state
// and we need a side-effect container to perform the long-running operations associated with resolving that data from an external server
// this is where we write the stuff that compiles to a hydrated version of the DOM, where our HTML is listening for user interactions

export default function Posts() {
  const { posts } = usePosts(); // object or value???

  // console.log(posts);////////////////////

  const stringPosts = JSON.stringify(posts); // converting object or value to a JSON string

  // console.log(stringPosts);

  //const { title, description, price, location, willDeliver } = stringPosts || {};
  const { title, description, price, location, willDeliver, author } =
    JSON.parse(stringPosts) || {};

  // console.log("price is", posts[0].price);//////////////////////////

  // if (willDeliver ? (willDeliver=Yes) : willDeliver=No)

  return (
    <main className="postsList">
      <div>Look at these posts!</div>

      <section className="eachPost">
        {/* <h2>{posts[0].title}</h2> */}
        {/* <h4>Offered by: {posts[0].author.username}</h4>
        <p>{posts[0].description}</p>
        <p>Listing Price: {posts[0].price}</p>
        <p>Sold From: {posts[0].location}</p>
        <p>Will deliver? {posts[0].willDeliver}</p> */}
      </section>
    </main>
  );
}
