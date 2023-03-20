import { Chats } from "./Chats";
import { Navbar } from "./Navbar";
import { Search } from "./Search";

export function Sidebar(props) {
  // console.log(props.groups);
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <div className="chatList">
        <Chats groups={props.groups} />
      </div>
    </div>
  );
}
