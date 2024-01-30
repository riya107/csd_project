import { loginAPI } from "../api-calls/user-api-calls";
import "../css/Login.css";
import AppContext from "../context/AppContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(AppContext);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const onChangeLoginForm = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginAPI(loginUser);
    console.log(res);
    if(res){
      setUser(res.user);
      localStorage.setItem("token",res.token);
      alert("Login Successful!");
      navigate("/");
    }
    else{
      alert("Recheck your details!");
    }
  }

  return (
    <form className="login-form">
      <input onChange={onChangeLoginForm} name="email" placeholder="Email" type="email" autoComplete="off" />
      <input
        onChange={onChangeLoginForm}
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="off"
      />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
};

export default Login;
