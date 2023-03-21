import Plus from "../assets/images/plus-circle.png";
import More from "../assets/images/more.png";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import axios from "axios";

export function Chat(props) {
  const [messages, setMessages] = useState([]);
  const handleIndexMessages = () => {
    // console.log(`handleIndexMessages: ${props.group.id}`);
    if (props.group.id) {
      axios.get(`http://localhost:3000/messages.json?group_id=${props.group.id}`).then((response) => {
        // console.log(response.data);
        setMessages(response.data);
      });
    }
  };

  useEffect(handleIndexMessages, [props.group]);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{props.group.title}</span>
        <div className="chatIcons">
          <img src={Plus} alt="" />
          <img src={More} alt="" className="ellipsis" />
        </div>
      </div>
      <Messages messages={messages} currentUser={props.currentUser} />
      <Input />
    </div>
  );
}
