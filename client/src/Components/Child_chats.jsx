import React from "react";
import { useEffect, useState } from "react";

const Child_chats = (props) => {
  const [isLoggedUser, setIsLoggedUser] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedUser")).userId == props.sender) {
      setIsLoggedUser(true);
    }
  }, []);

  return (
    <div
      id="child_chatMessage_container"
      style={{
        textAlign: isLoggedUser ? "right" : "left",
        backgroundColor: isLoggedUser ? "white" : "rgb(226 226 226)",
        marginLeft: isLoggedUser ? "33vw" : "11px",
        marginRight: isLoggedUser ? "0px" : "18rem",
        backgroundColor: isLoggedUser ? "#2B5279" : "#182633",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <div>{props.content}</div>
    </div>
  );
};

export default Child_chats;
