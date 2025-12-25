import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold text-indigo-600">
          Gym Management System
        </h1>
        <a href="/login" className="text-indigo-600 font-medium">
          ورود
        </a>
      </header>

      <main className="p-6">
        <Outlet />
      </main>

      <footer className="text-center text-sm text-gray-400 py-4">
        © 2025 Gym Management
      </footer>
    </div>
  );
}
