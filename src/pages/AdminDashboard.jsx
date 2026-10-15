import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Package, ShoppingBag, Layers, DollarSign, Plus, Power, CheckCircle, Clock } from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  // حماية صفحة الأدمن
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      alert(lang === 'ar' ? 'غير مسموح لك بالدخول، هذه الصفحة خاصة بالأدمن فقط.' : 'Access denied. Admin only.');
      navigate('/');
    }
  }, [user, navigate, lang]);

  const [activeTab, setActiveTab] = useState('products');

  // 1. إدارة المنتجات (مع خاصية isActive للتعطيل بدل الحذف النهائي)
  const [products, setProducts] = useState([
    { id: 1, name: 'سماعات لاسلكية برو', category: 'audio', price: 45, stock: 12, isActive: true },
    { id: 2, name: 'ساعة ذكية ألترا', category: 'wearables', price: 85, stock: 5, isActive: true },
    { id: 3, name: 'ماوس ألعاب احترافي', category: 'gaming', price: 25, stock: 8, isActive: true },
    { id: 4, name: 'لوحة مفاتيح ميكانيكية', category: 'gaming', price: 60, stock: 3, isActive: true }
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', category: 'gaming', price: '', stock: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      isActive: true
    };
    setProducts([productToAdd, ...products]);
    setNewProduct({ name: '', category: 'gaming', price: '', stock: '' });
    setShowAddForm(false);
  };

  // تعطيل / تفعيل المنتج بدل حذفه نهائياً مع نافذة تأكيد
  const handleToggleProductStatus = (id, currentStatus) => {
    const msg = lang === 'ar' 
      ? (currentStatus ? 'هل تريد حقاً تعطيل هذا المنتج؟' : 'هل تريد إعادة تفعيل هذا المنتج؟')
      : (currentStatus ? 'Do you want to deactivate this product?' : 'Do you want to activate this product?');
    
    if (window.confirm(msg)) {
      setProducts(products.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    }
  };

  // 2. إدارة التصنيفات
  const [categories, setCategories] = useState([
    { id: 'gaming', nameAr: 'ألعاب الفيديو', nameEn: 'Gaming' },
    { id: 'computers', nameAr: 'أجهزة الكمبيوتر', nameEn: 'Computers' },
    { id: 'audio', nameAr: 'الصوتيات', nameEn: 'Audio' },
    { id: 'wearables', nameAr: 'الإكسسوارات الذكية', nameEn: 'Wearables' }
  ]);
  const [newCatName, setNewCatName] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const catId = newCatName.toLowerCase().replace(/\s+/g, '-');
    setCategories([...categories, { id: catId, nameAr: newCatName, nameEn: newCatName }]);
    setNewCatName('');
  };

  // 3. إدارة الطلبات وتغيير حالتها محلياً
  const [customerOrders, setCustomerOrders] = useState([
    { id: 'ORD-9821', customer: 'أحمد محمد', date: '2026-10-14', total: 130, status: 'processing' },
    { id: 'ORD-9820', customer: 'سارة خالد', date: '2026-10-13', total: 45, status: 'delivered' }
  ]);

  const handleToggleOrderStatus = (orderId) => {
    setCustomerOrders(customerOrders.map(o => {
      if (o.id === orderId) {
        const nextStatus = o.status === 'processing' ? 'delivered' : 'processing';
        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      
      {/* رأس لوحة التحكم */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={28} color="var(--secondary-color)" /> {lang === 'ar' ? 'لوحة تحكم الأدمن' : 'Admin Control Center'}
          </h2>
          <p style={{ color: 'var(--muted-text-color)', fontSize: '0.9rem' }}>
            {lang === 'ar' ? `مرحباً بك، ${user?.name || 'مدير النظام'}` : `Welcome, ${user?.name || 'Admin'}`}
          </p>
        </div>

        {/* أزرار التنقل بين الأقسام */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{ padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', background: activeTab === 'products' ? 'var(--primary-color)' : 'var(--surface-color)', color: activeTab === 'products' ? 'white' : 'var(--text-color)', border: '1px solid #d1d5db' }}
          >
            {lang === 'ar' ? 'إدارة المنتجات' : 'Products'}
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            style={{ padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', background: activeTab === 'categories' ? 'var(--primary-color)' : 'var(--surface-color)', color: activeTab === 'categories' ? 'white' : 'var(--text-color)', border: '1px solid #d1d5db' }}
          >
            {lang === 'ar' ? 'التصنيفات' : 'Categories'}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{ padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', background: activeTab === 'orders' ? 'var(--primary-color)' : 'var(--surface-color)', color: activeTab === 'orders' ? 'white' : 'var(--text-color)', border: '1px solid #d1d5db' }}
          >
            {lang === 'ar' ? 'الطلبات' : 'Orders'}
          </button>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(201,138,66,0.1)', padding: '12px', borderRadius: '12px' }}><Package size={22} color="var(--secondary-color)" /></div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted-text-color)' }}>{lang === 'ar' ? 'المنتجات' : 'Products'}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{products.length}</div>
          </div>
        </div>

        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(59,130,246,0.1)', padding: '12px', borderRadius: '12px' }}><Layers size={22} color="#3b82f6" /></div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted-text-color)' }}>{lang === 'ar' ? 'التصنيفات' : 'Categories'}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{categories.length}</div>
          </div>
        </div>

        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(16,185,129,0.1)', padding: '12px', borderRadius: '12px' }}><ShoppingBag size={22} color="#10b981" /></div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted-text-color)' }}>{lang === 'ar' ? 'الطلبات' : 'Orders'}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{customerOrders.length}</div>
          </div>
        </div>

        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(245,158,11,0.1)', padding: '12px', borderRadius: '12px' }}><DollarSign size={22} color="#f59e0b" /></div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted-text-color)' }}>{lang === 'ar' ? 'المبيعات' : 'Sales'}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>175 JOD</div>
          </div>
        </div>
      </div>

      {/* 1. قسم إدارة المنتجات */}
      {activeTab === 'products' && (
        <div style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--primary-color)' }}>{lang === 'ar' ? 'إدارة المنتجات' : 'Manage Products'}</h3>
            <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={18} /> {lang === 'ar' ? 'إضافة منتج' : 'Add Product'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddProduct} style={{ background: 'rgba(201,138,66,0.06)', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid var(--secondary-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'end' }}>
              <input type="text" required placeholder={lang === 'ar' ? 'اسم المنتج' : 'Product Name'} value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }} />
              <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }}>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nameAr}</option>)}
              </select>
              <input type="number" required placeholder={lang === 'ar' ? 'السعر (JOD)' : 'Price'} value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }} />
              <input type="number" required placeholder={lang === 'ar' ? 'المخزون' : 'Stock'} value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }} />
              <button type="submit" className="btn-primary" style={{ padding: '8px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>{lang === 'ar' ? 'حفظ' : 'Save'}</button>
            </form>
          )}

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb', color: 'var(--muted-text-color)', fontSize: '0.9rem' }}>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'المنتج' : 'Product'}</th>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'التصنيف' : 'Category'}</th>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'السعر' : 'Price'}</th>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'المخزون' : 'Stock'}</th>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>{lang === 'ar' ? 'تعطيل / تفعيل' : 'Action'}</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb', opacity: p.isActive ? 1 : 0.5 }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{p.name}</td>
                    <td style={{ padding: '12px' }}>{p.category}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--secondary-color)' }}>{p.price} JOD</td>
                    <td style={{ padding: '12px' }}>{p.stock}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', background: p.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: p.isActive ? '#10b981' : '#ef4444' }}>
                        {p.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'معطل' : 'Deactivated')}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleToggleProductStatus(p.id, p.isActive)} 
                        style={{ background: 'none', border: 'none', color: p.isActive ? '#ef4444' : '#10b981', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', fontSize: '0.85rem' }}
                        title={p.isActive ? 'تعطيل المنتج' : 'تفعيل المنتج'}
                      >
                        <Power size={16} /> {p.isActive ? (lang === 'ar' ? 'تعطيل' : 'Disable') : (lang === 'ar' ? 'تفعيل' : 'Enable')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. قسم إدارة التصنيفات */}
      {activeTab === 'categories' && (
        <div style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>{lang === 'ar' ? 'إدارة التصنيفات' : 'Manage Categories'}</h3>
          
          <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px', marginBottom: '25px', maxWidth: '400px' }}>
            <input type="text" placeholder={lang === 'ar' ? 'اسم التصنيف الجديد...' : 'New category name...'} value={newCatName} onChange={(e) => setNewCatName(e.target.value)} style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }} />
            <button type="submit" className="btn-primary" style={{ padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>{lang === 'ar' ? 'إضافة' : 'Add'}</button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {categories.map(cat => (
              <div key={cat.id} style={{ background: 'var(--background-color)', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{cat.nameAr}</span>
                <span style={{ fontSize: '0.85rem', background: 'var(--secondary-color)', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>{cat.id}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. قسم إدارة الطلبات وتغيير حالتها */}
      {activeTab === 'orders' && (
        <div style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>{lang === 'ar' ? 'إدارة الطلبات' : 'Manage Orders'}</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb', color: 'var(--muted-text-color)', fontSize: '0.9rem' }}>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'رقم الطلب' : 'Order ID'}</th>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'الإجمالي' : 'Total'}</th>
                  <th style={{ padding: '12px' }}>{lang === 'ar' ? 'الحالة الحالية' : 'Status'}</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>{lang === 'ar' ? 'تغيير الحالة' : 'Change Status'}</th>
                </tr>
              </thead>
              <tbody>
                {customerOrders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)' }}>{o.id}</td>
                    <td style={{ padding: '12px' }}>{o.customer}</td>
                    <td style={{ padding: '12px', color: 'var(--muted-text-color)' }}>{o.date}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--secondary-color)' }}>{o.total} JOD</td>
                    <td style={{ padding: '12px' }}>
                      {o.status === 'delivered' ? (
                        <span style={{ color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> {lang === 'ar' ? 'تم التوصيل' : 'Delivered'}</span>
                      ) : (
                        <span style={{ color: '#f59e0b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {lang === 'ar' ? 'قيد المعالجة' : 'Processing'}</span>
                      )}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleToggleOrderStatus(o.id)}
                        style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--secondary-color)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                      >
                        {lang === 'ar' ? 'تبديل الحالة' : 'Toggle Status'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};