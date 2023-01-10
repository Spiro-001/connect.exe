import GroupChat from "./Chat/GroupChat";
import "./GroupChatIndex.css";
import "../../Profile/Profile";

function GroupChatIndex({ theme }) {
  return (
    <div className="main-groupchatindex" data-theme={theme}>
      <div className="groupchat-index">
        <GroupChat />
      </div>
    </div>
  );
}

export default GroupChatIndex;
