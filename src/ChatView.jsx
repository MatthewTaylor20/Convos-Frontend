import { Sidebar } from "./ChatViewComponents/Sidebar";
import { Chat } from "./ChatViewComponents/Chat";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePusher } from "./PusherContext";
import { NewMessage } from "./ChatViewComponents/NewMessage";
import { Modal } from "./Modal";
import { Contacts } from "./ChatViewComponents/Contacts";
import { NewContact } from "./ChatViewComponents/NewContact";

export function ChatView() {
  const pusher = usePusher();
  const currentUserID = localStorage.getItem("user_id");
  const mainChannel = pusher.subscribe(`channel_user${currentUserID}.convos`);

  const navigate = useNavigate();

  const [channel, setChannel] = useState(pusher.subscribe(""));
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const [isNewMessageVisible, setIsNewMessageVisible] = useState(false);
  const [isContactsVisible, setIsContactsVisible] = useState(false);
  const [isNewContactVisible, setIsNewContactVisible] = useState(false);
  const [newContact, setNewContact] = useState([]);

  // const [currentPusherSubscription, setCurrentPusherSubscription] = useState(null);

  const handleIndexGroups = () => {
    axios
      .get("http://localhost:3000/groups.json")
      .then((response) => {
        // console.log(response.status);
        let groups = response.data.map((group) => {
          let otherUsers = group.users;
          otherUsers.splice(
            group.users.findIndex((i) => {
              return i.id === parseInt(currentUserID);
            }),
            1
          );
          if (otherUsers.length === 1) {
            group.image_url = otherUsers[0].image_url;
          }
          if (group.title === null) {
            let name = "";
            otherUsers.forEach((user) => {
              name = name + user.first_name + " " + user.last_name + ", ";
            });
            name = name.substring(0, name.length - 2);
            group.title = name;
          }
          return group;
        });
        setGroups(groups);
        setChannel(pusher.subscribe(`channel_${currentGroup.id}.convos`));
        // console.log(currentGroup);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };
  const handleDeleteGroup = (group) => {
    setGroups(groups.filter((g) => g.id !== group.id));
    setCurrentGroup({});
  };
  const handleNewMessage = (data) => {
    if (
      groups.some((group) => {
        group.id === data.group_id;
      })
    ) {
      setGroups(
        groups.map((group) => {
          if (data.group_id === group.id) {
            group.message.id = data.id;
            group.message.user_id = data.user_id;
            group.message.group_id = data.group_id;
            group.message.body = data.body;
            group.message.created_at = data.created_at;
          }
          return group;
        })
      );
    } else {
      handleIndexGroups();
    }
    // console.log(groups);
  };

  mainChannel.bind("new-message", handleNewMessage);

  const handleSelectGroup = (group) => {
    pusher.unsubscribe(`channel_${currentGroup.id}.convos`);
    setChannel(pusher.subscribe(`channel_${group.id}.convos`));
    setCurrentGroup(group);
  };
  const handleShowNewMessage = () => {
    setIsNewMessageVisible(true);
  };
  const handleCloseNewMessage = () => {
    setIsNewMessageVisible(false);
  };
  const handleShowContacts = () => {
    setIsContactsVisible(true);
  };
  const handleCloseContacts = () => {
    setNewContact({});
    setIsContactsVisible(false);
  };
  const handleShowNewContact = () => {
    setIsNewContactVisible(true);
  };
  const handleCloseNewContact = () => {
    setIsNewContactVisible(false);
  };

  useEffect(handleIndexGroups, []);
  return (
    <div className="home">
      <Modal show={isNewMessageVisible} onClose={handleCloseNewMessage}>
        <NewMessage onClose={handleCloseNewMessage} onSelectGroup={handleSelectGroup} />
      </Modal>
      <Modal show={isContactsVisible} onClose={handleCloseContacts}>
        <Contacts onShowNewContact={handleShowNewContact} newContact={newContact} />
        <Modal show={isNewContactVisible} onClose={handleCloseNewContact}>
          <NewContact onClose={handleCloseNewContact} onNewContact={setNewContact} />
        </Modal>
      </Modal>
      <div className="container-custom">
        <Sidebar
          groups={groups}
          onSelectGroup={handleSelectGroup}
          onDeleteGroup={handleDeleteGroup}
          currentGroup={currentGroup}
        />
        <Chat
          group={currentGroup}
          currentUserID={currentUserID}
          channel={channel}
          onShowNewMessage={handleShowNewMessage}
          onShowNewContact={handleShowContacts}
        />
      </div>
    </div>
  );
}
