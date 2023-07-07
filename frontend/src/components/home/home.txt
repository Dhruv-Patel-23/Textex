import React, { useEffect } from "react";
import homecss from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";

const Homepage = () => {
  const {setUser}=ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      // Redirect to the "/chats" page if user info is not available
      navigate("/login");
    }
  }, [navigate]);

  const handleLogin = () => {
    // Perform logout actions here
    // localStorage.removeItem("userInfo");
    setUser({});
  };

  return (
    <div>

      <button onClick={handleLogin}>LOGIN</button>
    </div>
  );
};

export default Homepage;
