import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    await login(username, password);
  };
  return (
    <section className="h-[100vh] w-[100vw] bg-blue-100   p-5">
      <div className="h-full m-auto bg-white sm:flex sm:w-3/4 rounded-2xl">
        <div className="h-full max-sm:h-1/3">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="login form"
            className="object-cover w-full h-full "
            style={{ borderRadius: "1rem 0 0 1rem" }}
          />
        </div>
        <div className="h-full px-4 py-8 sm:mx-5 grow">
          <form onSubmit={handleSubmit}>
            <div className="pb-1 mb-3 d-flex align-items-center">
              <i
                className="fas fa-cubes fa-2x me-3"
                style={{ color: "#ff6219" }}
              ></i>
              <span className="mb-0 h1 fw-bold max-sm:text-white">Logo</span>
            </div>

            <h5
              className="pb-3 mb-3 fw-normal max-sm:text-white"
              style={{ letterSpacing: "1px" }}
            >
              Sign into your account
            </h5>

            <div className="mb-2 form-outline">
              <label className="form-label" htmlFor="form2Example17">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4 form-outline">
              <label className="form-label" htmlFor="form2Example27">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-1 mb-4">
              <button className="btn btn-dark btn-lg btn-block" type="submit">
                Login
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <Link
                to="/signup"
                className="mb-5 pb-lg-2"
                style={{ color: "#393f81" }}
              >
                Don't have an account?{" "}
                <a href="#!" style={{ color: "#393f81" }}>
                  Register here
                </a>
              </Link>
              <a href="#!" className="small text-muted">
                Terms of use.
              </a>
              <a href="#!" className="small text-muted">
                Privacy policy
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Login;

// STARTER CODE FOR THIS FILE
// const Login = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center mx-auto min-w-96'>
// 			<div className='w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Login
// 					<span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='p-2 label'>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='Enter username' className='w-full h-10 input input-bordered' />
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
// 					<a href='#' className='inline-block mt-2 text-sm hover:underline hover:text-blue-600'>
// 						{"Don't"} have an account?
// 					</a>

// 					<div>
// 						<button className='mt-2 btn btn-block btn-sm'>Login</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default Login;
