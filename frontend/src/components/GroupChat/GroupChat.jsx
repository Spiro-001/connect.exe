import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../Routes/Routes";
import CreateChat from "./CreateChat/CreateChat";
import GroupChatIndex from "./GroupChatIndex/GroupChatIndex";
import GroupChatShow from "./GroupChatShow/GroupChatShow";

function GroupChat({ theme, socket }) {
  return (
    <Switch>
      <ProtectedRoute exact path="/groupchats/create">
        <CreateChat theme={theme} />
      </ProtectedRoute>
      <ProtectedRoute exact path="/groupchats/all">
        <GroupChatIndex theme={theme} />
      </ProtectedRoute>
      <ProtectedRoute exact path={"/groupchats/:id"}>
        <GroupChatShow theme={theme} socket={socket} />
      </ProtectedRoute>
    </Switch>
  );
}

export default GroupChat;
