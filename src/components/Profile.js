import React from "react";
import { NavLink } from "react-router-dom";
import { useMe, useAuth } from "../custom-hooks";

export default function Profile() {
  const links = [
    { id: 3, to: "/profile/newpost", name: "New Post" },
    { id: 4, to: "/profile/messages", name: "My Messages" },
  ];

  const { meData, setMeData } = useMe();
  // console.log("in profile.js, meData is:", meData);
  // const { messages } = meData || {};
  const { posts } = meData || {};
  const { token } = useAuth;

  const activePosts = posts ? posts.filter((post) => post.active) : [];

  // const queryString = `?title=${posts.title}&description=$
  //                 {posts.description}&price=${posts.price}`;

  async function clickDelete(postId) {
    let answer = false;
    answer = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );
    if (answer) {
      // console.log("the post id for this is", postId);

      //this type of fetch will flip the post.active boolean from true to false, but it doesn't actually return the posts that are active/not active, so we need to do that map action below
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${postId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { success } = await response.json();

        if (success) {
          console.log("The post was deleted.");

          const filteredPosts = posts.map((post) => {
            if (post._id === postId) {
              post.active = false;
            }

            return post;
          });

          setMeData({ ...meData, posts: filteredPosts });

          console.log(meData); //check that active has been set to false when deleted
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("The post was not deleted.");
    }
  }

  return (
    <nav>
      {links.map(({ id, to, name }) => (
        <NavLink key={id} to={to} className="profileLinks">
          {name}
        </NavLink>
      ))}
      <aside style={{ marginTop: 40 + "px" }}>
        Welcome to your profile, <b>{meData.username}</b>!
      </aside>
      <section className="myPostsListWhole">
        <h4 style={{ fontSize: 20 + "px", marginBottom: 10 + "px" }}>
          My Posts
        </h4>
        <main className="myPostsList">
          {!posts ? (
            "You've made no posts."
          ) : (
            <>
              {activePosts &&
                activePosts.map((post) => (
                  <section className="postBlock">
                    <div key="post._id" className="eachMyPosts">
                      <div className="eachMyPostsID">Post ID: {post._id}</div>
                      <div className="eachMyPostsTitle">
                        Post Title: {post.title}
                      </div>
                      <div className="eachMyPostsDescription">
                        Post Description: {post.description}
                      </div>
                      <div className="eachMyPostsPrice">
                        Post Price: {post.price}
                      </div>
                    </div>
                    <NavLink
                      key="6"
                      to={`/editpost/?title=${post.title}&description=${post.description}&price=${post.price}`}
                      className="editPostButton"
                      // queryString={queryString}
                    >
                      Edit
                    </NavLink>
                    <button
                      className="deletePostButton"
                      onClick={() => clickDelete(post._id)}
                    >
                      Delete
                    </button>
                  </section>
                ))}
            </>
          )}
        </main>
      </section>
    </nav>
  );
}
