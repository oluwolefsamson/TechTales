import React from "react";
import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px]  ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`flex items-center justify-center w-[64px] h-[64px] rounded-full bg-dimBlue`}
    >
      <img src={icon} alt="icon" className="w-1/2 h-1/2 object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1 ">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => {
  return (
    <section id="features" className={layout.section}>
      <div className={`${layout.sectionInfo} p-6`} data-aos="fade-right">
        <h2 className={styles.heading2}>
          Unlock Creativity, <br className="sm:block hidden" />
          Powered by AI.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Generate compelling, unique, and engaging content in seconds. Whether
          it's for blogs, ads, or landing pages, our AI takes your ideas and
          transforms them into words that work.
        </p>

        <Button styles="mt-10" />
      </div>
      <div className={`mt-7 flex-col `} data-aos="fade-left">
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;
