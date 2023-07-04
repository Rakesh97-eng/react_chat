import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ()=>{
    const {currentuser} = useContext(UserContext);

    const signout = ()=>{
        signOut(auth)
    }
    return(
        <>
        <div className="navbar">
             <p className="logo">My chat</p> 
             
             <span className="user">{currentuser?.displayName}
              <img src={currentuser?.photoURL}/>
             </span>
             <button onClick={()=>signout()}>Logout</button>
             
            
        </div>
        </>
    )
}

export default Navbar;