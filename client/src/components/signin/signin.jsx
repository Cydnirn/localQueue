import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./signin.css";
import api from "../api";
import {
  SignInButton,
  SubmitButtonGoogle,
} from "@components/buttonList/buttonList";
import axios from "@api/axios";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";

function SignIn() {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const signInWithGoogle = () => {
    window.open(
      `${api}/user/auth/google`,
      "_self",
      "toolbar=no, scrollbars=yes, resizeable=no, width=auto, height=auto"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/user/login",
        { password: password, username: username },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(res?.data));
      if (res?.data?.message === "Auth Success") {
        const jwtCookie = Cookies.get("jwt");
        setAuth({
          username: username,
          password: password,
          accessToken: jwtCookie,
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err);
      setErrMsg(err?.response?.data?.message);
      errRef.current.focus();
    }
  };

  return (
    <div className="formBodySign">
      <div className="navLog"></div>

      <div className="wrapper-form">
        <p
          ref={errRef}
          className={errMsg ? "errMsg" : "none"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="header">
          <h2>Sign In</h2>
        </div>
        <form className="form-sign" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-contain">
              <input
                type="text"
                id="username"
                name="username"
                ref={userRef}
                placeholder="Username"
                className="form-input"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="form-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <SignInButton
              type="submit"
              disabled={!username || !password ? true : false}
            />
            <div className="line">
              <hr />
              <span className="line-caption">OR</span>
              <hr />
            </div>
            <SubmitButtonGoogle onClick={signInWithGoogle} />
            <p>
              Don't have an account?<Link to={"/auth/signup"}>Sign Up</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
