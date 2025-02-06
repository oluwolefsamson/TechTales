import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDownIcon,
  CogIcon,
  CurrencyDollarIcon,
  PaintBrushIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"; // Importing icons from Heroicons
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userRelated/authSlice"; // Importing logout action from redux
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom for navigation

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const buttonRef = useRef(null); // Ref for the button
  const dispatch = useDispatch(); // Accessing redux dispatch function
  const navigate = useNavigate(); // Accessing the useNavigate hook

  // Toggles the dropdown menu visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handles user logout, dispatches logout action, and redirects to login page
  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the logout action from redux
    navigate("/login"); // Redirects to login page after logout
    alert("Logged out!"); // Optionally show a logout alert
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close the dropdown if the click is outside
      }
    };

    document.addEventListener("click", handleClickOutside); // Add event listener for click outside

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      {/* Profile Image and Dropdown Button */}
      <button
        ref={buttonRef} // Attach ref to the button
        onClick={toggleDropdown} // Handle button click to toggle dropdown visibility
        className="flex items-center space-x-2 border rounded-full p-2"
      >
        <img
          src="https://www.w3schools.com/w3images/avatar2.png" // User profile image
          alt="Profile"
          className="w-8 h-8 rounded-full" // Styling the image to be circular
        />
        <ChevronDownIcon className="w-5 h-5" /> {/* Dropdown arrow icon */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef} // Attach ref to the dropdown menu
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            {/* Upgrade Plan */}
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <CurrencyDollarIcon className="w-5 h-5 mr-2" />
              Upgrade Plan
            </a>

            {/* Customize TechTales */}
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <PaintBrushIcon className="w-5 h-5 mr-2" />
              Customize TechTales
            </a>

            {/* Settings */}
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <CogIcon className="w-5 h-5 mr-2" />
              Settings
            </a>
          </div>
          {/* Border Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Logout Button */}
          <a
            onClick={handleLogout} // Handle logout click
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
