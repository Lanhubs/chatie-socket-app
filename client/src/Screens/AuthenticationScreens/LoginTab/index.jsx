import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  createStandaloneToast,
  Spinner,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginTab = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requesting, setRequesting] = useState(false);
  const { toast, ToastContainer } = createStandaloneToast();
  const navigate = useNavigate();
  const loginHandler = () => {
    if (email === "" || password === "") {
      toast({
        description: "input fields cannot be empty",
        size: "md",
        status: "error",
        duration: 2000,
      });
    }
    const data = { email, password };
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 2000) {
          setRequesting(true);
          toast({
            description: "successful redirecting...",
            duration: 3000,
            position: "top",
            isClosable: true,
            size: "md",
            status: "success",
          });
          var details = JSON.stringify(data);
          var expirydate = new Date();
          expirydate = expirydate.getDate() + 3;
          Cookies.set("Chatie", details, {
            expires: 7,
            sameSite: "strict",
            secure: true,
            domain: "http://localhost:5173",
            path: "/"
          });
          // navigate("/");
        }
        if (data.status === 4000) {
          toast({
            description: data.error,
            duration: 3000,
            position: "top",
            isClosable: true,
            size: "md",
            status: "error",
          });
        }
      })
      .catch((e) => console.log(e));
    setRequesting(false);
  };
  React.useEffect(() => {
    Cookies.remove("Chatie");
  }, []);
  return (
    <Box w="full" display="flex" flexDir="column" py="3rem" gap="2rem">
      <ToastContainer />
      <FormControl>
        <FormLabel textTransform="capitalize">email</FormLabel>
        <Input
          placeholder="alanwalker@gmail.com"
          outlineColor={0}
          type="email"
          outlineOffset={0}
          border="1.5px solid rgba(0, 0, 255, 0.5)"
          p="10px"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel textTransform="capitalize">password</FormLabel>
        <Input
          placeholder="*******"
          type="password"
          outlineColor={0}
          onChange={(e) => setPassword(e.target.value)}
          outlineOffset={0}
          border="1.5px solid rgba(0, 0, 255, 0.5)"
          p="10px"
        />
      </FormControl>
      <Button bg="green.400" p="1em" onClick={() => loginHandler()}>
        {requesting ? <Spinner /> : "Log In"}
      </Button>
    </Box>
  );
};

export default LoginTab;
