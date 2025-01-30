import React from "react";
import styles from "../style";
import Button from "./Button";

const CTA = () => {
  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} m-6 sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
    >
      <div className="flex-1 flex flex-col">
        <h2 className={styles.heading2}>
          Unlock the Power of AI Content Creation!
        </h2>
        <p
          className={`${styles.paragraph} max-w-[470px] mt-5`}
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          Experience seamless, automated content generation that saves you time
          and effort. Let our AI-powered tool help you create high-quality,
          engaging content in no time, wherever you are.
        </p>
      </div>
      <div className={`${styles.flexCenter} sm:ml-10 ml-0`}>
        <Button />
      </div>
    </section>
  );
};

export default CTA;
