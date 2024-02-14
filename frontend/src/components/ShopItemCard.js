import VegIcon from "../images/veg.png";
import NonVegIcon from "../images/non-veg.png";
import { useState } from "react";
import "../css/ShopItemCard.css";

const ShopItemCard = ({ data }) => {
  const [q, setQ] = useState(0);
  const handlePlus = () => {
    console.log("data: ", data)
    if(q<5){
      setQ(q+1);
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) {
        cart = [data];
      }
      else {cart = [...cart, data]
      }
      cart=JSON.stringify(cart)
      localStorage.setItem("cart", cart);
    }
    else{
        alert("You can add maximum 5 items!");
    }
  }
  const handleMinus = () => {
    setQ(q-1);
  }
  return (
    <div className="food-card">
      <img className="food-img" src={data.image} alt="Loading"></img>
      <div className="type-name">
        {data.type === "Veg" ? (
          <img className="food-type" src={VegIcon} alt="Loading" />
        ) : (
          <img className="food-type" src={NonVegIcon} alt="Loading" />
        )}
        <div>{data.itemName}</div>
      </div>
      <div className="delete-modify">
        <div className="menu-item-price">{`₹${data.itemPrice}/-`}</div>
        <div className="menu-item-delete-modify">
          {q === 0 && (
            <div onClick={handlePlus} className="q-0-add rounded border border-danger text-danger">
              ADD +
            </div>
          )}
          {q !== 0 && (
            <div className="q-not-0-add rounded border border-danger bg-danger text-light">
              <div onClick={handleMinus} className="q-not-0-add-minus">−</div>
              <div>{q}</div>
              <div onClick={handlePlus} className="q-not-0-add-plus">+</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopItemCard;
