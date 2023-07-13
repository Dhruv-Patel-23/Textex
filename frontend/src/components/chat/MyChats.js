import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "./ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./extras/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";


const API_URL="https://textex-server.onrender.com"

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/api/chat`,
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(
    () => {
      // console.log("this is useEffect", localStorage.getItem("userInfo"));
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
      // eslint-disable-next-line
    },
    [fetchAgain]
  );

  return (
    // <div>
    //   MyChats
    // </div>
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      className="Mychat"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            variant="ghost"
            color='white'
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#E6E6FA"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => {
              console.log("this is current user", loggedUser.name);
              const chatNameOrSender = !chat.isGroupChat
                ? getSender(loggedUser, chat.users)
                : chat.chatName;

              return (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#7953A9" : "#FFFFFF"}
                  fontSize='xl'
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={5}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text fontSize='xl' as='samp'> {chatNameOrSender}</Text>
                  {/* {chat.latestMessage && <Text>{chat.latestMessage}</Text>} */}
                </Box>
              );
            })}
          </Stack>
        ) : (
          // <Stack overflowY="scroll">
          //   {chats.map((chat) => (
          //     <Box
          //       onClick={() => setSelectedChat(chat)}
          //       cursor="pointer"
          //       bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
          //       color={selectedChat === chat ? "white" : "black"}
          //       px={3}
          //       py={2}
          //       borderRadius="lg"
          //       key={chat._id}
          //     >
          //       <Text>
          //         Your chats
          //         {
          //         console.log(chat.users)
          //         if(!chat.isGroupChat){
          //            getSender(loggedUser, chat.users)

          //         }
          //         else{
          //           chat.chatName
          //         }

          //       }
          //       </Text>
          //       {/* {chat.latestMessage && (
          //         <Text fontSize="xs">
          //           <b>{chat.latestMessage.sender.name} : </b>
          //           {chat.latestMessage.content.length > 50
          //             ? chat.latestMessage.content.substring(0, 51) + "..."
          //             : chat.latestMessage.content}
          //         </Text>
          //       )} */}
          //     </Box>
          //   ))}
          // </Stack>
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
