import React, { useState } from "react";
import Input from "./Input";
import { Box, Button, createStandaloneToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const RegisterTab = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { toast, ToastContainer } = createStandaloneToast();
  const navigate = useNavigate();

  const signUpHandler = () => {
    
    if (
      userName === "" ||
      password === "" ||
      lastName === "" ||
      email === "" ||
      firstName === ""
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
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("profilePic", profilePic);
   

    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
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
        if (data.status === 2000) {
          toast({
            description: "successful redirecting...",
            duration: 3000,
            position: "top",
            isClosable: true,
            size: "md",
            status: "success",
          });

          localStorage.setItem("chatie", JSON.stringify(data.details));
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
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
        handleChange={setUserName}
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

      <Input
        placeholder=""
        type="file"
        label="profile pic"
        name="profilePic"
        handleChange={setProfilePic}
      />
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
