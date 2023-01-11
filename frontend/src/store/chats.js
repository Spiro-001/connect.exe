import { jwtFetch } from "./jwt";

const CURRENT_CHAT = "chats/CURRENT_CHAT";
const REMOVE_CHAT = "chats/REMOVE_CHAT";

// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentChat = (chatId) => ({
  type: CURRENT_CHAT,
  payload: chatId,
});

const removeCurrentChat = () => ({
  type: REMOVE_CHAT,
});

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
