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
          "Authorization": localStorage.getItem("token")
        }
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  

export { updateMenuAPI, getMenuAPI};
