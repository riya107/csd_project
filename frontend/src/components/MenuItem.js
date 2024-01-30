import VegIcon from "../images/veg.png";
import NonVegIcon from "../images/non-veg.png";

import "../css/Item.css";

const MenuItem = ({ itemName,itemPrice, image, type }) => {
  return (
    <div className="food-card">
      <img className="food-img" src={image} alt="Loading"></img>
      <div>{itemName}</div>
      {type === "Veg" ? <img className="food-type" src={VegIcon} alt="Loading" /> : <img className="food-type" src={NonVegIcon} alt="Loading"/>}
      <div>{`${itemPrice}/-`}</div>
    </div>
  );
};

export default MenuItem;
