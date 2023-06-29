import "./style.scss";
import Register from './pages/register';
import Home from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

function App() {
  const {currentuser} = useContext(UserContext);
  console.log(currentuser);
  return (
    
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/register" element={<Register/>}></Route>
   </Routes>
   </BrowserRouter>

  );
}

export default App;
