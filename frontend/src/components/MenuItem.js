import VegIcon from "../images/veg.png";
import NonVegIcon from "../images/non-veg.png";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import "../css/MenuItem.css";

const MenuItem = ({ itemName,itemPrice, image, type }) => {
  return (
    <div className="food-card">
      <img className="food-img" src={image} alt="Loading"></img>
      <div className="type-name">{type === "Veg" ? <img className="food-type" src={VegIcon} alt="Loading" /> : <img className="food-type" src={NonVegIcon} alt="Loading"/>}<div>{itemName}</div></div>
      <div className="delete-modify">
      <div className="menu-item-price">{`₹${itemPrice}/-`}</div>
      <div className="menu-item-delete-modify">
      <MdDelete className="menu-delete" size={30}/>
      <CiEdit className="menu-modify" size={30}/>
      </div>
      </div>
    </div>
  );
};

export default MenuItem;
