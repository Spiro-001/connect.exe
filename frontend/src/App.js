import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, useHistory } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";

import { getCurrentUser } from "./store/session";
import GroupChat from "./components/GroupChat/GroupChat";
import Profile from "./components/Profile/Profile";

import { io } from "socket.io-client";

import "./App.css";

import useLocalStorage from "use-local-storage";
import { leaveChat } from "./store/chats";

export function App() {
  const user = useSelector((state) => state.session.user);
  const chatId = useSelector((state) => state.chats?.chatId);
  const history = useHistory();

  const socket = io();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("disconnected", () => {
      socket.emit("test-disconnect");
      socket.emit("chat-leave", {
        userId: user.username,
        chatroomId: chatId,
      });
      dispatch(leaveChat());
    });
  }, []);

  const defaultDark = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar theme={theme} socket={socket} />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} theme={theme} />
          <AuthRoute exact path="/login" component={LoginForm} theme={theme} />
          <AuthRoute
            exact
            path="/signup"
            component={SignupForm}
            theme={theme}
          />
          <ProtectedRoute
            path="/groupchats"
            component={GroupChat}
            theme={theme}
            socket={socket}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            theme={theme}
            setTheme={setTheme}
            socket={socket}
          />
        </Switch>
      </>
    )
  );
}
