import Img from "../assets/images/photo-circle.png";
import Attach from "../assets/images/paperclip.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Input(props) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = () => {
    if (text === "") {
      console.log("message is empty and therefore will not send.");
    } else if (img) {
      console.log("message contains a file");
    } else {
      const params = { body: text, group_id: props.group.id };
      axios
        .post("http://localhost:3000/messages.json", params)
        .then((response) => {
          setText("");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate("/login");
          }
        });
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
