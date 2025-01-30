import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedSpecialty,
  generateContent,
} from "../redux/userRelated/specialtySlice";
import { logoutUser } from "../redux/userRelated/authSlice"; // Import logout action
import { FiClipboard, FiShare2 } from "react-icons/fi";
import { BounceLoader, BeatLoader } from "react-spinners";
import { discount, speImg } from "../assets";
import Button from "../components/DropdownButton";

const specialties = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cybersecurity",
  "UI/UX Design",
  "Graphics Design",
];

const ChooseSpecialty = () => {
  const dispatch = useDispatch();
  const { selectedSpecialty, generatedContent, loading, error } = useSelector(
    (state) => state.specialty
  );

  const handleSelectChange = (e) =>
    dispatch(setSelectedSpecialty(e.target.value));

  const handleGenerateClick = () => {
    if (selectedSpecialty) {
      dispatch(generateContent(selectedSpecialty));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    alert("Content copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Generated Content",
        text: generatedContent,
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logout action
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-900 p-6 sm:p-10 relative">
      {/* Dropdown Button - Positioned Top Right */}
      <div className="w-full flex justify-between items-center absolute top-6 px-6 lg:px-[100px] sm:px-[60px] ">
        <div className="font-semibold font-poppins lg:text-3xl md:text-md text-gray-600">
          Techtales
        </div>
        <div>
          <Button />
        </div>
      </div>

      {/* Header Section */}
      <div className="w-full max-w-6xl text-center mt-[80px] mb-12">
        <div className="inline-flex items-center py-2 px-4 bg-blue-100 rounded-lg  mb-4">
          <img src={discount} alt="discount" className="w-6 h-6" />
          <p className="text-blue-800 font-medium ml-2">
            <span className="font-bold">10% Discount</span> for{" "}
            <span className="font-bold">1 Month</span> Account
          </p>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-600 leading-tight">
          Choose Your <br className="sm:hidden" />
          <span className="text-blue-500"> Specialty</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Select your area of expertise and let our AI generate tailored content
          to help you excel in your field.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Specialty Selection */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-600 font-poppins mb-6">
            Select Your Specialty
          </h2>
          <select
            value={selectedSpecialty}
            onChange={handleSelectChange}
            className="w-full p-3 bg-gray-50 text-md text-gray-600 font-poppins  rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="" disabled>
              Select a specialty
            </option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
          {selectedSpecialty && (
            <p className="mt-4 text-lg text-gray-600 font-poppins">
              You have selected:{" "}
              <span className="font-semibold font-poppins text-blue-600">
                {selectedSpecialty}
              </span>
            </p>
          )}
          <button
            onClick={handleGenerateClick}
            className="w-full mt-6 p-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            disabled={!selectedSpecialty || loading}
          >
            {loading ? (
              <BeatLoader color="#fff" size={14} />
            ) : (
              "Generate Content"
            )}
          </button>
        </div>

        {/* Right Side: Generated Content */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative">
          {generatedContent && (
            <div className="absolute top-[-2px] right-8 flex space-x-3">
              <button
                onClick={handleCopy}
                className="text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <FiClipboard className="h-6 w-6" />
              </button>
              <button
                onClick={handleShare}
                className="text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <FiShare2 className="h-6 w-6" />
              </button>
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center h-72">
              <BounceLoader color="#3B82F6" size={100} />
            </div>
          ) : generatedContent ? (
            <div className="text-lg text-gray-700 whitespace-pre-wrap overflow-auto h-72 p-4 rounded-lg border border-gray-200 bg-gray-50">
              {generatedContent}
            </div>
          ) : error ? (
            <p className="text-lg font-semibold text-red-500">{error}</p>
          ) : (
            <p className="text-lg text-gray-500 text-center tracking-wider">
              Your generated content will appear here.
            </p>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center text-gray-500">
        <p className="text-sm">
          Powered by AI technology [Oluwole Samson Olawumi]. Designed for
          professionals like you.
        </p>
      </div>
    </div>
  );
};

export default ChooseSpecialty;
