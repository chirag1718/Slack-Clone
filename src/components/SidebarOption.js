import React from "react";
import styled from "styled-components";
// local import froma firebase config
import { db } from "../firebase";
// firebase/firestore
import { collection, addDoc } from "firebase/firestore";
// Redux imports
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

// Refer to Firebse V9 docs for errors
const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();
  const addChannel = () => {
    const channelName = prompt("Please enter the Channel Name");

    if (channelName) {
      addDoc(collection(db, "rooms"), {
        name: channelName,
      });
      // Here db.collection("rooms").add({name: channelName}) will not work because of the newer version, You've to import collection & addDoc from firebase/firestore
      // And always use collection(db, "rooms")
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
  > .MuiSvgIcon-root {
    padding: 0px 10px;
  }
`;
