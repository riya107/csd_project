import RestaurantImg from "../images/restaurant.png";
import { getItemsByShopIdAPI } from "../api-calls/customer-api-calls";
import { useNavigate } from "react-router-dom";
import "../css/ShopCard.css";

const ShopCard = ({ data }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        const res = await getItemsByShopIdAPI(data._id);
        if(!res){
            alert("OOPS! No Result Found");
            return ;
        }
        const foodItems = res.foodItems;
        if(foodItems.length===0){
            alert("OOPS! No Result Found");
        }
        else{
            navigate('/shop-items', { state: { foodItems, shopName:data.name} });
        }
    }
  return (
    <div onClick={handleClick} className="shop-card">
      <img className="shop-img" src={RestaurantImg} alt="Loading"></img>
      <div className="shop-name">{data.name}</div>
    </div>
  );
};

export default ShopCard;
