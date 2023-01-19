import React, { useEffect, useRef } from "react";
import styled from "styled-components";
// Icons
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// React redux
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
// Firebase react hooks
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
// Local imports
import ChatInput from "./ChatInput";
import Message from "./Message";
// Firebase
import { doc, collection, orderBy, query } from "firebase/firestore";
// local imports
import { db } from "../firebase";

const Chat = () => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    //db.collectio("rooms").doc(roomId) instead of this use the below 👇🏻 code statement
    roomId && doc(db, "rooms", roomId)
  );

  const [roomMessages, loading] = useCollection(
    // Here orderBy() might create an error
    roomId &&
      query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      )
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
        {/* Header */}
        <Header>
          {/* Header left */}
          <HeaderLeft>
            <h4>
              <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </HeaderLeft>
          {/* Header Right */}
          <HeaderRight>
            <p>
              <InfoOutlinedIcon /> Details
            </p>
          </HeaderRight>
        </Header>
        {/* Messaging */}
        <ChatMessages>
          {roomMessages?.docs.map((doc) => {
            const { messages, timestamp, user, userImage } = doc.data();
            // console.log(messages)
            return (
              <Message
                key={doc.id}
                message={messages}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          })}
          <ChatBottom ref={chatRef} />
        </ChatMessages>
        {/* Chat input  */}
        <ChatInput
          channelName={roomDetails?.data().name}
          channelId={roomId}
          chatRef={chatRef}
        ></ChatInput>
      </>
      )}
      
    </ChatContainer>
  );
};

export default Chat;
// Chat container
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

// Chat Header
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

// Chat Header Left & Right

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    /* margin-right: 10px; */
  }

  > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 20px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

// Chat messages
const ChatMessages = styled.div`
  overflow-y: scroll;
  height: 510px;
  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-progress-bar{
    background-color: black;
  }
`;

// Chat bottom
const ChatBottom = styled.div`
  padding-bottom: 100px;
`;

//
