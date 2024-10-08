import React from "react";
import useLogout from "../hooks/useLogout";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Logout = () => {
  const { loading, logout } = useLogout();
  const history = useHistory()
  const handleLogout = async () => {
    const isloggedout = await logout();
    if (isloggedout) {
      history.push("/login");
    }
}
  return (
    <Link onClick={handleLogout} to="#">
      <i className="icon-login"></i> <span>Logout</span>
    </Link>
  );
};

export default Logout;
