import { Sidebar } from "./ChatViewComponents/Sidebar";
import { Chat } from "./ChatViewComponents/Chat";
import { useState, useEffect } from "react";
import axios from "axios";

export function ChatView() {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const handleIndexGroups = () => {
    axios.get("http://localhost:3000/groups.json").then((response) => {
      setGroups(response.data);
      setCurrentGroup(response.data[2]);
      // console.log(currentGroup);
    });
  };
  const currentUserInfo = () => {
    axios.get("http://localhost:3000/current_user.json").then((response) => {
      setCurrentUser(response.data);
      // console.log(response.data);
    });
  };

  useEffect(handleIndexGroups, []);
  useEffect(currentUserInfo, []);
  return (
    <div className="home">
      <div className="container-custom">
        <Sidebar groups={groups} currentUser={currentUser} onSelectGroup={setCurrentGroup} />
        <Chat group={currentGroup} currentUser={currentUser} />
      </div>
    </div>
  );
}
