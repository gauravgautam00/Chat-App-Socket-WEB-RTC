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
        height: isLoggedUser ? "39px" : "39px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      {props.content}
    </div>
  );
};

export default Child_chats;
