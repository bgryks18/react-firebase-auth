import React, { useId, useState, useEffect } from "react";
import firebase, { login } from "../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth";
import { useNavigate } from "react-router";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailId = useId();
  const passwordId = useId();
  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    toast(result.message, { type: result.type as any });
    if (result.type !== "error") {
      dispatch(setUser(result?.user));
      navigate("/", {
        replace: true,
      });
    }
  };
  useEffect(() => {
    if (user) {
      toast("Redirected the home page.", {
        type: "info",
        autoClose: 1000,
      });
      navigate("/", {
        replace: true,
      });
    }
  }, [navigate]);
  return (
    <div className="form-container">
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <Link to="/register" className="link">
            Register
          </Link>
          <div className="form-control">
            <label htmlFor={emailId}>Email</label>
            <input
              type="text"
              name="email"
              id={emailId}
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor={passwordId}>Password</label>
            <input
              type="password"
              name="password"
              id={passwordId}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
