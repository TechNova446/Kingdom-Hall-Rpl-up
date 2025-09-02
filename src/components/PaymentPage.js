import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending'); 

  const REGISTRATION_FEE = 200;

  const handlePhoneChange = (e) => {
    // Force phone number to be numeric and max 9 digits (after +254)
    const input = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(input);
    setError('');
  };

  const handlePayNow = async (e) => {
    e.preventDefault();

    if (phone.length !== 9) {
      setError('Please enter a valid Safaricom number (e.g. 712345678)');
      return;
    }

    const fullPhone = `254${phone}`;

    setLoading(true);
    setError('');
    setSuccess('');
    setPaymentStatus('processing');

    try {
      const response = await authAPI.makePayment({
        phone: fullPhone,
        amount: REGISTRATION_FEE
      });

      if (response.ResponseCode === "0") {
        setSuccess('Payment initiated successfully! Please check your phone for M-Pesa prompt.');
        setPaymentStatus('completed');
        localStorage.setItem('payment_completed', 'true');
        localStorage.setItem('payment_details', JSON.stringify(response));

        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        throw new Error(response.ResponseDescription || 'Payment failed');
      }
    } catch (err) {
      setError(err.detail || err.message || 'Payment failed. Please try again.');
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePayLater = () => {
    setSuccess('Payment deferred. Redirecting to dashboard...');
    setPaymentStatus('deferred');
    localStorage.setItem('payment_deferred', 'true');
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="payment-page">
      <div className="payment-header">
        <div className="header-content">
          <div className="logo-section">
            <img src="https://via.placeholder.com/60x60/28a745/ffffff?text=RPL" alt="Logo" className="logo-image"/>
            <div className="logo-text">
              <h1>RPL System</h1>
              <p>Kingdom Equippers</p>
            </div>
          </div>
          <div className="user-section">
            <div className="user-info">
              <span className="user-name">{user.username}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button onClick={logout} className="btn-logout">Logout</button>
          </div>
        </div>
      </div>

      <div className="payment-main">
        <div className="payment-card">
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <h2 className="payment-title">Complete Your Registration</h2>
          <p className="payment-subtitle">Welcome! Please complete your registration by paying the required fee.</p>

          <div className="payment-summary">
            <div className="summary-item">
              <span>Registration Fee:</span>
              <span>KES {REGISTRATION_FEE.toLocaleString()}</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>KES {REGISTRATION_FEE.toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handlePayNow} className="payment-form">
            <label htmlFor="phone" className="form-label">M-Pesa Phone Number</label>
            <div className="phone-input-wrapper">
              <span className="phone-prefix">+254</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control phone-input"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="712345678"
                disabled={paymentStatus !== 'pending'}
                required
              />
            </div>
            <small className="form-help">Enter your number without the +254 (e.g. 712345678)</small>

            <div className="payment-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading || paymentStatus !== 'pending'}
              >
                {loading ? 'Processing...' : `Pay Now (KES ${REGISTRATION_FEE})`}
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handlePayLater}
                disabled={paymentStatus !== 'pending'}
              >
                Pay Later
              </button>
            </div>
          </form>

          {paymentStatus === 'completed' && (
            <div className="payment-status success">✅ Payment Successful! Redirecting...</div>
          )}
          {paymentStatus === 'failed' && (
            <div className="payment-status error">❌ Payment Failed. Try again.</div>
          )}
          {paymentStatus === 'deferred' && (
            <div className="payment-status info">⏰ Payment Deferred. Redirecting...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
