import { useState } from "react";
import '../css/OrderCard.css';
import socket from "../customSocket";

const DashboardCard = ({ order, orders, setOrders }) => {
  const [expand, setExpand] = useState(false);
  const [status, setStatus] = useState(order.status);
  const handleExpand = () => {
    if (expand) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  };
  const handleAccept = () => {
    socket.emit("acceptOrder",{customerId:order.customer_id._id,orderId:order._id});
    setStatus("Accepted");
  }

  const handleDecline = () => {
    socket.emit("declineOrder",{customerId:order.customer_id._id,orderId:order._id});
    const updatedOrders = orders.filter(item => item._id !== order._id);
    setOrders(updatedOrders);
  }

  const handleDeliver = () => {
    socket.emit("deliverOrder",{customerId:order.customer_id._id,orderId:order._id});
    const updatedOrders = orders.filter(item => item._id !== order._id);
    setOrders(updatedOrders);
  }

  return (
    <div className="order-card">
      <div className="upper-half">
        <div className="status-and-name">
          <div>

          {status === 'Placed' && (
        <div>
          <div className="cp d-inline m-2 border border-2 px-2 rounded border-success" onClick={handleAccept}>Accept</div>
          <div className="cp d-inline m-2 border border-2 px-2 rounded border-danger" onClick={handleDecline}>Decline</div>
        </div>
      )}
      {status === 'Accepted' && (
        <div>
          <div className="cp d-inline m-2 border border-2 px-2 rounded border-warning" onClick={handleDeliver}>Mark Delivered</div>
        </div>
      )}
          </div>
          <div className="order-shop-title">{order.customer_id.name}</div>
        </div>
        <div className="phone-and-length">
          <div>Call: {order.customer_id.phone_number}</div>
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

export default DashboardCard;