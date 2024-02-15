import { useEffect, useState } from "react";
import { getCustomerOrdersAPI } from "../api-calls/customer-api-calls";
import OrderCard from "./OrderCard";
import "../css/Orders.css";
import socket from "../customSocket";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      const orders = await getCustomerOrdersAPI();
      if (orders.length === 0) {
        alert("No order history");
      }
      setOrders(orders);
    })();
  }, []);
  useEffect(() => {
    socket.on("orderAccepted", (orderId) => {
      const newOrders = orders.map((obj) => {
        if (obj._id === orderId) {
          return { ...obj, status: "Accepted" };
        }
        return obj;
      });
      setOrders(newOrders);
    });
    socket.on("orderDeclined", (orderId) => {
      const newOrders = orders.map((obj) => {
        if (obj._id === orderId) {
          return { ...obj, status: "Declined" };
        }
        return obj;
      });
      setOrders(newOrders);
    });
    socket.on("orderDelivered", (orderId) => {
      const newOrders = orders.map((obj) => {
        if (obj._id === orderId) {
          return { ...obj, status: "Delivered" };
        }
        return obj;
      });
      setOrders(newOrders);
    });
  }, [orders]);
  return (
    <div className="orders">
      {orders.map((e, i) => {
        return <OrderCard key={i} order={e} />;
      })}
    </div>
  );
};

export default Orders;
