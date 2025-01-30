import React from "react";
import { apple, bill, google } from "../assets";
import styles, { layout } from "../style";

const Billing = () => {
  return (
    <section id="product" className={` ${layout.sectionReverse} p-6`}>
      <div className={layout.sectionImgReverse} data-aos="zoom-in">
        <img
          src={bill}
          alt="billing"
          className="w-[100%] h-[95%] relative z-[5]"
        />
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient" />
      </div>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2} data-aos="fade-down-right">
          Effortlessly Create Unique Content <br className="sm:block hidden" />{" "}
          in Seconds.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Take full control of your content creation process with our AI-powered
          tool. Designed to streamline writing, reduce effort, and save you
          time, our solution generates high-quality, engaging content that meets
          your needs. With an intuitive interface, you can easily customize and
          generate content for blogs, websites, or marketing materials—allowing
          you to focus on what truly matters: reaching your audience and growing
          your brand.
        </p>

        <div
          data-aos="zoom-in"
          className="flex flex-row flex-wrap sm:mt-10 mt-6"
        >
          <img
            src={apple}
            alt="app-store"
            className="w-[128px] h-[42px] object-contain mr-5 cursor-pointer"
          />
          <img
            src={google}
            alt="google-play"
            className="w-[128px] h-[42px] object-contain cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Billing;
