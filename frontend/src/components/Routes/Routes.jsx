import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthRoute = ({
  component: Component,
  path,
  exact,
  theme,
  setTheme,
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
          <Redirect to="/main" />
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

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} theme={theme} setTheme={setTheme} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
