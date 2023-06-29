import Input from "./input";
import Messages from "./messages";

const Chat = ()=>{
    return(
        <>
        <div className="chat">
            <div className="chatInfo">
                <span>Rahl</span>
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