import React from 'react'
import Image from 'next/image';

const Whyus = () => {
  return (
    <div className="why-us" id="why-us">
        <span className="highlight" data-aos="fade-up">why us?</span>
        <h2 className="title" data-aos="fade-up">Why Earn with Instaflares?</h2>

        <div className="features-container">
          <div className="feature money" data-aos="fade-right">
            <div className="glow"></div>
            <img src="/assets/why-us/money.png" alt="" 
            />
            <div className="text-container">
              <h2 className="heading">Earn Money Easily</h2>
              <p className="description">
                Get paid for promoting creators content to your followers.
              </p>
            </div>
          </div>
          <div className="feature quick" data-aos="fade-right">
            <div className="glow"></div>
            <img src="/assets/why-us/quick.png" alt="" 
            />
            <div className="text-container">
              <h2 className="heading">Quick Setup</h2>
              <p className="description">
                Sign up and verify your Instagram page to start receiving
                offers.
              </p>
            </div>
          </div>
          <div className="feature trust" data-aos="fade-right">
            <div className="glow"></div>
            <img src="/assets/why-us/trust.png" alt="" 
            />
            <div className="text-container">
              <h2 className="heading">Safe and Trusted</h2>
              <p className="description">
                Work only with verified creators, so you're always paid for your
                work.
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Whyus