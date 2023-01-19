import React from "react";
// Styled Component
import styled from "styled-components";
import { Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// Firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";
// Local Imports
import { auth } from "../firebase";
// Firebase
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);
  // console.log(user);
  return (
    <HeaderContainer>
      {/* Header Left */}
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => signOut(auth)}
          src={user?.photoURL}
          alt={user?.displayName}
          title="Sign Out"
        />
        <AccessTimeIcon />
      </HeaderLeft>

      {/* Header Middle Search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search in chat" />
      </HeaderSearch>

      {/* Header Right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

// Header Container 🫙
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

// Header Left 👈🏻
const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
    cursor: pointer;
  }
  > .MuiSvgIcon-root:hover {
    opacity: 0.9;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;

// Header Search Middle 👉🏻👈🏻
const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0px 50px;
  color: gray;
  border: 1px gray solid;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: none;
    color: white;
  }
`;

// Header Right 👉🏻
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
  > .MuiSvgIcon-root {
    cursor: pointer;
  }

  > .MuiSvgIcon-root:hover {
    opacity: 0.9;
  }
`;
