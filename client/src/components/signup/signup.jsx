import React, { useState, useEffect, useRef } from "react";
import "./signup.css";
import api from "../api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SignUpButton,
  SubmitButtonGoogle,
} from "@components/buttonList/buttonList";
import axios from "@api/axios";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";

import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9]{2,23}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,63})+$/;
const PWD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[&*$#@%_-])[0-9a-zA-Z&*$#@%_-]{8,24}$/;

function SignUp() {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confPassword, setConfPassword] = useState("");
  const [validConf, setValidConf] = useState(false);
  const [confFocus, setConfFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const res = USER_REGEX.test(username);
    setValidName(res);
  }, [username]);

  useEffect(() => {
    const res = EMAIL_REGEX.test(email);
    setValidEmail(res);
  }, [email]);

  useEffect(() => {
    const res = PWD_REGEX.test(password);
    setValidPwd(res);
    const match = password === confPassword;
    setValidConf(match);
  }, [password, confPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password, confPassword]);

  const signInWithGoogle = () => {
    window.open(
      `${api}/user/auth/google`,
      "_self",
      "toolbar=no, scrollbars=yes, resizeable=no, width=auto, height=auto"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = USER_REGEX.test(username);
    const v3 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const res = await axios.post(
        "/user/signup",
        {
          username: username,
          password: password,
          email: email,
          confirmPassword: confPassword,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(res?.data));
      if (res?.data?.messsage === "Auth Success") {
        const jwtCookie = Cookies.get("jwt");
        setAuth({ username, password, jwtCookie });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error.response.data.message);
      errRef.current.focus();
    }
  };

  return (
    <div className="formBody">
      <div className="navSign"></div>

      <div className="wrapper-form">
        <p
          ref={errRef}
          className={errMsg ? "errMsg" : "none"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="header">
          <h2>Sign Up</h2>
        </div>
        <form className="form-sign" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-contain">
              <input
                type="email"
                id="email"
                name="email"
                ref={userRef}
                placeholder="Email Address"
                className="form-input"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="email"
                onFocus={() => {
                  setEmailFocus(true);
                }}
                onBlur={() => {
                  setEmailFocus(false);
                }}
              />
              {emailFocus || (email && !validEmail) ? (
                validEmail ? (
                  <span className={"input-icon"}>
                    <CheckCircleOutlineIcon />
                  </span>
                ) : (
                  <span className={"input-icon"}>
                    <ErrorIcon />
                  </span>
                )
              ) : null}
            </div>
            <div
              id="email"
              className={
                emailFocus && email && !validEmail ? "instructions" : "none"
              }
            >
              <InfoIcon />
              <p>
                An Email address
                <br />
                Must Contain @. <br />
                Letters, numbers allowed.
              </p>
            </div>
            <div className="input-contain">
              <input
                type="username"
                id="username"
                name="username"
                placeholder="Username"
                className="form-input"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="false"
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="username"
                onFocus={() => {
                  setUserFocus(true);
                }}
                onBlur={() => {
                  setUserFocus(false);
                }}
              />
              {userFocus || (!validName && username) ? (
                validName ? (
                  <span className={"input-icon"}>
                    <CheckCircleOutlineIcon />
                  </span>
                ) : (
                  <span className={"input-icon"}>
                    <ErrorIcon />
                  </span>
                )
              ) : null}
            </div>
            <div
              id="username"
              className={
                userFocus && username && !validName ? "instructions" : "none"
              }
            >
              <InfoIcon />
              <p>
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div className="input-contain">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="form-input"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="password"
                onFocus={() => {
                  setPwdFocus(true);
                }}
                onBlur={() => {
                  setPwdFocus(false);
                }}
              />
              {!pwdFocus && !validPwd && password ? (
                <span className={"input-icon"}>
                  <ErrorIcon />
                </span>
              ) : null}
              {pwdFocus && validPwd ? (
                <span className={"input-icon"}>
                  <CheckCircleOutlineIcon />
                </span>
              ) : null}
            </div>
            <div
              id="password"
              className={pwdFocus && !validPwd ? "instructions" : "none"}
            >
              <InfoIcon />
              <p>
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters, a number and a
                special characters. <br />
                Allowed special characters:
                <span aria-label="exlamation">!</span>
                <span aria-label="at">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar">$</span>
                <span aria-label="percent">%</span>
                <span aria-label="stars">*</span>
                <span aria-label="underscore">_</span>
                <span aria-label="stripe">-</span>
              </p>
            </div>
            <div className="input-contain">
              <input
                type="password"
                id="confPassword"
                name="confPassword"
                placeholder="Confirm Password"
                className="form-input"
                onChange={(e) => setConfPassword(e.target.value)}
                autoComplete="new-password"
                required
                aria-invalid={validConf ? "false" : "true"}
                aria-describedby="ConfPwd"
                onFocus={() => {
                  setConfFocus(true);
                }}
                onBlur={() => {
                  setConfFocus(false);
                }}
              />
              {!confFocus && !validConf && confPassword ? (
                <span className={"input-icon"}>
                  <ErrorIcon />
                </span>
              ) : null}
              {confFocus && validConf ? (
                <span className={"input-icon"}>
                  <CheckCircleOutlineIcon />
                </span>
              ) : null}
            </div>
            <div
              id="ConfPwd"
              className={confFocus && !validConf ? "instructions" : "none"}
            >
              <InfoIcon />
              <p>Password must match!</p>
            </div>
            <SignUpButton
              type="submit"
              disabled={
                !validName || !validPwd || !validEmail || !validConf
                  ? true
                  : false
              }
            />
            <div className="line">
              <hr />
              <span className="line-caption">OR</span>
              <hr />
            </div>
          </div>
          <SubmitButtonGoogle onClick={signInWithGoogle} />
          <p>
            Already have an account?<Link to={"/auth/signin"}>Sign In</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
