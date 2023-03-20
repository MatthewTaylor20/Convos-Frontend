import { Message } from "./Message";

export function Messages(props) {
  return (
    <div className="messages">
      {props.messages.map((message) => {
        if (message.current_user_id === message.user_id) {
          return (
            <div key={message.id}>
              <Message user="owner" userImage={message.user_image} timestamp={message.created_at} body={message.body} />
            </div>
          );
        } else {
          return (
            <div key={message.id}>
              <Message user="" userImage={message.user_image} timestamp={message.created_at} body={message.body} />
            </div>
          );
        }
      })}
    </div>
  );
}
