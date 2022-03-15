import React from "react";
import { usePosts } from "../custom-hooks";

// posts sole job is rendering a list of posts from /api/cohort-name/posts
// whenever React mounts this component, meaning, behind the scenes, the react machinery is managing whether we "see" this combo of JSX + functionality based on whether data is available and whether this route is activated
// we need to track state and the shape of that state
// and we need a side-effect container to perform the long-running operations associated with resolving that data from an external server
// this is where we write the stuff that compiles to a hydrated version of the DOM, where our HTML is listening for user interactions

export default function Posts() {
  const { posts } = usePosts();

  // console.log("this is what's inside of posts right now:", posts);

  // const stringPosts = JSON.stringify(posts); // converting object or value to a JSON string
  // console.log(stringPosts);

  // if (posts[0]) console.log("price is", posts[0].price);

  //ideally, this will prevent errors by enabling the return to be empty if posts is empty
  return !posts ? (
    <main className="postsList">
      <div>Sorry, no posts today!</div>
    </main>
  ) : (
    <main className="postsList">
      {/* <div>Look at these posts!</div> */}

      {/* don't use forEach here because that would alter original array */}
      {/* I just need some number that goes up by 1 with each iteration of the map function for as many posts as are in "array of objects" called posts */}
      {posts.map((post) => {
        return (
          <section className="eachPost" key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Listing Price: {post.price}</p>
            <p>Sold From: {post.location}</p>
            <p>Will deliver? {post.willDeliver ? "Yes" : "No"}</p>
          </section>
        );
      })}
    </main>
  );
}
