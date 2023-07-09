import  "./App.css";
import Login from "./components/login/login";
import Homepage from "./components/home/home";
// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ChatState } from "./context/ChatProvider";
import Chatpage from "./components/chat/ChatPage";
import { Box } from "@chakra-ui/layout";
import { Navigate } from "react-router-dom";
function App() {
   const { user } = ChatState();

  return (
    <Box display="flex" w="100%" h="100%">
      <Routes>
      <Route  exact path="/" element={<Homepage />} />

      <Route
          path="/chats"
          element={user ? <Chatpage /> : <Navigate to="/login" />}
        />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}

export default App;
