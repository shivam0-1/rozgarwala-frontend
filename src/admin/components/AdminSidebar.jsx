import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Mail } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8 text-red-600">
        RozgarWala Admin
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-red-50 text-red-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/contacts"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-red-50 text-red-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Mail size={18} />
          Contact Messages
        </NavLink>
      </nav>
    </aside>
  );
}
