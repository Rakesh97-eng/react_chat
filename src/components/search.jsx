import { useContext, useState } from "react";
import { db } from "../firebase";
import { updateDoc, serverTimestamp, getDoc, doc, collection, getDocs, query, where, setDoc } from "firebase/firestore";
import { UserContext } from "../context/userContext";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const Search = ()=>{
    const [user,setUser] = useState(null)
    const [username,setUsername] = useState("");

    const {currentuser} = useContext(UserContext)

    const handlchange = (e)=>{
        setUsername(e.target.value)
        
    }
    const handlekey = (e)=>{
        if( e.code == "Enter" )  {
            handleSearch()
        }
         
    }


    const handleSearch = async()=>{
        console.log("check");
        const data = query(
            collection(db,"users"),where("displayName", "==", username)
            );
            try{
                const querysnapshot= await getDocs(data);
                querysnapshot.forEach((doc)=>{
                    setUser(doc.data())
                })
            }
            catch(err){
                console.log(err);
            }
        }
    const handleselect = async()=>{
            let combinedId = user.uid>currentuser.uid?user.uid + currentuser.uid:currentuser.uid+user.uid;
            let docRef =  doc(db, 'userChats', currentuser.uid);
            let docRefc = doc(db,'userChats',user.uid);
           let combinedres =  await getDoc(doc(db,"chats",combinedId));
           console.log("combinedres",combinedres);
           if(!combinedres.uid ){
            let userchat = await setDoc(doc(db,"chats",combinedId),{message:[]})
            await updateDoc(docRef, {
               [combinedId+".userinfo"]:{
                uid:user.uid,
                displayName:user.displayName,
                photoURL:user.photoURL
               },
               [combinedId+'.date']:serverTimestamp()

            })
            await updateDoc(docRefc, {
                [combinedId+".userinfo"]:{
                 uid:currentuser.uid,
                 displayName:currentuser.displayName,
                 photoURL:currentuser.photoURL
                },
                [combinedId+'.date']:serverTimestamp()
 
             })    
        }

        setUser(null);
        setUsername('')
       
       
    }
    return(
        <>
        <div className="search">
            <div className="searchForm">
                <input placeholder="search name" onKeyDown={handlekey}
                 value={username}
                 onChange={(e)=>handlchange(e)}/>
                {username &&<span className="searchmobile" style={{float:"right",cursor:"pointer"}} onClick={()=>handleSearch()}><CheckCircleOutlineIcon/></span>}
                
            
            {user &&<div className="searchData" onClick={handleselect}>{user.displayName}</div>
            
            }
            </div>
        </div>
        </>
    )
}

export default Search;