import { useLocation, useNavigate } from "react-router-dom";
import "../css/Cart.css";
import socket from "../customSocket";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const Cart = () => {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, shop_id } = location.state;

  const total = cart.reduce((acc, item) => {
    return acc + item.item_price * item.item_quantity;
  }, 0);

  const handlePlaceOrder = async () => {
    socket.emit("placeOrder", {
      shopId: shop_id,
      order: {
        shop_id,
        customer_id: user._id,
        items: cart,
        total_price: total,
        status: "Placed",
      },
    });
    navigate("/orders");
  };

  return (
    <div className="cart-page">
      <h2>CART</h2>
      <div className="cart-item-container">
        {cart.map((item) => (
          <div key={item.item_id} className="cart-item">
            <span className="cart-item-name">{item.item_name}</span>
            <span className="cart-item-price">₹{item.item_price}</span>
            <div className="cart-item-controls">
              <span className="cart-item-controls-quan">
                {item.item_quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="total-container">
        <div className="total">TOTAL: ₹{total}</div>
      </div>
      <div className="placeOrder-container">
        <button
          variant="outlined"
          color="primary"
          className="placeOrder"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
