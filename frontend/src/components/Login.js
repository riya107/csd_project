import "../css/Login.css";

const Login = () => {
  return (
    <form className="login-form">
      <input name="email" placeholder="Email" type="email" autoComplete="off" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        autocomplete="off"
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
