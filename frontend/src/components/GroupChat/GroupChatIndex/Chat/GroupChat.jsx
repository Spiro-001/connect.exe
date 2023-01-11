import "./GroupChat.css";
import "./GroupChatBadge.css";
import "../../../Profile/Profile.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtFetch } from "../../../../store/jwt";

function GroupChat({
  chatData,
  user,
  setAllChats,
  allChat,
  confirmDelete,
  setConfirmDelete,
}) {
  const handleOnClickDelete = () => {
    setConfirmDelete(false);
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

  return (
    <>
      <div className="group-chat-container">
        <Link className="group-chat" to={`/groupchats/${chatData._id}`}>
          <div className="top-groupchat">
            <img
              src="https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99-s1100-c50.jpg"
              alt="temp-pfp"
              className="pfp-group-chat"
            />
            <div className="group-chat-name">{chatData.title}</div>
          </div>
          <div className="group-description">
            <span className="badge description">Description</span>
            <p className="description-body">{chatData.description}</p>
          </div>
          <div className="bottom-groupchat">
            <div className="badge mini">Animals</div>
            <div className="badge mini">Pictures</div>
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
      )}
    </>
  );
}

export default GroupChat;
