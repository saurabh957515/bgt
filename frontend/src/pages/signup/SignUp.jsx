import { Link, useNavigate } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import Image from "../LocationImage.jpg";
import TextInput from "../../Fileds/TextInput";
const SignUp = () => {
  const [inputs, setInputs] = useState({
    full_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const { loading, signup } = useSignup();
  const navigate = useNavigate();
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello i am comming..");
    await signup(inputs);
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
          <form
            className="w-full px-4 text-sm text-gray-800"
            onSubmit={handleSubmit}
          >
            <div className="text-2xl font-medium text-gray-800">SignUp</div>

            <h5 className="py-2 text-base font-medium text-gray-800">
              SignUp Your first account
            </h5>

            <div className="w-full">
              <label className="" htmlFor="form3Example1">
                User Name
              </label>
              <TextInput
                type="text"
                placeholder="Enter Username"
                className="w-full mt-2 text-gray-800 bg-white "
                value={inputs.username}
                handleChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>

            <div className="w-full">
              <label className="" htmlFor="form3Example2">
                Full Name
              </label>
              <TextInput
                type="text"
                placeholder="Enter Fullname"
                className="w-full mt-2 text-gray-800 bg-white "
                value={inputs.full_name}
                handleChange={(e) =>
                  setInputs({
                    ...inputs,
                    full_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full">
              <label className="" htmlFor="form3Example3">
                Email address
              </label>
              <TextInput
                type="text"
                placeholder="Enter Email"
                className="w-full mt-2 text-gray-800 bg-white "
                value={inputs.email}
                handleChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <label className="" htmlFor="form3Example4">
                Password
              </label>
              <TextInput
                placeholder="******"
                id="form3Example4"
                className="w-full mt-2 text-gray-800 bg-white "
                value={inputs.password}
                handleChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <label className="" htmlFor="form3Example4">
                Confirm Password
              </label>
              <TextInput
                placeholder="******"
                id="form3Example4"
                className="w-full mt-2 text-gray-800 bg-white "
                value={inputs.confirmPassword}
                handleChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <button
                className="w-full py-2 text-sm font-semibold text-white bg-[#5B8EDC] rounded "
                // type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login")
                }}
              >
                SignUp
              </button>
            </div>
            <div className="flex flex-col items-center justify-center py-1">
              <a className="text-sm small text-muted" href="#!">
                Forgot password?
              </a>
              <Link
                to="/login"
                className="text-sm pb-lg-2"
                style={{ color: "#393f81" }}
              >
                Already have an account?{" "}
                <a href="#!" style={{ color: "#393f81" }}>
                  LogIn here
                </a>
              </Link>
              <a href="#!" className="text-sm small text-muted">
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
export default SignUp;

// STARTER CODE FOR THE SIGNUP COMPONENT
// import GenderCheckbox from "./GenderCheckbox";

// const SignUp = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center mx-auto min-w-96'>
// 			<div className='w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Sign Up <span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='p-2 label'>
// 							<span className='text-base label-text'>Full Name</span>
// 						</label>
// 						<input type='text' placeholder='John Doe' className='w-full h-10 input input-bordered' />
// 					</div>

// 					<div>
// 						<label className='p-2 label '>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='johndoe' className='w-full h-10 input input-bordered' />
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full h-10 input input-bordered'
// 						/>
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Confirm Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Confirm Password'
// 							className='w-full h-10 input input-bordered'
// 						/>
// 					</div>

// 					<GenderCheckbox />

// 					<a className='inline-block mt-2 text-sm hover:underline hover:text-blue-600' href='#'>
// 						Already have an account?
// 					</a>

// 					<div>
// 						<button className='mt-2 border btn btn-block btn-sm border-slate-700'>Sign Up</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default SignUp;
