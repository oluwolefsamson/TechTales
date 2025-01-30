// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { close, menu } from "../assets";
import { navLinks } from "../constants";
import Logo from "./Logo";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className=" w-full flex py-6 justify-between items-center navbar bg-black ">
      <Logo />

      {/* Desktop Menu */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, i) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              i === navLinks.length - 1 ? "mr-0" : "mr-10"
            } text-white`}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
        <div className="ml-10">
          <Link
            to="/login"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Get Started
          </Link>
        </div>
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden flex items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        />
        <div className="w-[50px]" /> {/* Spacer div with 50px width */}
        <Link to="/home" className="bg-blue-500 text-white py-2 px-4 rounded">
          Contact
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          toggle ? "flex" : "hidden"
        } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar mt-4 z-[2000]`}
      >
        <ul className="list-none flex flex-col justify-end items-center  flex-1">
          {navLinks.map((nav, i) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] p-2 ${
                i === navLinks.length - 1 ? "mr-0" : "mb-4"
              } text-white`}
            >
              <Link to={`/${nav.id}`}>{nav.title}</Link>
            </li>
          ))}
          <li className="font-poppins font-normal cursor-pointer text-[16px] text-white mt-4">
            <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
