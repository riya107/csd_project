import { useState } from "react";
import '../css/OrderCard.css';

const OrderCard = ({ order }) => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    if (expand) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  };
  return (
    <div className="order-card">
      <div className="upper-half">
        <div className="status-and-name">
          <div>
            {order.status === "Placed"
              ? "📌 Placed"
              : order.status === "Accepted"
              ? "🕒 Accepted"
              : order.status === "Delivered"
              ? "✅ Delivered"
              : "❌ Declined"}
          </div>
          <div className="order-shop-title">{order.shop_id.name}</div>
        </div>
        <div className="phone-and-length">
          <div>Call: {order.shop_id.phone_number}</div>
          <div>{order.items.length} items</div>
        </div>
        <button className="expand-button" onClick={handleExpand}>
          {expand ? "Close" : "Details"}
        </button>
      </div>
      {expand && (
        <div className="lower-half">
          <div className="order-total">Total: ₹{order.total_price}/-</div>
          <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            {order.items.map((item,i) => {
              return (
                <tr key={i}>
                  <td>{item.item_name}</td>
                  <td>₹{item.item_price}/-</td>
                  <td>{item.item_quantity}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
