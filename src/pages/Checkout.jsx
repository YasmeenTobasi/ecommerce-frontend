import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, Truck, DollarSign } from 'lucide-react';

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // إذا لم يكن هناك مستخدم مسجل دخول، نقوم بتوجيهه للـ login مع تنبيه
  const handleCheckAuthAndSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert(t.loginRequiredAlert || (lang === 'ar' ? 'يجب تسجيل الدخول أولاً لمتابعة إتمام الطلب.' : 'You must log in first to proceed with checkout.'));
      navigate('/login');
      return;
    }

    setIsSubmitted(true);
    clearCart();
    setTimeout(() => {
      navigate('/profile');
    }, 2500);
  };

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  if (isSubmitted) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <CheckCircle2 size={64} color="var(--success-color)" style={{ marginBottom: '20px' }} />
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>{t.orderSuccessMsg || (lang === 'ar' ? 'تم تقديم طلبك بنجاح!' : 'Order placed successfully!')}</h2>
        <p style={{ color: 'var(--muted-text-color)' }}>{lang === 'ar' ? 'جاري توجيهك إلى سجل طلباتك...' : 'Redirecting to your orders history...'}</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '25px' }}>{t.checkoutTitle || (lang === 'ar' ? 'إتمام الطلب والدفع' : 'Checkout & Payment')}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* نموذج العنوان وطرق الدفع */}
        <form onSubmit={handleCheckAuthAndSubmit} style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={20} /> {t.shippingAddress || (lang === 'ar' ? 'عنوان التوصيل' : 'Shipping Address')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 'bold' }}>{t.fullNamePlaceholder || 'Full Name'}</label>
              <input
                type="text"
                required
                placeholder={lang === 'ar' ? 'مثال: أحمد محمد' : 'e.g. John Doe'}
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 'bold' }}>{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
              <input
                type="tel"
                required
                placeholder={lang === 'ar' ? 'مثال: 0791234567' : 'e.g. +962791234567'}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 'bold' }}>{lang === 'ar' ? 'المدينة' : 'City'}</label>
              <input
                type="text"
                required
                placeholder={lang === 'ar' ? 'مثال: عمان، الزرقاء، إربد' : 'e.g. Amman, Zarqa'}
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 'bold' }}>{lang === 'ar' ? 'العنوان التفصيلي' : 'Detailed Address'}</label>
              <textarea
                required
                rows="2"
                placeholder={lang === 'ar' ? 'مثال: شارع الملك حسين، بناء رقم 12، الطابق الثالث' : 'e.g. King Hussein St, Building 12'}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
              />
            </div>
          </div>

          <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={20} /> {t.paymentMethod || (lang === 'ar' ? 'طريقة الدفع' : 'Payment Method')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            
            {/* خيار الدفع عند الاستلام */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', background: 'var(--background-color)' }}>
              <input 
                type="radio" 
                name="payment" 
                value="cod" 
                checked={formData.paymentMethod === 'cod'} 
                onChange={() => setFormData({...formData, paymentMethod: 'cod'})} 
              />
              <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={18} /> {t.cashOnDelivery || (lang === 'ar' ? 'الدفع عند الاستلام (COD)' : 'Cash on Delivery')}
              </span>
            </label>

            {/* خيار الدفع بالبطاقة / الفيزا */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', background: 'var(--background-color)' }}>
              <input 
                type="radio" 
                name="payment" 
                value="card" 
                checked={formData.paymentMethod === 'card'} 
                onChange={() => setFormData({...formData, paymentMethod: 'card'})} 
              />
              <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={18} /> {lang === 'ar' ? 'بطاقة ائتمان / فيزا (Credit Card)' : 'Credit Card / Visa'}
              </span>
            </label>
          </div>

          {/* تفاصيل البطاقة تظهر فقط إذا اختار الفيزا */}
          {formData.paymentMethod === 'card' && (
            <div style={{ background: 'rgba(201, 138, 66, 0.08)', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid var(--secondary-color)' }}>
              <input
                type="text"
                placeholder={lang === 'ar' ? 'رقم البطاقة (مثال: 4532 •••• •••• 8920)' : 'Card Number (e.g. 4532 ...)'}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'تاريخ الانتهاء (MM/YY)' : 'Expiry (MM/YY)'}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }}
                />
                <input
                  type="password"
                  placeholder="CVC"
                  maxLength="4"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }}
                />
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            {t.placeOrderBtn || (lang === 'ar' ? 'تأكيد وإرسال الطلب' : 'Confirm Order')}
          </button>
        </form>

        {/* ملخص الطلب */}
        <div style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', height: 'fit-content' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>{t.orderSummary}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>{item.name} × {item.quantity}</span>
                <span style={{ fontWeight: 'bold' }}>{item.price * item.quantity} JOD</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-color)' }}>
            <span>{t.total}:</span>
            <span>{cartTotal} JOD</span>
          </div>
        </div>

      </div>
    </div>
  );
};