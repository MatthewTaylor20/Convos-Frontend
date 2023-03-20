import Logo from "./assets/images/convos-logo-words.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function Register() {
  const [errors, setErrors] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/login"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={Logo} alt="convos logo" className="logo" />
        <span className="title">Register</span>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="first name" name="first_name" />
          <input type="text" placeholder="last name" name="last_name" />
          <input type="email" placeholder="email" name="email" />
          <input type="tel" placeholder="phone number" name="phone_number" />
          <input type="password" placeholder="password" name="password" />
          <input type="password" placeholder="password confirmation" name="password_confirmation" />
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
}
