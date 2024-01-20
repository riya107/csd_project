import RegisterLogin from "./RegisterLogin";
import Sample from "./Sample";

const user = null;

const Home = () => {
    return ( 
        <div>
            {user?<Sample/>:<RegisterLogin/>}
        </div>
     );
}
 
export default Home;