import { useEffect, useState } from "react";
import Img from "../assets/images/photo-circle.png";
import Attach from "../assets/images/paperclip.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function NewMessage(props) {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleIndexContacts = () => {
    axios
      .get("http://localhost:3000/contacts.json")
      .then((response) => {
        console.log(response.data);
        setContacts(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleSend = () => {
    if (text === "") {
      console.log("message is empty and therefore will not send.");
    } else if (img) {
      console.log("message contains a file");
    } else {
      let recipientsString = "";
      recipients.forEach((recipient) => {
        recipientsString = recipientsString + `${recipient.id},`;
      });
      recipientsString = recipientsString.substring(0, recipientsString.length - 1);
      const groupParams = { recipients: recipientsString };
      axios
        .post("http://localhost:3000/groups.json", groupParams)
        .then((response) => {
          console.log(response.data);
          const messageParams = { body: text, group_id: response.data.group_id };
          axios
            .post("http://localhost:3000/messages.json", messageParams)
            .then((response) => {
              console.log(response.data);
              setText("");
              props.onClose();
              props.onSelectGroup(response.data);
            })
            .catch((error) => {
              if (error.response.status === 401) {
                navigate("/login");
              }
            });
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

  useEffect(handleIndexContacts, []);
  return (
    <div className="container-custom">
      <div className="chat">
        <div className="newChatInfo">
          <span>To: </span>
          {recipients.map((recipient) => {
            return <span key={recipient.id}>{recipient.name} </span>;
          })}
          <input
            type="text"
            placeholder="search contacts"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="contactList">
          {contacts
            .filter((contact) => contact.name.toLowerCase().includes(searchText.toLowerCase()))
            .map((contact) => {
              return (
                <div
                  className="contact"
                  key={contact.id}
                  onClick={() => {
                    if (!recipients.includes(contact)) {
                      setRecipients([...recipients, contact]);
                    }
                  }}
                >
                  <span>{contact.name}</span>
                </div>
              );
            })}
        </div>
        <div className="messagesWithContacts"></div>
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
      </div>
    </div>
  );
}
