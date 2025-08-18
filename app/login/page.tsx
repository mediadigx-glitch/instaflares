"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const LoginPage = () => {
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || 'Login failed');
    else {
      // Save token to localStorage or cookie as needed
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard'; // redirect to home or dashboard
    }
  }

  return (
    <div className="root">
      <div className="auth-container">
        <img className="auth-image" src="/assets/logo-fav.png" alt="" />
        <h2 className="heading">Sign in to your instaflares account.</h2>
        <form className="auth" id="auth-form" onSubmit={handleSubmit}>
          <input className="input" type="email" name="email" id="email" placeholder="Enter your registered email" />
          <input className="input" type="password" name="password" id="password" placeholder="Enter your password" />
          <input className="submit" type="submit" name="submit" value="Sign in" />
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <span className="sign-in">Don't have an account?
          <Link href="/signup"><span> Sign-up now!</span></Link></span>
      </div>
    </div>
  );
};

export default LoginPage;