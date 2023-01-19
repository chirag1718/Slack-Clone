import React from "react";
import "./App.css";
// React router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Local imports
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
// Styled component
import styled from "styled-components";
// React firebase hooks
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase import
import { auth } from "./firebase";

function App() {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Chat />}></Route>
              </Routes>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

//  Appbody
const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
