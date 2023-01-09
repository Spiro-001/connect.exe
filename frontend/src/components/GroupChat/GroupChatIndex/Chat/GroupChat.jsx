import "./GroupChat.css";
import "./GroupChatBadge.css";

function GroupChat() {
  return (
    <div onClick={(e) => console.log(1)} className="group-chat">
      <div className="top-groupchat">
        <img
          src="https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99-s1100-c50.jpg"
          alt="temp-pfp"
          className="pfp-group-chat"
        />
        <div className="group-chat-name">Chat-1</div>
      </div>
      <div className="group-description">
        <span class="badge description">Description</span>
        <p className="description-body">New group chat...</p>
      </div>
      <div className="bottom-groupchat">
        <div className="badge mini">Animals</div>
        <div className="badge mini">Pictures</div>
      </div>
    </div>
  );
}

export default GroupChat;
