import React, { useEffect, useRef, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const heroStepData = [
  {
    count: "Step 1",
    heading: "Create Your Instaflares Account",
    description:
      "Sign up using your email and start your journey to <span>seamless promotions</span> with just a few clicks.",
    image: "/assets/step1.png",
  },
  {
    count: "Step 2",
    heading: "Add Your Instagram Account",
    description:
      "Connect your Instagram account to get personalized promotion options.",
    image: "/assets/step2.png",
  },
  {
    count: "Step 3",
    heading: "Verify Your Instagram Account",
    description:
      "Confirm that the Instagram account belongs to you to start promotions.",
    image: "/assets/step3.png",
  },
];

const StepSlider = () => {
    const [stepIndex, setStepIndex] = useState(0);
    const [animate, setAnimate] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        AOS.init({ once: false });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [stepIndex]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
        setAnimate(false);
        setTimeout(() => {
            setStepIndex((prev) => (prev + 1) % heroStepData.length);
            setAnimate(true);
        }, 50);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    }, []);

    

    const step = heroStepData[stepIndex];

  return (
    <div className="step-slider-wrapper">
          <div className="step-slider" data-aos="fade-up" data-aos-delay="1200">
            <div className={`svg-container`}>
              <svg
                viewBox="0 0 390 82"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                id="parent-svg"
                style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}
              >
                <path d="M0 52L96 52" stroke="#E0E0E0" />
                <path d="M294 52L390 52" stroke="#E0E0E0" />
                <path
                  d="M128.415 45.9788V34.1168H137.968C145.5 34.1168 150.577 29.6549 150.577 23.1798C150.577 16.8135 146.046 12.6238 137.858 12.6238C130.216 12.6238 125.14 17.14 124.703 23.996H109.528C110.129 9.46782 121.483 0 138.568 0C154.944 0 166.134 8.37956 166.134 20.9489C166.134 30.58 159.529 37.5448 149.867 39.286V39.6125C161.603 40.5919 169.191 47.6656 169.191 58.5481C169.191 72.641 156.363 82 138.186 82C120.391 82 108.764 72.2601 108 57.7863H123.775C124.267 64.4247 129.725 68.7777 138.404 68.7777C146.647 68.7777 152.433 64.1526 152.433 57.5143C152.433 50.3318 147.029 45.9788 138.131 45.9788H128.415Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M269.541 54.9713H272.661C272.811 56.2432 274.141 57.0769 275.856 57.0769C277.583 57.0769 278.762 56.2539 278.762 55.1209C278.762 54.1162 278.022 53.5604 276.157 53.1436L274.141 52.7054C271.289 52.0961 269.884 50.6532 269.884 48.398C269.884 45.555 272.35 43.6738 275.803 43.6738C279.405 43.6738 281.668 45.5229 281.721 48.3125H278.687C278.58 47.0086 277.433 46.2176 275.814 46.2176C274.216 46.2176 273.144 46.9765 273.144 48.1201C273.144 49.0714 273.894 49.6058 275.674 50.0119L277.551 50.4074C280.649 51.0701 282 52.3954 282 54.7468C282 57.7395 279.566 59.6313 275.728 59.6313C272.007 59.6313 269.638 57.8678 269.541 54.9713Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M255.666 54.9713H258.786C258.936 56.2432 260.266 57.0769 261.981 57.0769C263.708 57.0769 264.887 56.2539 264.887 55.1209C264.887 54.1162 264.147 53.5604 262.282 53.1436L260.266 52.7054C257.414 52.0961 256.009 50.6532 256.009 48.398C256.009 45.555 258.475 43.6738 261.928 43.6738C265.53 43.6738 267.793 45.5229 267.846 48.3125H264.812C264.705 47.0086 263.558 46.2176 261.939 46.2176C260.341 46.2176 259.269 46.9765 259.269 48.1201C259.269 49.0714 260.019 49.6058 261.799 50.0119L263.676 50.4074C266.774 51.0701 268.125 52.3954 268.125 54.7468C268.125 57.7395 265.691 59.6313 261.853 59.6313C258.132 59.6313 255.763 57.8678 255.666 54.9713Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M253.907 56.6924V59.3645H243.656V43.9414H253.907V46.6028H246.894V50.3223H253.51V52.8019H246.894V56.6924H253.907Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M234.843 59.6313C230.339 59.6313 227.52 56.6279 227.52 51.6472C227.52 46.6772 230.361 43.6738 234.843 43.6738C238.563 43.6738 241.394 46.0252 241.641 49.4775H238.488C238.188 47.5857 236.73 46.3459 234.843 46.3459C232.398 46.3459 230.822 48.3873 230.822 51.6365C230.822 54.9285 232.377 56.9593 234.854 56.9593C236.773 56.9593 238.156 55.837 238.499 54.0093H241.651C241.287 57.4509 238.638 59.6313 234.843 59.6313Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M218.449 43.6738C223.027 43.6738 225.912 46.7413 225.912 51.6579C225.912 56.5638 223.027 59.6313 218.449 59.6313C213.86 59.6313 210.986 56.5638 210.986 51.6579C210.986 46.7413 213.86 43.6738 218.449 43.6738ZM218.449 46.3673C215.919 46.3673 214.289 48.4194 214.289 51.6579C214.289 54.8858 215.908 56.9272 218.449 56.9272C220.979 56.9272 222.598 54.8858 222.598 51.6579C222.598 48.4194 220.979 46.3673 218.449 46.3673Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M200.64 46.4638V51.3804H203.428C205.058 51.3804 206.012 50.4505 206.012 48.9221C206.012 47.4258 205.004 46.4638 203.396 46.4638H200.64ZM200.64 53.7211V59.3645H197.402V43.9414H203.739C207.299 43.9414 209.336 45.8118 209.336 48.858C209.336 50.8353 208.307 52.5454 206.527 53.2402L209.786 59.3645H206.119L203.235 53.7211H200.64Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M183.828 43.9414H190.122C193.296 43.9414 195.483 46.047 195.483 49.2214C195.483 52.3851 193.221 54.5014 189.961 54.5014H187.066V59.3645H183.828V43.9414ZM187.066 46.4959V51.9789H189.254C191.109 51.9789 192.191 50.9956 192.191 49.2321C192.191 47.4792 191.119 46.4959 189.264 46.4959H187.066Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M223.5 22.0518H229.794C232.968 22.0518 235.155 24.1573 235.155 27.3317C235.155 30.4954 232.893 32.6117 229.633 32.6117H226.738V37.4749H223.5V22.0518ZM226.738 24.6062V30.0893H228.925C230.78 30.0893 231.863 29.106 231.863 27.3424C231.863 25.5896 230.791 24.6062 228.936 24.6062H226.738Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M221.161 34.8028V37.4749H210.91V22.0518H221.161V24.7131H214.148V28.4326H220.764V30.9123H214.148V34.8028H221.161Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M204.639 37.4749H201.401V24.7131H196.93V22.0518H209.121V24.7131H204.639V37.4749Z"
                  fill="#7A7A7A"
                />
                <path
                  d="M183.248 33.0816H186.368C186.518 34.3535 187.848 35.1872 189.563 35.1872C191.29 35.1872 192.469 34.3642 192.469 33.2313C192.469 32.2266 191.729 31.6708 189.864 31.2539L187.848 30.8157C184.996 30.2065 183.591 28.7636 183.591 26.5084C183.591 23.6653 186.057 21.7842 189.51 21.7842C193.112 21.7842 195.375 23.6332 195.428 26.4229H192.394C192.287 25.1189 191.14 24.328 189.521 24.328C187.923 24.328 186.851 25.0868 186.851 26.2305C186.851 27.1817 187.601 27.7161 189.381 28.1223L191.258 28.5178C194.356 29.1804 195.707 30.5058 195.707 32.8572C195.707 35.8499 193.273 37.7417 189.435 37.7417C185.714 37.7417 183.345 35.9781 183.248 33.0816Z"
                  fill="#7A7A7A"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                  viewBox="0 0 390 82"
                  fill="none"
                  id="target-element"
                  className={animate ? 'clip-reveal-animation' : ''}
                >
                  <path
                    className="fill"
                    d="M0 52L96 52"
                    stroke="url(#paint0_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M0 52L96 52"
                    stroke="url(#paint1_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M294 52L390 52"
                    stroke="url(#paint2_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M294 52L390 52"
                    stroke="url(#paint3_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M128.415 45.9788V34.1168H137.968C145.5 34.1168 150.577 29.6549 150.577 23.1798C150.577 16.8135 146.046 12.6238 137.858 12.6238C130.216 12.6238 125.14 17.14 124.703 23.996H109.528C110.129 9.46782 121.483 0 138.568 0C154.944 0 166.134 8.37956 166.134 20.9489C166.134 30.58 159.529 37.5448 149.867 39.286V39.6125C161.603 40.5919 169.191 47.6656 169.191 58.5481C169.191 72.641 156.363 82 138.186 82C120.391 82 108.764 72.2601 108 57.7863H123.775C124.267 64.4247 129.725 68.7777 138.404 68.7777C146.647 68.7777 152.433 64.1526 152.433 57.5143C152.433 50.3318 147.029 45.9788 138.131 45.9788H128.415Z"
                    fill="url(#paint4_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M128.415 45.9788V34.1168H137.968C145.5 34.1168 150.577 29.6549 150.577 23.1798C150.577 16.8135 146.046 12.6238 137.858 12.6238C130.216 12.6238 125.14 17.14 124.703 23.996H109.528C110.129 9.46782 121.483 0 138.568 0C154.944 0 166.134 8.37956 166.134 20.9489C166.134 30.58 159.529 37.5448 149.867 39.286V39.6125C161.603 40.5919 169.191 47.6656 169.191 58.5481C169.191 72.641 156.363 82 138.186 82C120.391 82 108.764 72.2601 108 57.7863H123.775C124.267 64.4247 129.725 68.7777 138.404 68.7777C146.647 68.7777 152.433 64.1526 152.433 57.5143C152.433 50.3318 147.029 45.9788 138.131 45.9788H128.415Z"
                    fill="url(#paint5_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M269.541 54.9713H272.661C272.811 56.2432 274.141 57.0769 275.856 57.0769C277.583 57.0769 278.762 56.2539 278.762 55.1209C278.762 54.1162 278.022 53.5604 276.157 53.1436L274.141 52.7054C271.289 52.0961 269.884 50.6532 269.884 48.398C269.884 45.555 272.35 43.6738 275.803 43.6738C279.405 43.6738 281.668 45.5229 281.721 48.3125H278.687C278.58 47.0086 277.433 46.2176 275.814 46.2176C274.216 46.2176 273.144 46.9765 273.144 48.1201C273.144 49.0714 273.894 49.6058 275.674 50.0119L277.551 50.4074C280.649 51.0701 282 52.3954 282 54.7468C282 57.7395 279.566 59.6313 275.728 59.6313C272.007 59.6313 269.638 57.8678 269.541 54.9713Z"
                    fill="url(#paint6_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M269.541 54.9713H272.661C272.811 56.2432 274.141 57.0769 275.856 57.0769C277.583 57.0769 278.762 56.2539 278.762 55.1209C278.762 54.1162 278.022 53.5604 276.157 53.1436L274.141 52.7054C271.289 52.0961 269.884 50.6532 269.884 48.398C269.884 45.555 272.35 43.6738 275.803 43.6738C279.405 43.6738 281.668 45.5229 281.721 48.3125H278.687C278.58 47.0086 277.433 46.2176 275.814 46.2176C274.216 46.2176 273.144 46.9765 273.144 48.1201C273.144 49.0714 273.894 49.6058 275.674 50.0119L277.551 50.4074C280.649 51.0701 282 52.3954 282 54.7468C282 57.7395 279.566 59.6313 275.728 59.6313C272.007 59.6313 269.638 57.8678 269.541 54.9713Z"
                    fill="url(#paint7_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M255.666 54.9713H258.786C258.936 56.2432 260.266 57.0769 261.981 57.0769C263.708 57.0769 264.887 56.2539 264.887 55.1209C264.887 54.1162 264.147 53.5604 262.282 53.1436L260.266 52.7054C257.414 52.0961 256.009 50.6532 256.009 48.398C256.009 45.555 258.475 43.6738 261.928 43.6738C265.53 43.6738 267.793 45.5229 267.846 48.3125H264.812C264.705 47.0086 263.558 46.2176 261.939 46.2176C260.341 46.2176 259.269 46.9765 259.269 48.1201C259.269 49.0714 260.019 49.6058 261.799 50.0119L263.676 50.4074C266.774 51.0701 268.125 52.3954 268.125 54.7468C268.125 57.7395 265.691 59.6313 261.853 59.6313C258.132 59.6313 255.763 57.8678 255.666 54.9713Z"
                    fill="url(#paint8_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M255.666 54.9713H258.786C258.936 56.2432 260.266 57.0769 261.981 57.0769C263.708 57.0769 264.887 56.2539 264.887 55.1209C264.887 54.1162 264.147 53.5604 262.282 53.1436L260.266 52.7054C257.414 52.0961 256.009 50.6532 256.009 48.398C256.009 45.555 258.475 43.6738 261.928 43.6738C265.53 43.6738 267.793 45.5229 267.846 48.3125H264.812C264.705 47.0086 263.558 46.2176 261.939 46.2176C260.341 46.2176 259.269 46.9765 259.269 48.1201C259.269 49.0714 260.019 49.6058 261.799 50.0119L263.676 50.4074C266.774 51.0701 268.125 52.3954 268.125 54.7468C268.125 57.7395 265.691 59.6313 261.853 59.6313C258.132 59.6313 255.763 57.8678 255.666 54.9713Z"
                    fill="url(#paint9_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M253.907 56.6924V59.3645H243.656V43.9414H253.907V46.6028H246.894V50.3223H253.51V52.8019H246.894V56.6924H253.907Z"
                    fill="url(#paint10_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M253.907 56.6924V59.3645H243.656V43.9414H253.907V46.6028H246.894V50.3223H253.51V52.8019H246.894V56.6924H253.907Z"
                    fill="url(#paint11_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M234.843 59.6313C230.339 59.6313 227.52 56.6279 227.52 51.6472C227.52 46.6772 230.361 43.6738 234.843 43.6738C238.563 43.6738 241.394 46.0252 241.641 49.4775H238.488C238.188 47.5857 236.73 46.3459 234.843 46.3459C232.398 46.3459 230.822 48.3873 230.822 51.6366C230.822 54.9285 232.377 56.9593 234.854 56.9593C236.773 56.9593 238.156 55.837 238.499 54.0093H241.651C241.287 57.4509 238.638 59.6313 234.843 59.6313Z"
                    fill="url(#paint12_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M234.843 59.6313C230.339 59.6313 227.52 56.6279 227.52 51.6472C227.52 46.6772 230.361 43.6738 234.843 43.6738C238.563 43.6738 241.394 46.0252 241.641 49.4775H238.488C238.188 47.5857 236.73 46.3459 234.843 46.3459C232.398 46.3459 230.822 48.3873 230.822 51.6366C230.822 54.9285 232.377 56.9593 234.854 56.9593C236.773 56.9593 238.156 55.837 238.499 54.0093H241.651C241.287 57.4509 238.638 59.6313 234.843 59.6313Z"
                    fill="url(#paint13_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M218.449 43.6738C223.027 43.6738 225.912 46.7413 225.912 51.6579C225.912 56.5638 223.027 59.6313 218.449 59.6313C213.86 59.6313 210.986 56.5638 210.986 51.6579C210.986 46.7413 213.86 43.6738 218.449 43.6738ZM218.449 46.3673C215.919 46.3673 214.289 48.4194 214.289 51.6579C214.289 54.8858 215.908 56.9272 218.449 56.9272C220.979 56.9272 222.598 54.8858 222.598 51.6579C222.598 48.4194 220.979 46.3673 218.449 46.3673Z"
                    fill="url(#paint14_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M218.449 43.6738C223.027 43.6738 225.912 46.7413 225.912 51.6579C225.912 56.5638 223.027 59.6313 218.449 59.6313C213.86 59.6313 210.986 56.5638 210.986 51.6579C210.986 46.7413 213.86 43.6738 218.449 43.6738ZM218.449 46.3673C215.919 46.3673 214.289 48.4194 214.289 51.6579C214.289 54.8858 215.908 56.9272 218.449 56.9272C220.979 56.9272 222.598 54.8858 222.598 51.6579C222.598 48.4194 220.979 46.3673 218.449 46.3673Z"
                    fill="url(#paint15_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M200.64 46.4638V51.3804H203.428C205.058 51.3804 206.012 50.4505 206.012 48.9221C206.012 47.4258 205.004 46.4638 203.396 46.4638H200.64ZM200.64 53.7211V59.3645H197.402V43.9414H203.739C207.299 43.9414 209.336 45.8118 209.336 48.858C209.336 50.8353 208.307 52.5454 206.527 53.2402L209.786 59.3645H206.119L203.235 53.7211H200.64Z"
                    fill="url(#paint16_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M200.64 46.4638V51.3804H203.428C205.058 51.3804 206.012 50.4505 206.012 48.9221C206.012 47.4258 205.004 46.4638 203.396 46.4638H200.64ZM200.64 53.7211V59.3645H197.402V43.9414H203.739C207.299 43.9414 209.336 45.8118 209.336 48.858C209.336 50.8353 208.307 52.5454 206.527 53.2402L209.786 59.3645H206.119L203.235 53.7211H200.64Z"
                    fill="url(#paint17_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M183.828 43.9414H190.122C193.296 43.9414 195.483 46.047 195.483 49.2214C195.483 52.3851 193.221 54.5014 189.961 54.5014H187.066V59.3645H183.828V43.9414ZM187.066 46.4959V51.9789H189.254C191.109 51.9789 192.191 50.9956 192.191 49.2321C192.191 47.4792 191.119 46.4959 189.264 46.4959H187.066Z"
                    fill="url(#paint18_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M183.828 43.9414H190.122C193.296 43.9414 195.483 46.047 195.483 49.2214C195.483 52.3851 193.221 54.5014 189.961 54.5014H187.066V59.3645H183.828V43.9414ZM187.066 46.4959V51.9789H189.254C191.109 51.9789 192.191 50.9956 192.191 49.2321C192.191 47.4792 191.119 46.4959 189.264 46.4959H187.066Z"
                    fill="url(#paint19_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M223.5 22.0518H229.794C232.968 22.0518 235.155 24.1573 235.155 27.3317C235.155 30.4954 232.893 32.6117 229.633 32.6117H226.738V37.4749H223.5V22.0518ZM226.738 24.6062V30.0893H228.925C230.78 30.0893 231.863 29.106 231.863 27.3424C231.863 25.5896 230.791 24.6062 228.936 24.6062H226.738Z"
                    fill="url(#paint20_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M223.5 22.0518H229.794C232.968 22.0518 235.155 24.1573 235.155 27.3317C235.155 30.4954 232.893 32.6117 229.633 32.6117H226.738V37.4749H223.5V22.0518ZM226.738 24.6062V30.0893H228.925C230.78 30.0893 231.863 29.106 231.863 27.3424C231.863 25.5896 230.791 24.6062 228.936 24.6062H226.738Z"
                    fill="url(#paint21_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M221.161 34.8028V37.4749H210.91V22.0518H221.161V24.7131H214.148V28.4326H220.764V30.9123H214.148V34.8028H221.161Z"
                    fill="url(#paint22_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M221.161 34.8028V37.4749H210.91V22.0518H221.161V24.7131H214.148V28.4326H220.764V30.9123H214.148V34.8028H221.161Z"
                    fill="url(#paint23_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M204.639 37.4749H201.401V24.7131H196.93V22.0518H209.121V24.7131H204.639V37.4749Z"
                    fill="url(#paint24_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M204.639 37.4749H201.401V24.7131H196.93V22.0518H209.121V24.7131H204.639V37.4749Z"
                    fill="url(#paint25_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M183.248 33.0816H186.368C186.518 34.3535 187.848 35.1872 189.563 35.1872C191.29 35.1872 192.469 34.3642 192.469 33.2313C192.469 32.2266 191.729 31.6708 189.864 31.2539L187.848 30.8157C184.996 30.2065 183.591 28.7636 183.591 26.5084C183.591 23.6653 186.057 21.7842 189.51 21.7842C193.112 21.7842 195.375 23.6332 195.428 26.4229H192.394C192.287 25.1189 191.14 24.328 189.521 24.328C187.923 24.328 186.851 25.0868 186.851 26.2305C186.851 27.1817 187.601 27.7161 189.381 28.1223L191.258 28.5178C194.356 29.1804 195.707 30.5058 195.707 32.8572C195.707 35.8499 193.273 37.7417 189.435 37.7417C185.714 37.7417 183.345 35.9781 183.248 33.0816Z"
                    fill="url(#paint26_radial_196_180)"
                  />
                  <path
                    className="fill"
                    d="M183.248 33.0816H186.368C186.518 34.3535 187.848 35.1872 189.563 35.1872C191.29 35.1872 192.469 34.3642 192.469 33.2313C192.469 32.2266 191.729 31.6708 189.864 31.2539L187.848 30.8157C184.996 30.2065 183.591 28.7636 183.591 26.5084C183.591 23.6653 186.057 21.7842 189.51 21.7842C193.112 21.7842 195.375 23.6332 195.428 26.4229H192.394C192.287 25.1189 191.14 24.328 189.521 24.328C187.923 24.328 186.851 25.0868 186.851 26.2305C186.851 27.1817 187.601 27.7161 189.381 28.1223L191.258 28.5178C194.356 29.1804 195.707 30.5058 195.707 32.8572C195.707 35.8499 193.273 37.7417 189.435 37.7417C185.714 37.7417 183.345 35.9781 183.248 33.0816Z"
                    fill="url(#paint27_radial_196_180)"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(101.003 53.3064) rotate(-178.781) scale(105.842 11.6899)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint1_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(33.5382 53.2503) rotate(-1.31195) scale(35.3653 1.85627)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint2_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(395.003 53.3064) rotate(-178.78) scale(105.842 11.6899)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint3_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(327.538 53.2503) rotate(-1.31194) scale(35.3653 1.85627)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint4_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(172.38 107.123) rotate(-110.06) scale(196.643 328.868)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint5_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(129.377 102.523) rotate(-71.252) scale(70.117 48.9353)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint6_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(282.65 64.5204) rotate(-110.91) scale(38.48 66.5916)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint7_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(273.894 63.6253) rotate(-70.4487) scale(13.7116 9.91545)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint8_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(268.775 64.5204) rotate(-110.91) scale(38.48 66.5916)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint9_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(260.019 63.6253) rotate(-70.4487) scale(13.7116 9.91545)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint10_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(254.441 64.0898) rotate(-108.016) scale(36.5332 55.7733)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint11_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(247.237 63.2247) rotate(-73.1803) scale(13.0465 8.28643)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint12_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(242.388 64.5204) rotate(-113.43) scale(39.1759 74.1899)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint13_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(232.457 63.6253) rotate(-68.0602) scale(13.9299 11.0704)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint14_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(226.69 64.5204) rotate(-114.593) scale(39.5318 77.6499)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint15_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(216.201 63.6253) rotate(-66.9542) scale(14.0417 11.5989)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint16_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(210.432 64.0898) rotate(-111.451) scale(37.3276 65.9488)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint17_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(201.729 63.2247) rotate(-69.9368) scale(13.2951 9.82406)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint18_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(196.091 64.0898) rotate(-110.294) scale(37.0413 62.5459)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint19_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(187.9 63.2247) rotate(-71.0313) scale(13.2054 9.30848)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint20_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(235.762 42.2002) rotate(-110.294) scale(37.0413 62.5459)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint21_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(227.572 41.335) rotate(-71.0313) scale(13.2054 9.30848)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint22_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(221.695 42.2002) rotate(-108.016) scale(36.5332 55.7733)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint23_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(214.491 41.335) rotate(-73.1803) scale(13.0465 8.28643)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint24_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(209.756 42.2002) rotate(-111.146) scale(37.2504 65.0557)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint25_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(201.189 41.335) rotate(-70.2251) scale(13.2709 9.6886)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="paint26_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(196.357 42.6307) rotate(-110.91) scale(38.48 66.5916)"
                    >
                      <stop offset="0.24392" stopColor="#FF1B90" />
                      <stop offset="0.436673" stopColor="#F80261" />
                      <stop offset="0.688476" stopColor="#ED00C0" />
                      <stop offset="0.776787" stopColor="#C500E9" />
                      <stop offset="0.893155" stopColor="#7017FF" />
                    </radialGradient>
                    <radialGradient
                      id="paint27_radial_196_180"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(187.601 41.7356) rotate(-70.4487) scale(13.7116 9.91545)"
                    >
                      <stop stopColor="#FFD600" />
                      <stop offset="0.484375" stopColor="#FF6930" />
                      <stop offset="0.734375" stopColor="#FE3B36" />
                      <stop offset="1" stopColor="#FE3B36" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </svg>
            </div>
          </div>
          <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            className="step-container"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-container">
              <span className="step-count">{step.count}</span>
              <h3 className="step-title">{step.heading}</h3>
              <p className="step-description" dangerouslySetInnerHTML={{ __html: step.description }} />
            </div>
            <div className="step-image">
              <img id="step-image" src={step.image} alt={step.heading} 
            />
            </div>
          </motion.div>
        </AnimatePresence>
          <div className="cta-container">
            <img src="/assets/pages.png" alt="" data-aos="fade-up" 
            />
            <div className="number-container" data-aos="fade-right">
              <div className="item">
                <span className="title" data-aos="fade-up" data-aos-delay="200"
                  >more than</span
                >
                <h2 className="description" data-aos="fade-up" data-aos-delay="300">
                  5000+ creators
                </h2>
              </div>
              <div className="item">
                <span className="title" data-aos="fade-up" data-aos-delay="200"
                  >generated over</span
                >
                <h2 className="description" data-aos="fade-up" data-aos-delay="300">
                  $5M+ revenue
                </h2>
              </div>
            </div>
            <Link href="/signup" data-aos="fade-down">
              <button className="cta-btn">
                <span className="button-icon"></span>
                Get Started with Promotions
              </button>
            </Link>
          </div>
        </div>
  )
}

export default StepSlider