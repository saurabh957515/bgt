import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    full_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };

  return (
    <section>
      <div
        className="px-4 py-5 text-center px-md-5 text-lg-start"
        style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="mb-5 col-lg-6 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span className="text-primary">for your business</span>
              </h1>
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
            </div>

            <div className="mb-5 col-lg-6 mb-lg-0">
              <div className="card">
                <div className="py-5 card-body px-md-5">
                  <form onSubmit={handleSubmit}>
                    {/* 2 column grid layout with text inputs for the first and last names */}
                    <div className="row">
                      <div className="mb-2 col-md-6">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1">
                            User Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Username"
                            className="form-control"
                            value={inputs.username}
                            onChange={(e) =>
                              setInputs({ ...inputs, username: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="mb-2 col-md-6">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example2">
                            Full Name
                          </label>
                          <input
                            type="text"
                             placeholder="Enter Fullname"
                            className="form-control"
                            value={inputs.full_name}
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                full_name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="mb-2 form-outline">
                      <label className=" form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                      <input
                        type="text"
                         placeholder="Enter Emailaddress"
                        className="form-control"
                        value={inputs.email}
                        onChange={(e) =>
                          setInputs({ ...inputs, email: e.target.value })
                        }
                      />
                    </div>

                    {/* Password input */}
                    <div className="mb-2 form-outline">
                      <label className=" form-label" htmlFor="form3Example4">
                        Password
                      </label>
                      <input
                      placeholder="******"
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        value={inputs.password}
                        onChange={(e) =>
                          setInputs({ ...inputs, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-2 form-outline">
                      <label className="form-label" htmlFor="form3Example4">
                        Confirm Password
                      </label>
                      <input
                        placeholder="******"
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        value={inputs.confirmPassword}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="my-2 btn btn-primary btn-block"
                    >
                      Sign up
                    </button>

                    {/* Register buttons */}
                    <div className="text-center">
                      <Link
                        to={"/login"}
                        className="inline-block mt-2 text-sm hover:text-blue-600"
                        href="#"
                      >
                        Already have an account?
                      </Link>
                      <p>or sign up with:</p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Jumbotron */}
    </section>
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
