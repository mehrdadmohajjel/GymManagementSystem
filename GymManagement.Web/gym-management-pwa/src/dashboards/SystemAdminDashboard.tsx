export default function SystemAdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">داشبورد مدیر سیستم</h2>

      <div className="grid grid-cols-4 gap-4">
        <Stat title="کل باشگاه‌ها" value="24" />
        <Stat title="کل کاربران" value="1340" />
        <Stat title="موجودی کیف پول‌ها" value="120,000,000" />
        <Stat title="پرداخت امروز" value="58" />
      </div>
    </div>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
