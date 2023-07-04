import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { UserContext } from "../context/userContext";
import { ChatContext } from "../context/chatContext";

const Chats = ()=>{
    const [chats,setChats] = useState('');
    const {state,dispatch} = useContext(ChatContext)
    const {currentuser} = useContext(UserContext);
    useEffect(()=>{
        const getchats = ()=>{
            let Chats = onSnapshot(doc(db,"userChats",currentuser.uid),(doc)=>{
                setChats(doc.data())
             });
     
             return ()=>{
                 Chats();
             }
        };

        currentuser.uid && getchats();
       
    },[currentuser.uid])

    const handleSelect = (user)=>{
        dispatch({type:"CHANGE_CHAT",payload:user})
    }
  
    return(
        <>
        <div className="chats">
        {chats? Object.entries(chats)?.map(chat=>
            
              <div key={chat[0]} className="userChat" onClick={()=>handleSelect(chat[1].userinfo)}>
                <img src={chat[1].userinfo.photoURL}></img>
                <div className="userChatInfo">
                <span>{chat[1].userinfo?.displayName}</span>
                <p>{chat[1].lastmessage?.text}</p>
                </div>
             
              </div>
         ):<></>}
        </div>
      
       
        </>
    )
}

export default Chats;