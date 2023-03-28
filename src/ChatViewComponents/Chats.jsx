import { useEffect } from "react";
import { useState } from "react";
import { RightClickMenu } from "../RightClickMenu";

export function Chats(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [groupForDeletion, setGroupForDeletion] = useState({});

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });
  return (
    <div className="chats">
      {props.groups
        .filter((group) => group.title.toLowerCase().includes(props.searchText.toLowerCase()))
        .sort((a, b) => {
          return new Date(b.message.created_at) - new Date(a.message.created_at);
        })
        .map((group) => {
          const backgroundColor = group.id === props.currentGroup.id ? "rgba(10, 10, 8, 0.2)" : "none";
          let groupChat = (
            <div
              className="userChat"
              key={group.id}
              onClick={() => props.onSelectGroup(group)}
              onContextMenu={(event) => {
                event.preventDefault();
                setShowMenu(true);
                setX(event.pageX);
                setY(event.pageY);
                setGroupForDeletion(group);
                console.log(`right click on ${group.id} `);
              }}
            >
              {showMenu && (
                <RightClickMenu
                  x={x}
                  y={y}
                  showMenu={showMenu}
                  group={groupForDeletion}
                  onDeleteGroup={props.onDeleteGroup}
                />
              )}
              <img src={group.image_url} />
              <div className="userChatInfo">
                <span>{group.title}</span>
                <p>{group.message.body.slice(0, 15)}</p>
              </div>
            </div>
          );
          if (group.id === props.currentGroup.id) {
            groupChat = (
              <div
                className="userChat"
                style={{ backgroundColor: "rgba(10, 10, 8, 0.2)" }}
                key={group.id}
                onClick={() => props.onSelectGroup(group)}
                onContextMenu={(event) => {
                  event.preventDefault();
                  setShowMenu(true);
                  setX(event.pageX);
                  setY(event.pageY);
                  setGroupForDeletion(group);
                  console.log(`right click on ${group.id} `);
                }}
              >
                {showMenu && (
                  <RightClickMenu
                    x={x}
                    y={y}
                    showMenu={showMenu}
                    group={groupForDeletion}
                    onDeleteGroup={props.onDeleteGroup}
                  />
                )}
                <img src={group.image_url} />
                <div className="userChatInfo">
                  <span>{group.title}</span>
                  <p>{group.message.body.slice(0, 15)}</p>
                </div>
              </div>
            );
          }
          return groupChat;
        })}
    </div>
  );
}
