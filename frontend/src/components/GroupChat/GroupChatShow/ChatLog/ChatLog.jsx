import { useEffect, useRef } from "react";
import "./ChatBubble.css";

function ChatLog({ userId, chatLog }) {
  let previousAuthor = [];
  const chatWindow = useRef(null);

  useEffect(() => {
    if (chatWindow) {
      chatWindow.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  });

  return (
    <div className="middle-main-chat-show" ref={chatWindow}>
      {chatLog?.map((message) => {
        previousAuthor.push(message.author);
        if (message.author === userId) {
          return (
            <div className="message" key={message._id}>
              {previousAuthor[previousAuthor.length - 2] !== message.author && (
                <span className="self-username">{message.authorName}</span>
              )}
              <span className="self">{message.body}</span>
            </div>
          );
        } else {
          return (
            <div className="message" key={message._id}>
              {previousAuthor[previousAuthor.length - 2] !== message.author && (
                <span className="other-username">{message.authorName}</span>
              )}
              <span className="other">{message.body}</span>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ChatLog;
