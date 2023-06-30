import "./style.scss";
import Register from './pages/register';
import Home from "./pages/home";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import Login from "./pages/login";

function App() {
  const {currentuser} = useContext(UserContext);
  console.log(currentuser,"app");

  const ProtectedRoute = ({children})=>{
   if(!currentuser){
    return <Navigate to='/login'/>
    
   }
   else{
    return children
   }
  }
  
  
  return (
    
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
   </Routes>
   </BrowserRouter>

  );
}

export default App;
