import { Sidebar } from "./ChatViewComponents/Sidebar";
import { Chat } from "./ChatViewComponents/Chat";
import { useState, useEffect } from "react";
import axios from "axios";

export function ChatView() {
  const [groups, setGroups] = useState([]);
  const [currentGroupID, setCurrentGroupID] = useState(null);

  const handleIndexGroups = () => {
    axios.get("http://localhost:3000/groups.json").then((response) => {
      setGroups(response.data);
      setCurrentGroupID(response.data[2].id);
      console.log(currentGroupID);
    });
  };

  useEffect(handleIndexGroups, []);
  return (
    <div className="home">
      <div className="container-custom">
        <Sidebar groups={groups} />
        <Chat groupID={currentGroupID} />
      </div>
    </div>
  );
}
