import axiosPrivate from "@api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function LogOut() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axiosPrivate.get("/user/logout");
    setAuth({});
    console.log("Loggin out");
    navigate("/auth/signin", {replace: true});
  };

  useEffect(() => {handleLogout()});
}

export default LogOut;
