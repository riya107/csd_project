import axios from "axios";
import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
//import "../css/AboutPage.css";
import PlaceOrder from "./PlaceOrder";

const Cart = () => {
  const [clearCartToggle, setClearCartToggle] = useState(0);
  let cartItems=JSON.parse(localStorage.getItem("cart"));
  function calculateTotalPrice(cartItems) {
    // Initialize total price to 0
    let totalPrice = 0;
  
    // Iterate over each item in the cartItems array
    cartItems.forEach(item => {
      // Convert the itemPrice from string to integer using parseInt()
      const price = parseInt(item.itemPrice, 10);
  
      // Add the converted price of each item to the total price
      totalPrice += price;
    });
  
    // Return the total price
    return totalPrice;
  }

  let total=calculateTotalPrice(cartItems);
  
    // const [cartItems, setCartItems] = React.useState(null);

    // useEffect(() => {
    //   async function fetchData() {
    //     // const result = await axios({
    //     //   method: "post",
    //     //   url: `${process.env.REACT_APP_API_URL}/api/v1/customer/getCart/`,
    //     //   // headers: {
    //     //   //   "Authorization": localStorage.getItem("token")
    //     //   // },
    //     //   data: {
    //     //     email: localStorage.getItem("email")
    //     //   }
    //     // });

    //     cartItems=JSON.parse(localStorage.getItem("cart"));
    //   }
    //   fetchData();  
    // }, []);
  
  return (
    <div className="about-container">
      {cartItems.map(item => (
    <p key={item.itemName}>Item name: {item.itemName} - Price: {item.itemPrice}</p>
  ))}
  total:{total}
  <PlaceOrder 
    setClearCartToggle = {setClearCartToggle}  
  />
    </div>
    
  );
};

export default Cart;
