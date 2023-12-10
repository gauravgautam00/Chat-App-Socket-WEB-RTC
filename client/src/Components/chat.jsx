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
  const chatContainerMainContactDetail = useRef(null);
  const chatContainerMainContactDetailBack = useRef(null);
  const myAccountIcon = useRef(null);
  const myAccountDetail = useRef(null);

  const inputMessage = useRef(null);
  const sendButton = useRef(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [SignIn, setSignIn] = useState();
  const [allUsers, getAllUsers] = useState([]);
  const [allChats, getAllChats] = useState([]);
  const [secondUser, setSecondUser] = useState(null);
  const [secondUserUp, setSecondUserUp] = useState(null);

  const handleKeyDown = (event) => {
    // Check if Shift + Enter is pressed
    console.log("inside handleKeyDown");
    if (inputMessage.current) {
      if (event.key === "Enter" && event.shiftKey) {
        console.log("full inside handleKeyDown");

        // Insert a newline character

        const cursorPosition = inputMessage.current.selectionStart;
        const inputValue = inputMessage.current.value;
        const newValue =
          inputValue.substring(0, cursorPosition) +
          "\n" +
          inputValue.substring(inputMessage.current.selectionEnd);

        // Update the input value
        inputMessage.current.value = newValue;

        // Prevent the default Enter key behavior
        event.preventDefault();
      }
    }
  };
  useEffect(() => {
    if (inputMessage.current) {
      inputMessage.current.addEventListener("keydown", handleKeyDown);
    }
    if (myAccountIcon.current && myAccountDetail.current) {
      myAccountDetail.current.style.marginLeft = "-19rem";
      myAccountIcon.current.onclick = () => {
        if (myAccountDetail.current.style.marginLeft == "-19rem") {
          myAccountDetail.current.style.marginLeft = "0rem";
        } else {
          myAccountDetail.current.style.marginLeft = "-19rem";
        }
      };
    }

    if (
      chatContainerHeading.current &&
      inputMessage.current &&
      chatContainerMain.current &&
      sendButton.current &&
      chatContainerMainContactDetail.current &&
      chatContainerMainContactDetailBack.current
      // &&
      // secondUserUp
    ) {
      // console.log("second user", secondUser);
      chatContainerHeading.current.onclick = () => {
        if (chatContainerHeading.current.style.width == "39.99rem") {
          // expand
          chatContainerHeading.current.style.width = "58.7rem";
          inputMessage.current.style.width = "64.4%";
          sendButton.current.style.left = "73.23rem";
          chatContainerRightPart.current.style.width = "76.45%";
          chatContainerMainContactDetail.current.style.display = "none";
        } else {
          chatContainerHeading.current.style.width = "39.99rem";
          inputMessage.current.style.width = "41.3%";
          sendButton.current.style.left = "54.6rem";
          chatContainerRightPart.current.style.width = "40rem";
          chatContainerMainContactDetail.current.style.display = "block";
        }
      };
      chatContainerMainContactDetailBack.current.onclick = () => {
        chatContainerHeading.current.style.width = "58.7rem";
        inputMessage.current.style.width = "64.4%";
        sendButton.current.style.left = "73.23rem";
        chatContainerRightPart.current.style.width = "76.45%";
        chatContainerMainContactDetail.current.style.display = "none";
      };
    }
  }, [secondUser]);

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
        setSecondUserUp(true);
        if (chatContainerRightPart.current) {
          chatContainerRightPart.current.scrollTop =
            chatContainerRightPart.current.scrollHeight;
        }
      })
      .catch((err) => console.log("error in fetching all chats", err.message));
  };

  return (
    <div id="chat_container">
      <div id="chat_container_myDetails">
        <div id="chat_container_myDetails_first">
          <span
            id="chat_container_myDetails_first_icon"
            class="material-symbols-outlined"
          >
            chat
          </span>
        </div>
        <div id="chat_container_myDetails_second">
          <span
            id="chat_container_myDetails_second_icon"
            class="material-symbols-outlined"
          >
            groups
          </span>
        </div>
        <div id="chat_container_myDetails_third">
          <span
            id="chat_container_myDetails_third_icon"
            class="material-symbols-outlined"
          >
            cloud
          </span>
        </div>
        <div id="chat_container_myDetails_betweenFirst"></div>
        <div id="chat_container_myDetails_fourth">
          <span
            id="chat_container_myDetails_fourth_icon"
            class="material-symbols-outlined"
          >
            calendar_month
          </span>
        </div>
        <div id="chat_container_myDetails_fifth">
          <span
            id="chat_container_myDetails_fifth_icon"
            class="material-symbols-outlined"
          >
            settings
          </span>
        </div>
        <div id="chat_container_myDetails_betweenSecond"></div>

        <div id="chat_container_myDetails_sixth" ref={myAccountIcon}>
          <span
            id="chat_container_myDetails_sixth_icon"
            class="material-symbols-outlined"
          >
            person
          </span>
        </div>
      </div>

      <div id="chat_container_main" ref={chatContainerMain}>
        <div id="chat_container_heading" ref={chatContainerHeading}>
          {secondUser == null || secondUserUp == null
            ? "Select User to initiate the chat"
            : secondUser.name}
        </div>
        <div id="chat_container_main_myAccount" ref={myAccountDetail}>
          <div id="chat_container_main_myAccount_name">{loggedUser.name}</div>
          <div id="chat_container_main_myAccount_newGroup">New Group</div>
          <div id="chat_container_main_myAccount_contacts">Contacts</div>
          <div id="chat_container_main_myAccount_calls">Calls</div>
          <div id="chat_container_main_myAccount_savedMessage">
            Saved Message
          </div>
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
        <div
          id="chat_container_main_contactDetail"
          ref={chatContainerMainContactDetail}
        >
          <div
            id="chat_container_main_contactDetail_back"
            ref={chatContainerMainContactDetailBack}
          >
            <span
              id="chat_container_main_contactDetail_backIcon"
              class="material-symbols-outlined"
            >
              arrow_back
            </span>
            <div id="chat_container_main_contactDetail_back_data">Back</div>
          </div>
          <div id="chat_container_main_contactDetail_profilePhoto">
            <img
              id="chat_container_main_contactDetail_profilePhoto_photo"
              src="/Images/userDummy.png"
              height="128px"
              width="128px"
            />
          </div>
          <div id="chat_container_main_contactDetail_name">
            {secondUser ? secondUser.name : "Select User"}
          </div>
          <div id="chat_container_main_contactDetail_about">
            <div id="chat_container_main_contactDetail_about_first">About</div>
            <div id="chat_container_main_contactDetail_about_second">Happy</div>
          </div>
          <div id="chat_container_main_contactDetail_desc">
            <div id="chat_container_main_contactDetail_desc_first">
              Description
            </div>
            <div id="chat_container_main_contactDetail_desc_second">
              We have two lives , and the second begins when we realize we only
              have one
            </div>
          </div>
          <div id="chat_container_main_contactDetail_block">
            Block {secondUser ? secondUser.name : "Select User"}
          </div>
          <div id="chat_container_main_contactDetail_report">
            Report {secondUser ? secondUser.name : "Select User"}
          </div>
          <div id="chat_container_main_contactDetail_deleteChat">
            Delete Chat
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
