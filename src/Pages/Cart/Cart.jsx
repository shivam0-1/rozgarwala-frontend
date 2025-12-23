import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingCart, Plus, Minus, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const Cart = ({ items = [], onRemove, onCheckout, onQuantityChange }) => {
  const { t } = useTranslation();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-10 max-w-3xl mx-auto p-6 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 flex items-center justify-between mb-6"
      >
        <h2 className="text-3xl font-semibold text-[#E53935] flex items-center gap-2">
          <ShoppingCart className="w-7 h-7" />
          {t("cart_title")}
        </h2>
        <span className="text-gray-500">
          {t("cart_items_count", { count: items.length })}
        </span>
      </motion.div>

      {/* Cart Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 text-gray-500"
            >
              <div className="flex justify-center mb-4">
                <User className="w-12 h-12 text-gray-300" />
              </div>
              <p className="font-medium">{t("cart_empty_title")}</p>
              <p>{t("cart_empty_desc")}</p>
            </motion.div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item, index) => (
                <motion.li
                  key={item.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-14 h-14 rounded-full border object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.service}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price.toLocaleString()} {t("cart_price_per_day")}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          onQuantityChange(item, item.quantity - 1)
                        }
                        className="bg-gray-100 hover:bg-gray-200 p-1 rounded-full"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          onQuantityChange(item, item.quantity + 1)
                        }
                        className="bg-gray-100 hover:bg-gray-200 p-1 rounded-full"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    <p className="font-semibold text-gray-700">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => onRemove(item)}
                      className="text-[#E53935] hover:text-[#b71c1c] transition flex items-center gap-1 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t("cart_remove")}
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </AnimatePresence>
      </div>

      {/* Checkout Bar */}
      {items.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-full px-6 py-3 flex items-center justify-between w-[90%] max-w-md border border-gray-100"
        >
          <p className="text-lg font-semibold text-gray-700">
            {t("cart_total")}: ₹{total.toLocaleString()}
          </p>
          <button
            onClick={onCheckout}
            className="bg-[#E53935] hover:bg-[#c62828] text-white px-6 py-2 rounded-full font-medium transition"
          >
            {t("cart_checkout")}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
