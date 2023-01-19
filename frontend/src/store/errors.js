import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session";
import { chatErrorsReducer } from "./chats";

export const errorReducer = combineReducers({
  session: sessionErrorsReducer,
  chat: chatErrorsReducer,
});
