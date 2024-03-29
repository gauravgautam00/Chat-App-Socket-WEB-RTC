import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getName = useRef(null);
  const getEmail = useRef(null);
  const getPassword = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (getName.current && getEmail.current && getPassword.current) {
      const userDetails = {
        name: getName.current.value,
        email: getEmail.current.value,
        password: getPassword.current.value,
      };
      setIsLoading(true);
      fetch("https://chatsocket-4cdz.onrender.com/signup", {
        // fetch("http://localhost:8880/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      })
        .then((res) => {
          setIsLoading(false);

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          // console.log("insignup details", data);
          localStorage.setItem(
            "loggedUser",
            JSON.stringify({ name: data.user.name, userId: data.user._id })
          );
          localStorage.setItem("token", data.token);
          // console.log("local storage up?", localStorage.getItem("loggedUser"));

          navigate("/chat");
        })
        .catch((err) => console.log("error in signup ", err.message));
    }
  };

  return (
    <div id="signup_container">
      <div id="signup_container_heading">Sign Up</div>
      <div id="signup_container_name">
        <input
          id="signup_name_input"
          type="text"
          placeholder="Enter your name"
          ref={getName}
        />
      </div>
      <div id="signup_container_email">
        <input
          id="signup_email_input"
          type="email"
          placeholder="Enter your email"
          ref={getEmail}
        />
      </div>
      <div id="signup_container_password">
        <input
          id="signup_password_input"
          type="password"
          placeholder="Enter your password"
          ref={getPassword}
        />
      </div>
      <div id="signup_container_loading">{isLoading ? "Loading..." : ""}</div>
      <div onClick={handleSubmit} id="signup_container_submit">
        Submit
      </div>
    </div>
  );
};

export default Signup;
