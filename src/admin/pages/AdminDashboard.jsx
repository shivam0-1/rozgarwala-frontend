import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  Wallet,
  Bell,
  ShieldCheck,
  MessageSquare,
  LogOut,
  ExternalLink,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="space-y-10">
      {/* ================= TOP BAR ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            RozgarWala Admin Panel
          </h1>
          <p className="text-sm text-gray-500">
            Central control system for workers, customers & jobs
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <ExternalLink size={16} />
            Go to Website
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* ================= OVERVIEW STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Workers" icon={<ShieldCheck />} />
        <StatCard title="Total Customers" icon={<Users />} />
        <StatCard title="Job Requests" icon={<Briefcase />} />
        <StatCard title="Payments" icon={<Wallet />} />
      </div>

      {/* ================= MANAGEMENT MODULES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ModuleCard
          title="Worker Management"
          desc="Approve, verify, block and manage workers"
          icon={<ShieldCheck />}
          onClick={() => navigate("/admin/workers")}
        />

        <ModuleCard
          title="Customer Management"
          desc="View customers and manage misuse or blocks"
          icon={<Users />}
          onClick={() => navigate("/admin/customers")}
        />

        <ModuleCard
          title="Job Management"
          desc="Monitor job requests, assignments & cancellations"
          icon={<Briefcase />}
          onClick={() => navigate("/admin/jobs")}
        />

        <ModuleCard
          title="Payments & Earnings"
          desc="Track payments, commissions & payouts"
          icon={<Wallet />}
          onClick={() => navigate("/admin/payments")}
        />

        <ModuleCard
          title="Support & Messages"
          desc="Handle contact messages & complaints"
          icon={<MessageSquare />}
          onClick={() => navigate("/admin/contacts")}
        />

        <ModuleCard
          title="Notifications"
          desc="Send alerts & announcements (FCM)"
          icon={<Bell />}
          onClick={() => navigate("/admin/notifications")}
          disabled
        />
      </div>

      {/* ================= PLATFORM INFO ================= */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Settings size={18} />
          Platform Status
        </h3>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Deployment Area: Rural Varanasi (Pilot)</li>
          <li>• Platform: Web + PWA Ready</li>
          <li>• Mobile App: Planned (React Native)</li>
          <li>• Cloud: AWS / Azure</li>
          <li>• Scalability: Pan-India Ready</li>
        </ul>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, icon }) {
  return (
    <div className="bg-white border rounded-xl p-5 flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-lg text-gray-700">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">--</p>
      </div>
    </div>
  );
}

function ModuleCard({ title, desc, icon, onClick, disabled }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`bg-white border rounded-xl p-6 cursor-pointer transition ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3 mb-3 text-gray-700">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
      {disabled && (
        <p className="text-xs text-gray-400 mt-2">Coming soon</p>
      )}
    </div>
  );
}
