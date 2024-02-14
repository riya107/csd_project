import React from "react";
import  { useState } from 'react';
import qrImage from "./qrImage.png"
import axios from "axios";
import MapComponent from "./Map";

    
const PlaceOrder = ({setClearCartToggle}) => {
  // State to control the visibility of the image
  const [showImage, setShowImage] = useState(false);
  const [toggleMap, setToggleMap] = useState(false);
  // Function to toggle the visibility of the image

function clearCart(){
  const emptyArr = [];
  localStorage.setItem("cart", JSON.stringify(emptyArr));
  setClearCartToggle((oldVal) => 1 - oldVal)
}

  const toggleImageVisibility = () => {
    setShowImage(!showImage);
  };

  async function handleLocationData() {
    const result = await axios({
      method: "get", 
      url: `${process.env.REACT_APP_API_URL}/api/v1/customer/getLocation`,
    });
    setToggleMap(1)
    console.log("result: ", result.data)
  }

  return (
    <div>
      <button onClick={toggleImageVisibility}>
        Show Image
      </button>
      <button onClick={clearCart}>Clear Cart</button>
      {showImage && (
        <div>
          <img src={qrImage} alt="Example Image"
          style={{ width: '200px', height: '200px' }} />
        </div>
      )}
      <button onClick={handleLocationData} >
        Track My Order
      </button>
      {toggleMap && <MapComponent/>}
    </div>
  );
};

export default PlaceOrder;
