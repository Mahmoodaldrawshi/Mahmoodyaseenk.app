import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#2E7D32] text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-semibold">Iraq Weather Overview</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <p className="text-gray-700 mb-4">
          Current weather conditions across major cities in Iraq, updated every
          4 hours. Tap “Refresh” to get the latest data.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <h2 className="text-lg font-medium mb-2">Baghdad</h2>
            <p className="text-4xl font-bold text-gray-800">32°C</p>
            <p className="text-sm text-gray-500">Sunny, 3% humidity</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <h2 className="text-lg font-medium mb-2">Erbil</h2>
            <p className="text-4xl font-bold text-gray-800">28°C</p>
            <p className="text-sm text-gray-500">Partly cloudy, 45% humidity</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <h2 className="text-lg font-medium mb-2">Mosul</h2>
            <p className="text-4xl font-bold text-gray-800">30°C</p>
            <p className="text-sm text-gray-500">Windy, 10% humidity</p>
          </div>
          {/* Add more city cards as needed */}
        </div>

        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-[#2E7D32] text-white rounded hover:bg-[#1d5e24] transition-colors"
          >
            Refresh
          </button>
        </div>
      </main>

      <footer className="bg-gray-200 py-4 text-center text-sm text-gray-600">
        © 2026 Iraq Weather Service
      </footer>
    </div>
  );
}