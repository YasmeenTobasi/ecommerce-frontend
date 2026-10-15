import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(lang === 'ar' ? 'كلمتا المرور غير متطابقتين!' : 'Passwords do not match!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/profile');
    }, 600);
  };

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '500px' }}>
      <div style={{ background: 'var(--surface-color)', padding: '30px', borderRadius: 'var(--border-radius)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <UserPlus size={26} /> {t.registerPageTitle || (lang === 'ar' ? 'إنشاء حساب جديد' : 'Create New Account')}
        </h2>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.fullNameLabel || (lang === 'ar' ? 'الاسم الكامل' : 'Full Name')}</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={lang === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
            />
          </div>

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

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{t.confirmPasswordLabel || (lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password')}</label>
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', border: 'none', cursor: 'pointer', marginBottom: '15px' }}
          >
            {isLoading ? (lang === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...') : (t.registerBtnText || (lang === 'ar' ? 'إنشاء الحساب' : 'Register'))}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px', borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
          <p style={{ color: 'var(--muted-text-color)', fontSize: '0.9rem' }}>
            {t.alreadyHaveAccount || (lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?')}{' '}
            <Link to="/login" style={{ color: 'var(--secondary-color)', fontWeight: 'bold', textDecoration: 'underline' }}>
              {t.loginLink || (lang === 'ar' ? 'سجل دخولك هنا' : 'Login here')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};