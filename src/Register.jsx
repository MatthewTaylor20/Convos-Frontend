import Logo from "./assets/images/convos-logo-words.png";
export function Register() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={Logo} alt="convos logo" className="logo" />
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="first name" />
          <input type="text" placeholder="last name" />
          <input type="email" placeholder="email" />
          <input type="tel" placeholder="phone number" />
          <input type="password" placeholder="password" />
          <input type="password" placeholder="password confirmation" />
          <button>Sign up</button>
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
}
