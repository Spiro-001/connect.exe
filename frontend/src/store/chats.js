import { jwtFetch } from "./jwt";

const CURRENT_CHAT = "chats/CURRENT_CHAT";
const REMOVE_CHAT = "chats/REMOVE_CHAT";
const ADD_PASSWORD_CHAT = "chats/ADD_PASSWORD_CHAT";

const RECEIVE_CHAT_ERRORS = "chats/RECEIVE_CHAT_ERRORS";
const CLEAR_CHAT_ERRORS = "chats/CLEAR_CHAT_ERRORS";
const CLEAR_PASSWORD_CHAT = "chats/CLEAR_PASSWORD_CHAT";

// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentChat = (chatId) => ({
  type: CURRENT_CHAT,
  payload: chatId,
});

const removeCurrentChat = () => ({
  type: REMOVE_CHAT,
});

const receiveChatErrors = (errors) => ({
  type: RECEIVE_CHAT_ERRORS,
  payload: errors,
});

export const clearChatErrors = () => ({
  type: CLEAR_CHAT_ERRORS,
});

const addPasswordChat = (chatId) => ({
  type: ADD_PASSWORD_CHAT,
  payload: chatId,
});

const clearPasswordChat = () => ({
  type: CLEAR_PASSWORD_CHAT,
});

export const addError = (error) => async (dispatch) => {
  try {
    return dispatch(receiveChatErrors(error));
  } catch (err) {
    return err;
  }
};

export const addPassChat = (payload) => async (dispatch) => {
  try {
    return dispatch(clearPasswordChat());
  } catch (err) {
    return err;
  }
};

export const clearPassChat = (payload) => async (dispatch) => {
  try {
    return dispatch(clearPassChat(payload));
  } catch (err) {
    return err;
  }
};

export const addChat = (payload) => async (dispatch) => {
  try {
    return dispatch(receiveCurrentChat(payload));
  } catch (err) {
    return err;
  }
};

export const leaveChat = (payload) => async (dispatch) => {
  try {
    return dispatch(removeCurrentChat(payload));
  } catch (err) {
    return err;
  }
};

const initialState = {
  chat: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_CHAT:
      return { chatId: action.payload };
    case REMOVE_CHAT:
      return null;
    default:
      return state;
  }
};

const initialSecureState = {
  secure_chat: null,
};

export const secureChatReducer = (state = initialSecureState, action) => {
  switch (action.type) {
    case ADD_PASSWORD_CHAT:
      return { p_chatId: action.payload };
    case CLEAR_PASSWORD_CHAT:
      return initialSecureState;
    default:
      return state;
  }
};

const nullErrors = null;

export const chatErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_CHAT_ERRORS:
      return { ...state, ...action.payload };
    case CLEAR_CHAT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};
