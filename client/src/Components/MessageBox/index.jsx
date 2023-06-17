import React from "react";
import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import cookie from "react-cookies";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  createStandaloneToast,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../ChatProvider/ChatProvider";
const msgInput = ({ setMessages, messages, setLoading }) => {
  const [message, setMessage] = React.useState();
  const { selectedChat } = ChatState();
  // const { toast, ToastContainer } = createStandaloneToast();
  const toast = useToast();
  const typingHanler = (e) => {
    setMessage(e.target.value);
    // typing indicator logic
  };
  const sendMsg = async () => {
    const token = cookie.load("Chatie");
    try {
      const data = await fetch("/api/message", {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          content: message,
          chatId: selectedChat._id,
        }),
      });

      console.log(data);

      if (data.status === 2000) {
        console.log(data);

        setMessage("");
        setMessages([...messages, data.message]);
      }
      toast({
        title: data.message,
        duration: 3000,
        status: "warning",
      });
    } catch (error) {
      console.log(error);
    }
  };
/*   const fetchMessages = async () => {


    const token = cookie.load("Chatie");
    setLoading(true);
    const res = await fetch(`/api/message/${selectedChat._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json()
    if (data.status === 4000) {
      toast({
        status: "error",
        duration: 3000,
        title: "Error occurred",
        description: "failed to load message",
      });
    }
    console.log(data);
    setMessages(data.messages);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchMessages();
  }, []); */

  const MessageBox = () => {
    return (
      <>
        <FormControl
          w="full"
          height="7%"
          bottom={0}
          mt="auto"
          right={0}
          shadow="lg"
          display="flex"
          alignItems="center"
         
          // isRequired
        >
            <Input
              onChange={(e) => typingHanler(e)}
              // value={message}
              placeholder="send message...."
              p="10px"
              px="1rem"
            />

            <Button fontSize={20} onClick={sendMsg}>
              {sendIcon}
            </Button>
            <Button
              bg="unset"
              outlineOffset={0}
              outlineColor="0"
              outline="none"
              fontSize={20}
              onClick={sendMsg}
            >
              {recordIcon}
            </Button>
         </FormControl>
      </>
    );
  };
  return { message, MessageBox };
};
export default msgInput;
const sendIcon = <AiOutlineSend />;
const recordIcon = <FaMicrophone />;
