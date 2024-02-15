import { Outlet} from "react-router-dom";
import { MdFastfood } from "react-icons/md";
import AppContext from "../context/AppContext";
import { useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import "../css/NavBar.css";
import { userGetterAPI } from "../api-calls/user-api-calls";
import socket from "../customSocket";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const [selected, setSelected] = useState("login-register");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      const res = await userGetterAPI();
      if (res) {
        setUser(res.user);
        if (res.user && res.user.role === "shop") {
          socket.emit("shopJoin", res.user._id.toString());
        } else if (res.user && res.user.role === "customer") {
          socket.emit("customerJoin", res.user._id.toString());
        }
      }
    })();
  }, [setUser]);

  const handleLogout = () => {
    socket.disconnect();
    setSelected("logout");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    setSelected("login-register");
  };
  return (
    <div>
      <div className="nav-bar">
        <div className="nav-left">
          <MdFastfood
            onClick={() => {
              navigate("/");
            }}
            className="ham-burger"
            size={30}
          />
          <div className="title">
            <b>IIT Bhilai</b> Food Delivery Service
          </div>
        </div>
        <div className="nav-right">
          {user && user.role === "shop" && (
            <div
              onClick={() => {
                setSelected("dashboard");
                navigate("/dashboard");
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
              onClick={() => {
                setSelected("menu");
                navigate("/menu");
              }}
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
                navigate("/update-menu");
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
                navigate("/login-register");
              }}
              style={{
                borderBottom:
                  selected === "login-register" &&
                  "3px solid var(--primary-color)",
              }}
            >
              Login/Register
            </div>
          )}
          {user && user.role === "customer" && (
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
          {user && user.role === "customer" && <div
            onClick={() => {
              setSelected("orders");
              navigate("/orders");
            }}
            style={{
              borderBottom:
                selected === "orders" && "3px solid var(--primary-color)",
            }}
          >
            Orders
          </div>
          }
          <div
            onClick={() => {
              setSelected("about");
              navigate("/about");
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
              navigate("/contact");
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
