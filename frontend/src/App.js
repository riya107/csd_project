import AppState from "./context/AppState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import UpdateMenu from "./components/UpdateMenu";
import RegisterLogin from "./components/RegisterLogin";
import About from "./components/About";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import SearchResults from "./components/SearchResults";
import ShopItems from "./components/ShopItems";
import Shops from "./components/Shops";
import socket from "./customSocket";
import Orders from "./components/Orders";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <AppState>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/update-menu" element={<UpdateMenu />}></Route>
            <Route path="/login-register" element={<RegisterLogin />}></Route>
            <Route path="/search-results" element={<SearchResults />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/shop-items" element={<ShopItems />}></Route>
            <Route path="/shops" element={<Shops />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
          </Route>
        </Routes>
      </Router>
    </AppState>
  );
}

export default App;
