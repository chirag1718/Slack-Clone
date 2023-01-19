import React from "react";
// Styled Component
import styled from "styled-components";
// MUI
// import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
//Local imports
import { auth, provider } from "../firebase";
// firebase imports
import { signInWithPopup, } from "firebase/auth";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt="Slack logo"
        />
        <h1>Sign In to the Uchiha HQ</h1>
        <p>uchiha.slack.com</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

// Login Container
const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

// Inner Login Container
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1);
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48;
    color: white;
  }

  > button:hover {
    color: #0a8d48;
  }
`;
