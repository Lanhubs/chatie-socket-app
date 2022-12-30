
import "./App.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import ChatScreen from "./Screens/ChatsScreen/ChatScreen";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthScreen from "./Screens/AuthenticationScreens/AuthScreen/AuthScreen";
function App() {
  return (
    <ChakraProvider>
      <Box w="100vw" h="100vh" bg="#fff">
        
        <Router>
          <Routes>
            <Route path="/" element={<ChatScreen />} exact />
            <Route path="/authentication" element={<AuthScreen />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
