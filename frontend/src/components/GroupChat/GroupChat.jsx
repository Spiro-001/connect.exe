import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../Routes/Routes";
import CreateChat from "./CreateChat/CreateChat";
import GroupChatIndex from "./GroupChatIndex/GroupChatIndex";
import GroupChatShow from "./GroupChatShow/GroupChatShow";

function GroupChat({ theme, socket }) {
  const user = useSelector((state) => state.session.user);
  // const SERVER = "https://teamtalk.onrender.com";
  const SERVER = "";

  return (
    <Switch>
      <ProtectedRoute exact path="/groupchats/create">
        <CreateChat theme={theme} socket={socket} SERVER={SERVER} />
      </ProtectedRoute>
      <ProtectedRoute exact path="/groupchats/all">
        <GroupChatIndex
          theme={theme}
          user={user}
          socket={socket}
          SERVER={SERVER}
        />
      </ProtectedRoute>
      <ProtectedRoute exact path={"/groupchats/:id"}>
        <GroupChatShow theme={theme} socket={socket} SERVER={SERVER} />
      </ProtectedRoute>
    </Switch>
  );
}

export default GroupChat;
