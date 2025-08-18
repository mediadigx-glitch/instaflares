import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FooterHero = () => {
  return (
    <div className="footer-hero">
        <img id="earning_footer" src="/assets/earning.png" alt="" 
            />
        <div className="text-container">
          <img
            src="/assets/connect.png"
            alt=""
            data-aos="fade-right"
            data-aos-delay="100"
            
            
          />
          <h2 className="heading" data-aos="fade-right" data-aos-delay="200">
            Ready to <span>Start Earning</span> from your Instagram?
          </h2>
          <p className="description" data-aos="fade-up" data-aos-delay="350">
            Sign up now to access paid promotions and sponsorships from top
            OnlyFans, Fansly, and Fanvue creators!
          </p>
          <Link href="/signup"
            ><button className="cta-btn">
              <span className="button-icon"></span>
              Start Earning Today
            </button>
          </Link>
        </div>
        <img id="earning_girl" src="/assets/girl_earning.png" alt="" 
            />
      </div>
  )
}

export default FooterHero