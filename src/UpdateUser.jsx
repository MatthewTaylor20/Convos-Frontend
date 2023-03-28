import axios from "axios";
import { useState } from "react";

export function UpdateUser() {
  const currentUserID = localStorage.getItem("user_id");
  const firstName = localStorage.getItem("first_name");
  const lastName = localStorage.getItem("last_name");
  const email = localStorage.getItem("email");
  const phoneNumber = localStorage.getItem("phone_number");
  const imageURL = localStorage.getItem("user_image");

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .patch(`http://localhost:3000/users/${currentUserID}.json`, params)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user_image", response.data.user_image_url);
        localStorage.setItem("first_name", response.data.first_name);
        localStorage.setItem("last_name", response.data.last_name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("phone_number", response.data.phone_number);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        {/* <img src={Logo} alt="convos logo" className="logo" /> */}
        <span className="title">Update Profile</span>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="first name" name="first_name" defaultValue={firstName} />
          <input type="text" placeholder="last name" name="last_name" defaultValue={lastName} />
          <input type="email" placeholder="email" name="email" defaultValue={email} />
          <input type="tel" placeholder="phone number" name="phone_number" defaultValue={phoneNumber} />
          <input type="text" placeholder="profile picture URL" name="image_url" defaultValue={imageURL} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
