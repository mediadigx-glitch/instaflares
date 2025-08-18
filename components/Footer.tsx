import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
        <div className="join-us">
        <h2 className="heading" data-aos="fade-right">
          Join us and start making a profit
        </h2>
        {/* <!-- <img src="/assets/join-us.png" alt="" data-aos="zoom-in" /> --> */}
        <Link href="/signup"
          ><button className="cta-footer" data-aos="fade-up">
            Start Earning Today
          </button></Link>
      </div>

      <div className="footer">
        <div className="tabs-container">
          <div className="tab">
            <div className="tab-item" data-aos="fade-up">
              <span className="title">Company</span>
              <img src="/assets/arrow-down.svg" alt="" 
            />
            </div>
            <div className="items-container">
              <div className="item" data-aos="fade-right" data-aos-delay="100">
                <span className="title"><Link href="#why-us">Why Us?</Link></span>
                <img src="/assets/right-arrow.svg" alt="" 
            />
              </div>
              <div className="item" data-aos="fade-right" data-aos-delay="200">
                <span className="title"
                  ><Link href="#models-section">Onlyfans Promos</Link></span
                >
                <img src="/assets/right-arrow.svg" alt="" 
            />
              </div>
              <div className="item" data-aos="fade-right" data-aos-delay="300">
                <Link href="/signup"
                  ><span className="title">Verify your account</span></Link>
                <img src="/assets/right-arrow.svg" alt="" 
            />
              </div>
              <div className="item" data-aos="fade-right" data-aos-delay="400">
                <Link href="/signup"
                  ><span className="title">Start Earning</span></Link>
                <img src="/assets/right-arrow.svg" alt="" 
            />
              </div>
            </div>
          </div>

          <div className="tab">
            <div className="tab-item" data-aos="fade-up">
              <span className="title">Contact</span>
              <img src="/assets/arrow-down.svg" alt="" 
            />
            </div>

            <div className="items-container">
              <div className="item" data-aos="fade-right" data-aos-delay="100">
                <span className="title"
                  ><Link href="https://t.me/instaflares">Telegram</Link></span
                >
                <img src="/assets/right-arrow.svg" alt="" 
            />
              </div>
              <div className="item" data-aos="fade-right" data-aos-delay="200">
                <span className="title"
                  ><Link href="mailto:instaflaresofficial@gmail.com"
                    >Mail us</Link></span>
                <img src="/assets/right-arrow.svg" alt="" 
            />
              </div>
            </div>
          </div>
        </div>
        <div className="legal-container">
          <div className="links-container" data-aos="fade-right">
            <Link href="#">Terms & Services</Link>
            <Link href="#">Privacy Policy</Link>
          </div>
          <span className="footer-text" data-aos="fade-up"
            >© 2024 Instaflares, registration number: 163775 IBC 2011. For
            inquiries, contact:
            <Link href="mailto:instaflaresofficial@gmail.com"
              >instaflaresofficial@gmail.com</Link></span>
        </div>
        <div className="social-icons">
          <span>contact us on</span>
          <div className="icons-container">
            <Link href="mailto:instaflaresofficial@gmail.com"
              ><img src="/assets/mail.svg" alt=""
            
            /></Link>
            <Link href="https://t.me/instaflares"
              ><img src="/assets/social-icons/telegram.svg" alt="" 
            
            /></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer