/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 transition-opacity"
            id="cart-backdrop"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col h-full border-l border-brand-sand/40"
            id="cart-drawer-panel"
            dir="rtl"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-brand-sand/40 bg-[#FAF9F6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-chocolate/5 text-brand-chocolate flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-brand-chocolate">حقيبة المشتريات</h2>
                  <p className="text-[11px] text-brand-chocolate-light">
                    (لديك {cartItems.length} منتجات في السلة)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 px-2.5 rounded-lg border border-brand-sand text-xs text-brand-chocolate hover:bg-brand-sand/20 transition-all cursor-pointer"
              >
                رجوع للرئيسية ↩
              </button>
            </div>

            {/* Drawer Body - Cart items list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-[#F4F4F5] rounded-full flex items-center justify-center mb-3 text-brand-chocolate-light">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-brand-chocolate">السلة فارغة حالياً</h3>
                  <p className="text-xs text-brand-chocolate-light mt-1 max-w-[220px]">
                    تصفح منتجاتنا اللذيذة وأضفها للسلة لبدأ طلبك.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-[#FAFBFD]/50 rounded-xl border border-brand-sand/40 flex gap-3 relative"
                  >
                    {/* Item Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-lg border border-brand-sand/20 flex-shrink-0"
                    />

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {/* Title & Delete */}
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-sm font-bold text-brand-chocolate truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-brand-chocolate-light hover:text-rose-500 p-0.5 transition-colors cursor-pointer"
                            aria-label="حذف الصنف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Quantity & Price Row */}
                      <div className="flex items-center justify-between mt-2">
                        {/* Counter controls */}
                        <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-full border border-brand-sand scale-90 origin-right">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-5.5 h-5.5 rounded-full bg-white text-brand-chocolate flex items-center justify-center disabled:opacity-40 shadow-xs cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-brand-chocolate">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                            className="w-5.5 h-5.5 rounded-full bg-white text-brand-chocolate flex items-center justify-center shadow-xs cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <div className="text-left font-extrabold text-sm text-brand-chocolate">
                          {item.product.price * item.quantity} ريال
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer - Calculations and Checkout */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-brand-sand/50 bg-[#FAF9F6] space-y-4">
                {/* Calculations section */}
                <div className="space-y-2 text-xs text-brand-chocolate-light font-medium">
                  <div className="flex justify-between text-sm text-brand-chocolate font-bold">
                    <span>إجمالي السلة:</span>
                    <span className="text-base text-[#9C7A58] font-black">
                      {subtotal} ريال سعودي
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed text-center">
                    * طريقة الاستلام وموقعك يتم تحديدها بالمرحلة التالية عند تأكيد الطلب.
                  </p>
                </div>

                {/* Confirm order action */}
                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full py-3 rounded-full bg-brand-chocolate hover:bg-brand-gold text-white font-black text-xs sm:text-sm tracking-wide shadow-md transition-all duration-300 block text-center cursor-pointer"
                >
                  المتابعة لتاكيد الطلب 🌸
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
