import Register from "./Register";
import Login from "./Login";

import "../css/RegisterLogin.css";

const register = true;

const RegisterLogin = () => {
  const registerClass = register ? "under-line" : "";
  const loginClass = register ? "" : "under-line";
  return (
    <div className="register-login-outer-box">
      <div className="register-login-box">
        <div className="register-or-login">
          <div className={loginClass}>Login</div>
          <div className={registerClass}>Register</div>
        </div>
        {register ? <Register /> : <Login />}
      </div>
    </div>
  );
};

export default RegisterLogin;
