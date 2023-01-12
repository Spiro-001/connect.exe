import GroupChat from "./Chat/GroupChat";
import "./GroupChatIndex.css";
import "../../Profile/Profile.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaveChat } from "../../../store/chats";
import BottomNav from "../../BottomNav/BottomNav";

function GroupChatIndex({ theme, user, socket }) {
  const [allChat, setAllChats] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const chatId = useSelector((state) => state.chats?.chatId);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/groupchats/all")
      .then((res) => res.json())
      .then((data) => setAllChats(data));
  }, []);

  useEffect(() => {
    socket.emit("chat-leave", { userId: user.username, chatroomId: chatId });
    dispatch(leaveChat());
  }, []);

  return (
    <>
      <div className="main-groupchatindex" data-theme={theme}>
        <div className="groupchat-index">
          {allChat.length === 0 ? (
            <h1 id="no-chats">No chats available, create one now!</h1>
          ) : (
            allChat.map((chatData) => {
              return (
                <GroupChat
                  chatData={chatData}
                  key={chatData._id}
                  user={user}
                  setAllChats={setAllChats}
                  allChat={allChat}
                  confirmDelete={confirmDelete}
                  setConfirmDelete={setConfirmDelete}
                />
              );
            })
          )}
        </div>
      </div>
      <BottomNav theme={theme} />
    </>
  );
}

export default GroupChatIndex;
