import { useState, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts`
        );

        // const {
        //   data: { posts },
        // } = await response.json();

        // setPosts(posts);

        const { success, error, data } = await response.json();

        // console.log("data looks like this:", data);

        if (success) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, []);

  return { posts };
}
