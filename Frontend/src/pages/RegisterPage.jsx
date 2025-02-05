import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, googleLogin } from "../redux/userRelated/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import signupImg from "../assets/signupImg.jpg";
import { DotLoader } from "react-spinners";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, phone, password, specialty };
    dispatch(registerUser(userData))
      .unwrap()
      .then(() => navigate("/login"))
      .catch((err) => console.error(err));
  };

  return (
    <section className="flex justify-center items-center min-h-screen xl:px-0 bg-white">
      {/* Image Section (Right Side) */}
      <div className="hidden md:flex flex-2 w-full lg:w-2/3 items-center justify-center relative order-1 lg:order-2">
        <img
          src={signupImg}
          alt="Login Visual"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Form Section */}
      <div className="rounded-lg flex-[1] lg:pr-16 w-full px-5 h-full flex justify-center items-center">
        <div className="w-full max-w-[570px]">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Welcome to <span className="text-blue-500">Techtales</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-2 py-3 border-b border-solid border-[#0026ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                className="w-full px-2 py-3 border-b border-solid border-[#0026ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-5 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="w-full px-2 py-3 pr-12 border-b border-solid border-[#0026ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </span>
            </div>
            <div className="mb-5">
              <select
                className="w-full px-2 py-3 border-b border-solid border-[#0026ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Your Industry
                </option>
                <option value="Healthcare">Healthcare</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-center mb-3">{error}</p>}
            <div className="mb-5">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-[16px] leading-7 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <DotLoader size={25} color="white" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white text-[#757575] text-[18px] leading-[30px] rounded-lg px-4 py-3 border border-[#ddd] hover:bg-gray-50"
                onClick={() =>
                  (window.location.href = `https://techtales-nsv6.onrender.com/api/auth/google/callback`)
                }
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google Logo"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </div>
          </form>
          <div className="mt-8">
            <p className="text-[15px] leading-7 text-headingColor sm:text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
