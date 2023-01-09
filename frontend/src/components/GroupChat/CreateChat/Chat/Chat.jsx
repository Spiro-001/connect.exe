import "./Chat.css";

function Chat() {
  return (
    <div onClick={(e) => console.log(1)} className="chat">
      <img
        src="https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99-s1100-c50.jpg"
        alt="temp-pfp"
        className="pfp-chat"
      />
      <div className="chat-name">Chat-1</div>
    </div>
  );
}

export default Chat;
