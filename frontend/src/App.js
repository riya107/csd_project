import AppState from "./context/AppState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";

function App() {
  return (
    <AppState>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar/>}>
            <Route index element={<Home/>}></Route>
          </Route>
        </Routes>
      </Router>
    </AppState>
  );
}

export default App;
