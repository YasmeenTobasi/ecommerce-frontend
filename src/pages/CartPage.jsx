import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const { t } = useLanguage();

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ marginBottom: '25px', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ShoppingCart size={28} /> {t.cartTitle}
      </h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--surface-color)', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <ShoppingCart size={64} color="var(--muted-text-color)" style={{ marginBottom: '20px' }} />
          <h3>{t.emptyCart}</h3>
          <p style={{ color: 'var(--muted-text-color)', margin: '10px 0 20px 0' }}>{t.emptyCartDesc}</p>
          <Link to="/products" style={{ background: 'var(--primary-color)', color: 'white', padding: '12px 25px', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block' }}>
            {t.browseProducts}
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', alignItems: 'start' }}>
          
          <div style={{ background: 'var(--surface-color)', borderRadius: 'var(--border-radius)', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
              <span style={{ fontWeight: '600', color: 'var(--muted-text-color)' }}>{t.products} ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              <button onClick={clearCart} style={{ background: 'transparent', color: 'var(--error-color)', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
                {t.clearCart}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '15px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '5px' }}>{item.name}</h4>
                    <p style={{ color: 'var(--muted-text-color)', fontSize: '0.9rem' }}>{item.price} JOD</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.stockQuantity)} style={{ padding: '6px 10px', background: 'var(--background-color)', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                    <span style={{ padding: '0 12px', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.stockQuantity)} style={{ padding: '6px 10px', background: 'var(--background-color)', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                  </div>

                  <div style={{ minWidth: '80px', textAlign: 'left', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    {item.price * item.quantity} JOD
                  </div>

                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', color: 'var(--error-color)', border: 'none', cursor: 'pointer', padding: '5px' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--surface-color)', borderRadius: 'var(--border-radius)', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
              {t.orderSummary}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--muted-text-color)' }}>
              <span>{t.subtotal}:</span>
              <span style={{ fontWeight: '600', color: 'var(--text-color)' }}>{subtotal} JOD</span>
            </div>
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
              <span>{t.total}:</span>
              <span>{subtotal} JOD</span>
            </div>
            <Link 
              to="/checkout" 
              style={{ display: 'block', textAlign: 'center', background: 'var(--secondary-color)', color: '#ffffff', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem' }}
            >
              {t.checkoutBtn}
            </Link>
          </div>

        </div>
      )}
    </div>
  );
};