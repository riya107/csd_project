import { Outlet } from "react-router-dom";
import { MdFastfood } from "react-icons/md";
import AppContext from "../context/AppContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const [selected, setSelected] = useState("login-register");

  const handleLogout = () => {
    setSelected("logout");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <div className="nav-bar">
        <div className="nav-left">
          <MdFastfood className="ham-burger" size={30} />
          <div className="title">
            <b>IIT Bhilai</b> Food Delivery Service
          </div>
        </div>
        <div className="nav-right">
          {user && user.role === "shop" && (
            <div
              onClick={() => {
                setSelected("dashboard");
              }}
              style={{
                borderBottom:
                  selected === "dashboard" && "3px solid var(--primary-color)",
              }}
            >
              Dashboard
            </div>
          )}
          {user && user.role === "shop" && (
            <div
              onClick={() => setSelected("menu")}
              style={{
                borderBottom:
                  selected === "menu" && "3px solid var(--primary-color)",
              }}
            >
              Menu
            </div>
          )}
          {user && user.role === "shop" && (
            <div
              onClick={() => {
                setSelected("update-menu");
                navigate("/add-menu");
              }}
              style={{
                borderBottom:
                  selected === "update-menu" &&
                  "3px solid var(--primary-color)",
              }}
            >
              Update Menu
            </div>
          )}
          {!user && (
            <div
              onClick={() => {
                setSelected("login-register");
              }}
              style={{
                borderBottom:
                  selected === "login-register" && "3px solid var(--primary-color)",
              }}
            >
              Login/Register
            </div>
          )}
          <div
            onClick={() => {
              setSelected("about");
            }}
            style={{
              borderBottom:
                selected === "about" && "3px solid var(--primary-color)",
            }}
          >
            About
          </div>
          <div
            onClick={() => {
              setSelected("contact");
            }}
            style={{
              borderBottom:
                selected === "contact" && "3px solid var(--primary-color)",
            }}
          >
            Contact
          </div>
          {user && (
            <div
              onClick={handleLogout}
              style={{
                borderBottom:
                  selected === "logout" && "3px solid var(--primary-color)",
              }}
            >
              Logout
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
