/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { Cookie, ShoppingBag, Sparkles } from "lucide-react";
import { PRODUCTS } from "./data";
import { Product, CartItem } from "./types";
import StoreHeader from "./components/StoreHeader";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import OrderSuccessModal from "./components/OrderSuccessModal";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [invoiceText, setInvoiceText] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Setup total items in cart count
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Handler to add customized item to cart
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prevItems, { product, quantity }];
    });

    // Show beautiful toast notification instead of opening cart immediately
    setToastMessage(`تمت إضافة "${product.name}" إلى السلة بنجاح!`);
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  // Handler to update quantity of item
  const handleUpdateQty = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Handler to remove item from cart
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Triggered when clicking "Checkout" inside Cart
  const handleCheckoutTrigger = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Triggered when order is applied successfully
  const handleOrderSuccess = (receipt: string, orderNum: string) => {
    setInvoiceText(receipt);
    setOrderNumber(orderNum);
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
    // Flush cart on successful order
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-gold/30 selection:text-brand-chocolate bg-[#FAF9F6]" id="store-wrapper">
      
      {/* Header containing brand name & Cart count indicator */}
      <StoreHeader
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 pb-20">
        
        {/* Simple Minimalist Greeting Announcement */}
        <section className="bg-[#FAF9F6] border-b border-brand-sand/40 py-10 px-4">
          <div className="max-w-xl mx-auto text-center space-y-2.5">
            <div className="inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-chocolate px-3 py-1 rounded-full text-xs font-bold border border-brand-gold/20">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
              <span>نخبز يومياً بكل حب وفن 🇸🇦</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-chocolate tracking-tight">
              متجر هشة للحلويات
            </h2>
            <p className="text-xs sm:text-sm text-brand-chocolate-light leading-relaxed font-semibold">
              أهلاً بكم في متجرنا للحلويات والمعمول الطازج، نخبز لكم بمكونات طبيعية وتوصيل فوري لطلباتكم.
            </p>
          </div>
        </section>

        {/* Product Catalog Stage */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10" id="catalog-section">

          {/* Catalog Title Block */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-sand/40 pb-5 mb-8" dir="rtl">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-brand-chocolate flex items-center gap-2">
                <Cookie className="w-5 h-5 text-brand-chocolate" />
                <span>قائمة المنتجات</span>
              </h3>
            </div>
          </div>

          {/* Products dynamic grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

      </main>

      {/* Floating Action Button for Mobile Cart (UX Delight) */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          onClick={() => setIsCartOpen(true)}
          className="md:hidden fixed bottom-6 left-6 z-40 bg-brand-chocolate text-white p-4 rounded-full shadow-2xl flex items-center justify-center gap-2 border border-brand-sand cursor-pointer"
          id="mobile-floating-cart-btn"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-3 -left-3 w-5 h-5 bg-brand-gold border-2 border-white text-white text-[10px] font-black rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <span className="text-xs font-bold leading-none pr-1">عرض سلة المشتريات</span>
        </motion.button>
      )}

      {/* Shopping Cart Side Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutTrigger}
      />

      {/* Checkout Credentials Forms Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Checkout Completed Receipt Modal */}
      <OrderSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        invoiceText={invoiceText}
        orderNumber={orderNumber}
      />

      {/* Toast Notification Alert (No Redirect) */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 md:left-auto max-w-sm w-[calc(100%-2rem)] bg-emerald-600 text-white py-3.5 px-5 rounded-xl shadow-xl z-50 flex items-center gap-3 border border-emerald-500/30"
            dir="rtl"
          >
            <div className="text-xl">🌸</div>
            <div className="flex-1 text-xs sm:text-sm font-black leading-normal">{toastMessage}</div>
            <button
              type="button"
              onClick={() => setToastMessage("")}
              className="text-white/85 hover:text-white font-bold text-xs bg-emerald-700/50 hover:bg-emerald-700 px-2 py-1 rounded-md transition-colors cursor-pointer"
            >
              موافق
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Site Footer */}
      <footer className="bg-brand-chocolate text-white border-t border-brand-sand/20 py-8 px-4 shadow-inner text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-brand-chocolate font-mono">هـ</span>
            </div>
            <strong className="text-base font-black tracking-tight text-white">متجر هشة للحلويات</strong>
          </div>
          <p className="text-xs text-white/60">
            مخبوزات وحلويات منزلية طازجة ومحضرة بكل حب وشغف يومياً.
          </p>
          <div className="text-[10px] text-white/40 border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span>جميع الحقوق محفوظة لـ © {new Date().getFullYear()} متجر هشة للحلويات</span>
            <span>صنع بكل حب وفن 🌸🇸🇦</span>
          </div>
          <div className="text-[11px] text-white/50 pt-2 flex items-center justify-center gap-1.5 border-t border-white/5">
            <span>رقم التواصل:</span>
            <a
              href="https://wa.me/966536370589"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-white transition-colors underline font-black tracking-wider"
              dir="ltr"
            >
              0536370589
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
