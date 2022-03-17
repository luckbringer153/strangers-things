//this hook gives me the current username, author id, posts that've been made by this user, and messages that've been sent to this user

import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function useMe() {
  const { token } = useAuth();
  const [meData, setMeData] = useState({});

  //things are appearing twice because useEffect() runs after componenet has entered DOM but before user sees anything on screen
  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // how to alias: "data:me" means you use me from now on to refer to data
        const { success, error, data } = await response.json();
        // console.log("data looks like this:", data);

        if (success) {
          setMeData(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchMe();
  }, [token]);
  return { meData, setMeData };
}
