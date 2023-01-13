import { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import "./CreateChat.css";
import "../../Profile/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { jwtFetch } from "../../../store/jwt";
import { useHistory } from "react-router-dom";
import { leaveChat } from "../../../store/chats";

function CreateChat({ theme, socket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openLeftMenu, setOpenLeftMenu] = useState(0);
  const [allChat, setAllChats] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const chatId = useSelector((state) => state.chats?.chatId);

  useEffect(() => {
    fetch("/api/groupchats/all")
      .then((res) => res.json())
      .then((data) => setAllChats(data));
  }, []);

  useEffect(() => {
    socket.emit("chat-leave", {
      userId: user.username,
      chatroomId: chatId,
    });
    dispatch(leaveChat());
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    jwtFetch("/api/groupchats/create", {
      method: "POST",
      body: JSON.stringify({
        owner: user._id,
        ownerUsername: user.username,
        title,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllChats([...allChat, data]);
        setTitle("");
        setDescription("");
        history.push(`/groupchats/${data._id}`);
      });
  };

  return (
    <div className="main-createchat" data-theme={theme}>
      <div className="create-chat">
        <div className="left-menu">
          <div className="title-groupchat">Open chat</div>
          <div className="open-chats">
            {allChat?.map((chatData) => {
              if (chatData.owner === user._id) {
                return <Chat chatData={chatData} key={chatData._id} />;
              }
            })}
          </div>
        </div>
        <form className="start-chat" onSubmit={handleOnSubmit}>
          <div className="top-start-chat">
            <input
              className="top-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title..."
            />
            <input
              className="top-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description..."
            />
          </div>
          <div className="main-start-chat">Start a new chat!</div>
          <div className="bottom-start-chat">
            <input
              type="submit"
              value="Create room"
              className="input-sendmessage"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChat;
