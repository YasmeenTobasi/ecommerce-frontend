import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  {/* 1. الصفحة الرئيسية */}
                  <Route path="/" element={<Home />} />
                  
                  {/* 2. صفحة المنتجات */}
                  <Route path="/products" element={<Products />} />
                  
                  {/* 3. تفاصيل المنتج */}
                  <Route path="/products/:id" element={<ProductDetails />} />
                  
                  {/* 4. تسجيل الدخول */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* 5. إنشاء حساب */}
                  <Route path="/register" element={<Register />} />
                  
                  {/* 6. سلة المشتريات */}
                  <Route path="/cart" element={<CartPage />} />
                  
                  {/* 7. إتمام الطلب */}
                  <Route path="/checkout" element={<Checkout />} />
                  
                  {/* 8. حساب المستخدم (لوحة تحكم الزبون) */}
                  <Route path="/profile" element={<Profile />} />
                  
                  {/* 9. لوحة تحكم الأدمن */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  
                  {/* 10. صفحة 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;