import "./ActiveUsers.css";
import "./ActiveUsersBadge.css";
import "../../../Profile/Profile.css";

function ActiveUsers({ activeUsers, chatId }) {
  return (
    <div className="users-in-chat">
      <h1 className="active-users-title">Active Users</h1>
      <ul className="active-user-list">
        {activeUsers?.map((user) => {
          return (
            <li className="badge-active-user" key={user}>
              {user}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ActiveUsers;
