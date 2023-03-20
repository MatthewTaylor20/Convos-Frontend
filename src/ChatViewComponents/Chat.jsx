import Plus from "../assets/images/plus-circle.png";
import More from "../assets/images/more.png";
import { Messages } from "./Messages";
import { Input } from "./Input";

export function Chat() {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <img src={Plus} alt="" />
          <img src={More} alt="" className="ellipsis" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
