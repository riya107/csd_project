import "../css/Register.css";
import { useState, useContext } from "react";
import {registerAPI} from "../api-calls/user-api-calls";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {verifyRegisterData} from "../utils";
import socket from "../customSocket";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    name: "",
    role: "customer",
    email: "",
    password: "",
    phone_number: "",
  });

  const {setUser} = useContext(AppContext);

  const onChangeRegisterForm = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!verifyRegisterData(registerUser)){
      alert("Recheck your details!");
      return ;
    }
    const res = await registerAPI(registerUser);
    if(res){
      setUser(res.user);
      if (socket.connected) {
        if (res.user && res.user.role === "shop") {
          socket.emit("shopJoin", res.user._id.toString());
        } else if (res.user && res.user.role === "customer") {
          socket.emit("customerJoin", res.user._id.toString());
        }
      } else {
        socket.connect();
        socket.once("connect", () => {
          if (res.user && res.user.role === "shop") {
            socket.emit("shopJoin", res.user._id.toString());
          } else if (res.user && res.user.role === "customer") {
            socket.emit("customerJoin", res.user._id.toString());
          }
        });
      }
      localStorage.setItem("token",res.token);
      alert("Registration Successful!");
      navigate("/");
    }
    else{
      alert("Recheck your details!");
    }
  };

  return (
    <form className="register-form">
      <input
        onChange={onChangeRegisterForm}
        name="name"
        placeholder="Name"
        autoComplete="off"
      />
      <label htmlFor="role">Shop or Customer?</label>
      <select onChange={onChangeRegisterForm} id="role" name="role">
        <option value="customer">Customer</option>
        <option value="shop">Shop</option>
      </select>
      <input
        onChange={onChangeRegisterForm}
        name="email"
        placeholder="Email"
        type="email"
        autoComplete="off"
      />
      <input
        onChange={onChangeRegisterForm}
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="off"
      />
      <input
        onChange={onChangeRegisterForm}
        name="phone_number"
        type="number"
        placeholder="Phone Number"
        autoComplete="off"
      />
      <button onClick={handleRegister}>Register</button>
    </form>
  );
};

export default Register;
