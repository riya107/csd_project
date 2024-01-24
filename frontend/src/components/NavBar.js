import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import '../css/NavBar.css';

const NavBar = () => {
  return (
    <div>
      <div className="nav-bar">
        <div className="nav-left">
          <GiHamburgerMenu className="ham-burger" size={30}/>
          <div className="title"><b>IIT Bhilai</b> Food Delivery Service</div>
        </div>
        <div className="nav-right">
          <div>About</div>
          <div>Contact</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
