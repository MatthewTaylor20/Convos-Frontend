import AddMessage from "../assets/images/plus-message.png";
import AddContact from "../assets/images/add-contact.png";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Chat(props) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const messageEventHandler = (data) => {
    console.log("we got here");
    const newMessage = {};
    newMessage.body = data.body;
    newMessage.id = data.id;
    newMessage.user_id = data.user_id;
    newMessage.user_image = data.sender_image;
    newMessage.group_id = data.group_id;
    newMessage.created_at = data.created_at;

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  };

  props.channel.bind("new-message", messageEventHandler);

  const handleIndexMessages = () => {
    if (props.group.id) {
      axios
        .get(`http://localhost:3000/messages.json?group_id=${props.group.id}`)
        .then((response) => {
          console.log(response.data);
          setMessages(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate("/login");
          }
        });
    } else {
      setMessages([]);
    }
  };

  useEffect(handleIndexMessages, [props.group]);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{props.group.title}</span>
        <div className="chatIcons">
          <img src={AddMessage} alt="" onClick={props.onShowNewMessage} />
          <img src={AddContact} alt="" onClick={props.onShowNewContact} />
        </div>
      </div>
      <Messages messages={messages} currentUserID={props.currentUserID} />
      <Input group={props.group} />
    </div>
  );
}
