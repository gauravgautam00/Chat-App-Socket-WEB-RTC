import React from "react";
import Login from "./login";
import Signup from "./signup";

const landing_page = () => {
  return (
    <div id="landing_page">
      <Login />
      <Signup />
    </div>
  );
};

export default landing_page;
