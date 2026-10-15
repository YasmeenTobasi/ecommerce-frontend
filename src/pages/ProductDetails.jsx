import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingCart, Check, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const mockProducts = [
  { id: '1', name: 'سماعات لاسلكية برو (Wireless Headphones)', category: 'audio', price: 45, inStock: true, stock: 12, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', description: 'سماعات رأس لاسلكية عالية الجودة توفر صوتاً نقياً مع تقنية إلغاء الضوضاء وبطارية تدوم طويلاً.' },
  { id: '2', name: 'ساعة ذكية ألترا (Smart Watch Ultra)', category: 'wearables', price: 85, inStock: true, stock: 3, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', description: 'ساعة ذكية متطورة مع شاشة عالية الدقة، تتبع الأنشطة الرياضية ومعدل ضربات القلب مقاومة للماء.' },
  { id: '3', name: 'ماوس ألعاب احترافي (Gaming Mouse)', category: 'gaming', price: 25, inStock: true, stock: 8, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', description: 'ماوس مخصص للألعاب مع إضاءة RGB وحساسية عالية قابلة للتعديل حتى 12000 DPI.' },
  { id: '4', name: 'لوحة مفاتيح ميكانيكية (Mechanical Keyboard)', category: 'gaming', price: 60, inStock: false, stock: 0, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', description: 'لوحة مفاتيح ميكانيكية مخصصة للمحتصين واللاعبين بسويتشات زرقاء واستجابة سريعة جداً.' },
  { id: '5', name: 'شاشة حاسوب 4K (4K Gaming Monitor)', category: 'computers', price: 220, inStock: true, stock: 5, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500', description: 'شاشة 27 بوصة بدقة 4K مع معدل تحديث 144Hz لتجربة ألعاب بصرية خيالية.' },
  { id: '6', name: 'مكبر صوت بلوتوث (Bluetooth Speaker)', category: 'audio', price: 35, inStock: true, stock: 15, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500', description: 'مكبر صوت محمول بتصميم عصري وصوت جهير قوي يناسب التنقل والرحلات.' }
];

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t, lang } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];

  // منتجات مشابهة من نفس التصنيف
  const similarProducts = mockProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleQuantityChange = (type) => {
    if (type === 'inc' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.inStock && quantity <= product.stock) {
      addToCart(product, quantity);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    }
  };

  // حالة المخزون النصية واللونية
  const renderStockBadge = () => {
    if (!product.inStock || product.stock === 0) {
      return (
        <span style={{ color: 'var(--danger-color)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <AlertCircle size={18} /> {t.outOfStock}
        </span>
      );
    }
    if (product.stock <= 5) {
      return (
        <span style={{ color: '#f59e0b', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <AlertCircle size={18} /> {lang === 'ar' ? `كمية محدودة! متبقي ${product.stock} قطع فقط` : `Limited Stock! Only ${product.stock} left`}
        </span>
      );
    }
    return (
      <span style={{ color: 'var(--success-color)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
        <Check size={18} /> {t.inStock} ({product.stock} {t.piecesLeft})
      </span>
    );
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      
      {/* رابط العودة للمنتجات */}
      <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--secondary-color)', fontWeight: 'bold', marginBottom: '25px', textDecoration: 'none' }}>
        {lang === 'ar' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />} {lang === 'ar' ? 'العودة إلى المنتجات' : 'Back to Products'}
      </Link>

      {/* تفاصيل المنتج الرئيسية */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', background: 'var(--surface-color)', padding: '30px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '50px' }}>
        
        {/* صورة المنتج */}
        <div>
          <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }} />
        </div>

        {/* المعلومات والأزرار */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary-color)', textTransform: 'uppercase', fontWeight: 'bold', background: 'rgba(201,138,66,0.1)', padding: '4px 12px', borderRadius: '15px' }}>
              {product.category}
            </span>
            <h1 style={{ color: 'var(--primary-color)', margin: '15px 0 10px 0', fontSize: '1.8rem' }}>{product.name}</h1>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--secondary-color)', marginBottom: '15px' }}>
              {product.price} JOD
            </div>

            <div style={{ marginBottom: '20px' }}>
              {renderStockBadge()}
            </div>

            <p style={{ color: 'var(--text-color)', opacity: '0.85', lineHeight: '1.6', marginBottom: '25px' }}>
              {product.description}
            </p>
          </div>

          <div>
            {/* اختيار الكمية والتحكم في حدود المخزون */}
            {product.inStock && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <span style={{ fontWeight: 'bold' }}>{t.quantity}:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => handleQuantityChange('dec')} 
                    style={{ border: 'none', padding: '8px 15px', background: '#f3f4f6', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '8px 20px', fontWeight: 'bold' }}>{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange('inc')} 
                    disabled={quantity >= product.stock}
                    style={{ border: 'none', padding: '8px 15px', background: quantity >= product.stock ? '#e5e7eb' : '#f3f4f6', cursor: quantity >= product.stock ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* زر الإضافة للسلة */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', border: 'none', cursor: product.inStock ? 'pointer' : 'not-allowed', background: product.inStock ? 'var(--primary-color)' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <ShoppingCart size={20} />
              {!product.inStock ? t.outOfStock : (t.addToCart || (lang === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'))}
            </button>

            {/* رسالة نجاح الإضافة */}
            {addedSuccess && (
              <div style={{ marginTop: '15px', padding: '12px', background: 'rgba(16,185,129,0.1)', color: 'var(--success-color)', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Check size={18} /> {lang === 'ar' ? 'تمت إضافة المنتج بنجاح إلى السلة!' : 'Product added successfully to cart!'}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* قسم المنتجات المشابهة */}
      {similarProducts.length > 0 && (
        <div>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontSize: '1.4rem' }}>
            {t.similarProducts || (lang === 'ar' ? 'منتجات مشابهة' : 'Similar Products')}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {similarProducts.map((sim) => (
              <Link to={`/products/${sim.id}`} key={sim.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: 'var(--surface-color)', borderRadius: '8px', padding: '15px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                  <img src={sim.image} alt={sim.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-color)', marginBottom: '6px' }}>{sim.name}</h4>
                  <div style={{ fontWeight: 'bold', color: 'var(--secondary-color)' }}>{sim.price} JOD</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};