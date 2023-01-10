import "./ActiveUsers.css";
import "./ActiveUsersBadge.css";
import "../../../Profile/Profile.css";

function ActiveUsers() {
  return (
    <div className="users-in-chat">
      <h1 className="active-users-title">Active Users</h1>
      <ul className="active-user-list">
        <li className="badge-active-user">dk0209</li>
        <li className="badge-active-user">tg1113</li>
      </ul>
    </div>
  );
}

export default ActiveUsers;
