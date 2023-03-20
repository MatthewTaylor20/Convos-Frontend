import Logo from "../assets/images/convos-logo-words.png";

export function Navbar() {
  return (
    <div className="navbar">
      <img src={Logo} alt="convos logo" className="logo" />
      <div className="user">
        <img
          src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt=""
          className="profile-pic"
        />
        <span>John</span>
        <button>logout</button>
      </div>
    </div>
  );
}
