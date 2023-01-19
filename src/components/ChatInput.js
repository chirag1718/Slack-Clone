import React, { useState } from "react";
// MUI Button
import { Button } from "@mui/material";
// Styled Components
import styled from "styled-components";
// local import froma firebase config
import { auth, db } from "../firebase";
// firebase
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// Firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [user] = useAuthState(auth);
  // channel={roomId} in Chat.js
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    // console.log(channelId);
    e.preventDefault(); // Prevent default
    if (!channelId) {
      return false;
    }
    // Refer to firebase web version 9 firebase docs
    // most of the time use both addDoc and collection
    addDoc(collection(db, "rooms", channelId, "messages"), {
      messages: input,
      // timestamp: serverTimestamp(),
      timestamp: serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });
    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });
    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

//  Chat contianer
const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
