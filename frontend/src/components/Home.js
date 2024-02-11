import RegisterLogin from "./RegisterLogin";
import WelcomePage from "./WelcomePage";
import AppContext from "../context/AppContext";
import { useContext} from "react";

const Home = () => {
  const { user} = useContext(AppContext);

  return <div>{user ? <WelcomePage /> : <RegisterLogin />}</div>;
};

export default Home;
