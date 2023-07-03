import { createContext, useContext, useReducer } from "react";
import { UserContext } from "./userContext";

export const ChatContext = createContext();

export const ChatcontextProvider = ({ children }) => {

    const {currentuser} = useContext(UserContext)
  let intialState = {
    chatid: '',
    user: {},
    availableuser:false
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_CHAT":
        return{
          availableuser:true,
          user : action.payload,
          chatid:action.payload.uid>currentuser.uid?action.payload.uid + currentuser.uid:
                    currentuser.uid+action.payload.uid

        }
        
      default:
        return state;
    }
  };

  const [state,dispatch] = useReducer(chatReducer,intialState)

  return <ChatContext.Provider value={{data:state,dispatch}}>{children}</ChatContext.Provider>;
};
