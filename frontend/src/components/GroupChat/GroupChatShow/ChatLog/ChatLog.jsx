import { useMemo, useState } from "react";
import { useEffect, useRef } from "react";
import { jwtFetch } from "../../../../store/jwt";

import "./ChatBubble.css";

function ChatLog({ userId, chatLog, socket, userTyping, userState }) {
  let previousAuthor = [];
  const uniqueAuthor = useRef([]);
  const chatWindow = useRef(null);
  const messages = useRef({});

  const [loading, setLoading] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);

  useEffect(() => {
    if (chatWindow.current) {
      chatWindow.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  });

  useEffect(() => {
    socket.on("other-typing", (user) => {
      console.log(userState.username, user.user);
      if (userState.username !== user.user) {
        setOtherTyping(true);
      }
    });

    socket.on("other-stop-typing", (user) => {
      if (userState.username !== user.user) {
        setOtherTyping(false);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (uniqueAuthor) {
      chatLog.forEach((message) => {
        if (!uniqueAuthor.current.includes(message.author))
          uniqueAuthor.current.push(message.author);
      });

      uniqueAuthor.current.forEach((user_Id) => {
        jwtFetch(`/api/users/user/${user_Id}`)
          .then((res) => res.json())
          .then((user) => {
            messages.current[user._id] = user.username;
            setLoading(true);
          });
      });
    }
  }, [chatLog, userId, loading]);

  return (
    <div className="middle-main-chat-show" ref={chatWindow}>
      {loading && (
        <>
          {chatLog?.map((message) => {
            previousAuthor.push(message.author);
            if (message.author === userId) {
              return (
                <div className="message" key={message._id}>
                  {previousAuthor[previousAuthor.length - 2] !==
                    message.author && (
                    <span className="self-username">
                      {messages.current[message.author]}
                    </span>
                  )}
                  <span className="self">{message.body}</span>
                </div>
              );
            } else {
              return (
                <div className="message" key={message._id}>
                  {previousAuthor[previousAuthor.length - 2] !==
                    message.author && (
                    <span className="other-username">
                      {messages.current.hasOwnProperty(message.author)
                        ? messages.current[message.author]
                        : "loading"}
                    </span>
                  )}
                  <span className="other">{message.body}</span>
                </div>
              );
            }
          })}
        </>
      )}
      {userTyping && (
        <div className="self" id="typing">
          <span id="first-dot">●</span>
          <span id="second-dot">●</span>
          <span id="third-dot">●</span>
        </div>
      )}
      {otherTyping && (
        <div className="other" id="typing">
          <span id="first-dot">●</span>
          <span id="second-dot">●</span>
          <span id="third-dot">●</span>
        </div>
      )}
    </div>
  );
}

export default ChatLog;
