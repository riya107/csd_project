import VegIcon from "../images/veg.png";
import NonVegIcon from "../images/non-veg.png";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { deleteItemAPI, updateItemAPI } from "../api-calls/shop-api-calls";

import "../css/MenuItem.css";

const MenuItem = ({
  id,
  itemName,
  itemPrice,
  image,
  type,
  foodItems,
  setFoodItems,
}) => {
  const handleDelete = async () => {
    const res = await deleteItemAPI(id);
    if (res) {
      const updatedFoodItems = foodItems.filter((item) => item._id !== id);
      setFoodItems(updatedFoodItems);
      alert("Deletion successful!");
    } else {
      alert("We could not delete item!");
    }
  };

  const handleUpdate = async () => {
    const name = window.prompt("New name");
    const price = window.prompt("New Price");
    const numberPrice = parseFloat(price);
    if (!name) {
      alert("Enter item name");
      return;
    }
    if (isNaN(numberPrice)) {
      alert("Enter valid price");
      return;
    }
    if (!Number.isInteger(numberPrice)) {
      alert("Price should be an integer");
      return;
    }
    if (numberPrice < 1 || numberPrice > 2000) {
      alert("Price limit is from 1-2000");
      return;
    }
    const res = await updateItemAPI(id, name, numberPrice);
    if (res) {
      const updatedFoodItems = foodItems.map((obj) => {
        if (obj._id === id) {
          return { ...obj, itemName: name, itemPrice: numberPrice };
        }
        return obj;
      });
      setFoodItems(updatedFoodItems);
      alert("Updation successful!");
    } else {
      alert("We could not update item!");
    }
  };

  return (
    <div className="food-card">
      <img className="food-img" src={image} alt="Loading"></img>
      <div className="type-name">
        {type === "Veg" ? (
          <img className="food-type" src={VegIcon} alt="Loading" />
        ) : (
          <img className="food-type" src={NonVegIcon} alt="Loading" />
        )}
        <div>{itemName}</div>
      </div>
      <div className="delete-modify">
        <div className="menu-item-price">{`₹${itemPrice}/-`}</div>
        <div className="menu-item-delete-modify">
          <MdDelete onClick={handleDelete} className="menu-delete" size={30} />
          <CiEdit onClick={handleUpdate} className="menu-modify" size={30} />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
