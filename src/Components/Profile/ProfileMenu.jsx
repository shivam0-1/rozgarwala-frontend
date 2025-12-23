import { Link } from "react-router-dom";
import {
  User,
  LogOut,
  ClipboardList,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const ProfileMenu = ({ user, onLogout, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40"
      />

      {/* Popup */}
      <div className="absolute right-0 top-14 z-50 w-70 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden animate-scaleIn">
        
        {/* Header */}
        <div className="relative bg-gradient-to-br from-red-500 to-red-600 px-5 py-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-white/20 ring-2 ring-white flex items-center justify-center">
              <User className="text-white" size={28} />
            </div>

            {/* Name & Role */}
            <div>
              <p className="text-white font-semibold text-lg leading-tight">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-white/80 text-sm capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="py-2">
          <MenuItem
            to={user.role === "worker" ? "/profile" : "profile"}
            icon={<User size={18} />}
            label="Dashboard"
            onClick={onClose}
          />

          {user.role === "customer" && (
            <MenuItem
              to="/orders"
              icon={<ClipboardList size={18} />}
              label="My Orders"
              onClick={onClose}
            />
          )}

          {user.role === "worker" && (
            <MenuItem
              to="/jobs"
              icon={<Briefcase size={18} />}
              label="My Jobs"
              onClick={onClose}
            />
          )}

          <div className="my-2 border-t" />

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} />
              Logout
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

/* ---------- Reusable Menu Item ---------- */
const MenuItem = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
  >
    <div className="flex items-center gap-3">
      {icon}
      {label}
    </div>
    <ChevronRight size={16} className="text-gray-400" />
  </Link>
);

export default ProfileMenu;
