import "./GroupChatShow.css";
import "./GroupChatShowBadge.css";
import "../../Profile/Profile.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChat, leaveChat } from "../../../store/chats";
import { jwtFetch } from "../../../store/jwt";
import { ReactComponent as Edit } from "./SVG/pencil-edit-button-svgrepo-com.svg";

import ActiveUsers from "./ActiveUsers/ActiveUsers";
import ChatLog from "./ChatLog/ChatLog";

function GroupChatShow({ theme, socket }) {
  const [chat, setChat] = useState({});
  const [body, setBody] = useState("");

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState(chat.title);
  const [editDescriptionValue, setEditDescriptionValue] = useState(
    chat.description
  );
  const [activeUsers, setActiveUsers] = useState([]);
  const [chatLog, setChatLog] = useState([]);

  const user = useSelector((state) => state.session.user);
  const chatId = useSelector((state) => state.chats?.chatId);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    socket.on("message-return", () => {
      fetch(`/api/message/${id}`)
        .then((res) => res.json())
        .then((chatLog) => setChatLog(chatLog));
    });
  }, []);

  useEffect(() => {
    if (id !== chatId) {
      socket.emit("chat-leave", { userId: user.username, chatroomId: chatId });
      dispatch(leaveChat());
    }
    socket.emit("chat-join", { userId: user.username, chatroomId: id });
    dispatch(addChat(id));
  }, []);

  useEffect(() => {
    socket.on("user-join", (payload) => {
      setActiveUsers(payload);
    });
    socket.on("user-leave", (payload) => {
      setActiveUsers(payload);
    });
  }, []);

  useEffect(() => {
    fetch(`/api/message/${id}`)
      .then((res) => res.json())
      .then((chatLog) => setChatLog(chatLog));

    fetch(`/api/groupchats/${id}`)
      .then((res) => res.json())
      .then((data) => setChat(data));
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (body.length > 0) {
      jwtFetch(`/api/message/create/${id}`, {
        method: "POST",
        body: JSON.stringify({
          author: user._id,
          authorName: user.username,
          body,
        }),
      })
        .then((res) => res.json())
        .then((chat) => {
          socket.emit("send-message");
          setBody("");
          setChatLog([...chatLog, chat]);
        });
    }
  };

  const handleOnSubmitEditTitle = (e) => {
    e.preventDefault();
    if (user._id === chat.owner) {
      jwtFetch(`/api/groupchats/edit/${chatId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: editTitleValue,
          description: editDescriptionValue,
        }),
      })
        .then((res) => res.json)
        .then((data) => {
          chat.title = editTitleValue;
          chat.description = editDescriptionValue;
          setEditTitle(false);
          setEditDescription(false);
        });
    }
  };

  const handleOnSubmitEditDescription = (e) => {
    e.preventDefault();
    if (user._id === chat.owner) {
      jwtFetch(`/api/groupchats/edit/${chatId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: editTitleValue,
          description: editDescriptionValue,
        }),
      })
        .then((res) => res.json)
        .then((data) => {
          chat.title = editTitleValue;
          chat.description = editDescriptionValue;
          setEditTitle(false);
          setEditDescription(false);
        });
    }
  };

  return (
    <div className="groupchat-main-show" data-theme={theme}>
      <div className="groupchat-show">
        <div className="chat-box">
          <div className="top-chat-box">
            <img
              src="https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99-s1100-c50.jpg"
              alt="temp-pfp"
              className="pfp-chat-top"
            />
            <span id="span-title">
              <div className="badge-group-show title">Title</div>
              {editTitle && (
                <form
                  className="form-edit-chat-info"
                  onSubmit={handleOnSubmitEditTitle}
                >
                  <input
                    className="edit-input"
                    value={editTitleValue}
                    onChange={(e) => setEditTitleValue(e.target.value)}
                  />
                  <button className="confirm-edit" type="submit">
                    Save
                  </button>
                </form>
              )}
              <p id="title">{!editTitle && chat.title}</p>
              <div
                className="edit-icon"
                onClick={(e) => {
                  setEditTitleValue(chat.title);
                  setEditDescriptionValue(chat.description);
                  setEditTitle(editTitle ? false : true);
                }}
              >
                {!editTitle && user._id === chat.owner && (
                  <Edit height="20px" width="20px" className="edit-icon" />
                )}
              </div>
            </span>
            <span id="span-owner">
              <div className="badge-group-show owner">Owner</div>
              <p id="owner">{chat.ownerUsername}</p>
            </span>
            <span>
              <div className="badge-group-show description">Description</div>
              {editDescription && (
                <form
                  className="form-edit-chat-info"
                  onSubmit={handleOnSubmitEditDescription}
                >
                  <input
                    className="edit-input"
                    value={editDescriptionValue}
                    onChange={(e) => setEditDescriptionValue(e.target.value)}
                  />
                  <button className="confirm-edit" type="submit">
                    Save
                  </button>
                </form>
              )}
              <p id="description">{!editDescription && chat.description}</p>
              <div
                className="edit-icon"
                onClick={(e) => {
                  setEditTitleValue(chat.title);
                  setEditDescriptionValue(chat.description);
                  setEditDescription(editDescription ? false : true);
                }}
              >
                {!editDescription && user._id === chat.owner && (
                  <Edit height="20px" width="20px" />
                )}
              </div>
            </span>
          </div>
          <ChatLog chatLog={chatLog} id={id} userId={user._id} key={id} />
          <form className="bottom-chat-box" onSubmit={handleOnSubmit}>
            <input
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="send-message-input"
              placeholder="Send a message..."
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
        <ActiveUsers activeUsers={activeUsers[chatId]} chatId={chatId} />
      </div>
    </div>
  );
}

export default GroupChatShow;
