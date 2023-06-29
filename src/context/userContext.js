import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

export const UserContextprovider = ({ children }) => {
  const [currentuser, setCurrentuser] = useState({});

  useEffect(() => {
   let unsub =  onAuthStateChanged(auth, (user) => {
      setCurrentuser(user);
    });
    return ()=>{
        unsub()
    }
  }, []);
  return ( 
    <UserContext.Provider value={{ currentuser }}>
      {children}
    </UserContext.Provider>
  );
};
