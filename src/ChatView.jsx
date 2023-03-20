import { Sidebar } from "./ChatViewComponents/Sidebar";
import { Chat } from "./ChatViewComponents/Chat";

export function ChatView() {
  return (
    <div className="home">
      <div className="container-custom">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
