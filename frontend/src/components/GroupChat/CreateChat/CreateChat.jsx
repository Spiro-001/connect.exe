import { useState } from "react";
import Chat from "./Chat/Chat";
import "./CreateChat.css";
import "../../Profile/Profile";

function CreateChat({ theme }) {
  const [openLeftMenu, setOpenLeftMenu] = useState(0);

  return (
    <div className="main-createchat" data-theme={theme}>
      <div className="create-chat">
        <div
          className="left-menu"
          style={{ minWidth: `${openLeftMenu}px`, opacity: openLeftMenu }}
        >
          <div
            className="title-groupchat"
            onClick={(e) =>
              openLeftMenu === 0 ? setOpenLeftMenu(384) : setOpenLeftMenu(0)
            }
          >
            Open chat
          </div>
          <div className="open-chats">
            <Chat />
            <Chat />
            <Chat />
          </div>
        </div>
        <div className="start-chat">
          <div className="top-start-chat">
            Add a friend to the conversation...
          </div>
          <div className="main-start-chat">Start a new chat!</div>
          <div className="bottom-start-chat">
            <input
              className="input-sendmessage"
              placeholder="Send a message..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateChat;
