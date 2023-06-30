import { createContext, useContext, useReducer } from "react";
import { UserContext } from "./userContext";

export const ChatContext = createContext();

export const ChatcontextProvider = ({ children }) => {

    const {currentuser} = useContext(UserContext)
  let intialState = {
    chatid: "",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_CHAT":
        state.user = action.payload;
        state.chatid = currentuser.uid +action.payload.uid;
        return state;
      default:
        return state;
    }
  };

  const [state,dispatch] = useReducer(chatReducer,intialState)

  return <ChatContext.Provider value={{data:state,dispatch}}>{children}</ChatContext.Provider>;
};
