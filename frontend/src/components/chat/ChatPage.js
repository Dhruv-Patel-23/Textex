import { Box } from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatProvider.js";
import SideDrawer from "./extras/SideDrawer.js";
import MyChats from "./MyChats.js";
import ChatBox from "./ChatBox.js"
import { useState } from "react";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const bgclr="offwhite";
  return (
    
    <Box w="100%" h="100%" bg={bgclr} >
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}

      </Box>
    </Box >
  );
};

export default Chatpage;


