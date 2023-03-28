import Logo from "./assets/images/convos-logo-words.png";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}
export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("user_image", response.data.user_image_url);
        localStorage.setItem("first_name", response.data.first_name);
        localStorage.setItem("last_name", response.data.last_name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("phone_number", response.data.phone_number);

        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={Logo} alt="convos logo" className="logo" />
        <span className="title">Login</span>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to={"/signup"}>Register</Link>
        </p>
      </div>
    </div>
  );
}
