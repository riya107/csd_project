import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
    Box,
} from '@mui/material';
import '../css/Dashboard.css';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);

    const handleOrderNotification = () => {
        const newOrder = {
            id: orders.length + 1,
            shopid: 768,
            customerid: 67,
            items: [
                {
                    itemName: 'New Item',
                    itemQuantity: 2,
                    itemPrice: 30
                }
            ],
            total: 10,
            status: 'Pending',
        };

        setOrders([...orders, newOrder]);
    };

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );

        setOrders(updatedOrders);
    };

    const handleAcceptOrder = (orderId) => {
        handleStatusChange(orderId, 'Accepted');
    };

    const handleRejectOrder = (orderId) => {
        handleStatusChange(orderId, 'Rejected');
    };

    const handleDeliverOrder = (orderId) => {
        handleStatusChange(orderId, 'Delivered');
    };

    return (

        <Box className="orderPageContainer" display="flex" justifyContent="center" alignItems="center">
            <Box p={4} className="orderContainer">
                <h2>ORDERS</h2>

                {/* Button to simulate a new order notification */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOrderNotification}
                    style={{ marginBottom: '20px' }}
                >
                    New Order Notification
                </Button>

                <List>
                    {orders.map((order) => (
                        <div key={order.id}>
                            <ListItem className="orderListItem">
                                <ListItemAvatar>
                                    <Avatar className="orderAvatar">
                                        {order.status === 'Pending' ? '📌' : order.status === 'Accepted' ? '🕒' : order.status === 'Delivered' ? '✅' : '❌'}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<strong>Order ID: {order.id}</strong>}
                                    secondary={`Shop ID: ${order.shopid} | Customer ID: ${order.customerid} | Items: ${order.items.map(item => `${item.itemName} (Quantity: ${item.itemQuantity}, Price: $${item.itemPrice})`).join(', ')} | Total: $${order.total} | Quantity: ${order.quantity} | Status: ${order.status}`}
                                />
                                {order.status === 'Pending' && (
                                    <div>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleAcceptOrder(order.id)}
                                            className="orderButtons"
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleRejectOrder(order.id)}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                )}
                                {order.status === 'Accepted' && (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleDeliverOrder(order.id)}
                                    >
                                        Mark as Delivered
                                    </Button>
                                )}
                            </ListItem>
                        </div>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Dashboard;

