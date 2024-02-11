import { useLocation } from "react-router-dom";
import ShopItemCard from "./ShopItemCard";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState } from "react";

const ShopItems = () => {
  const location = useLocation();
  const { foodItems, shopName } = location.state;
  const radios = [
    { name: "All", value: "All" },
    { name: "Veg", value: "Veg" },
    { name: "Non-veg", value: "Non-veg" },
  ];
  const [radioValue, setRadioValue] = useState("All");
  const [cart, setCart] = useState([]);

  const placeOrder = () => {
    if(cart.length===0){
        alert("Add food items first!");
    }
    else{
        
    }
  }

  return (
    <div>
      <div className="shop-items-name">{shopName}</div>
      <div onClick={placeOrder} className="place-order rounded border border-danger bg-danger text-light m-2 position-fixed p-2">Place Order</div>
      <ButtonGroup className="m-2 position-fixed">
        {radios.map((radio, idx) => (
          <ToggleButton
          className="bg-dark"
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-danger"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <div className="food-items">
        {foodItems.map((e, i) => {
          return <ShopItemCard key={i} data={e} />;
        })}
      </div>
    </div>
  );
};

export default ShopItems;
