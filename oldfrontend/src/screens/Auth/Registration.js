import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/rrlogo.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useSignup from "../../hooks/useSignup";

const Registration = () => {
  const history = useHistory();
  const [data, setData] = useState({
    full_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const { signup, loading } = useSignup();
  useEffect(() => {
    document.body.classList.remove(
      "theme-cyan",
      "theme-purple",
      "theme-blue",
      "theme-green",
      "theme-orange",
      "theme-blush"
    );
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const isSignup = await signup(data);
    if (!isSignup?.error) {
      history.push("/login");
      setErrors({});
    } else {
      setErrors(isSignup?.error);
    }
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
                  style={{ height: "70px", margin: "10px" }}
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
                      <label className="sr-only control-label">username</label>
                      <input
                        className="form-control"
                        id="signup-email"
                        placeholder="Full name"
                        type="text"
                        required="required"
                        value={data?.full_name}
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            full_name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="sr-only control-label">username</label>
                      <input
                        className="form-control"
                        id="signup-email"
                        placeholder="Username"
                        type="text"
                        required="required"
                        value={data?.username}
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            username: e.target.value,
                          }))
                        }
                      />
                      <p className="mt-2 text-danger">{errors["username"]}</p>
                    </div>
                    <div className="form-group">
                      <label className="sr-only control-label">Email</label>
                      <input
                        className="form-control"
                        id="signup-email"
                        placeholder="Your email"
                        type="email"
                        required="required"
                        value={data?.email}
                        onChange={(e) =>
                          setData((pre) => ({ ...pre, email: e.target.value }))
                        }
                      />
                      <p className="mt-2 text-danger">{errors["email"]}</p>
                    </div>
                    <div className="form-group">
                      <label className="sr-only control-label">passowrd</label>
                      <input
                        className="form-control"
                        id="signup-email"
                        placeholder="Passowrd"
                        type="text"
                        required="required"
                        maxLength={7}
                        value={data?.password}
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            password: e.target.value,
                          }))
                        }
                      />
                      <p className="mt-2 text-danger">{errors["password"]}</p>
                    </div>
                    <div className="form-group">
                      <label className="sr-only control-label">
                        confirm password
                      </label>
                      <input
                        className="form-control"
                        id="signup-password"
                        placeholder="Password"
                        type="password"
                        maxLength={7}
                        required="required"
                        value={data?.confirmPassword}
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            confirmPassword: e.target.value,
                          }))
                        }
                      />
                      <p className="mt-2 text-danger">
                        {errors["confirmPassword"]}
                      </p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
