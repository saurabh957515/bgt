import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logo from "../assets/images/logo-white.svg";
import { updateEmail, updatePassword, onLoggedin } from "../actions";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = ({ history }) => {
  const { loading, login } = useLogin();
  const [isLoad, setIsLoad] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLoggedIn = await login(userName, password);
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 500);

    const bodyClassList = document.body.classList;
    bodyClassList.remove(
      "theme-cyan",
      "theme-purple",
      "theme-blue",
      "theme-green",
      "theme-orange",
      "theme-blush"
    );

    return () => {};
  }, []);

  return (
    <div className="theme-cyan">
      <div
        className="page-loader-wrapper"
        style={{ display: isLoad ? "block" : "none" }}
      >
        <div className="loader">
          <div className="m-t-30">
            <img
              src={require("../assets/images/logo-icon.svg")}
              width="48"
              height="48"
              alt="Lucid"
            />
          </div>
          <p>Please wait...</p>
        </div>
      </div>
      <div className="hide-border">
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="auth-box">
              <div className="top">
                <img
                  src={Logo}
                  alt="Lucid"
                  style={{ height: "40px", margin: "10px" }}
                />
              </div>
              <div className="card">
                <div className="header">
                  <p className="lead">Login to your account</p>
                </div>
                <div className="body">
                  <div className="form-auth-small" action="index.html">
                    <div className="form-group">
                      <label className="sr-only control-label">Email</label>
                      <input
                        className="form-control"
                        id="signin-email"
                        placeholder="username"
                        value={userName}
                        onChange={(val) => setUserName(val.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="sr-only control-label">Password</label>
                      <input
                        className="form-control"
                        id="signin-password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(val) => setPassword(val.target.value)}
                      />
                    </div>
                    <div className="clearfix form-group">
                      <label className="fancy-checkbox element-left">
                        <input type="checkbox" />
                        <span>Remember me</span>
                      </label>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary btn-lg btn-block"
                    >
                      Login
                    </button>
                    <div className="bottom">
                      <span className="helper-text m-b-10">
                        <i className="fa fa-lock"></i>{" "}
                        <Link to={`/forgotpassword`}>
                          Forgot password?
                        </Link>
                      </span>
                      <span>
                        Don't have an account?{" "}
                        <Link to="/registration">Register</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const mapStateToProps = ({ loginReducer }) => ({
  email: loginReducer.email,
  password: loginReducer.password,
});

export default connect(mapStateToProps, {
  updateEmail,
  updatePassword,
  onLoggedin,
})(Login);
