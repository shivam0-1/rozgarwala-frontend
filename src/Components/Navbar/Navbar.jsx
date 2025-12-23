// Navbar.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileMenu from "../Profile/ProfileMenu.jsx";
import useAuth from "../../auth/useAuth.js";

import profileImg from "../../assets/Male_review.png";
import {
  Bars3Icon as Menu,
  XMarkIcon as X,
  MagnifyingGlassIcon,
  MapPinIcon,
  UserIcon,
  ShoppingCartIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";

// ✅ i18n hook added
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const { isAuth, user, handleLogout } = useAuth();
  const isLoggedIn = isAuth;

  const { t } = useTranslation();

  const services = t("services", { returnObjects: true });
  const locations = t("locations", { returnObjects: true });

  const [serviceInput, setServiceInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const servicesRefDesktop = useRef(null);
  const servicesRefMobile = useRef(null);
  const locationRefDesktop = useRef(null);
  const locationRefMobile = useRef(null);
  const profileMenuRef = useRef(null);

  // /* ================= LOGOUT ================= */
  // const handleLogout = () => {
  //   logout();
  //   navigate("/logincustomer");
  // };

  /* ================= TYPING EFFECT ================= */
  const phrases = useMemo(
    () => [
      {
        service: t("search_plumber", "Search Plumber..."),
        location: t("location_delhi", "Delhi"),
      },
      {
        service: t("search_electrician", "Search Electrician..."),
        location: t("location_mumbai", "Mumbai"),
      },
      {
        service: t("search_painter", "Search Painter..."),
        location: t("location_bengaluru", "Bengaluru"),
      },
      {
        service: t("search_mason", "Search Mason..."),
        location: t("location_kolkata", "Kolkata"),
      },
    ],
    [t]
  );

  const [placeholderService, setPlaceholderService] = useState("");
  const [placeholderLocation, setPlaceholderLocation] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 50 : 120;

    const timeout = setTimeout(() => {
      const nextService = currentPhrase.service.substring(
        0,
        charIndex + (isDeleting ? -1 : 1)
      );
      const nextLocation = currentPhrase.location.substring(
        0,
        charIndex + (isDeleting ? -1 : 1)
      );

      setPlaceholderService(nextService);
      setPlaceholderLocation(nextLocation);
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));

      if (!isDeleting && charIndex === currentPhrase.service.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;

      const insideServiceDesktop =
        servicesRefDesktop.current &&
        servicesRefDesktop.current.contains(target);
      const insideServiceMobile =
        servicesRefMobile.current && servicesRefMobile.current.contains(target);

      if (!insideServiceDesktop && !insideServiceMobile) {
        setShowServiceSuggestions(false);
      }

      const insideLocationDesktop =
        locationRefDesktop.current &&
        locationRefDesktop.current.contains(target);
      const insideLocationMobile =
        locationRefMobile.current && locationRefMobile.current.contains(target);

      if (!insideLocationDesktop && !insideLocationMobile) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceSelect = (service) => {
    setServiceInput(service);
    setShowServiceSuggestions(false);
  };

  const handleLocationSelect = (location) => {
    setLocationInput(location);
    setShowLocationSuggestions(false);
  };

  const filteredServices = services.filter((s) =>
    s.toLowerCase().includes(serviceInput.toLowerCase())
  );
  const filteredLocations = locations.filter((l) =>
    l.toLowerCase().includes(locationInput.toLowerCase())
  );

  /* ================= CART CLICK ================= */
  const handleCartClick = () => {
    if (!isLoggedIn) navigate("/logincustomer");
    else navigate("/cart");
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={logo}
            alt="RozgarWala"
            className="h-5 sm:h-6 md:h-7 lg:h-8 transition-all"
          />
        </NavLink>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {/* Service Search */}
          <li ref={servicesRefDesktop} className="relative w-60">
            <div className="relative">
              <input
                type="text"
                value={serviceInput}
                onChange={(e) => {
                  setServiceInput(e.target.value);
                  setShowServiceSuggestions(true);
                }}
                onFocus={() => setShowServiceSuggestions(true)}
                placeholder={
                  placeholderService || t("search_service", "Search Service...")
                }
                className="w-full pl-8 pr-2 py-1 text-xs lg:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 absolute left-2 top-2" />
            </div>

            <ul
              role="listbox"
              className={`absolute top-10 left-0 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto z-50 transition-opacity duration-200 ${
                showServiceSuggestions
                  ? "opacity-100 visible pointer-events-auto"
                  : "opacity-0 invisible pointer-events-none"
              }`}
            >
              {filteredServices.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleServiceSelect(s)}
                  className="text-xs px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-red-100 hover:text-red-600 hover:shadow-sm transition-all"
                >
                  {s}
                </li>
              ))}
            </ul>
          </li>

          {/* Location Search */}
          <li ref={locationRefDesktop} className="relative w-48">
            <div className="relative">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                placeholder={
                  placeholderLocation ||
                  t("search_location", "Search Location...")
                }
                className="w-full pl-8 pr-2 py-1 text-xs lg:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <MapPinIcon className="h-4 w-4 text-gray-500 absolute left-2 top-2" />
            </div>

            <ul
              role="listbox"
              className={`absolute top-10 left-0 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto z-50 transition-opacity duration-200 ${
                showLocationSuggestions
                  ? "opacity-100 visible pointer-events-auto"
                  : "opacity-0 invisible pointer-events-none"
              }`}
            >
              {filteredLocations.map((l, i) => (
                <li
                  key={i}
                  onClick={() => handleLocationSelect(l)}
                  className="text-xs px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-red-100 hover:text-red-600 hover:shadow-sm transition-all"
                >
                  {l}
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-7">
          {/* Contact */}
          <NavLink to="/contact">
            <PhoneIcon className="h-5 w-5 text-gray-600" />
          </NavLink>

          {/* Cart */}
          <button onClick={handleCartClick}>
            <ShoppingCartIcon className="h-5 w-5 text-gray-600" />
          </button>

          {/* User */}
          {!isLoggedIn ? (
            <div className="relative group">
              <UserIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <NavLink
                  to="/logincustomer"
                  className="block px-4 py-2 text-sm hover:bg-red-100"
                >
                  {t("login", "Login")}
                </NavLink>
                <NavLink
                  to="/signupcustomer"
                  className="block px-4 py-2 text-sm hover:bg-red-100"
                >
                  {t("signup", "Signup")}
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              {/* Avatar */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu((s) => !s);
                }}
                className="h-8 w-8 rounded-full overflow-hidden"
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </button>

              {/* Google-style Popup */}
              {isLoggedIn && user && showProfileMenu && (
                <ProfileMenu
                  user={user}
                  onLogout={handleLogout}
                  onClose={() => setShowProfileMenu(false)}
                />
              )}
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen((s) => !s)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-3 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            {/* Mobile Service */}
            <div ref={servicesRefMobile} className="relative flex-1">
              <div className="flex items-center space-x-2">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => {
                    setServiceInput(e.target.value);
                    setShowServiceSuggestions(true);
                  }}
                  onFocus={() => setShowServiceSuggestions(true)}
                  placeholder={
                    placeholderService ||
                    t("search_service", "Search Service...")
                  }
                  className="w-full border rounded-full px-3 py-1 text-sm"
                />
              </div>

              <ul
                role="listbox"
                className={`absolute mt-2 left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto z-50 transition-opacity duration-200 ${
                  showServiceSuggestions
                    ? "opacity-100 visible pointer-events-auto"
                    : "opacity-0 invisible pointer-events-none"
                }`}
              >
                {filteredServices.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleServiceSelect(s)}
                    className="text-xs px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-red-100 hover:text-red-600 hover:shadow-sm transition-all"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Location */}
            <div ref={locationRefMobile} className="relative flex-1">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setShowLocationSuggestions(true);
                  }}
                  onFocus={() => setShowLocationSuggestions(true)}
                  placeholder={
                    placeholderLocation ||
                    t("search_location", "Search Location...")
                  }
                  className="w-full border rounded-full px-3 py-1 text-sm"
                />
              </div>

              <ul
                role="listbox"
                className={`absolute mt-2 left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto z-50 transition-opacity duration-200 ${
                  showLocationSuggestions
                    ? "opacity-100 visible pointer-events-auto"
                    : "opacity-0 invisible pointer-events-none"
                }`}
              >
                {filteredLocations.map((l, i) => (
                  <li
                    key={i}
                    onClick={() => handleLocationSelect(l)}
                    className="text-xs px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-red-100 hover:text-red-600 hover:shadow-sm transition-all"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-10 justify-center pt-2">
            {!isLoggedIn ? (
              <NavLink to="/logincustomer">
                <UserIcon className="h-5 w-5 text-gray-600" />
              </NavLink>
            ) : (
              <button onClick={() => navigate("/profile")}>
                <img
                  src="/profile-avatar.png"
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </button>
            )}

            <button onClick={handleCartClick}>
              <ShoppingCartIcon className="h-5 w-5 text-gray-600" />
            </button>

            <NavLink to="/contact">
              <PhoneIcon className="h-5 w-5 text-gray-600" />
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
