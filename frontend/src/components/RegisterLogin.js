import Register from "./Register";
import Login from "./Login";
import { useState } from "react";

import "../css/RegisterLogin.css";

const RegisterLogin = () => {
  const [register, setRegister] = useState(false);

  const registerClass = register ? "under-line" : "";
  const loginClass = register ? "" : "under-line";
  return (
    <div className="register-login-outer-box">
      <div className="register-login-box">
        <div className="register-or-login">
          <div
            onClick={() => {
              setRegister(false);
            }}
            className={loginClass}
          >
            Login
          </div>
          <div onClick={() => setRegister(true)} className={registerClass}>
            Register
          </div>
        </div>
        {register ? <Register /> : <Login />}
      </div>
    </div>
  );
};

export default RegisterLogin;
