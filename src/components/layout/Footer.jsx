import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
export const Footer = () => {
  const { lang } = useLanguage();
  return (
    <footer style={{ padding: '20px', textAlign: 'center', marginTop: 'auto', background: 'var(--primary-color)', color: '#ffffff' }}>
      <p>&copy; 2026 BATMAN {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</p>
    </footer>
  );
};