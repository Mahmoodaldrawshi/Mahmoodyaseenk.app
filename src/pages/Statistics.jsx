import React, { useState, useMemo } from 'react';
import { useOrders } from '../context/OrderContext';

export default function Statistics() {
  const { activeOrders } = useOrders();

  // Default date range: first day of current month to today
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split('T')[0];
  });

  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const stats = useMemo(() => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Filter active orders within the date range
    const filtered = activeOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= start && orderDate <= end;
    });

    let totalOrders = filtered.length;
    let deliveredOrders = 0;
    let returnedOrders = 0;
    let otherOrders = 0;
    let totalIncome = 0;

    filtered.forEach(order => {
      if (order.status === 'واصل') {
        deliveredOrders++;
        totalIncome += Number(order.totalPrice || 0);
      } else if (order.status === 'راجع') {
        returnedOrders++;
      } else {
        otherOrders++;
      }
    });

    return { totalOrders, deliveredOrders, returnedOrders, otherOrders, totalIncome };
  }, [activeOrders, startDate, endDate]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">الإحصائيات والتقارير</h2>

      {/* Date Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-3">تحديد فترة التقرير:</h3>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">من تاريخ</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">إلى تاريخ</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-600 font-medium mb-1">إجمالي الطلبات</p>
          <p className="text-2xl font-bold text-blue-800">{stats.totalOrders}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <p className="text-xs text-green-600 font-medium mb-1">الطلبات الواصلة</p>
          <p className="text-2xl font-bold text-green-800">{stats.deliveredOrders}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
          <p className="text-xs text-red-600 font-medium mb-1">الطلبات الراجعة</p>
          <p className="text-2xl font-bold text-red-800">{stats.returnedOrders}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-600 font-medium mb-1">طلبات قيد المعالجة</p>
          <p className="text-2xl font-bold text-gray-800">{stats.otherOrders}</p>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-5 rounded-xl shadow-sm text-white mt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-emerald-50 mb-1">إجمالي المبيعات (للطلبات الواصلة)</p>
            <p className="text-3xl font-bold">{stats.totalIncome.toLocaleString()}</p>
          </div>
          <div className="text-2xl font-bold opacity-80">
            د.ع
          </div>
        </div>
      </div>
    </div>
  );
}
