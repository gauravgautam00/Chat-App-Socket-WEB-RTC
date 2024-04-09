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
        paddingLeft: "13px",
        paddingRight: "16px",
        display: "inline",
      }}
    >
      <div
        id="child_chatMessage_container_text"
        style={{
          backgroundColor: isLoggedUser ? "#1937be" : "blueviolet",
        }}
      >
        {props.content}
        <div id="child_chatMessage_time">{props.time}</div>
      </div>
      {/* <div id="child_chatMessage_time">{props.time}</div> */}
    </div>
  );
};

export default Child_chats;
