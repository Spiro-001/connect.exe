import GroupChat from "./Chat/GroupChat";
import "./GroupChatIndex.css";
import "../../Profile/Profile.css";
import { useEffect, useState } from "react";

function GroupChatIndex({ theme }) {
  const [allChat, setAllChats] = useState([]);

  useEffect(() => {
    fetch("/api/groupchats/all")
      .then((res) => res.json())
      .then((data) => setAllChats(data));
  }, []);

  return (
    <div className="main-groupchatindex" data-theme={theme}>
      <div className="groupchat-index">
        {allChat?.map((chatData) => {
          return <GroupChat chatData={chatData} key={chatData._id} />;
        })}
      </div>
    </div>
  );
}

export default GroupChatIndex;
