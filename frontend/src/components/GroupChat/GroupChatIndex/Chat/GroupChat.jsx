import "./GroupChat.css";
import "./GroupChatBadge.css";
import "../../../Profile/Profile.css";
import { Link } from "react-router-dom";
import { jwtFetch } from "../../../../store/jwt";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaveChat } from "../../../../store/chats";

function GroupChat({
  chatData,
  user,
  setAllChats,
  allChat,
  confirmDelete,
  setConfirmDelete,
  socket,
}) {
  const handleOnClickDelete = () => {
    setConfirmDelete(false);

    jwtFetch(`/api/groupchats/image/delete/${chatData.logo}`, {
      method: "DELETE",
    }).then((res) => console.log(res));

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
              src={`http://localhost:5000/api/groupchats/image/${chatData.logo}`}
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
    </>
  );
}

export default GroupChat;
