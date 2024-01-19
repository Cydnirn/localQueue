import HomeCarousel from "./pages/auth/landing";
import HomeMenu from "./pages/home/homeMenu";
import Home from "./pages/home/home";
import React from "react";
import AuthPage from "./pages/auth/AuthForm";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "@components/RequireAuth";
import SignUp from "@components/signup/signup";
import SignIn from "@components/signin/signin";
import LogOut from "./components/logOut";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeCarousel />} />
      <Route path="/auth" element={<AuthPage />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="logout" element={<LogOut />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Home />}>
          <Route path="" element={<HomeMenu />} />
          <Route path=":stall" />
        </Route>
      </Route>
    </Routes>

  );
}

export default App;
