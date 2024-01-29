import VegIcon from "../images/veg.png";
import NonVegIcon from "../images/non-veg.png";

import "../css/Item.css";

const Item = ({ name, image, type }) => {
  return (
    <div className="food-card">
      <img className="food-img" src={image} alt="Loading"></img>
      <div>
      <div>{name}</div>
      <div className="adder bg-danger">
        <div className="adder-1">+</div>
        <div className="adder-2">0</div>
        <div className="adder-3">--</div>
      </div>
      </div>
      {type === "Veg" ? <img className="food-type" src={VegIcon} alt="Loading" /> : <img className="food-type" src={NonVegIcon} alt="Loading"/>}
    </div>
  );
};

export default Item;
