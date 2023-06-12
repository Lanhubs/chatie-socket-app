import React, { useEffect, useState } from "react";
import Input, { fileUploaderHook } from "./";
import { Box, Button, createStandaloneToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const RegisterTab = () => {
  const [username, setusername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { profilePic, FileUpload } = fileUploaderHook({
    placeholder: "chose profile picture",
  });
  const { toast, ToastContainer } = createStandaloneToast();
  const navigate = useNavigate();

  const signUpHandler = () => {
    if (
      username === "" ||
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
      username,
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

          navigate("/");
        }
        if (data.status === 4000) {
          toast({
            description: data.error,
            duration: 3000,
            isClosable: true,
            position: "top",
            size: "md",
            status: "error",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Box w="full" display="flex" flexDir="column" gap="1rem" py="3rem">
      <ToastContainer />
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
        handleChange={setusername}
        placeholder="walker"
        type="text"
        name="username"
        label="username:"
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
