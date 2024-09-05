import React from "react";
import { useSelector } from "react-redux";
const AuthUser = () => {
const userInfo = useSelector((state) => state.auth.user);
console.log(userInfo)
  return <strong>Alizee Thomas</strong>;
};

export default AuthUser;
