import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../Routes/Routes";
import { clearSessionErrors, editUser, login } from "../../store/session";
import { useEffect, useState } from "react";

import "./Profile.css";
import "./ProfileBadge.css";

function Profile({ theme, setTheme }) {
  console.log(theme);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const user = useSelector((state) => state.session.user);
  const errors = useSelector((state) => state.errors.session);

  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [openEdit, setOpenEdit] = useState("none");

  const dispatch = useDispatch();

  const handleOnSubmitEdit = (e) => {
    dispatch(clearSessionErrors());
    let email = user.email;
    setPassword("");
    e.preventDefault();
    dispatch(login({ email, password })).then((res) => {
      if (res.type === "session/RECEIVE_CURRENT_USER") {
        dispatch(
          editUser({
            currentUser: {
              email,
              password,
            },
            editUser: {
              username,
              email,
            },
          })
        );
        setOpenEdit("none");
      }
    });
  };

  return (
    <Switch>
      <ProtectedRoute exact path="/profile">
        <div className="main-profile" data-theme={theme}>
          <div className="profile-div">
            <div className="user-info">
              <div className="profile-username">
                <div className="badge-profile username">Username</div>
                <span id="username">{user.username}</span>
              </div>
              <div className="profile-email">
                <div className="badge-profile email">Email</div>
                <span id="email">{user.email}</span>
              </div>
              <div
                className="edit-div"
                onClick={(e) =>
                  openEdit === "none"
                    ? setOpenEdit("flex")
                    : setOpenEdit("none")
                }
              >
                Edit
              </div>
              <form onSubmit={handleOnSubmitEdit} style={{ display: openEdit }}>
                <input
                  type="text"
                  value={username}
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  value={email}
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  value={password}
                  placeholder="passsword"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>{errors?.email}</label>
                <label>{errors?.password}</label>
                <input type="submit" value="edit" />
              </form>
              <button onClick={switchTheme}>
                Switch to {theme === "light" ? "dark" : "light"} Theme
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Switch>
  );
}

export default Profile;
