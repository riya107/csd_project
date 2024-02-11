import React, { useState } from 'react';
import { Box, Button, Container, List, ListItem, ListItemText, Typography } from '@mui/material';

//cart data (replace with actual data from your application)
const simulatedCartData = [
  { id: 1, name: 'Item 1', price: 10.99, quantity: 1 },
  { id: 2, name: 'Item 2', price: 8.99, quantity: 1 },
];

const CartPage = () => {
  const [cart, setCart] = useState(simulatedCartData);

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle increasing quantity
  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Function to handle decreasing quantity
  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={`${item.name} - $${item.price.toFixed(2)} x `}
                />
                <Box display="flex" alignItems="center">
                  <Button onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
                  <Typography variant="body1">{item.quantity}</Typography>
                  <Button onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                </Box>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" gutterBottom>
            Total: ${totalAmount.toFixed(2)}
          </Typography>

          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Proceed to Checkout
          </Button>

          <Button variant="outlined" color="secondary" onClick={() => setCart([])}>
            Clear Cart
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
