import { useEffect, useState } from "react";
import "./ChatBubble.css";

function ChatLog({ userId, chatLog }) {
  let previousAuthor = [];

  return (
    <div className="middle-main-chat-show">
      {chatLog?.map((message) => {
        previousAuthor.push(message.author);
        if (message.author === userId) {
          return (
            <div className="message">
              {previousAuthor[previousAuthor.length - 2] !== message.author && (
                <span className="self-username">{message.authorName}</span>
              )}
              <span className="self">{message.body}</span>
            </div>
          );
        } else {
          return (
            <div className="message">
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
