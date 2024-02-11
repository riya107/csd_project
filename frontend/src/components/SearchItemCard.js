import "../css/SearchItemCard.css";
import RestaurantImg from "../images/restaurant.png";
import { getItemsByShopIdAPI, getShopsByItemNameAPI } from "../api-calls/customer-api-calls";
import { useNavigate } from "react-router-dom";

const SearchItemCard = ({ data }) => {
const navigate = useNavigate();
  const type = data.name ? "Shop" : "Dish";
  const handleShopClick = async () => {
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
  };

  const handleDishClick = async () => {
    const res = await getShopsByItemNameAPI(data._id);
    if(!res){
        alert("OOPS! No Result Found");
        return ;
    }
    const shops = res.shops;
    if(shops.length===0){
        alert("OOPS! No Result Found");
    }
    else{
        navigate('/shops', { state: { shops} });
    }
  };

  return (
    <>
      {type === "Shop" && (
        <div onClick={handleShopClick} className="searched-card">
          <img className="searched-img" src={RestaurantImg} alt="Loading"></img>
          <div className="searched-name-type">
            <div className="searched-name">{data.name}</div>
            <div className="searched-type">Shop</div>
          </div>
        </div>
      )}
      {type === "Dish" && (
        <div onClick={handleDishClick} className="searched-card">
          <img className="searched-img" src={data.image} alt="Loading"></img>
          <div className="searched-name-type">
            <div className="searched-name">{data._id}</div>
            <div className="searched-type">Dish</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchItemCard;
