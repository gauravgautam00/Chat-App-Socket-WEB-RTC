import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const getEmail = useRef(null);
  const getPassword = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (getEmail.current && getPassword.current) {
      const userDetails = {
        email: getEmail.current.value,
        password: getPassword.current.value,
      };
      setIsLoading(true);
      fetch("https://chatsocket-4cdz.onrender.com/login", {
        // fetch("http://localhost:8880/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      })
        .then((res) => {
          setIsLoading(false);
          if (!res.ok) {
            alert("Either user don't exist or credentials are wrong");
            throw new Error(`HTTP error! Status: ${res.status}`);
          } else return res.json();
        })
        .then((data) => {
          localStorage.setItem(
            "loggedUser",
            JSON.stringify({ name: data.user.name, userId: data.user._id })
          );
          localStorage.setItem("token", data.token);

          navigate("/chat");
        })
        .catch((err) => console.log("error in login ", err.message));
    }
  };
  return (
    <div id="login_container">
      <div id="login_container_heading">Log In</div>

      <div id="login_container_email">
        <input
          id="login_email_input"
          type="email"
          placeholder="Enter your email"
          ref={getEmail}
        />
      </div>
      <div id="login_container_password">
        <input
          id="login_password_input"
          type="password"
          placeholder="Enter your password"
          ref={getPassword}
        />
      </div>
      <div id="login_container_loading">{isLoading ? "Loading..." : ""}</div>
      <div onClick={handleSubmit} id="login_container_submit">
        Submit
      </div>
    </div>
  );
};

export default Login;
