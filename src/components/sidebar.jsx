import { useContext } from "react";
import Chats from "./chats";
import Navbar from "./navbar";
import Search from "./search";
import { ChatContext } from "../context/chatContext";

const Sidebar = ()=>{
    const {data}= useContext(ChatContext)
    return(
        <>
        <div className={`sidebar ${data.availableuser && "mobileside"}`}>
            <Navbar/>
            {/* <button style={{background:"none",position:"absolute",right:"0px",border:"none",color:"white",cursor:"pointer"}}>Back</button> */}
            <Search/>
            <Chats/>
        </div>
        </>
    )
}

export default Sidebar;