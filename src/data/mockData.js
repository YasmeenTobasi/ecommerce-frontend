export const categories = [
  { id: 1, name: "Audio", nameAr: "سماعات وأجهزة صوتية" },
  { id: 2, name: "Computers", nameAr: "أجهزة حاسوب وإكسسوارات" },
  { id: 3, name: "Wearables", nameAr: "ساعات ذكية وأجهزة ارتدائية" },
  { id: 4, name: "Gaming", nameAr: "إكسسوارات ألعاب" },
  { id: 5, name: "Smart Home", nameAr: "أنظمة المنزل الذكي" }
];

export const products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    description: "سماعات لاسلكية عالية الجودة مع خاصية إلغاء الضوضاء وبطارية تدوم طويلاً.",
    price: 85,
    stockQuantity: 12,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    isActive: true
  },
  {
    id: 2,
    name: "RGB Mechanical Gaming Keyboard",
    description: "لوحة مفاتيح ميكانيكية مخصصة للألعاب مع إضاءة RGB قابلة للتخصيص.",
    price: 45,
    stockQuantity: 8,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    isActive: true
  },
  {
    id: 3,
    name: "Ergonomic Wireless Mouse",
    description: "ماوس لاسلكي مريح ومصمم للعمل المكتبي الطويل.",
    price: 25,
    stockQuantity: 0,
    category: "Computers",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    isActive: true
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    description: "تتبع نبضات القلب ونشاطك الرياضي اليومي وساعات النوم بدقة.",
    price: 120,
    stockQuantity: 5,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    isActive: true
  },
  {
    id: 5,
    name: "ESP32 IoT Development Board",
    description: "قطعة تحكم ذكية تدعم الـ Wi-Fi والـ Bluetooth لمشاريع الأتمتة.",
    price: 15,
    stockQuantity: 25,
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
    isActive: true
  },
  {
    id: 6,
    name: "UltraWide 29-inch Gaming Monitor",
    description: "شاشة ألعاب واسعة بدقة عالية ومعدل تحديث سريع لتجربة استثنائية.",
    price: 280,
    stockQuantity: 0,
    category: "Computers",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
    isActive: true
  }
];

export const mockOrders = [
  { id: "ORD-1001", date: "2026-10-01", total: 110, status: "Delivered", itemsCount: 2 },
  { id: "ORD-1002", date: "2026-10-05", total: 45, status: "Processing", itemsCount: 1 }
];

export const mockUsers = {
  customer: { name: "ياسمين خليل", email: "customer@batmantech.com", phone: "+962790000000", role: "customer" },
  admin: { name: "مدير النظام (Admin)", email: "admin@batmantech.com", phone: "+962780000000", role: "admin" }
};