import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userRelated/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import regVid from "../assets/regVid.mp4";
import { DotLoader } from "react-spinners";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [videoVisible, setVideoVisible] = useState(false); // State for video visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoVisible(true); // Show video when it enters the viewport
          observer.disconnect(); // Stop observing once video is loaded
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, email, phone, password, specialty };
    dispatch(registerUser(userData))
      .unwrap()
      .then(() => navigate("/login"))
      .catch((err) => console.error(err));
  };

  return (
    <section className="flex justify-center items-center min-h-screen px-5 xl:px-0 bg-white">
      <div className="max-w-[1170px] px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
          {/* Video Section */}
          <div
            className="hidden lg:block bg-primaryColor rounded-l-lg"
            ref={videoRef}
          >
            {videoVisible && (
              <video
                autoPlay
                loop
                muted
                className="h-[100vh] w-full object-cover"
              >
                <source src={regVid} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Form Section */}
          <div className="rounded-lg lg:pl-16 py-10 w-full h-full flex justify-center items-center">
            <div className="w-full max-w-[570px]">
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                Create an <span className="text-blue-500">account</span>
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    className="w-full px-2 py-3 border-b border-solid border-[#0026ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
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
                    <option value="" disabled selected>
                      Select Your Industry
                    </option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {error && (
                  <p className="text-red-500 text-center mb-3">{error}</p>
                )}
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
        </div>
      </div>
    </section>
  );
};

export default Signup;
