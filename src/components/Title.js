import React from "react";
// import { Titlecss } from "../styles";

// change banner links on right based on logged in vs not logged in
// when not logged in, you can click on home and login
// when logged in, you can click on home, profile, and logout

const Title = () => {
  //   const styles = {
  //     h5: {
  //       fontSize: "20px",
  //       color: "color:rgb(36, 78, 75)",
  //     },
  //     h1: {
  //       color: "color:rgb(36, 78, 75)",
  //     },
  //   };
  //style={styles.h1}; style={styles.h5}

  return (
    <div className="headers">
      <h1> The WWW Garage Sale </h1>
      <h5> New stuff is just a click away! </h5>
    </div>
  );
};

export default Title;
