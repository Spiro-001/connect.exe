import "./GroupChatShow.css";
import "./GroupChatShowBadge.css";
import "../../Profile/Profile.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatLog from "./ChatLog/ChatLog";
import { jwtFetch } from "../../../store/jwt";
import { useSelector } from "react-redux";
import ActiveUsers from "./ActiveUsers/ActiveUsers";

function GroupChatShow({ theme }) {
  const [chat, setChat] = useState({});
  const [body, setBody] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/message/${id}`)
      .then((res) => res.json())
      .then((chatLog) => setChatLog(chatLog));
  }, []);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    fetch(`/api/groupchats/${id}`)
      .then((res) => res.json())
      .then((data) => setChat(data));
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
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
        setBody("");
        setChatLog([...chatLog, chat]);
      });
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
            <span>
              <div className="badge-group-show title">Title</div>
              {chat.title}
            </span>
            <span>
              <div className="badge-group-show description">Description</div>
              {chat.description}
            </span>
            <span>
              <div className="badge-group-show owner">Owner</div>
              {chat.ownerUsername}
            </span>
          </div>
          <ChatLog chatLog={chatLog} id={id} userId={user._id} />
          <div className="bottom-chat-box">
            <input
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="send-message-input"
              placeholder="Send a message..."
            />
            <button onClick={handleOnSubmit} className="send-button">
              Send
            </button>
          </div>
        </div>
        <ActiveUsers />
      </div>
    </div>
  );
}

export default GroupChatShow;
