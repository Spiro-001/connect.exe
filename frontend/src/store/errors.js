import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session";

export const errorReducer = combineReducers({
  session: sessionErrorsReducer,
});
