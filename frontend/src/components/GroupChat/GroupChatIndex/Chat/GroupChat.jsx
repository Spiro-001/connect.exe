import "./GroupChat.css";
import "./GroupChatBadge.css";
import "../../../Profile/Profile";
import { Link } from "react-router-dom";

function GroupChat({ chatData }) {
  return (
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
  );
}

export default GroupChat;
