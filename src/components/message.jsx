import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { ChatContext } from "../context/chatContext";

const Message = ({message})=>{
    console.log(message);
    const {currentuser} = useContext(UserContext);
    const {data} = useContext(ChatContext);
    console.log(data,"dataaaaa");
    return(
        <>
        <div className={`message ${message.userid === currentuser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={data.user.photoURL}/>
               
            </div>
            <div className="messageContent">
            <p>{message.text}</p>
            </div>
        </div>
        </>
    )
}

export default Message;