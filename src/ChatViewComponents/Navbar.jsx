import axios from "axios";
import Logo from "../assets/images/convos-logo-words.png";

const handleLogout = (event) => {
  event.preventDefault();
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("jwt");
  window.location.href = "/login";
};

export function Navbar(props) {
  return (
    <div className="navbar">
      <img src={Logo} alt="convos logo" className="logo" />
      <div className="user">
        <img src={props.currentUser.image_url} alt="" className="profile-pic" />
        <span>{props.currentUser.first_name}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}
