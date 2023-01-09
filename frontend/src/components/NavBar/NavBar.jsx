import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUser = (e) => {
    e.preventDefault();
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
    <div className="top-nav">
      <h1 className="logo">Team Talk</h1>
      {getLinks()}
    </div>
  );
}

export default NavBar;
