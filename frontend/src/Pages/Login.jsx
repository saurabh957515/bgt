import React, { useState } from "react";
import TextInput from "../Components/TextInput";
import Image from "../Images/Login.png";
import { Link, useNavigate } from "react-router-dom";
import InquiryLogo from "../Icons/InquiryLogo";
import { LockClosedIcon } from "@heroicons/react/24/solid";
const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    OrganizationName: "",
    user_name: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data?.user_name);
    localStorage.setItem("user_name", data.user_name);
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${Image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        width: "100%",
        height: "100vh",
      }}
      className="h-[100vh] w-[100vw] bg-white flex items-center justify-center"
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <InquiryLogo className={"text-gray-900"} />

        <TextInput
          value={data?.user_name}
          onChange={(e) =>
            setData((pre) => ({ ...pre, user_name: e.target.value }))
          }
          required={true}
          placeholder={"User"}
          className="mt-5 border"
        />
        <TextInput
          type="password"
          value={data?.password}
          onChange={(e) =>
            setData((pre) => ({ ...pre, password: e.target.value }))
          }
          required={true}
          placeholder={"Password"}
          className="border "
        />
     
        <button
          type="submit"
          className="px-6 py-3 text-sm font-semibold text-white bg-inquiryBlue-900 rounded-3xl"
        >
          SUBMIT
        </button>
        <div>
          <div className="flex flex-col justify-center ">
            <div className="flex items-center mx-auto helper-text">
              <LockClosedIcon className="w-6 h-6" />
              <Link to={`/`} className="font-semibold text-inquiryBlue-700">Forgot password?</Link>
            </div>
            <div className="mx-auto text-inquiryBlue-700">
              Don't have an account?{" "}
              <Link to="/registration" className="font-semibold text-inquiryBlue-700">Register</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
