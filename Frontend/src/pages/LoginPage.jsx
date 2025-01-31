import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../src/redux/userRelated/authSlice";
import loginImg from "../assets/loginImg3.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate(`/specialty/${user.userId}`);
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleShowPasswordChange = (e) => {
    setShowPassword(e.target.checked);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.type === "auth/loginUser/fulfilled") {
        const userId = result.payload.user.userId;
        navigate(`/specialty/${userId}`);
      }
    });
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white">
      {/* Login Form Container - flex: 1 */}
      <div className="flex-1 w-full lg:w-1/3 py-6 px-6 max-w-[570px] mx-auto rounded-lg md:p-10 z-10 order-2 lg:order-1">
        <h3 className="font-poppins text-blue-600 font-bold ss:text-[25px] text-[22px] leading-9 mb-10">
          Techtales
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-5">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center mb-5">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPasswordChange}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-textColor">
              Show Password
            </label>
          </div>

          {error && <p className="text-red-500 text-center mb-3">{error}</p>}

          <div className="mt-7">
            <button
              type="submit"
              className="cusor:pointer w-full bg-blue-600 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              disabled={isLoading}
            >
              {isLoading ? <DotLoader size={25} color="white" /> : "Login"}
            </button>
          </div>

          <div className="mt-5">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white text-[#757575] text-[18px] leading-[30px] rounded-lg px-4 py-3 border border-[#ddd] hover:bg-gray-50"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google Logo"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?
            <Link to="/register" className="text-blue-600 font-bold ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Image Container - flex: 2 */}
      <div className="hidden md:flex flex-2 w-full lg:w-2/3 items-center justify-center relative order-1 lg:order-2">
        <img
          src={loginImg}
          alt="Login Visual"
          className="w-full h-full object-cover"
          loading="lazy" // Add this line for lazy loading
        />
        {/* Text Overlay on Image */}
        <div className="absolute inset-0 flex flex-col items-start  mx-8 my-10">
          <h1 className="text-white text-xl font-bold font-poppins tracking-widest">
            Techtales is here
          </h1>
          <p className="text-white text-xs mt-5 w-[280px] font-poppins leading-5">
            Up to 32% higher throughput, improved horizontal scaling, expanded
            queryable encryption capabilities, and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
