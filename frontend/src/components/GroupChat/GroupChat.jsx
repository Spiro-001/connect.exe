import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../Routes/Routes";
import CreateChat from "./CreateChat/CreateChat";
import GroupChatIndex from "./GroupChatIndex/GroupChatIndex";

function GroupChat() {
  return (
    <Switch>
      <ProtectedRoute exact path="/groupchats/create">
        <CreateChat />
      </ProtectedRoute>
      <ProtectedRoute exact path="/groupchats/all">
        <GroupChatIndex />
      </ProtectedRoute>
    </Switch>
  );
}

export default GroupChat;
