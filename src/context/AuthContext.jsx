import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // نقوم بقراءة المستخدم من localStorage ليبقى مسجلاً حتى عند تحديث الصفحة
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('batman_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // تحديد ما إذا كان الحساب هو أدمن للاختبار
    const isAdmin = email.toLowerCase().includes('admin');
    const loggedUserData = {
      name: isAdmin ? 'مدير المتجر' : 'أحمد محمد',
      email: email,
      role: isAdmin ? 'admin' : 'customer'
    };

    setUser(loggedUserData);
    localStorage.setItem('batman_user', JSON.stringify(loggedUserData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('batman_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);