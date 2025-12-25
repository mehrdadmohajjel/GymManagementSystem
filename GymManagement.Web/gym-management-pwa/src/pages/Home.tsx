export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center mt-20">
      <h2 className="text-4xl font-bold mb-6">
        سامانه مدیریت باشگاه‌های ورزشی
      </h2>
      <p className="text-gray-600 mb-8">
        مدیریت چندباشگاهی، کیف پول، پرداخت آنلاین، خدمات زمان‌محور و جلسه‌محور
      </p>

      <a
        href="/login"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow"
      >
        ورود به سامانه
      </a>
    </div>
  );
}
