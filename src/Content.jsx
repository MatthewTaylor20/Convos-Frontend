import { ChatView } from "./ChatView";
import { UpdateUser } from "./UpdateUser";
import { Register } from "./Register";
import { Login } from "./Login";
import { Routes, Route } from "react-router-dom";

export function Content() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/chats" element={<ChatView />} />
        <Route path="/" element={<ChatView />} />
        <Route path="/users/edit" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}
