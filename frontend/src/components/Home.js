import RegisterLogin from "./RegisterLogin";
import WelcomePage from "./WelcomePage";
import AppContext from "../context/AppContext";
import { useContext, useEffect } from "react";
import { userGetterAPI } from "../api-calls/user-api-calls";

const Home = () => {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const res = await userGetterAPI();
      if (res) {
        setUser(res.user);
      }
    })();
  }, [setUser]);

  return <div>{user ? <WelcomePage /> : <RegisterLogin />}</div>;
};

export default Home;
