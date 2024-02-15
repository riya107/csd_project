import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { getShopOrdersAPI } from "../api-calls/shop-api-calls";
import socket from "../customSocket";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        (async () =>{
            const orders = await getShopOrdersAPI();
            if(orders.length===0){
                alert("No order for now");
            }
            setOrders(orders);
        })();
    },[])
    useEffect(()=>{
        socket.on("newOrder", order => {
            const newOrders = [order,...orders];
            setOrders(newOrders);
        });
    },[orders])
    return (
        <div className="orders">
            {orders.map((e,i)=>{
                return <DashboardCard key={i} order={e} orders={orders} setOrders={setOrders}/>
            })}
        </div>
    );
}
 
export default Dashboard;