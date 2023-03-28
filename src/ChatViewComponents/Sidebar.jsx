import { Chats } from "./Chats";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { useState } from "react";

export function Sidebar(props) {
  // console.log(props.groups);
  const [text, setText] = useState("");
  const handleSearch = (text) => {
    setText(text);
  };
  return (
    <div className="sidebar">
      <Navbar currentUser={props.currentUser} />
      <Search onSearch={handleSearch} />
      <div className="chatList">
        <Chats
          groups={props.groups}
          onSelectGroup={props.onSelectGroup}
          searchText={text}
          onDeleteGroup={props.onDeleteGroup}
          currentGroup={props.currentGroup}
        />
      </div>
    </div>
  );
}
