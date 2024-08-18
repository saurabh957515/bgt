import React from "react";
import useLogout from "../hooks/useLogout";

const Logout = ({ history }) => {
  const { loading, logout } = useLogout();
  const handleLogout = async () => {
    const isloggedout = await logout();
    if (isloggedout) {
      history.push("/login");
    }
  };
  return (
    <div onClick={handleLogout} className="icon-menu">
      <i className="icon-login"></i>
    </div>
  );
};

export default Logout;
