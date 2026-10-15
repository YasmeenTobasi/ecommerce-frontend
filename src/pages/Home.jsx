import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Search, ArrowRight, ArrowLeft, ShieldCheck, Truck, Headphones, Tag } from 'lucide-react';

export const Home = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const categories = [
    { id: 'gaming', name: lang === 'ar' ? 'ألعاب الفيديو' : 'Gaming', icon: '🎮' },
    { id: 'computers', name: lang === 'ar' ? 'أجهزة الكمبيوتر' : 'Computers', icon: '💻' },
    { id: 'audio', name: lang === 'ar' ? 'السوتيات والصوت' : 'Audio & Sound', icon: '🎧' },
    { id: 'wearables', name: lang === 'ar' ? 'الإكسسوارات الذكية' : 'Wearables', icon: '⌚' }
  ];

  return (
    <div>
      {/* 1. Hero Section مع العنوان والتسويق وزر الإجراء ومربع البحث السريع */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-color), #2d1e15)', color: 'white', padding: '70px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', fontWeight: 'bold' }}>
            {lang === 'ar' ? 'اكتشف أحدث التقنيات والمنتجات الذكية' : 'Discover Latest Tech & Smart Devices'}
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#d1d5db' }}>
            {lang === 'ar' ? 'تسوق أفضل الأجهزة والإكسسوارات بجودة عالية وتوصيل سريع حتى باب منزلك.' : 'Shop the best gadgets and accessories with high quality and fast delivery.'}
          </p>

          {/* مربع بحث سريع ينتقل لصفحة المنتجات */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '600px', margin: '0 auto 25px auto', background: 'white', padding: '6px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <input
              type="text"
              placeholder={t.searchPlaceholder || (lang === 'ar' ? 'ابحث عن منتج...' : 'Search for a product...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: 'none', padding: '10px 20px', outline: 'none', borderRadius: '30px', fontSize: '1rem', color: '#333' }}
            />
            <button type="submit" className="btn-primary" style={{ border: 'none', padding: '10px 25px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Search size={18} /> {lang === 'ar' ? 'بحث' : 'Search'}
            </button>
          </form>

          <Link to="/products" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 30px', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none', background: 'var(--secondary-color)', color: 'white' }}>
            {t.browseProducts || (lang === 'ar' ? 'تصفح المنتجات الآن' : 'Browse Products Now')} {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Link>
        </div>
      </section>

      {/* 2. قسم التصنيفات الرئيسية باستخدام CategoryCard */}
      <section className="container" style={{ padding: '50px 20px' }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '25px', textAlign: 'center', fontSize: '1.8rem' }}>
          {lang === 'ar' ? 'التصنيفات الرئيسية' : 'Main Categories'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => navigate(`/products?category=${cat.id}`)}
              style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: 'var(--border-radius)', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e5e7eb', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{cat.icon}</div>
              <h3 style={{ color: 'var(--primary-color)', fontSize: '1.1rem' }}>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 3. قسم عرض أو Banner ترويجي */}
      <section className="container" style={{ padding: '20px 20px 50px 20px' }}>
        <div style={{ background: 'linear-gradient(45deg, var(--secondary-color), #d99b55)', color: 'white', padding: '40px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', boxShadow: '0 4px 15px rgba(201,138,66,0.3)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', background: 'rgba(255,255,255,0.2)', width: 'fit-content', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
              <Tag size={16} /> {lang === 'ar' ? 'عرض لفترة محدودة' : 'Limited Time Offer'}
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{lang === 'ar' ? 'خصم يصل إلى 25% على كافة السماعات' : 'Up to 25% Off All Headphones'}</h2>
            <p style={{ fontSize: '1rem', opacity: '0.9' }}>{lang === 'ar' ? 'استمتع بجودة صوت نقية واستثنائية مع أحدث الإصدارات المتوفرة في المتجر.' : 'Enjoy pure and exceptional sound quality with the latest releases.'}</p>
          </div>
          <Link to="/products" style={{ background: 'white', color: 'var(--primary-color)', padding: '12px 25px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
            {lang === 'ar' ? 'تسوق العرض الآن' : 'Shop Offer Now'}
          </Link>
        </div>
      </section>

      {/* ميزات سريعة تحت البانر */}
      <section style={{ background: 'var(--surface-color)', padding: '40px 20px', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Truck size={36} color="var(--secondary-color)" />
            <h4 style={{ color: 'var(--primary-color)' }}>{lang === 'ar' ? 'توصيل سريع وآمن' : 'Fast & Secure Delivery'}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted-text-color)' }}>{lang === 'ar' ? 'نصلك أينما كنت في كافة أنحاء المدن' : 'We reach you wherever you are'}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={36} color="var(--secondary-color)" />
            <h4 style={{ color: 'var(--primary-color)' }}>{lang === 'ar' ? 'دفع آمن وموثوق' : 'Secure & Trusted Payment'}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted-text-color)' }}>{lang === 'ar' ? 'خيارات متعددة تشمل الدفع عند الاستلام والفيزا' : 'Multiple options including COD and Visa'}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Headphones size={36} color="var(--secondary-color)" />
            <h4 style={{ color: 'var(--primary-color)' }}>{lang === 'ar' ? 'دعم فني متواصل' : 'Continuous Support'}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted-text-color)' }}>{lang === 'ar' ? 'جاهزون للإجابة عن استفساراتكم دائماً' : 'Always ready to answer your inquiries'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};