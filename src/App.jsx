import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer.jsx";

import Home from "./Pages/Home/Home.jsx";
import BecomeWorker from "./Pages/BecomeWorker/BecomeWorker.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Cart from "./Pages/Cart/Cart.jsx";

import SignupCustomer from "./Pages/Login/SignupCustomer.jsx";
import SignupWorker from "./Pages/Login/SignupWorker.jsx";
import LoginCustomer from "./Pages/Login/LoginCustomer.jsx";
import LoginWorker from "./Pages/Login/LoginWorker.jsx";

import ProfileRouter from "./Pages/Profile/ProfileRouter.jsx";

import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";

import AdminRoutes from "./routes/AdminRoutes";

function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* ===== ADMIN ROUTES ===== */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* ===== PUBLIC ROUTES ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/become-worker" element={<BecomeWorker />} />

            <Route path="/signupcustomer" element={<SignupCustomer />} />
            <Route path="/signupworker" element={<SignupWorker />} />
            <Route path="/logincustomer" element={<LoginCustomer />} />
            <Route path="/loginworker" element={<LoginWorker />} />

            {/* ===== PROTECTED USER ROUTES ===== */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/*"
              element={
                <ProtectedRoute>
                  <ProfileRouter />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
