import React from 'react'
import Image from 'next/image';

const About = () => {
  return (
    <>
    <div className="about-us">
        <div className="text-container">
          <img
            src="/assets/favicon.svg"
            alt=""
            data-aos="fade-down"
            data-aos-delay="100"
            
            
          />
          <h2 data-aos="fade-left" data-aos-delay="200">About Us</h2>
          <p data-aos="fade-right" data-aos-delay="300">
            Welcome to Instaflares where <span>Instagram pages</span> and
            <span>creators</span> come together to make money! We connect
            Instagram page owners with top creators from
            <span>OnlyFans, Fansly, and Fanvue</span> who are looking for
            promotions.
          </p>
        </div>
        <div className="slider-container">
          <span data-aos="fade-up" data-aos-delay="500">trusted partners</span>
          <div className="slide" data-aos="fade-up" data-aos-delay="650">
            <img src="/assets/brands/fanvue.png" alt="" 
             />
            <img src="/assets/brands/onlyfans.png" alt="" 
            />
            <img src="/assets/brands/fansly.png" alt="" 
            />
            <img src="/assets/brands/fanvue.png" alt="" 
            />
            <img src="/assets/brands/onlyfans.png" alt="" 
            />
            <img src="/assets/brands/fansly.png" alt="" 
            />
          </div>
        </div>
      </div>

      <div className="what-we-do">
        <h1 data-aos="fade-right" data-aos-delay="100">
          What <span>we do?</span>
        </h1>
        <p data-aos="fade-up" data-aos-delay="100">
          We help creators get more fans by promoting their profiles through
          your Instagram page. In return, you earn money by sharing their posts,
          stories, or links in your bio. It's a simple way to make money from
          your page.
        </p>
        <img src="/assets/pages.png" alt="" data-aos="fade-up" 
             />
        <div className="number-container">
          <span className="highlight" data-aos="fade-up">more than</span>
          <p className="description" data-aos="fade-right">2K+ CREATORS</p>
        </div>
      </div>
    </>
  )
}

export default About