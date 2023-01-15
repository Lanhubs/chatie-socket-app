import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ChatProvider } from "./Components/ChatProvider/ChatProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ChatProvider>
);
