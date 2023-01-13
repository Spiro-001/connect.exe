import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";

import "./NavBar.css";
import "../Profile/Profile.css";
import { leaveChat } from "../../store/chats";

function NavBar({ theme, socket }) {
  const loggedIn = useSelector((state) => !!state.session.user);
  const user = useSelector((state) => state.session.user);
  const chatId = useSelector((state) => state.chats?.chatId);
  const dispatch = useDispatch();
  const history = useHistory();

  const logo = "connect.exe".toUpperCase();

  const logoutUser = (e) => {
    e.preventDefault();
    socket.emit("chat-leave", { userId: user.username, chatroomId: chatId });
    dispatch(leaveChat());
    dispatch(logout());
    history.push("/login");
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link className="nav-button" to={"/groupchats/all"}>
            Group chats
          </Link>
          <Link className="nav-button" to={"/groupchats/create"}>
            Make a chat
          </Link>
          <Link className="nav-button" to={"/profile"}>
            Profile
          </Link>
          <div className="nav-button" onClick={logoutUser}>
            Logout
          </div>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link className="nav-button" to={"/signup"}>
            Signup
          </Link>
          <Link className="nav-button" to={"/login"}>
            Login
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="top-nav" data-theme={theme}>
      <h1 className="logo">{logo}</h1>
      {getLinks()}
    </div>
  );
}

export default NavBar;
