import { useEffect, useState } from "react";
import { getMenuAPI } from "../api-calls/shop-api-calls";
import MenuItem from "./MenuItem";
import "../css/Menu.css";

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getMenuAPI();
      if (res) {
        setFoodItems(res.foodItems);
      }
    })();
  }, []);

  return (
    <div className="food-items">
      {foodItems.map((e) => {
        return (
          <MenuItem
            key={e._id}
            itemName={e.itemName}
            image={e.image}
            type={e.type}
            itemPrice={e.itemPrice}
            foodItems={foodItems}
            setFoodItems={setFoodItems}
            id={e._id}
          />
        );
      })}
    </div>
  );
};

export default Menu;
