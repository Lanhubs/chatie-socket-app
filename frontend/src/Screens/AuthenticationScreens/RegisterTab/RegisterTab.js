import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  cookieStorageManager,
  createStandaloneToast,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
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
  useEffect(() => {
    
  }, [firstName, lastName, profilePic, email, password, userName]);
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
    const data = new FormData();
    data.append("userName", userName);
    data.append("password", password);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("firstName", firstName);
    data.append("profilePic", profilePic);

    fetch("http://localhost:4040/api/signup", {
      method: "POST",
      body: data,
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
      <FormControl>
        <FormLabel textTransform="capitalize">First name</FormLabel>
        <Input
          placeholder="Alan"
          outlineColor={0}
          outlineOffset={0}
          onChange={(e) => setFirstName(e.target.value)}
          border="1.5px solid rgba(0, 0, 255, 0.5)"
          p="10px"
        />
      </FormControl>
      <FormControl>
        <FormLabel textTransform="capitalize">last name</FormLabel>
        <Input
          onChange={(e) => setLastName(e.target.value)}
          placeholder="walker"
          type="text"
          outlineColor={0}
          outlineOffset={0}
          border="1.5px solid rgba(0, 0, 255, 0.5)"
          p="10px"
        />
      </FormControl>
      <FormControl>
        <FormLabel textTransform="capitalize">Username</FormLabel>
        <Input
          placeholder="Alanwalk"
          outlineColor={0}
          outlineOffset={0}
          onChange={(e) => setUserName(e.target.value)}
          border="1.5px solid rgba(0, 0, 255, 0.5)"
          p="10px"
        />
      </FormControl>
      <FormControl>
        <FormLabel textTransform="capitalize">email</FormLabel>
        <Input
          placeholder="alanwalker@gmail.com"
          outlineColor={0}
          outlineOffset={0}
          border="1.5px solid rgba(0, 0, 255, 0.5)"
          p="10px"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel textTransform="capitalize">profile pic</FormLabel>
        <Input
          placeholder=""
          type="file"
          accept="image/*"
          outlineColor={0}
          outlineOffset={0}
          name="profilePic"
          onChange={(e) => setProfilePic(e.target.files[0])}
          border="1.5px solid rgba(0, 0, 255, 0.5)"
          height="40px"
        />
      </FormControl>
      <FormControl>
        <FormLabel textTransform="capitalize">password</FormLabel>
        <Input
          placeholder="*******"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          outlineColor={0}
          outlineOffset={0}
          border="1.5px solid rgba(0, 0, 255, 0.5)"
          p="10px"
        />
      </FormControl>
      <Button bg="blue.300" h="3rem" onClick={signUpHandler}>
        Sign up
      </Button>
    </Box>
  );
};

export default RegisterTab;
