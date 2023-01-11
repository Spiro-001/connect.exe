import GroupChat from "./Chat/GroupChat";
import "./GroupChatIndex.css";
import "../../Profile/Profile.css";
import { useEffect, useState } from "react";

function GroupChatIndex({ theme, user }) {
  const [allChat, setAllChats] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetch("/api/groupchats/all")
      .then((res) => res.json())
      .then((data) => setAllChats(data));
  }, []);

  return (
    <div className="main-groupchatindex" data-theme={theme}>
      <div className="groupchat-index">
        {allChat?.map((chatData) => {
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
        })}
      </div>
    </div>
  );
}

export default GroupChatIndex;
