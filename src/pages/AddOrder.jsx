import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const IRAQI_GOVERNORATES = [
  "بغداد", "البصرة", "نينوى", "أربيل", "النجف",
  "ذي قار", "كركوك", "الأنبار", "ديالى", "المثنى",
  "القادسية", "ميسان", "واسط", "صلاح الدين", "دهوك", "السليمانية", "بابل", "كربلاء"
];

const PLATFORMS = ["فيسبوك", "انستغرام", "واتساب", "تيكتوك", "اخرى"];

export default function AddOrder() {
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    governorate: 'بغداد',
    district: '',
    primaryPhone: '',
    secondaryPhone: '',
    platform: 'فيسبوك',
    orderType: '',
    quantity: 1,
    totalPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder(formData);
    navigate('/');
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">إضافة طلب جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Customer Info */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم الزبون (اختياري)</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="مثال: أحمد محمد"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">المحافظة (اجباري)</label>
              <select
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                {IRAQI_GOVERNORATES.map(gov => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">المنطقة (اجباري)</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="اسم المنطقة"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف (اجباري)</label>
              <input
                type="tel"
                name="primaryPhone"
                value={formData.primaryPhone}
                onChange={handleChange}
                required
                dir="ltr"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-left"
                placeholder="07XX XXX XXXX"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم بديل (اختياري)</label>
              <input
                type="tel"
                name="secondaryPhone"
                value={formData.secondaryPhone}
                onChange={handleChange}
                dir="ltr"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-left"
                placeholder="07XX XXX XXXX"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Order Details */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المنصة القادم منها الزبون</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map(platform => (
                <label key={platform} className={`px-3 py-1.5 rounded-full text-sm cursor-pointer border ${formData.platform === platform ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  <input
                    type="radio"
                    name="platform"
                    value={platform}
                    checked={formData.platform === platform}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {platform}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع الطلب و حجمه/قياسه (اجباري)</label>
            <input
              type="text"
              name="orderType"
              value={formData.orderType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="مثال: حذاء رياضي أسود قياس 42"
            />
          </div>

          <div className="flex gap-3">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">العدد</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="w-2/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر الكلي مع التوصيل (د.ع)</label>
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                required
                min="0"
                dir="ltr"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-left"
                placeholder="مثال: 25000"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mt-4 transition-colors shadow-sm"
        >
          حفظ الطلب
        </button>
      </form>
    </div>
  );
}
