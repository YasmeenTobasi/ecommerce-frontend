import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Globe, Shield, CreditCard, LogOut, Home, Package, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { lang, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmMsg = lang === 'ar' ? 'هل أنت متأكد من رغبتك في تسجيل الخروج؟' : 'Are you sure you want to logout?';
    if (window.confirm(confirmMsg)) {
      logout();
      navigate('/');
    }
  };

  return (
    <nav style={{ background: 'var(--primary-color)', color: 'white', padding: '15px 0', borderBottom: '2px solid var(--secondary-color)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        
        {/* الشعار */}
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px', textDecoration: 'none', color: 'white' }}>
          BATMAN <span style={{ color: 'var(--secondary-color)', fontSize: '0.9rem' }}>{t.brandSub}</span>
        </Link>

        {/* الروابط الأساسية */}
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#e5e7eb', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
            <Home size={16} /> {t.home}
          </Link>
          <Link to="/products" style={{ color: '#e5e7eb', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
            <Package size={16} /> {t.products}
          </Link>
          <Link to="/cart" style={{ color: '#e5e7eb', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
            <ShoppingCart size={16} /> {t.cart}
          </Link>
          <Link to="/checkout" style={{ color: '#e5e7eb', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
            <CreditCard size={16} /> {lang === 'ar' ? 'إتمام الطلب' : 'Checkout'}
          </Link>

          {user && user.role !== 'admin' && (
            <Link to="/profile" style={{ color: 'var(--secondary-color)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
              <User size={16} /> {lang === 'ar' ? 'حسابي' : 'My Profile'}
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/admin" style={{ color: 'var(--secondary-color)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
              <Shield size={16} /> {t.admin}
            </Link>
          )}
        </div>

        {/* الأزرار الجانبية */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            onClick={toggleLanguage} 
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            <Globe size={16} /> {lang === 'ar' ? 'English' : 'عربي'}
          </button>

          {user ? (
            <button 
              onClick={handleLogout} 
              style={{ background: 'transparent', border: '1px solid #f87171', color: '#f87171', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <LogOut size={16} /> {t.logout}
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" style={{ background: 'var(--secondary-color)', color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
                <LogIn size={16} /> {t.login}
              </Link>
              <Link to="/register" style={{ background: 'transparent', border: '1px solid var(--secondary-color)', color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold', textDecoration: 'none' }}>
                {lang === 'ar' ? 'حساب جديد' : 'Register'}
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};