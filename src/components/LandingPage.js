import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      <header className="lp-container landing-header">
        <div className="landing-brand">
          <h1>RPL System</h1>
          <span>Kingdom Equippers</span>
        </div>
        <div className="landing-actions">
          <button onClick={() => navigate('/login')} className="lp-btn-text">Sign In</button>
          <button onClick={() => navigate('/signup')} className="lp-btn-primary">Create Account</button>
        </div>
      </header>

      <section className="lp-container lp-hero">
        <div className="lp-hero-grid">
          <div className="lp-hero-text">
            <h2>RPL Mobilization and Certification Platform</h2>
            <p>
              Streamlining Kenya's KNQA framework for recognition of prior learning. 
              Join our community and experience digital transformation in certification.
            </p>
            <div className="lp-cta">
              <button className="lp-btn-primary" onClick={() => navigate('/signup')}>Get Started</button>
              <button className="lp-btn-outline" onClick={() => navigate('/login')}>Sign In</button>
            </div>
          </div>
          <div className="lp-hero-image-wrap">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80" 
              alt="Team collaboration"
              className="lp-hero-image"
            />
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="lp-container">
          <h3 className="features-title">Platform Features</h3>
          <div className="features-grid">
            <div className="feature-tile">
              <div className="feature-icon-wrap"><span>🔐</span></div>
              <h4>Secure Authentication</h4>
              <p>Advanced security measures to protect your account and data</p>
            </div>
            <div className="feature-tile">
              <div className="feature-icon-wrap"><span>📋</span></div>
              <h4>KNQA Checklist</h4>
              <p>Digitized checklist aligned to KNQA standards with progress tracking</p>
            </div>
            <div className="feature-tile">
              <div className="feature-icon-wrap"><span>👥</span></div>
              <h4>Mentorship Dashboard</h4>
              <p>Track candidate progress and milestone achievements</p>
            </div>
            <div className="feature-tile">
              <div className="feature-icon-wrap"><span>📤</span></div>
              <h4>Upload Portal</h4>
              <p>Secure uploads for sermons, teaching videos, and testimonials</p>
            </div>
            <div className="feature-tile">
              <div className="feature-icon-wrap"><span>💳</span></div>
              <h4>Payment Integration</h4>
              <p>Seamless payment processing for your certification needs</p>
            </div>
            <div className="feature-tile">
              <div className="feature-icon-wrap"><span>✅</span></div>
              <h4>Email Verification</h4>
              <p>Quick and secure email verification process for all users</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div className="lp-container landing-cta-inner">
          <h3>Ready to Get Started?</h3>
          <p>
            Join the RPL System today and begin your journey toward certification under Kenya's KNQA framework.
          </p>
          <button className="lp-btn-contrast" onClick={() => navigate('/signup')}>Create Your Account</button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="lp-container landing-footer-inner">
          <div className="footer-brand">
            <h4>RPL System</h4>
            <p>Kingdom Equippers Ltd</p>
          </div>
          <div className="footer-copy">
            <p>© {new Date().getFullYear()} RPL System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;