import React from "react";
import { NavLink } from "react-router-dom";
import { useMe } from "../custom-hooks";

export default function Profile() {
  const links = [
    { id: 3, to: "/profile/newpost", name: "New Post" },
    { id: 4, to: "/profile/messages", name: "My Messages" },
  ];

  const { meData } = useMe();
  // console.log("in profile.js, meData is:", meData);
  const { messages } = meData || {};
  const { posts } = meData || {};

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
        <h4>My Posts</h4>
        <main className="myPostsList">
          {!posts ? (
            "You've made no posts."
          ) : (
            <>
              {posts.map((post) => (
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
              ))}
            </>
          )}
        </main>
      </section>
    </nav>
  );
}
