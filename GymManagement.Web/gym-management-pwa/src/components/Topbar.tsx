import { authApi } from "../api/auth.api";

export default function Topbar() {
  return (
    <header className="bg-white shadow p-4 flex justify-end">
      <button
        onClick={authApi.logout}
        className="text-red-500 font-medium"
      >
        خروج
      </button>
    </header>
  );
}
