import { useLocation } from "react-router-dom";
import ShopCard from "./ShopCard";
import "../css/Shops.css";

const Shops = () => {
    const location = useLocation();
    const { shops } = location.state;

    return ( 
        <div className="shops">
        {shops.map((e, i) => {
          return <ShopCard key={i} data={e} />;
        })}
      </div>
     );
}
 
export default Shops;