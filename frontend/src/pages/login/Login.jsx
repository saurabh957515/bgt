import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Image from "../LocationImage.jpg";
import TextInput from "../../Fileds/TextInput";
const Login = () => {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("username@123");
  const navigate = useNavigate();
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    await login(username, password);
  };
  return (
    <div className="h-[100vh] w-[100vw] sm:flex overflow-hidden bg-white">
      <div className="relative w-1/2 h-full">
        <img
          src={Image}
          alt="login form"
          className="absolute top-0 object-cover w-full h-full opacity-80"
        />
        <div className="absolute top-0 left-0 z-10 flex items-center w-full h-full p-4 text-4xl font-bold text-center text-gray-800">
          <div className="mx-auto">
            <h1 className="text-4xl font-bold">Welcome to Career Growth</h1>
            <div className="text-base font-medium">
              Move Towards Growth and Learning.
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2 h-full">
        <div className="w-3/4">
          <form className="w-full px-4 text-sm" onSubmit={handleSubmit}>
            <div className="text-2xl font-medium text-gray-800">Log In</div>

            <h5 className="py-2 text-base font-medium text-gray-800">
              Sign into your account
            </h5>

            <div className="w-full">
              <label
                className="block pb-2 text-gray-800"
                htmlFor="form2Example17"
              >
                Username
              </label>
              <TextInput
                placeholder="Enter Username"
                value={username}
                handleChange={(e) => setUsername(e.target.value)}
                className="w-full text-gray-800 bg-white "
              />
            </div>

            <div className="">
              <label
                className="block pb-2 text-gray-800"
                htmlFor="form2Example27"
              >
                Password
              </label>
              <TextInput
                placeholder="Enter Password"
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-800 bg-white"
              />
            </div>

            <div className="w-full">
              <button
                className="w-full py-2 text-sm font-semibold text-white bg-[#5B8EDC] rounded "
                // type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/')
                }}
              >
                Login
              </button>
            </div>
            <div className="flex flex-col items-center justify-center py-1 text-sm">
              <a className="small text-muted text-[#666]" href="#!">
                Forgot password?
              </a>
              <Link to="/signup" className=" pb-lg-2" style={{ color: "#666" }}>
                Don't have an account?{" "}
                <a href="#!" style={{ color: "#5B8EDC" }}>
                  Register here
                </a>
              </Link>
              <a href="#!" className="small text-muted text-[#666]">
                Terms of use & Privacy policy
              </a>
              <a href="#!" className="small text-muted"></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
