import "../css/Restaurants.css";

const restaurants = [
  "Govatsa",
  "Tech Cafe",
  "Not Just Coffee",
  "Crazy Cake And Bakers",
];

const Restaurants = () => {
  return (
    <div className="res-box">
      {restaurants.map((res, index) => {
        return <div className="res" key={index}>{res}</div>;
      })}
    </div>
  );
};

export default Restaurants;
