import axios from "axios";

const searchResultsAPI = async (searchQuery) => {
    try{
        const res = await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/api/v1/customer/search?q=${searchQuery}`,
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          });
          return res.data;
    }
    catch(error){
        console.log(error);
        return null;
    }
};

const getItemsByShopIdAPI = async (_id) => {
  try{
    const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/v1/customer/shop-items-by-id/${_id}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      return res.data;
}
catch(error){
    console.log(error);
    return null;
}
}

const getShopsByItemNameAPI = async (name) => {
  try{
    const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/v1/customer/shops-by-item-name/${name}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      return res.data;
}
catch(error){
    console.log(error);
    return [];
}
}

export {searchResultsAPI, getItemsByShopIdAPI, getShopsByItemNameAPI};