import axios from "axios";

const searchResultsAPI = async (searchQuery) => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/v1/customer/search?q=${searchQuery}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getItemsByShopIdAPI = async (_id, q) => {
  try {
    let extend = "";
    if (q && q !== "All") {
      extend = `?type=${q}`;
    }
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/v1/customer/shop-items-by-id/${_id}${extend}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getShopsByItemNameAPI = async (name) => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/v1/customer/shops-by-item-name/${name}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getCustomerOrdersAPI = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/v1/customer/orders`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.data.orders;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { searchResultsAPI, getItemsByShopIdAPI, getShopsByItemNameAPI, getCustomerOrdersAPI };
