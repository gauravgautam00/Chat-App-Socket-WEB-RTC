import React, { useState, useEffect, useRef } from "react";
import ChildAllUser from "./ChildAllUser";
import Child_chats from "./Child_chats";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const chatContainerRightPart = useRef(null);

  const chatContainerMain = useRef(null);
  const chatContainerLeftPart = useRef(null);

  const chatContainerRightPartAllChats = useRef(null);
  const inputMessage = useRef(null);
  const sendButton = useRef(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [SignIn, setSignIn] = useState();
  const [allUsers, getAllUsers] = useState([]);
  const [allChats, getAllChats] = useState([]);
  const [secondUser, setSecondUser] = useState(null);
  const [secondUserUp, setSecondUserUp] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shimmerChat, setShimmerChat] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("loggedUser")) {
      navigate("/");
    }

    const tempData = [];
    for (let i = 0; i < 10; i++) {
      tempData.push({
        content: "Loading chat",
      });
    }
    setShimmerChat(tempData);
  }, []);

  //FETCHING ALL USERS
  //FETCHING ALL USER
  //FETCHING ALL USERS
  //FETCHING ALL USERS
  //FETCHING ALL USERS
  //FETCHING ALL USERS
  //FETCHING ALL USERS

  useEffect(() => {
    if (localStorage.getItem("loggedUser") != null) {
      setLoggedUser(JSON.parse(localStorage.getItem("loggedUser")));
      // console.log(localStorage.getItem("loggedUser"), "in fetching all users");
      fetch("https://chatsocket-4cdz.onrender.com/getUsers", {
        // fetch("http://localhost:8880/getUsers", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
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

  const socket = io("https://chatsocket-4cdz.onrender.com", {
    // const socket = io("http://localhost:8880", {
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
      // console.log("getting message in client", loggedUser, secondUser, message);
      if (secondUser != null && loggedUser != null) {
        const sortedSenderReceiverIds = [
          loggedUser.userId,
          secondUser.userId,
        ].sort();
        const sortedCurrentChatIds = [message.sender, message.reciever].sort();
        // console.log("MAKING OF UNIQUE METHOD  - CALLING FROM CLIENT");
        // console.log(sortedCurrentChatIds);
        // console.log(sortedSenderReceiverIds);
        // Compare sorted IDs with the IDs of the current chat
        const isCurrentChat =
          JSON.stringify(sortedSenderReceiverIds) ===
          JSON.stringify(sortedCurrentChatIds);
        if (isCurrentChat) {
          // console.log(
          //   "Received message:",
          //   "message->sender",
          //   message.sender,
          //   "seconduser.userId->",
          //   secondUser.userId,
          //   "loggeduser.userId->",
          //   loggedUser.userId
          // );

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
          setTimeout(() => {
            chatContainerRightPartAllChats.current.scrollTo(
              0,
              chatContainerRightPartAllChats.current.scrollHeight
            );
          }, 100);
          // console.log(chatContainerRightPart.current.scrollHeight);
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
    if (
      localStorage.getItem("loggedUser") &&
      secondUserUp
      // localStorage.getItem("secondUser")
    ) {
      socket.emit("new message", {
        sender: loggedUser.userId,
        content: inputMessage.current.value,
        reciever: secondUser.userId,
      });
      inputMessage.current.value = "";
    } else {
    }
    setTimeout(() => {
      chatContainerRightPartAllChats.current.scrollTo(
        0,
        chatContainerRightPartAllChats.current.scrollHeight
      );
    }, 100);
    // console.log(chatContainerRightPart.current.scrollHeight);
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

    // console.log("two users", { firstUser: loggedUser.name, secondUser: id });
    // console.log(secondUser);
    setIsLoaded(false);
    fetch("https://chatsocket-4cdz.onrender.com/chat/getChat", {
      // fetch("http://localhost:8880/chat/getChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(twoUsers),
    })
      .then((data) => data.json())
      .then((res) => {
        // console.log(res);
        setIsLoaded(true);
        getAllChats(res);
        setSecondUserUp(true);
        setTimeout(() => {
          chatContainerRightPartAllChats.current.scrollTo(
            0,
            chatContainerRightPartAllChats.current.scrollHeight
          );
        }, 100);
      })
      .catch((err) => console.log("error in fetching all chats", err.message));
  };

  return (
    <div id="chat_container">
      <div id="chat_container_main" ref={chatContainerMain}>
        <div id="chat_container_leftPart" ref={chatContainerLeftPart}>
          <div id="chat_container_leftPart_heading">Messages</div>
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
          <div id="chat_container_heading">
            {secondUser == null || secondUserUp == null
              ? "Select User to initiate the chat"
              : secondUser.name}
          </div>
          <div
            id="chat_container_rightPart_allChats"
            ref={chatContainerRightPartAllChats}
          >
            {isLoaded ? (
              allChats.length > 0 ? (
                allChats.map((data, index) => {
                  return (
                    <Child_chats
                      key={index}
                      sender={data.sender}
                      content={data.content}
                      time={
                        data.customCreatedAt
                          ? new Date(data.customCreatedAt).toLocaleString(
                              "en-IN",
                              {
                                hour: "numeric", // Display the hour (1-12)
                                minute: "2-digit", // Display the minute (00-59)
                                hour12: true, // Use the 12-hour clock format with AM/PM indicator
                              }
                            )
                          : new Date().toLocaleString("en-IN", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })
                      }
                      createdAt={data.createdAt}
                    />
                  );
                })
              ) : (
                <div style={{ color: "white", fontSize: "larger" }}>
                  Send your message to start the chat
                </div>
              )
            ) : (
              <div style={{ color: "white", fontSize: "larger" }}>
                {secondUser != null ? "Loading" : ""}
              </div>
            )}
          </div>
          <div id="chat_container_rightPart_inputMessage">
            <div id="chat_container_rightPart_inputMessageDiv">
              <input
                id="chat_container_rightPart_inputMessage_real"
                placeholder="Enter your message"
                ref={inputMessage}
              />
              <span
                onClick={messageSent}
                id="chat_send_icon"
                class="material-symbols-outlined"
              >
                send
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
