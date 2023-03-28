import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function NewContact(props) {
  const navigate = useNavigate();
  const currentUserID = localStorage.getItem("user_id");
  const [errors, setErrors] = useState([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [contact, setContact] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    axios
      .get(`http://localhost:3000/contacts/find.json?search=${event.target[0].value}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          setErrors([response.data.error]);
        } else {
          setContact(response.data);
          setIsConfirmationVisible(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };
  const handleConfirmation = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3000/contacts.json`, { user_id: contact.id, owner_id: currentUserID })
      .then((response) => {
        console.log(response.data);
        props.onNewContact(contact);
        props.onClose();
      });
  };
  if (isConfirmationVisible) {
    return (
      <div className="formContainer-custom">
        <div className="formWrapper">
          <span className="title">New Contact</span>
          <form onSubmit={handleConfirmation}>
            <p>{`Would you like to add ${contact.name} to your contacts list?`}</p>
            <button type="submit">Confirm</button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="formContainer-custom">
        <div className="formWrapper">
          <span className="title">New Contact</span>
          <span className="title">Search by email or phone number</span>

          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="search" name="search" />
            <button type="submit">Find User</button>
          </form>
        </div>
      </div>
    );
  }
}
