import Item from "./Item";

const items = [
  {
    _id: 1,
    name: "Gulab Jamun",
    image: "https://media.istockphoto.com/id/521803129/photo/gulab-jamun-11.jpg?s=612x612&w=0&k=20&c=wyJaXY7Uu0hMBCXkcTDRaujSKN6Rp9roJeKDvF6CfHI=",
    type: "Veg",
  },
  {
    _id: 2,
    name: "Samosa",
    image: "https://media.istockphoto.com/id/502663991/photo/punjabi-samosa-23.jpg?s=612x612&w=0&k=20&c=Ne0ArOpa-4L2N-INtPnq371fFZoM6qWW6R4ryN9TWW0=",
    type: "Veg",
  },
  {
    _id: 3,
    name: "Pizza",
    image: "https://media.istockphoto.com/id/184946701/photo/pizza.jpg?s=612x612&w=0&k=20&c=97rc0VIi-s3mn4xe4xDy9S-XJ_Ohbn92XaEMaiID_eY=",
    type: "Veg",
  },
  {
    _id: 4,
    name: "Chicken Fry",
    image: "https://t3.ftcdn.net/jpg/04/37/53/70/240_F_437537051_SZ53J8yrlF5Iy3JlbfdzsqK7PC2iZyns.jpg",
    type: "Non-veg",
  },
  {
    _id: 5,
    name: "Fried Fish",
    image: "https://media.istockphoto.com/id/453002865/photo/golden-cod-filets-garnished-with-lemon-slices.jpg?s=612x612&w=0&k=20&c=GDKUqfcIW9_7Q1t7Wh0rW-Z_ecw6p73csQQOyLzf_vg=",
    type: "Non-veg",
  },
];

const FoodItems = () => {
  return <div className="food-items">
    {
        items.map((e)=>{
            return <Item key={e._id} name={e.name} image={e.image} type={e.type}/>
        })
    }
  </div>;
};

export default FoodItems;
