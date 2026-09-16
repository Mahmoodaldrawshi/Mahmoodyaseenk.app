import React from 'react';
import { useOrders } from '../context/OrderContext';

export default function DeletedOrders() {
  const { deletedOrders, restoreOrder, deleteOrderPermanently } = useOrders();

  if (deletedOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <span className="text-4xl mb-2">🗑️</span>
        <p>سلة المحذوفات فارغة.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">الطلبات المحذوفة</h2>
        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {deletedOrders.length} طلب
        </span>
      </div>

      {deletedOrders.map(order => (
        <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-red-100 opacity-75">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-bold text-gray-500 mr-2">#{order.id}</span>
              <h3 className="font-semibold text-lg text-gray-700 inline">{order.customerName || 'زبون (بدون اسم)'}</h3>
            </div>
            <span className="text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded">محذوف</span>
          </div>

          <div className="text-sm text-gray-500 space-y-1 mb-3">
            <p>📍 {order.governorate} - {order.district}</p>
            <p className="font-medium">🛍️ {order.orderType}</p>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-gray-50 pt-3 mt-2">
            <button
              onClick={() => deleteOrderPermanently(order.id)}
              className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
            >
              حذف نهائي
            </button>
            <button
              onClick={() => restoreOrder(order.id)}
              className="text-xs px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <span>♻️</span> استعادة
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
