import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Models = () => {
  return (
    <>
    <div className="models-section" id="models-section">
        <div className="text-container">
          <h2 className="heading" data-aos="fade-right" data-aos-delay="100">
            Earn by Promoting <span>OnlyFans</span> Model on Instagram!
          </h2>
          <div className="models-counter-container">
            <p className="label" data-aos="fade-up" data-aos-delay="200">
              featured models
            </p>
            <div className="counter">
              <h1 className="current" data-aos="fade-right" data-aos-delay="250">
                01
              </h1>
              <h1 className="total" data-aos="fade-up" data-aos-delay="275">/</h1>
              <h1 className="total" data-aos="fade-left" data-aos-delay="300">
                10
              </h1>
            </div>
          </div>
        </div>
        <div className="image-slider-container">
          <img
            src="/assets/models/first.png"
            alt=""
            data-aos="zoom-in-up"
            data-aos-delay="400"
            
            
          />
        </div>
    </div>
    <div className="section-details-container">
        <div className="progress"></div>
        <div className="details">
          <h1 className="heading" data-aos="fade-left" data-aos-delay="100">
            Are you an <span>instagram page</span> owner?
          </h1>
          <p className="description" data-aos="fade-up" data-aos-delay="150">
            You can earn by promoting top creators. Turn your followers into
            Real Earnings by promoting <span>onlyfans, fansly</span> and other
            popular <span>creators profile.</span>
          </p>
          <div className="promote-earn-container">
            <img
              src="/assets/models/promote.png"
              alt=""
              data-aos="fade-down"
              data-aos-delay="200"
              
            
            />
            <h2 className="heading" data-aos="fade-up" data-aos-delay="225">
              promote & earn
            </h2>
            <p className="description" data-aos="fade-up" data-aos-delay="250">
              We connect you with trending creators who need exposure.
              <span
                >Share their stories, posts, or bio links on your page and earn
                big.</span>
            </p>
            <div className="icons-container">
              <div className="item">
                <img
                  src="/assets/models/story.svg"
                  alt=""
                  data-aos="fade-left"
                  data-aos-delay="260"
                  
            
                />
                <span data-aos="fade-left" data-aos-delay="270">story</span>
              </div>
              <div className="item">
                <img
                  src="/assets/models/caption.jpg"
                  alt=""
                  data-aos="fade-up"
                  data-aos-delay="280"
                  
            
                />
                <span data-aos="fade-up" data-aos-delay="290">caption</span>
              </div>
              <div className="item">
                <img
                  src="/assets/models/post.svg"
                  alt=""
                  data-aos="fade-right"
                  data-aos-delay="300"
                  
            
                />
                <span data-aos="fade-right" data-aos-delay="310">post</span>
              </div>
            </div>
            <div className="cta-container">
              <h1 data-aos="fade-up" data-aos-delay="350">
                The <span>more promotions</span> you take on, the
                <span>more you earn!</span>
              </h1>
              <p data-aos="fade-down" data-aos-delay="380">
                Sign up now to connect with top creators and make your Instagram
                page a <span>money-making machine.</span> It's
                <span>simple, profitable,</span> and a <span>win-win</span> for
                everyone!
              </p>
              <Link href="/signup" data-aos="fade-up" data-aos-delay="400"
                ><button className="cta-btn">
                  <span className="button-icon"></span>
                  Start Earning Today
                </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Models