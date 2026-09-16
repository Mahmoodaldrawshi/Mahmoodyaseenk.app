import React from 'react';
import { useOrders } from '../context/OrderContext';

const STATUSES = ['مخزن', 'غادر المخزن', 'واصل', 'راجع', 'مؤجل', 'استبدال'];

export default function Orders() {
  const { activeOrders, updateOrderStatus, softDeleteOrder } = useOrders();

  if (activeOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <span className="text-4xl mb-2">📦</span>
        <p>لا توجد طلبات حالياً.</p>
        <p className="text-sm">قم بإضافة طلب جديد للبدء.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'مخزن': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'غادر المخزن': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'واصل': return 'bg-green-100 text-green-700 border-green-200';
      case 'راجع': return 'bg-red-100 text-red-700 border-red-200';
      case 'مؤجل': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'استبدال': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">قائمة الطلبات</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {activeOrders.length} طلب
        </span>
      </div>

      {activeOrders.map(order => (
        <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-bold text-gray-500 mr-2">#{order.id}</span>
              <h3 className="font-semibold text-lg text-gray-900 inline">{order.customerName || 'زبون (بدون اسم)'}</h3>
            </div>
            <button
              onClick={() => softDeleteOrder(order.id)}
              className="text-red-400 hover:text-red-600 p-1"
              title="حذف الطلب"
            >
              🗑️
            </button>
          </div>

          <div className="text-sm text-gray-600 space-y-1 mb-3">
            <p>📍 {order.governorate} - {order.district}</p>
            <p dir="ltr" className="text-right">📞 {order.primaryPhone}</p>
            <p className="font-medium text-gray-800 mt-2">🛍️ {order.orderType} (العدد: {order.quantity})</p>
            <p className="font-bold text-blue-600">💰 {Number(order.totalPrice).toLocaleString()} د.ع</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-2">
            <span className="text-xs text-gray-400">
              {new Date(order.createdAt).toLocaleDateString('ar-IQ')}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">الحالة:</span>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className={`text-sm rounded-lg p-1 border font-medium outline-none ${getStatusColor(order.status)}`}
              >
                {STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
