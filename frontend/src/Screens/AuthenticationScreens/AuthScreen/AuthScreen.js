import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import LoginTab from "../LoginTab/LoginTab";
import RegisterTab from "../RegisterTab/RegisterTab";

const AuthScreen = () => {
  useEffect(()=>{
    localStorage.clear()
  },[])
  return (
    <Box
      w="100vw"
      h="100vh"
      px={{base: "", md:"auto"}}
      display="flex"
      flexDir="column"
      alignItems="center"
      py={{base: "1rem", md:"3rem"}}
    >
      <Heading>Chatie </Heading>
      <Tabs
      bg="#fff"
      boxShadow="lg"
        isFitted={true}
        draggable={true}
        width={{ base: "90%", md: "50%", lg: "35%" }}
        m="auto"
        my="3rem"
      >
        <TabList>
          <Tab>Sign In</Tab>
          <Tab>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginTab />
          </TabPanel>
          <TabPanel>
            <RegisterTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AuthScreen;
