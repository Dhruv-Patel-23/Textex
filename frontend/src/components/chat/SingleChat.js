import React, { useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  FormControl,
  IconButton,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { getSender, getSenderFull } from "./ChatLogics";
import ProfileModal from "./extras/ProfileModal";
import UpdateGroupChatModal from "./extras/UpdateGroupChatModal";
import { useState } from "react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const API_URL = "https://textex-server.onrender.com";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const toast = useToast();
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${API_URL}/api/message`,
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        // console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Messages",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${API_URL}/api/message/${selectedChat._id}`,

        config
      );
      // console.log(messages);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    socket = io(API_URL);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
    <Box display="flex" flexDirection="column" w="100%" h="100%" p={3}>
      {selectedChat ? (
        <Box display="flex" flexDirection="column" h="100%" w="100%" p={3}>
          <Flex flexDirection="row" justifyContent="space-between">
            {/* <Text
            bg="blue"
              pb={3}
              fontSize="xxx-large"
              px={2}
              w="100%"
              h="100%"
              fontFamily="Work sans"
              display="flex"
              justifyContent={{ base: "center" }}
              alignItems="center"
            > */}
            <IconButton
              position="absolute"
              left="4"
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <Box
                w="100%"
                h="100%"
                display="flex"
                justifyContent="space-between"
                // justifyContent="center"
              >
                <Text
                  fontWeight="bold"
                  fontSize="xx-large"
                  _firstLetter={{ textTransform: "uppercase" }}
                  color="black"
                  fontStyle="italic"
                >
                  {getSender(user, selectedChat.users)}
                </Text>

                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </Box>
            ) : (
              <Box
                w="100%"
                h="100%"
                display="flex"
                justifyContent="space-between"
                // justifyContent="center"
              >
                <Text
                  fontWeight="bold"
                  fontSize="xx-large"
                  _firstLetter={{ textTransform: "uppercase" }}
                  color="black"
                  fontStyle="italic"
                >
                  {selectedChat.chatName}
                </Text>

                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </Box>
            )}
            {/* </Text> */}
          </Flex>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            minHeight="300px" // Adjust the minHeight as needed
            borderRadius="lg"
            overflowY="auto" // Use auto to enable vertical scrolling when the content overflows
            // style={{
            //   // backgroundImage:
            //   //   "url('https://th.bing.com/th/id/OIP.-fBTq-BGBqcOJISrDYj4RAHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7')",
            //   // backgroundSize: "cover",
            //   // backgroundRepeat: "no-repeat",
            //   // backgroundPosition: "center",
            //   backgroundColor:"aqua"
            // }}
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div
                className="messages"
                style={{ height: "100vh", overflow: "auto" }}
              >
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {/* {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )} */}
              {istyping ? <div>typing...</div> : <></>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
            {/* Messages here */}
          </Box>
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Text
              fontWeight="bold"
              fontSize="xx-large"
              _firstLetter={{ textTransform: "uppercase" }}
              color="white"
              fontStyle="italic"
            >
              Welcome to Textex. Start chatting
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleChat;
