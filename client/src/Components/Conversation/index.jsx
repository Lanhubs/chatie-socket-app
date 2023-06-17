import { Box, Flex, Spinner, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import msgInput from "../MessageBox";
import ChatMessage from "./ChatMessage";
import ConversationHeader from "./ConversationHeader";
import { ChatState } from "../ChatProvider/ChatProvider";
import cookie from "react-cookies";
import { isLastMessage, isSameSender } from "../Logic";
const Chats = () => {
  const { selectedChat, setSelectedChat, changeComponent, user } = ChatState();
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { message, MessageBox } = msgInput({
    setMessages,
    messages,
    setLoading,
  });
  const fetchMessages = async () => {
    const token = cookie.load("Chatie");

    setLoading(true);
    const res = await fetch(`/api/message/${selectedChat._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === 4000) {
      toast({
        status: "error",
        duration: 3000,
        title: "Error occurred",
        description: "failed to load message",
      });
    }
    if(data.status=== 2000){

      console.log(data.messages);
      setMessages(data.messages);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <Box
      display={{
        base: changeComponent === "messaging" ? "flex" : "none",
        md: "flex",
      }}
      flexDir="column"
      w={{ base: "100vw", md: "55%", lg: "65%" }}
      bg="#fff"
      h="100vh"
    >
      <ConversationHeader />
        <Box w="full" display="flex" flexDir="column" p="1rem" flex={1} >
      {loading ? (
        <>
          
            <Spinner size={"lg"} m="auto" />
          </>
          ) : (
         <>
          {messages &&
            messages?.map((m, i) => {
              return (
                <Box
                  display="flex"
                  alignItems="center"
                  flexDir={"row"}
                  key={i}
                  // w={{ base: "45%", md: "20%" }}
                  bg="green.200"
                  backgroundColor="green.200"
                  marginLeft={0}
                >
                  {isSameSender(messages, m, i, user._id) ||
                    (isLastMessage(messages, i, user._id) && (
                      <>
                        <Tooltip label={m.sender.nickname}>
                          <Avatar src={m?.sender.profilePic} />
                        </Tooltip>
                        <Flex flexDir="column">
                          <Text
                            bg={sendersColor}
                            rounded={5}
                            boxShadow="md"
                            p="10px"
                            w={{ base: "100%", md: "300px" }}
                          >
                            {m.content}
                          </Text>
                          <Text my="5px" ml={positionTime}>
                            20 mins ago
                          </Text>
                        </Flex>
                      </>
                    ))}
                </Box>
              );
            })}
          {/*  <ChatMessage
            marginLeft="auto"
            msgDir="row-reverse"
            sendersColor="#f3f3f3"
            positionTime="auto"
          /> */}
         </>

         )}
        </Box>

      <MessageBox />
    </Box>
  );
};

export default Chats;

/* return (
  <Box  display="flex"
  alignItems="center"
  flexDir={msgDir}
  w={{ base: "45%", md: "20px" }}
  marginLeft={0}>
  
  <Box/>
 */
