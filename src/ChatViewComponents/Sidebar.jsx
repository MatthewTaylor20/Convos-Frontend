import { Chats } from "./Chats";
import { Navbar } from "./Navbar";
import { Search } from "./Search";

export function Sidebar(props) {
  // console.log(props.groups);
  return (
    <div className="sidebar">
      <Navbar currentUser={props.currentUser}/>
      <Search />
      <div className="chatList">
        <Chats groups={props.groups} onSelectGroup={props.onSelectGroup}/>
      </div>
    </div>
  );
}
