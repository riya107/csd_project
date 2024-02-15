import axios from "axios";

const updateMenuAPI = async (data) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/v1/shop/update-menu`,
      data: data,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getMenuAPI = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/v1/shop/menu`,
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

const deleteItemAPI = async (_id) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/v1/shop/delete-item/${_id}`,
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

const updateItemAPI = async (_id,itemName,itemPrice) => {
  try {
    const res = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/v1/shop/update-item/${_id}`,
      data: {itemName,itemPrice},
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

const getShopOrdersAPI = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/v1/shop/orders`,
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

export { updateMenuAPI, getMenuAPI, deleteItemAPI, updateItemAPI, getShopOrdersAPI };
