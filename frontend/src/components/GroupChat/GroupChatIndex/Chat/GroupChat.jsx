import "./GroupChat.css";
import "./GroupChatBadge.css";
import "../../../Profile/Profile.css";

import { Link, useHistory } from "react-router-dom";
import { jwtFetch } from "../../../../store/jwt";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addError,
  addPassChat,
  clearChatErrors,
} from "../../../../store/chats";
import { ReactComponent as Lock } from "./SVG/icons8-lock.svg";

function GroupChat({
  chatData,
  user,
  setAllChats,
  allChat,
  confirmDelete,
  setConfirmDelete,
  SERVER,
}) {
  const chatError = useSelector((state) => state.errors.chat);

  const [openChatPassword, setOpenChatPassword] = useState(false);
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnClickDelete = () => {
    setConfirmDelete(false);
    if (chatData.logo !== "c-logo.png") {
      jwtFetch(`/api/groupchats/image/delete/${chatData.logo}`, {
        method: "DELETE",
      });
    }

    jwtFetch(`/api/groupchats/delete/${chatData._id}`, {
      method: "DELETE",
    });
    let tempChats = allChat;
    allChat.forEach((chat, i) => {
      if (chat._id === chatData._id) {
        tempChats.splice(i, 1);
      }
    });
    setAllChats([...tempChats]);
  };

  const handlePasswordCheck = (e) => {
    if (chatData.password) {
      e.preventDefault();
      setOpenChatPassword(chatData._id);
    }
  };

  const handleEnterChatRoomWithPassword = (e) => {
    if (password === chatData.password) {
      dispatch(clearChatErrors());
      dispatch(addPassChat(chatData._id));
      history.push(`/groupchats/${chatData._id}`);
    } else {
      dispatch(clearChatErrors());
      dispatch(addError({ invalid_password: "Incorrect Password" }));
    }
  };

  return (
    <>
      <div className="group-chat-container">
        <Link
          className="group-chat"
          to={`/groupchats/${chatData._id}`}
          onClick={handlePasswordCheck}
        >
          <div className="top-groupchat">
            <img
              src={`${SERVER}/api/groupchats/image/${chatData.logo}`}
              alt=""
              className="pfp-group-chat"
            />
            <div className="group-chat-name">{chatData.title}</div>
          </div>
          <div className="group-description">
            <span className="badge description">Description</span>
            <p className="description-body">{chatData.description}</p>
          </div>
          <div className="bottom-groupchat">
            {chatData.password && (
              <p id="password-protected">
                <Lock className="password-lock-svg" />
              </p>
            )}
            <div className="badges">
              {chatData?.tags.map((tag) => {
                return <div className="badge mini">{tag.text}</div>;
              })}
            </div>
          </div>
        </Link>
        {chatData.owner === user._id && (
          <div
            className="delete-groupchat"
            onClick={(e) => setConfirmDelete(chatData._id)}
          >
            ×
          </div>
        )}
      </div>
      {confirmDelete === chatData._id && (
        <>
          <div className="blur-background"></div>
          <div className="confirm-delete-modal">
            <p id="warning">You are about to delete "{chatData.title}".</p>
            <div className="options-confirm">
              <span id="yes" onClick={handleOnClickDelete}>
                Confirm
              </span>
              <span id="no" onClick={(e) => setConfirmDelete(false)}>
                Cancel
              </span>
            </div>
          </div>
        </>
      )}
      {openChatPassword === chatData._id && (
        <>
          <div className="blur-background"></div>
          <div className="confirm-delete-modal">
            <p id="warning">Enter Password for "{chatData.title}".</p>
            {chatError?.invalid_password}
            <input
              className="password-chat-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="options-confirm">
              <span id="yes" onClick={handleEnterChatRoomWithPassword}>
                Confirm
              </span>
              <span
                id="no"
                onClick={(e) => {
                  dispatch(clearChatErrors());
                  setOpenChatPassword(false);
                  setPassword("");
                }}
              >
                Cancel
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GroupChat;
