import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
  return (
    <div className="navigation" data-aos="fade-down">
        <Link className="logo" href="/">
          <img src="/assets/logo/logo-dark.svg" alt="" 
            />
        </Link>
        <Link className="support" href="https://t.me/instaflares">
          <img src="/assets/support.svg" alt="" 
            />
        </Link>
      </div>
  )
}

export default Navigation