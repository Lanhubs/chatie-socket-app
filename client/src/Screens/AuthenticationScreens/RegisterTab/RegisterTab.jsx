import React, { useEffect, useState } from "react";
import Input, { fileUploaderHook } from "./";
import { Box, Button, Text, createStandaloneToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
const RegisterTab = () => {
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [statusMsg, setStatusMsg] = React.useState();
  const { profilePic, FileUpload } = fileUploaderHook({
    placeholder: "chose profile picture",
  });
  const { toast, ToastContainer } = createStandaloneToast();
  const navigate = useNavigate();

  const signUpHandler = () => {
    if (
      nickname === "" ||
      password === "" ||
      lastName === "" ||
      email === "" ||
      firstName === "" ||
      profilePic === ""
    ) {
      toast({
        description: "input fields cannot be empty",
        size: "md",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const formData = {
      firstName,
      password,
      email,
      lastName,
      nickname,
      profilePic,
    };

    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 2000) {
          console.log(data);
          setStatusMsg({
            status: false,
            msg: "successful redirecting...",
          });
          /*  toast({
            description: "successful redirecting...",
            duration: 3000,
            position: "top",
            isClosable: true,
            size: "md",
            status: "success",
          }); */
          var details = JSON.stringify(data);
          var expirydate = new Date();
          expirydate = expirydate.getDate() + 3;
          cookie.save("Chatie", data.token, {
            expires: new Date(Date.now() * 60 * 60 * 1000),
            sameSite: "strict",
            secure: true,
          });
          navigate("/");
        }
        if (data.status === 4000) {
          /* toast({
            description: data.error,
            duration: 3000,
            isClosable: true,
            position: "top",
            size: "md",
            status: "error",
          }); */
          setStatusMsg({
            status: true,
            msg: data.error,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Box w="full" display="flex" flexDir="column" gap="1rem" py="3rem">
      {/* <ToastContainer /> */}
      {statusMsg && (
        <Text
          color="white"
          frontSize={18}
          fontWeight="600"
          p="10px"
          w="full"
          rounded="md"
          shadow="lg"
          bg={statusMsg.status ? "red.500" : "green.500"}
        >
          {statusMsg.msg}
        </Text>
      )}
      <Input
        placeholder="first name:"
        label="first name:"
        handleChange={setFirstName}
        name="firstName"
        type="text"
      />

      <Input
        handleChange={setLastName}
        placeholder="walker"
        type="text"
        name="lastName"
        label="last name:"
      />

      <Input
        handleChange={setNickname}
        placeholder="walker"
        type="text"
        name="nickname"
        label="nickname:"
      />
      <Input
        type="email"
        label="email:"
        name="email"
        placeholder="jonDoe@g.co"
        handleChange={setEmail}
      />

      <FileUpload />
      <Input
        placeholder="password"
        name="password"
        type="password"
        handleChange={setPassword}
      />
      <Button bg="blue.300" h="3rem" onClick={signUpHandler}>
        Sign up
      </Button>
    </Box>
  );
};

export default RegisterTab;
