import { Message } from "./Message";
import { useEffect, useRef } from "react";

export function Messages(props) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [props.messages]);

  // console.log(props.currentUserID);

  return (
    <div className="messages">
      {props.messages.map((message) => {
        if (parseInt(props.currentUserID) === message.user_id) {
          return (
            <div key={message.id}>
              <Message user="owner" userImage={message.user_image} timestamp={message.created_at} body={message.body} name={message.first_name}/>
            </div>
          );
        } else {
          return (
            <div key={message.id}>
              <Message user="" userImage={message.user_image} timestamp={message.created_at} body={message.body} name={message.first_name}/>
            </div>
          );
        }
      })}
      <div ref={ref}></div>
    </div>
  );
}
