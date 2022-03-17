import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // const {
        //   data: { posts },
        // } = await response.json();

        // setPosts(posts);

        const { success, error, data } = await response.json();

        // console.log("we got this error:", error);
        // console.log("data looks like this:", data);

        if (success) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, [posts]);

  return { posts, setPosts };
}
