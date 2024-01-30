import axios from "axios";

const registerAPI = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/v1/user/signup`,
      data: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const loginAPI = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/v1/user/login`,
      data: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const userGetterAPI = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/v1/user`,
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

export { registerAPI, loginAPI, userGetterAPI };
