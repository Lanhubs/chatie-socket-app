import "./App.css";
import React from "react"
import { Box, ChakraProvider } from "@chakra-ui/react";
import ChatScreen from "./Screens/ChatsScreen";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthScreen from "./Screens/AuthenticationScreens/AuthScreen";
import { RecoilRoot } from "recoil";
import Cookies from "js-cookie";

function App() {
  /* React.useEffect(()=>{
    Cookies.set("Chatie", "")
  }, []) */
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Box w="100vw" h="100vh" bg="#fff">
          <Router>
            <Routes>
              <Route path="/" element={<ChatScreen />} exact />

              <Route path="/authentication" element={<AuthScreen />} />
            </Routes>
          </Router>
        </Box>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
