import axios from "axios";
import Logo from "../assets/images/convos-logo-words.png";
import { useNavigate } from "react-router-dom";

const handleLogout = (event) => {
  event.preventDefault();
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("jwt");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_image");
  localStorage.removeItem("first_name");
  localStorage.removeItem("last_name");
  localStorage.removeItem("email");
  localStorage.removeItem("phone_number");
  window.location.href = "/login";
};

export function Navbar() {
  let navigate = useNavigate();
  const editProfile = () => {
    let path = "/users/edit";
    navigate(path);
  };
  const name = localStorage.getItem("first_name");
  const imageURL = localStorage.getItem("user_image");
  return (
    <div className="navbar">
      <img src={Logo} alt="convos logo" className="logo" />
      <div className="user">
        <img src={imageURL} alt="" className="profile-pic" onClick={editProfile} />
        <span>{name}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}
