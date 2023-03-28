import AddContact from "../assets/images/add-contact.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Contacts(props) {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  useEffect(handleIndexContacts, [props.newContact]);
  return (
    <div className="container-custom">
      <div className="chat">
        <div className="chatInfo">
          <input
            type="text"
            placeholder="search contacts"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <div className="chatIcons">
            <img src={AddContact} alt="" onClick={props.onShowNewContact} />
          </div>
        </div>
        <div className="fullContactList">
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
      </div>
    </div>
  );
}
