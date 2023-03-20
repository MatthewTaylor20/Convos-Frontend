import Logo from "./assets/images/convos-logo-words.png";
export function Login() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={Logo} alt="convos logo" className="logo" />
        <span className="title">Register</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Login</button>
        </form>
        <p>Don't have an account? Register</p>
      </div>
    </div>
  );
}
