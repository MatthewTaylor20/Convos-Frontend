import { Chats } from "./Chats";
import { Navbar } from "./Navbar";
import { Search } from "./Search";

export function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}
