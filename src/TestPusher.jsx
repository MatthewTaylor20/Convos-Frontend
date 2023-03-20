import Pusher from "pusher-js";
import { useState } from "react";

export function TestPusher() {
  const [newMessage, setNewMessage] = useState("");
  const pusher = new Pusher("43491bb7323d0c9bbcbf", {
    cluster: "us3",
  });
  const channel = pusher.subscribe("channel_4.convos");
  channel.bind("new-message", (data) => {
    console.log(data.body);
    setNewMessage(data.body);
  });

  return (
    <div>
      <p>{newMessage}</p>
    </div>
  );
}
