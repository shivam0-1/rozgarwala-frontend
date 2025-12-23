import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminContacts from "../admin/pages/AdminContacts";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminProtectedRoute from "../admin/AdminProtectedRoute";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected Admin Area */}
      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="contacts" element={<AdminContacts />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
}
