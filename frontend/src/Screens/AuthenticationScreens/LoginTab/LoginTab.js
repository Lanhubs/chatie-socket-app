import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { createStandaloneToast, Spinner} from "@chakra-ui/react";
const LoginTab = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requesting, setRequesting] = useState(false)
  const { toast, ToastContainer } = createStandaloneToast();
  useEffect(()=>{

  },[email, password, requesting])
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
    // setRequesting(true)
    fetch("http://localhost:4040/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e))
    // setRequesting(false)
  };
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
      <Button bg="green.400" p="1em" onClick={loginHandler}>
        {requesting?<Spinner/>: "Log In"}
        
      </Button>
    </Box>
  );
};

export default LoginTab;
