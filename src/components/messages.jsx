import { useContext, useEffect, useState } from "react";
import Message from "./message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/chatContext";

const Messages = ()=>{
    const [messages,setMessages] = useState();
    const {data} = useContext(ChatContext);

  console.log(data);
    useEffect(()=>{
        let unsub = onSnapshot(doc(db,"chats",data.chatid),(doc)=>{
            console.log("doccc",doc);
            doc.exists() &&  setMessages(doc.data().messages)
         });
 
         return ()=>{
             unsub();
         }
    },[])

    return(
        <>
        <div className="messages">
            {messages?.map((message)=>(
                <Message message={message}/>
            ))}
          
        </div>
        </>
    )
}

export default Messages;