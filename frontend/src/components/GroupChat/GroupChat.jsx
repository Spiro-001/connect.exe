import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../Routes/Routes";

function GroupChat() {
  return (
    <Switch>
      <ProtectedRoute exact path="/groupchats/create">
        <h1>CREATE</h1>
      </ProtectedRoute>
      <ProtectedRoute exact path="/groupchats/all">
        <h1>ALL</h1>
      </ProtectedRoute>
    </Switch>
  );
}

export default GroupChat;
