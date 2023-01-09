import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../Routes/Routes";

import "./Profile.css";

function Profile() {
  const user = useSelector((state) => state.session.user);

  return (
    <Switch>
      <ProtectedRoute exact path="/profile">
        <div className="profile-div">
          <h1>{user.username}</h1>
          <h1>{user.email}</h1>
        </div>
      </ProtectedRoute>
    </Switch>
  );
}

export default Profile;
