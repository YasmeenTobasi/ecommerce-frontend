import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { mockOrders } from '../data/mockData';
import { User, PackageCheck } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <User size={28} /> {t.profileTitle}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
        {/* البيانات الشخصية */}
        <div style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>{t.personalInfo}</h3>
          <p style={{ marginBottom: '10px' }}><strong>{t.emailLabel}:</strong> {user?.email || 'customer@batman.com'}</p>
          <p style={{ marginBottom: '10px' }}><strong>نوع الحساب:</strong> {user?.role === 'admin' ? t.admin : 'عميل'}</p>
        </div>

        {/* الطلبات السابقة */}
        <div style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PackageCheck size={20} /> {t.orderHistory}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockOrders.map(order => (
              <div key={order.id} style={{ background: 'var(--background-color)', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 'bold', color: 'var(--primary-color)', fontSize: '0.9rem' }}>{t.orderIdLabel}: {order.id}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted-text-color)' }}>{order.date}</p>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontWeight: 'bold', display: 'block' }}>{order.total} JOD</span>
                  <span style={{ fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 'bold' }}>{t.deliveredStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};