import React from "react";
import { usePosts } from "../custom-hooks";

// posts sole job is rendering a list of posts from /api/cohort-name/posts

// whenever React mounts this component, meaning, behind the scenes, the react machinery is managing whether we "see" this combo of JSX + functionality based on whether data is available and whether this route is activated

// we need to track state and the shape of that state
// and we need a side-effect container to perform the long-running operations associated with resolving that data from an external server

// this is where we write the stuff that compiles to a hydrated version of the DOM, where our HTML is listening for user interactions

export default function Posts() {
  const { posts } = usePosts();

  const stringPosts = JSON.stringify(posts);
  console.log(stringPosts["location"]);

  return <div>{stringPosts}</div>;
}
