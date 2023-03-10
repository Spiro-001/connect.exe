import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";

import { login, clearSessionErrors } from "../../store/session";

function LoginForm({ theme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="session-container" data-theme={theme}>
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Log In Form</h2>
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
        <input
          className="button-form"
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
      </form>
    </div>
  );
}

export default LoginForm;
