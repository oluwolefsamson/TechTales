import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "../style";
import { discount, heroImg } from "../assets";
import GetStarted from "./GetStarted";

const Hero = () => {
  const [loading, setLoading] = useState(true);

  // Simulate image loading (you can replace this with actual image load events)
  useEffect(() => {
    const image = new Image();
    image.src = heroImg;
    image.onload = () => setLoading(false);
  }, []);

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div
          className="flex flex-row items-center py-2 px-4 bg-discount-gradient rounded-[10px] mb-2"
          data-aos="fade-right"
        >
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">10%</span> Discount For{" "}
            <span className="text-white">1 Month</span> Account
          </p>
        </div>
        <div
          className="flex flex-row justify-between items-center w-full"
          data-aos="fade-right"
        >
          <h1 className="flex-1 font-poppins font-semibold ss:text-[65px] text-[45px] text-white ss:leading-[100.8px] leading-[75px]">
            Transform Ideas into
            <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Content </span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>
        <h1
          className="font-poppins font-semibold ss:text-[65px] text-[45px] text-white ss:leading-[100px] leading-[75px] w-full"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Instantly
        </h1>
        <p
          className={`${styles.paragraph} max-w-[470px] mt-5`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Unleash the power of AI to create engaging, high-quality content for
          blogs, social media, websites, and more effortlessly and instantly.
        </p>
      </div>
      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
        data-aos="zoom-in"
      >
        {loading ? (
          <Skeleton width="90%" height="80%" />
        ) : (
          <img
            src={heroImg}
            alt="billing"
            className="w-[90%] h-[80%] relative z-[5]"
          />
        )}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      </div>
      <div className={`ss:hidden ${styles.flexCenter}`} data-aos="fade-up">
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
