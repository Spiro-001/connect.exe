import { Link } from "react-router-dom";
import "./Chat.css";

function Chat({ chatData, SERVER }) {
  return (
    <Link className="chat" to={`/groupchats/${chatData._id}`}>
      <img
        src={`${SERVER}/api/groupchats/image/${chatData.logo}`}
        alt="temp-pfp"
        className="pfp-chat"
      />
      <div className="chat-name">{chatData.title}</div>
    </Link>
  );
}

export default Chat;
