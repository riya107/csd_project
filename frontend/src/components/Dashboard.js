// components/Dashboard/OrderPage.js
import React, { useState } from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
    Divider,
} from '@mui/material';

const Dashboard = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            customerName: 'John Doe',
            items: ['Burger', 'Fries', 'Soda'],
            totalAmount: 20,
            status: 'Pending',
        },
        // Add more sample orders as needed
    ]);

    const handleOrderNotification = () => {
        // Simulate a new order notification
        const newOrder = {
            id: orders.length + 1,
            customerName: 'New Customer',
            items: ['New Item'],
            totalAmount: 10,
            status: 'Pending',
        };

        setOrders([...orders, newOrder]);
    };

    const handleDeliveryStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );

        setOrders(updatedOrders);
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Orders
            </Typography>

            {/* Button to simulate a new order notification */}
            <Button variant="contained" color="primary" onClick={handleOrderNotification} style={{ marginBottom: '20px' }}>
                New Order Notification
            </Button>

            {/* List of Orders */}
            <List>
                {orders.map((order) => (
                    <div key={order.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    {/* You can add an icon or image related to the order */}
                                    {order.status === 'Pending' ? '🕒' : '✅'}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${order.customerName}'s Order`}
                                secondary={`Items: ${order.items.join(', ')} | Total: $${order.totalAmount} | Status: ${order.status}`}
                            />
                            {order.status === 'Pending' && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleDeliveryStatusChange(order.id, 'Delivered')}
                                >
                                    Mark as Delivered
                                </Button>
                            )}
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </div>
    );
};

export default Dashboard;
