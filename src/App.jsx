import { Routes, Route, Link, useLocation } from "react-router-dom";
import Orders from "./pages/Orders.jsx";
import AddOrder from "./pages/AddOrder.jsx";
import DeletedOrders from "./pages/DeletedOrders.jsx";
import Statistics from "./pages/Statistics.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

export default function App() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "الطلبات", icon: "📦" },
    { path: "/add", label: "إضافة", icon: "➕" },
    { path: "/stats", label: "إحصائيات", icon: "📊" },
    { path: "/deleted", label: "المحذوفات", icon: "🗑️" }
  ];

  return (
    <OrderProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans pb-16">
        <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-md mx-auto flex items-center justify-center px-4 py-4">
            <h1 className="font-bold text-xl text-blue-600">نظام تتبع الطلبات</h1>
          </div>
        </header>

        <main className="flex-1 max-w-md w-full mx-auto p-4">
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/add" element={<AddOrder />} />
            <Route path="/stats" element={<Statistics />} />
            <Route path="/deleted" element={<DeletedOrders />} />
          </Routes>
        </main>

        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-md mx-auto flex justify-around items-center h-16">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  location.pathname === item.path ? "text-blue-600" : "text-gray-500 hover:text-blue-500"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </OrderProvider>
  );
}
