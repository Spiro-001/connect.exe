import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { chatReducer, secureChatReducer } from "./chats";
import { errorReducer } from "./errors";
import { sessionReducer } from "./session";

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer,
  chats: chatReducer,
  secure_chats: secureChatReducer,
});

let enhancer;
const middlewares = [thunk];

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(...middlewares);
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(...middlewares));
}

export const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};
