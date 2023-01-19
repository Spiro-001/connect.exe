import GroupChat from "./Chat/GroupChat";
import "./GroupChatIndex.css";
import "../../Profile/Profile.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPassChat, leaveChat } from "../../../store/chats";
import BottomNav from "../../BottomNav/BottomNav";
import LoadingChat from "./LoadingChat/LoadingChat";

function GroupChatIndex({ theme, user, socket, SERVER }) {
  const [allChat, setAllChats] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const chatId = useSelector((state) => state.chats?.chatId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPassChat());
    fetch("/api/groupchats/all")
      .then((res) => res.json())
      .then((data) => {
        setLoaded(true);
        setAllChats(data);
      });
  }, []);

  useEffect(() => {
    socket.emit("chat-leave", { userId: user.username, chatroomId: chatId });
    dispatch(leaveChat());
  }, []);

  return (
    <>
      <div className="main-groupchatindex" data-theme={theme}>
        <div className="groupchat-index">
          {!loaded && <LoadingChat />}
          {loaded && allChat.length === 0 ? (
            <h1 id="no-chats">No chats available, create one now!</h1>
          ) : (
            allChat.map((chatData) => {
              if (chatData.owner === user._id) {
                return (
                  <GroupChat
                    chatData={chatData}
                    key={chatData._id}
                    user={user}
                    setAllChats={setAllChats}
                    allChat={allChat}
                    confirmDelete={confirmDelete}
                    setConfirmDelete={setConfirmDelete}
                    socket={socket}
                    SERVER={SERVER}
                  />
                );
              } else {
                if (!chatData.visible) {
                  return null;
                } else {
                  return (
                    <GroupChat
                      chatData={chatData}
                      key={chatData._id}
                      user={user}
                      setAllChats={setAllChats}
                      allChat={allChat}
                      confirmDelete={confirmDelete}
                      setConfirmDelete={setConfirmDelete}
                      socket={socket}
                      SERVER={SERVER}
                    />
                  );
                }
              }
            })
          )}
        </div>
      </div>
      <BottomNav theme={theme} />
    </>
  );
}

export default GroupChatIndex;
