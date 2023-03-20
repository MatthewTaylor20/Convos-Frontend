import { TestPusher } from "./TestPusher";
import { ChatView } from "./ChatView";
import { Register } from "./Register";
import { Login } from "./Login";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function Content() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/chats" element={<ChatView />} />
        <Route path="/" element={<ChatView />} />
      </Routes>
      {/* <ChatView /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <TestPusher /> */}
    </div>
  );
}
