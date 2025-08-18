"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const SignupPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || 'Signup failed');
    else {
      setSuccess('Account created! Redirecting...');
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  }

  return (
    <div className="root">
      <div className="auth-container">
        <img className="auth-image" src="/assets/logo-fav.png" alt="" />
        <h2 className="heading">Create your instaflares account.</h2>
        <form className="auth" id="auth-form" onSubmit={handleSubmit}>
          <input className="input" type="text" name="name" id="name" placeholder="Enter your name" />
          <input className="input" type="email" name="email" id="email" placeholder="Enter your Email" />
          <input className="input" type="password" name="password" id="password" placeholder="Create your password" />
          <div className="checkbox-container">
            <input className="checkbox" type="checkbox" name="privacy" id="" />
            <p className="description">
              By ticking this box, you confirm that you have read, understood,
              and agree to the 
              <u><span><Link href="#"> Instaflares Terms and Conditions.</Link></span></u>
            </p>
          </div>
          <input className="submit" type="submit" name="submit" value="Create Account" />
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        <span className="sign-in">Do you have an account?
          <Link href="/login"><span> Sign-in now!</span></Link></span>
      </div>
    </div>
  );
};

export default SignupPage;