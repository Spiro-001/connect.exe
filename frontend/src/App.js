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

import "./App.css";
import BottomNav from "./components/BottomNav/BottomNav";

import useLocalStorage from "use-local-storage";

export function App() {
  const history = useHistory();

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
        <NavBar theme={theme} />
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
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            theme={theme}
            setTheme={setTheme}
          />
        </Switch>
        <BottomNav theme={theme} />
      </>
    )
  );
}
