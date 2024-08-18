import React, { useState } from "react";
import { connect } from "react-redux";
import Logo from "../../assets/images/logo-white.svg";
import useSignup from "../../hooks/useSignup";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Registration = ({ history }) => {
  const [data, setData] = useState({
    full_name: "harish paul ",
    username: "harry paul",
    password: "harishpaul@123",
    confirmPassword: "harishpaul@123",
    email: "harish@gmail.com",
  });
  const {signup} = useSignup()

  React.useEffect(() => {
    document.body.classList.remove(
      "theme-cyan",
      "theme-purple",
      "theme-blue",
      "theme-green",
      "theme-orange",
      "theme-blush"
    );
  }, []);

  const handleRegister =async (e) => {
    e.preventDefault();
    const signedUp =await signup(data);
    if(signedUp){
      history.push('/login')
    }
  };

  const handleData = (name, value) => {
    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  return (
    <div className="theme-cyan">
      <div>
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
                  <p className="lead">Create an account</p>
                </div>
                <div className="body">
                  <form
                    className="form-auth-small ng-untouched ng-pristine ng-valid"
                    onSubmit={handleRegister}
                  >
                    <div className="form-group">
                      <label className="sr-only control-label">Email</label>
                      <input
                        className="form-control"
                        id="signup-full_name"
                        placeholder="Fullname"
                        value={data?.full_name}
                        onChange={(e) =>
                          handleData("full_name", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="sr-only control-label">Email</label>
                      <input
                        className="form-control"
                        id="signup-username"
                        placeholder="Username"
                        value={data?.username}
                        onChange={(e) => handleData("username", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="sr-only control-label">Email</label>
                      <input
                        className="form-control"
                        id="signup-password"
                        type="password"
                        placeholder="Password"
                        value={data?.password}
                        onChange={(e) => handleData("password", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="sr-only control-label">Password</label>
                      <input
                        className="form-control"
                        id="signup-confirmPassword"
                        placeholder="ConfirmPassword"
                        type="password"
                        value={data?.confirmPassword}
                        onChange={(e) =>
                          handleData("confirmPassword", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="sr-only control-label">Password</label>
                      <input
                        className="form-control"
                        id="signup-email"
                        placeholder="email"
                        value={data?.email}
                        onChange={(e) => handleData("email", e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      REGISTER
                    </button>
                    <div className="bottom">
                      <span className="helper-text">
                        Already have an account? <Link to="/login">Login</Link>
                      </span>
                    </div>
                  </form>
                  <div className="separator-linethrough">
                    <span>OR</span>
                  </div>
                  <button className="btn btn-signin-social">
                    <i className="fa fa-facebook-official facebook-color"></i>{" "}
                    Sign in with Facebook
                  </button>
                  <button className="btn btn-signin-social">
                    <i className="fa fa-twitter twitter-color"></i> Sign in with
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ loginReducer }) => ({
  email: loginReducer.email,
  password: loginReducer.password,
});

export default connect(mapStateToProps)(Registration);
