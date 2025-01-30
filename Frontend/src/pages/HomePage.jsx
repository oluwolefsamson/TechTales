// src/routes/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { close, menu } from "../assets";
import { navLinks } from "../constants";
import Logo from "../components/Logo";
import { footerLinks, socialMedia } from "../constants";
import styles from "../style";
import {
  Billing,
  Business,
  CardDeal,
  Clients,
  CTA,
  Hero,
  Stats,
  Testimonials,
} from "../components";

const HomePage = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full flex py-6 justify-between items-center px-6 ">
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
          <Link
            to="/login"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar mt-4 z-[2000] md:hidden`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
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

      {/* Main Content */}
      <Hero />
      <Stats />
      <Business />
      <Billing />
      <CardDeal />
      <Testimonials />
      <Clients />
      <CTA />

      {/* Footer */}
      <section className={`p-6 flex-col`}>
        <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
          <div className="flex-1 flex flex-col justify-start mr-10">
            <Logo />
            <p className={`${styles.paragraph} mt-4 max-w-[310px]`}>
              A new way to make the easy contents, reliable and secure.
            </p>
          </div>
          <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
            {footerLinks.map((link) => (
              <div
                key={link.title}
                className="flex flex-col ss:my-0 my-4 min-w-[150px]"
              >
                <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                  {link.title}
                </h4>
                <ul className="list-none mt-4">
                  {link.links.map((item, index) => (
                    <li
                      key={item.name}
                      className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                        index !== link.links.length - 1 ? "mb-4" : "mb-0"
                      }`}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
          <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
            {new Date().getFullYear()} TechTales. All Rights Reserved.{" "}
            <span style={{ color: "skyblue" }}>Oluwole Samson</span>.
          </p>

          <div className="flex flex-row md:mt-0 mt-6">
            {socialMedia.map((social, index) => (
              <img
                src={social.icon}
                key={social.id}
                alt={social.id}
                className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                  index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
