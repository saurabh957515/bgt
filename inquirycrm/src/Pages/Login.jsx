import React, { useState } from "react";
import TextInput from "../Components/TextInput";
import Image from "../Images/Login.png";
import { useNavigate } from "react-router-dom";
import WhiteSeamlessLogo from "../Icons/WhiteSeamlessLogo";
import InquiryLogo from "../Icons/InquiryLogo";
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
      </form>
    </div>
  );
};

export default Login;
