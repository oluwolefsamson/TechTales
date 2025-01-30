import React from "react";
import { card } from "../assets";
import Button from "./Button";
import styles, { layout } from "../style";

const CardDeal = () => {
  return (
    <section className={`${layout.section} p-6`}>
      <div className={layout.sectionInfo} data-aos="flip-left">
        <h2 className={styles.heading2}>
          Create amazing content <br className="sm:block hidden" />
          in just a few clicks.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 `}>
          Say goodbye to writer's block. Our AI-powered platform helps you
          generate unique, engaging, and ready-to-use content for your projects
          in moments.
        </p>
        <Button styles="mt-10" />
      </div>
      <div className={layout.sectionImg} data-aos="zoom-in-up">
        <img
          src={card}
          alt="AI Content Generator"
          className="w-[100%] h-[100%]"
        />
      </div>
    </section>
  );
};

export default CardDeal;
