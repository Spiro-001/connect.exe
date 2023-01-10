import { Link } from "react-router-dom";
import "./Chat.css";

function Chat({ chatData }) {
  return (
    <Link className="chat" to={`/groupchats/${chatData._id}`}>
      <img
        src="https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99-s1100-c50.jpg"
        alt="temp-pfp"
        className="pfp-chat"
      />
      <div className="chat-name">{chatData.title}</div>
    </Link>
  );
}

export default Chat;
