import { Box } from "@chakra-ui/layout";
//  import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../../context/ChatProvider";
import "./temp.css"
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    // <div>
    //   Chatbox
    // </div>
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={3}
      className="chatboxBack"
      // bgGradient='linear(to-l, #F4F0E0, #F4F0E0)'
      w={{ base: "100%", md: "68%" }}
      borderRadius="md"
      borderWidth="1px"
      // bgImage="https://wallpapersafari.com/image/purple-textured-wallpaper.jpg"
      // bgImage="url('/images/bcg.png')"
      // bgPosition="center"
      // bgRepeat="no-repeat"
      // bgImage="url('https://pin.it/4Up1riJ')"
      // bgPosition='center'
      // bgRepeat='no-repeat'
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
