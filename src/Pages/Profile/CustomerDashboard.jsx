import { useState } from "react";
import useAuth from "../../auth/useAuth";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  LogOut,
  Calendar,
  Settings,
  ShoppingBag,
  CreditCard,
  ChevronRight,
  Pencil,
  Home,
} from "lucide-react";

const CustomerDashboard = () => {
  const { user, loading, handleLogout } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-neutral-50 text-neutral-500">
        Loading dashboard…
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 px-4 py-25">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="space-y-8">
          {/* User Card */}
          <div className="rounded-3xl bg-white/80 backdrop-blur border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <User size={28} className="text-neutral-700" />
              </div>

              <div>
                <h1 className="text-lg font-semibold text-neutral-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-xs text-neutral-500 capitalize">
                  Customer account
                </p>
              </div>
            </div>
          </div>

          {/* Navigation (NO dashboard link) */}
          <NavItem icon={<ShoppingBag size={16} />} label="Orders" />
          <NavItem icon={<Home size={16} />} label="Addresses" />
          <NavItem icon={<CreditCard size={16} />} label="Payments" />
          <NavItem icon={<ShieldCheck size={16} />} label="Security" />
          <NavItem icon={<Settings size={16} />} label="Settings" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition"
          >
            <LogOut size={16} />
            Log out
          </button>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          {/* ===== Dashboard Header ===== */}
          <section className="flex items-start justify-between gap-4 mt-10">
            <div>
              <h2 className="text-3xl font-semibold text-neutral-900">
                Welcome back, {user.firstName} 
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Here’s an overview of your account
              </p>
            </div>

            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium hover:bg-neutral-100 transition"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          </section>

          {/* ===== STATS ROW ===== */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard
              icon={<ShoppingBag />}
              label="Total Orders"
              value="12"
            />
            <StatCard
              icon={<Home />}
              label="Saved Addresses"
              value="2"
            />
            <StatCard
              icon={<ShieldCheck />}
              label="Account Status"
              value="Active"
            />
          </section>

          {/* ===== QUICK ACTIONS ===== */}
          <section className="rounded-3xl bg-white/80 border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-700 mb-4">
              Quick actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <QuickAction label="View orders" />
              <QuickAction label="Add address" />
              <QuickAction label="Manage payments" />
              <QuickAction label="Security settings" />
            </div>
          </section>

          {/* ===== PROFILE SUMMARY ===== */}
          <GlassSection title="Personal information">
            <Info label="Full name" value={`${user.firstName} ${user.lastName}`} />
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone || "—"} />
            <Info label="City" value={user.location?.city || "—"} />
          </GlassSection>

          <GlassSection title="Account & security">
            <Info label="Account type" value="Customer" />
            <Info
              label="User ID"
              value={user._id ? user._id.slice(0, 6) + "••••" : "—"}
            />
            <Info
              label="Member since"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"
              }
            />
          </GlassSection>
        </motion.main>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const NavItem = ({ icon, label }) => (
  <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm bg-white/80 border border-neutral-200 hover:bg-white transition shadow-sm">
    <div className="flex items-center gap-3 text-neutral-800">
      {icon}
      {label}
    </div>
    <ChevronRight size={14} className="text-neutral-400" />
  </button>
);

const GlassSection = ({ title, children }) => (
  <section className="rounded-3xl bg-white/80 border border-neutral-200 p-8 shadow-sm">
    <h3 className="text-sm font-medium text-neutral-700 mb-6">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </section>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-neutral-500">{label}</p>
    <p className="text-sm font-medium text-neutral-900">{value}</p>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm flex items-center gap-4">
    <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-700">
      {icon}
    </div>
    <div>
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="text-xl font-semibold text-neutral-900">{value}</p>
    </div>
  </div>
);

const QuickAction = ({ label }) => (
  <button className="px-5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium hover:bg-neutral-100 transition">
    {label}
  </button>
);

export default CustomerDashboard;
