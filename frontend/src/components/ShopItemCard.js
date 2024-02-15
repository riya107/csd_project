import VegIcon from "../images/veg.png";
import NonVegIcon from "../images/non-veg.png";
import { useState } from "react";
import "../css/ShopItemCard.css";

const ShopItemCard = ({ data, cart, setCart }) => {
  const [q, setQ] = useState(0);
  const handleClick = () => {
    setQ(1);
    setCart([
      ...cart,
      {
        item_id: data._id,
        item_name: data.itemName,
        item_quantity: 1,
        item_price: data.itemPrice,
      },
    ]);
  };
  const handleIncrement = () => {
    if(q<5){
      setQ(q+1);
  }
  else{
      alert("You can add maximum 5 items!");
      return ;
  }
    const updatedCart = cart.map((item) => {
      if (item.item_id === data._id) {
        return {
          ...item,
          item_quantity: item.item_quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecrement = () => {
    if(q===1){
      setQ(q-1);
      const updatedCart = cart.filter(item => item.item_id !== data._id);
      setCart(updatedCart);
    }
    else{
      setQ(q-1);
      const updatedCart = cart.map((item) => {
        if (item.item_id === data._id) {
          return {
            ...item,
            item_quantity: item.item_quantity - 1,
          };
        }
        return item;
      });
      setCart(updatedCart);
    }
  };

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
            <div
              onClick={handleClick}
              className="q-0-add rounded border border-danger text-danger"
            >
              ADD +
            </div>
          )}
          {q !== 0 && (
            <div className="q-not-0-add rounded border border-danger bg-danger text-light">
              <div onClick={handleDecrement} className="q-not-0-add-minus">
                −
              </div>
              <div>{q}</div>
              <div onClick={handleIncrement} className="q-not-0-add-plus">
                +
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopItemCard;
