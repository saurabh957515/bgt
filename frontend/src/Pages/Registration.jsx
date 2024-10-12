import React, { useState } from "react";
import TextInput from "../Components/TextInput";
import Image from "../Images/Login.png";
import { Link, useNavigate } from "react-router-dom";
import InquiryLogo from "../Icons/InquiryLogo";
import { LockClosedIcon } from "@heroicons/react/24/solid";
const Registration = () => {
    const navigate = useNavigate();
    const [errors,setError]=useState({})
    const [data, setData] = useState({
        OrganizationName: "",
        user_name: "",
        password: "",
    });
    const handleRegister = (e) => {
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
            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            <InquiryLogo className={"text-gray-900"} />
                <div className="form-group">
                    <TextInput
                        value={data?.full_name}
                        onChange={(e) =>
                            setData((pre) => ({
                                ...pre,
                                full_name: e.target.value,
                            }))
                        }
                        required={true}
                        placeholder="Full name"
                        className="p-2 border"
                    />
                </div>

                <div className="form-group">
                    <TextInput
                        value={data?.username}
                        onChange={(e) =>
                            setData((pre) => ({
                                ...pre,
                                username: e.target.value,
                            }))
                        }
                        required={true}
                        placeholder="Username"
                        className="p-2 border"
                    />
                    <p className="mt-2 text-danger">{errors["username"]}</p>
                </div>

                <div className="form-group">
                    <TextInput
                        type="email"
                        value={data?.email}
                        onChange={(e) =>
                            setData((pre) => ({
                                ...pre,
                                email: e.target.value,
                            }))
                        }
                        required={true}
                        placeholder="Your email"
                        className="p-2 border"
                    />
                    <p className="mt-2 text-danger">{errors["email"]}</p>
                </div>

                <div className="form-group">
                    <TextInput
                        type="password"
                        value={data?.password}
                        onChange={(e) =>
                            setData((pre) => ({
                                ...pre,
                                password: e.target.value,
                            }))
                        }
                        required={true}
                        placeholder="Password"
                        maxLength={7}
                        className="p-2 border"
                    />
                    <p className="mt-2 text-danger">{errors["password"]}</p>
                </div>

                <div className="form-group">
                    <TextInput
                        type="password"
                        value={data?.confirmPassword}
                        onChange={(e) =>
                            setData((pre) => ({
                                ...pre,
                                confirmPassword: e.target.value,
                            }))
                        }
                        required={true}
                        placeholder="Confirm Password"
                        maxLength={7}
                        className="p-2 border"
                    />
                    <p className="mt-2 text-danger">{errors["confirmPassword"]}</p>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-white bg-inquiryBlue-900 rounded-3xl"
                >
                    REGISTER
                </button>

                <div className="flex flex-col items-center justify-center">
                    <div className="mx-auto helper-text">
                        Already have an account? <Link to="/" className="font-semibold text-inquiryBlue-700">Login</Link>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default Registration;
