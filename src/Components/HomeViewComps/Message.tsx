import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = (message: any) => {
  const [user] = useAuthState(auth);
  console.log(message.avatar);
  if (user != null) {
    return (
      <div
        className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
        <img
          className="chat-bubble__left"
          src={message.avatar}
          alt="user avatar"
        />
        <div className="chat-bubble__right">
          <p className="user-name">{message.name}</p>
          <p className="user-message">{message.text}</p>
        </div>
      </div>
    );
  }
  else {
    console.log("user is null");
    return null;
  }
};

export default Message;