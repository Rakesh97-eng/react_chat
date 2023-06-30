import { useContext } from "react";
import Input from "./input";
import Messages from "./messages";
import { ChatContext } from "../context/chatContext";

const Chat = ()=>{
    const {data} = useContext(ChatContext)
    return(
        <>
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user.displayName}</span>
                <div className="chatIcons">
                    <img></img>
                    <img></img>
                    <img></img>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
        </>
    )
}    

export default Chat;