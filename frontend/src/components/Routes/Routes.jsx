import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useEffect } from "react";

export const AuthRoute = ({
  component: Component,
  path,
  exact,
  theme,
  setTheme,
  socket,
}) => {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !loggedIn ? (
          <Component {...props} theme={theme} setTheme={setTheme} />
        ) : (
          <Redirect to="/groupchats/all" />
        )
      }
    />
  );
};

export const ProtectedRoute = ({
  component: Component,
  theme,
  setTheme,
  ...rest
}) => {
  const loggedIn = useSelector((state) => !!state.session.user);
  const user = useSelector((state) => state.session.user);
  const socket = io();

  useEffect(() => {
    socket.on("connection", (socket) => {});
    socket.on("disconnected", () => {
      console.log("user-disconnected");
    });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component
            {...props}
            theme={theme}
            setTheme={setTheme}
            socket={socket}
          />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
