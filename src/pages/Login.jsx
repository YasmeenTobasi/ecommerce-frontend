import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering && password !== confirmPassword) {
      alert(t.passwordsMismatch);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email || 'user@example.com', password);
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  const fillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('123456');
  };

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '500px' }}>
      <div style={{ background: 'var(--surface-color)', padding: '30px', borderRadius: 'var(--border-radius)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          {isRegistering ? <UserPlus size={26} /> : <LogIn size={26} />}
          {isRegistering ? t.registerTitle : t.loginTitle}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.fullNameLabel}</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.fullNamePlaceholder}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.emailLabel}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
            />
          </div>

          <div style={{ marginBottom: '15px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.passwordLabel}</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', [lang === 'ar' ? 'left' : 'right']: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-text-color)' }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isRegistering && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.confirmPasswordLabel}</label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', border: 'none', cursor: 'pointer', marginBottom: '15px' }}
          >
            {isLoading ? (isRegistering ? t.creatingAccount : t.loggingIn) : (isRegistering ? t.registerBtn : t.loginBtn)}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px', borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
          <p style={{ color: 'var(--muted-text-color)', fontSize: '0.9rem' }}>
            {isRegistering ? t.hasAccount : t.noAccount}{' '}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isRegistering ? t.loginLink : t.createAccountLink}
            </button>
          </p>
        </div>

        {!isRegistering && (
          <div style={{ marginTop: '20px', background: 'var(--background-color)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
            <p style={{ fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '6px' }}>{t.demoAccountsTitle}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => fillDemo('admin@batman.com')} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' }}>
                {t.adminDemo} admin@batman.com
              </button>
              <button onClick={() => fillDemo('customer@batman.com')} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' }}>
                {t.customerDemo} customer@batman.com
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};