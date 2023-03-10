import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearSessionErrors } from "../../store/session";

import "./SessionForm.css";
import "../Profile/Profile.css";

function SignupForm({ theme }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const usernameSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };

    dispatch(signup(user));
  };

  return (
    <div className="session-container" data-theme={theme}>
      <form className="session-form" onSubmit={usernameSubmit}>
        <h2>Sign Up Form</h2>
        <div className="email-section">
          <label>
            {/* <span>Email</span> */}
            <input
              type="text"
              value={email}
              onChange={update("email")}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.email}</div>
        </div>
        <div className="username-section">
          <label>
            {/* <span>Username</span> */}
            <input
              type="text"
              value={username}
              onChange={update("username")}
              placeholder="Username"
            />
          </label>
          <div className="errors">{errors?.username}</div>
        </div>
        <div className="password-section">
          <label>
            {/* <span>Password</span> */}
            <input
              type="password"
              value={password}
              onChange={update("password")}
              placeholder="Password"
            />
          </label>
          <div className="errors">{errors?.password}</div>
        </div>
        <div className="confirm-password-section">
          <label>
            {/* <span>Confirm Password</span> */}
            <input
              type="password"
              value={password2}
              onChange={update("password2")}
              placeholder="Confirm Password"
            />
          </label>
          <div className="errors">
            {password !== password2 && "Confirm Password field must match"}
          </div>
        </div>
        <input
          className="button-form"
          type="submit"
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}
        />
      </form>
    </div>
  );
}

export default SignupForm;
