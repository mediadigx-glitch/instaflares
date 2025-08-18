"use client";
import React from "react";
import StepSlider from "./StepSlider";
import Link from "next/link";


const Hero = () => {


  return (
    <div className="hero">
        <div className="text-container">
          <h1 className="heading" data-aos="fade-right" data-aos-delay="500">
            Turn your instagram account into a <span>money making machine</span>
          </h1>
          <p className="description" data-aos="fade-up" data-aos-delay="800">
            <span>Want to make money from your Instagram?</span> Get promotions
            for your instagram account and start earnings today. We provide
            <span>stories, posts, and caption promos for your instagram
              account.</span>We provide promotions for every type of instagram accounts!
          </p>
          <div className="button-container">
            <Link href="/tutorial" data-aos="fade-right" data-aos-delay="1000"
              ><button className="cta-verify">How to Start?</button></Link>
            <Link href="/signup" data-aos="fade-right" data-aos-delay="100"
              ><button className="cta-verify signup">Signup Now!</button></Link>
          </div>
        </div>
        <StepSlider />
      </div>
  )
}

export default Hero