import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Search, RotateCcw, ShoppingBag, ShoppingCart } from 'lucide-react';

const mockProducts = [
  { id: '1', name: 'سماعات لاسلكية برو (Wireless Headphones)', category: 'audio', price: 45, inStock: true, stock: 12, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
  { id: '2', name: 'ساعة ذكية ألترا (Smart Watch Ultra)', category: 'wearables', price: 85, inStock: true, stock: 5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
  { id: '3', name: 'ماوس ألعاب احترافي (Gaming Mouse)', category: 'gaming', price: 25, inStock: true, stock: 8, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500' },
  { id: '4', name: 'لوحة مفاتيح ميكانيكية (Mechanical Keyboard)', category: 'gaming', price: 60, inStock: false, stock: 0, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500' },
  { id: '5', name: 'شاشة حاسوب 4K (4K Gaming Monitor)', category: 'computers', price: 220, inStock: true, stock: 3, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500' },
  { id: '6', name: 'مكبر صوت بلوتوث (Bluetooth Speaker)', category: 'audio', price: 35, inStock: true, stock: 15, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500' },
  { id: '7', name: 'حقيبة لابتوب مقاومة للماء (Laptop Bag)', category: 'computers', price: 30, inStock: true, stock: 9, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' }
];

export const Products = () => {
  const { t, lang } = useLanguage();
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // الفلاتر
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [maxPrice, setMaxPrice] = useState(300);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // التحكم بـ Pagination / Load More
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    const catFromUrl = searchParams.get('category');
    if (searchFromUrl !== null) setSearch(searchFromUrl);
    if (catFromUrl !== null) setCategory(catFromUrl);
  }, [searchParams]);

  // التصفية والبحث دون حساسية لحالة الأحرف (case-insensitive)
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase().trim());
    const matchesCategory = category === 'all' || product.category === category;
    const matchesPrice = product.price <= maxPrice;
    const matchesStock = onlyInStock ? product.inStock : true;
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  // الترتيب
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  // المنتجات الظاهرة حالياً بناءً على Load More
  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setMaxPrice(300);
    setOnlyInStock(false);
    setSortBy('default');
    setSearchParams({});
    setVisibleCount(4);
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>{t.catalogTitle}</h2>

      {/* شريط الفلاتر والبحث */}
      <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          
          {/* البحث */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '5px' }}>{lang === 'ar' ? 'بحث' : 'Search'}</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
              />
            </div>
          </div>

          {/* التصنيف */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '5px' }}>{lang === 'ar' ? 'التصنيف' : 'Category'}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
            >
              <option value="all">{t.allCategories}</option>
              <option value="gaming">{lang === 'ar' ? 'ألعاب' : 'Gaming'}</option>
              <option value="computers">{lang === 'ar' ? 'كمبيوترات' : 'Computers'}</option>
              <option value="audio">{lang === 'ar' ? 'صوتيات' : 'Audio'}</option>
              <option value="wearables">{lang === 'ar' ? 'إكسسوارات' : 'Wearables'}</option>
            </select>
          </div>

          {/* الترتيب */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '5px' }}>{lang === 'ar' ? 'الترتيب' : 'Sort By'}</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'var(--background-color)', color: 'var(--text-color)' }}
            >
              <option value="default">{t.defaultSort}</option>
              <option value="price-asc">{t.priceAsc}</option>
              <option value="price-desc">{t.priceDesc}</option>
              <option value="name-asc">{t.nameSort}</option>
            </select>
          </div>

          {/* السعر الأقصى */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '5px' }}>{t.maxPrice}: {maxPrice} JOD</label>
            <input
              type="range"
              min="10"
              max="300"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

        </div>

        {/* خيارات إضافية وإعادة التعيين */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5e7eb', flexWrap: 'wrap', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
            />
            {t.inStockOnly}
          </label>

          <button
            onClick={resetFilters}
            style={{ background: 'transparent', border: '1px solid var(--secondary-color)', color: 'var(--secondary-color)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            <RotateCcw size={14} /> {t.reset}
          </button>
        </div>
      </div>

      {/* عدد النتائج */}
      <div style={{ marginBottom: '20px', color: 'var(--muted-text-color)', fontSize: '0.95rem' }}>
        {t.resultsFound} <strong>{sortedProducts.length}</strong> {t.product}
      </div>

      {/* شبكة عرض المنتجات (Grid) */}
      {sortedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--surface-color)', borderRadius: '12px' }}>
          <ShoppingBag size={48} color="var(--muted-text-color)" style={{ marginBottom: '10px' }} />
          <h3 style={{ color: 'var(--primary-color)' }}>{lang === 'ar' ? 'لا توجد نتائج مطابقة' : 'No products found'}</h3>
          <p style={{ color: 'var(--muted-text-color)' }}>{lang === 'ar' ? 'جرب تغيير خيارات البحث أو الفلترة.' : 'Try adjusting your search or filters.'}</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {visibleProducts.map((product) => (
              <div key={product.id} style={{ background: 'var(--surface-color)', borderRadius: 'var(--border-radius)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px', fontSize: '1rem' }}>{product.name}</h4>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--secondary-color)', marginBottom: '12px' }}>
                      {product.price} JOD
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', color: product.inStock ? 'var(--success-color)' : 'var(--danger-color)', marginBottom: '10px', fontWeight: 'bold' }}>
                      {product.inStock ? `${t.inStock} (${product.stock} ${t.piecesLeft})` : t.outOfStock}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/products/${product.id}`} style={{ flex: 1, textAlign: 'center', padding: '8px', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {t.details}
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        style={{ background: product.inStock ? 'var(--secondary-color)' : '#d1d5db', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: product.inStock ? 'pointer' : 'not-allowed' }}
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* زر Load More عند وجود المزيد من المنتجات */}
          {visibleCount < sortedProducts.length && (
            <div style={{ textAlign: 'center', marginTop: '35px' }}>
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="btn-secondary"
                style={{ padding: '10px 30px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {lang === 'ar' ? 'عرض المزيد من المنتجات (Load More)' : 'Load More Products'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};