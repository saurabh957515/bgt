import React from "react";
import { useSelector } from "react-redux";
const AuthUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("login-user"))?.username;
  return <strong> {userInfo ? userInfo : "Failed UserName"}</strong>;
};

export default AuthUser;
