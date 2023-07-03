import { useContext, useState } from "react";
import { ChatContext } from "../context/chatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import {  v4 as uuid } from "uuid"
import { UserContext } from "../context/userContext";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = ()=>{
    const [text,setText] = useState();
    const [img,setImg] = useState();

    const {data }= useContext(ChatContext);
    const {currentuser} = useContext(UserContext)

    const handlemessage = async()=>{
        const messagearr = doc(db,"chats",data.chatid);
        if(img){
            const storageRef = ref(storage, uuid);

            const uploadTask = uploadBytesResumable(storageRef, img).then(
              (data) => {
                getDownloadURL(data.task.snapshot.ref).then(async(downloadURL) => {
                    const userMessage = {
                        id:uuid(),
                        text,
                        userid:currentuser.uid,
                        date:Timestamp.now(),
                        img:downloadURL
                    }
            
                    await updateDoc(messagearr,{
                        message:arrayUnion(userMessage)
                    })
                });
              }
            );
        }
        else{
            const userMessage = {
                id:uuid(),
                text,
                userid:currentuser.uid,
                date:Timestamp.now()
            }
    
            await updateDoc(messagearr,{
                message:arrayUnion(userMessage)
            })
        }

        await updateDoc(doc(db,"userChats",currentuser.uid),{
            [data.chatid+".lastmessage"]:{text},
            [data.chatid+".date"]:serverTimestamp()
        })
        await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatid+".lastmessage"]:{text},
            [data.chatid+".date"]:serverTimestamp()
        })
        
    setText("");
    setImg(null)

    }
    return(
        <>
        <div className="input">
            <input type="text " placeholder="enter your messages" onChange={(e)=>setText(e.target.value)} value={text}></input>
            <div className="send">
                <label htmlFor="inupt">
                    <img src="" alt="" />
                </label>
                <input type="file" id="inupt"  onChange={(e)=>setImg(e.target.files[0])} style={{display:"none"}}/>

                <button onClick={handlemessage}>send</button>
            </div>
        </div>
        </>
    )
}

export default Input;