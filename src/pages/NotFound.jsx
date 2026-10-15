import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, Home } from 'lucide-react';

export const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ padding: '100px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AlertTriangle size={70} color="var(--secondary-color)" style={{ marginBottom: '20px' }} />
      <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '10px' }}>404</h1>
      <h2 style={{ marginBottom: '15px' }}>{t.pageNotFoundTitle}</h2>
      <p style={{ color: 'var(--muted-text-color)', marginBottom: '30px', maxWidth: '400px' }}>{t.pageNotFoundDesc}</p>
      <Link to="/" className="btn-primary" style={{ padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Home size={18} /> {t.backToHome}
      </Link>
    </div>
  );
};