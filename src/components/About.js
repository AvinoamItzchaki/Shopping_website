import { useAuth } from "./AuthContext";

function About() {
  const { username } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-16" dir="rtl">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-6 py-10 text-center space-y-10">
          <h1 className="text-3xl font-semibold text-slate-900">
            שלום וברכה למשתמש {username}!
          </h1>

          <h1 className="text-3xl font-bold bg-gradient-to-b from-slate-700 to-slate-900 bg-clip-text text-transparent">
            בילוי נעים באתר!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default About;
