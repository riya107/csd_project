import { useLocation } from "react-router-dom";
import ShopItemCard from "./ShopItemCard";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItemsByShopIdAPI } from "../api-calls/customer-api-calls";

const ShopItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { foodItems, shopName, shop_id } = location.state;
  const [foodItems_, setFoodItems] = useState(foodItems);
  const radios = [
    { name: "All", value: "All" },
    { name: "Veg", value: "Veg" },
    { name: "Non-veg", value: "Non-veg" },
  ];

  const [radioValue, setRadioValue] = useState("All");
  const [cart, setCart] = useState([]);

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Add food items first!");
    } else {
      navigate("/cart", {
        state: { cart, shop_id: foodItems[0].shop_id },
      });
    }
  };

  const handleChange = async (e) => {
    setRadioValue(e.currentTarget.value);
    const res = await getItemsByShopIdAPI(shop_id, e.currentTarget.value);
    if (!res) {
      alert("OOPS! No Result Found");
      return;
    }
    const foodItems = res.foodItems;
    if (foodItems.length === 0) {
      alert("OOPS! No Result Found");
    } else {
      setFoodItems(foodItems);
    }
  };

  return (
    <div>
      <div className="shop-items-name">{shopName}</div>
      <div
        onClick={placeOrder}
        className="place-order rounded border border-danger bg-danger text-light m-2 position-fixed p-2"
      >
        Go to Cart
      </div>
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
            onChange={handleChange}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <div className="food-items">
        {foodItems_.map((e, i) => {
          return (
            <ShopItemCard key={i} data={e} cart={cart} setCart={setCart} />
          );
        })}
      </div>
    </div>
  );
};

export default ShopItems;
