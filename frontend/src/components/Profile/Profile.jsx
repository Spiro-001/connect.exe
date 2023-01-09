import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../Routes/Routes";
import { clearSessionErrors, editUser } from "../../store/session";

import "./Profile.css";
import { useEffect, useState } from "react";

function Profile() {
  const user = useSelector((state) => state.session.user);

  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [openEdit, setOpenEdit] = useState("none");

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const handleOnSubmitEdit = (e) => {
    let email = user.email;
    setOpenEdit("none");
    setPassword("");
    e.preventDefault();
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
  };

  return (
    <Switch>
      <ProtectedRoute exact path="/profile">
        <div className="main-profile">
          <div className="profile-div">
            <div className="user-info">
              <h1>{user.username}</h1>
              <h1>{user.email}</h1>
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
                <input type="submit" value="edit" />
              </form>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Switch>
  );
}

export default Profile;
