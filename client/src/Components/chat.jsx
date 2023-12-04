import React, { useState, useEffect, useRef } from "react";
import ChildAllUser from "./ChildAllUser";
import Child_chats from "./Child_chats";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const Chat = () => {
  const chatContainerRightPart = useRef(null);
  const chatContainerHeading = useRef(null);
  const chatContainerMain = useRef(null);
  const chatContainerLeftPart = useRef(null);
  const inputMessage = useRef(null);
  const sendButton = useRef(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [SignIn, setSignIn] = useState();
  const [allUsers, getAllUsers] = useState([]);
  const [allChats, getAllChats] = useState([]);
  const [secondUser, setSecondUser] = useState(null);

  useEffect(() => {
    if (
      chatContainerHeading.current &&
      inputMessage.current &&
      chatContainerMain.current &&
      sendButton.current
    ) {
      chatContainerHeading.current.onclick = () => {
        chatContainerMain.current.style.width = "59rem";
        chatContainerHeading.current.style.width = "39.9rem";
        inputMessage.current.style.width = "47.7%";
        sendButton.current.style.left = "52rem";
      };
    }
  }, []);

  //FETCHING ALL USERS
  //FETCHING ALL USERS
  //FETCHING ALL USERS
  //FETCHING ALL USERS
  //FETCHING ALL USERS
  //FETCHING ALL USERS
  //FETCHING ALL USERS

  useEffect(() => {
    if (localStorage.getItem("loggedUser") != null) {
      setLoggedUser(JSON.parse(localStorage.getItem("loggedUser")));
      // console.log(localStorage.getItem("loggedUser"), "in fetching all users");
      fetch("http://localhost:8880/getUsers")
        .then((data) => data.json())
        .then((res) => {
          // console.log(res);
          getAllUsers(res);
        })
        .catch((err) =>
          console.log("error in fetching all users", err.message)
        );
    }
  }, []);

  useEffect(() => {
    setSignIn("Sign-In");
  }, []);

  const signOutCalled = () => {
    localStorage.removeItem("loggedUser");
    setLoggedUser(null);
    getAllUsers([]);
    setSecondUser(null);
    getAllChats([]);
    // console.log("logged user", loggedUser);
  };

  const socket = io("http://localhost:8880", {
    auth: {
      userId: localStorage.getItem("loggedUser")
        ? JSON.parse(localStorage.getItem("loggedUser")).userId
        : null,
    },
  });

  // MESSAGeS RECIEVED
  // MESSAGeS RECIEVED
  // MESSAGeS RECIEVED
  // MESSAGeS RECIEVED
  // MESSAGeS RECIEVED

  useEffect(() => {
    // Event listener for incoming messages
    socket.on("message", (message) => {
      console.log("getting message in client", loggedUser, secondUser, message);
      if (secondUser != null && loggedUser != null) {
        // if (
        //   (message.sender == secondUser.userId &&
        //     message.reciever == loggedUser.userId) ||
        //   (message.reciever == secondUser.userId &&
        //     message.sender == loggedUser.userId)
        // ) {
        const sortedSenderReceiverIds = [
          loggedUser.userId,
          secondUser.userId,
        ].sort();
        const sortedCurrentChatIds = [message.sender, message.reciever].sort();
        console.log("MAKING OF UNIQUE METHOD  - CALLING FROM CLIENT");
        console.log(sortedCurrentChatIds);
        console.log(sortedSenderReceiverIds);
        // Compare sorted IDs with the IDs of the current chat
        const isCurrentChat =
          JSON.stringify(sortedSenderReceiverIds) ===
          JSON.stringify(sortedCurrentChatIds);
        if (isCurrentChat) {
          console.log(
            "Received message:",
            "message->sender",
            message.sender,
            "seconduser.userId->",
            secondUser.userId,
            "loggeduser.userId->",
            loggedUser.userId
          );
          chatContainerRightPart.current.scrollBy(
            0,
            chatContainerRightPart.current.scrollTop + 30
          );
          getAllChats((prev) => {
            return [
              ...prev,
              {
                sender: message.sender,
                content: message.content,
                reciever: message.reciever,
              },
            ];
          });
        }
      }
      // }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, [loggedUser, secondUser]);

  //MESSASGE SEND
  //MESSAGE SEND
  //MESSAGE SEND

  const messageSent = () => {
    if (localStorage.getItem("loggedUser") != null) {
      socket.emit("new message", {
        sender: loggedUser.userId,
        content: inputMessage.current.value,
        reciever: secondUser.userId,
      });
      inputMessage.current.value = "";
    } else {
    }
  };

  //FETCHING ALL CHATS
  //FETCHING ALL CHATS
  //FETCHING ALL CHATS
  //FETCHING ALL CHATS
  //FETCHING ALL CHATS

  const selectedUser = (id, name) => {
    const twoUsers = {
      firstUser: loggedUser.userId,
      secondUser: id,
    };
    setSecondUser({ name: name, userId: id });
    console.log("two users", { firstUser: loggedUser.name, secondUser: id });
    console.log(secondUser);
    fetch("http://localhost:8880/chat/getChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(twoUsers),
    })
      .then((data) => data.json())
      .then((res) => {
        // console.log(res);
        getAllChats(res);
        if (chatContainerRightPart.current) {
          chatContainerRightPart.current.scrollTo(
            0,
            chatContainerRightPart.current.scrollHeight
          );
        }
      })
      .catch((err) => console.log("error in fetching all chats", err.message));
  };

  return (
    <div id="chat_container">
      <div id="chat_container_name">
        {loggedUser == null ? <Link to="/">Sign-Up</Link> : loggedUser.name}
        <div onClick={signOutCalled} id="chat_container_name_logout">
          Sign out
        </div>
      </div>
      <div id="chat_container_main" ref={chatContainerMain}>
        <div id="chat_container_heading" ref={chatContainerHeading}>
          {secondUser == null ? "chat" : secondUser.name}
        </div>
        <div id="chat_container_leftPart" ref={chatContainerLeftPart}>
          {allUsers
            .filter((data) => data._id !== loggedUser.userId)
            .map((data, index) => {
              return (
                <ChildAllUser
                  key={index}
                  name={data.name}
                  email={data.email}
                  password={data.password}
                  _id={data._id}
                  selectThisUser={selectedUser}
                />
              );
            })}
        </div>
        <div id="chat_container_rightPart" ref={chatContainerRightPart}>
          <div id="chat_container_rightPart_allChats">
            {allChats.map((data, index) => {
              return (
                <Child_chats
                  key={index}
                  sender={data.sender}
                  content={data.content}
                />
              );
            })}
          </div>

          <div id="chat_container_rightPart_inputMessage">
            <input
              id="chat_container_rightPart_inputMessage_real"
              placeholder="Enter your message"
              ref={inputMessage}
            />
            <div
              onClick={messageSent}
              id="chat_container_rightPart_inputMessage_sendButton"
              ref={sendButton}
            >
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
