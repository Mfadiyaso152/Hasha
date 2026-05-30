/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ShoppingBag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StoreHeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function StoreHeader({
  cartCount,
  onCartClick,
}: StoreHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-transparent h-[72px] pointer-events-none" dir="rtl">
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 32,
        }}
        className={`
          flex items-center mx-auto pointer-events-auto transition-shadow duration-300
          ${isScrolled
            ? "w-[140px] h-12 bg-zinc-950/95 border border-zinc-800/80 rounded-full shadow-2xl justify-center px-4 mt-2.5"
            : "w-full max-w-7xl h-full bg-white/95 backdrop-blur-md border-b border-brand-sand/40 justify-between px-4 sm:px-6 lg:px-8"
          }
        `}
      >
        <AnimatePresence mode="wait">
          {!isScrolled ? (
            <motion.div
              key="full-header"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.15 }}
              className="w-full flex items-center justify-between"
            >
              {/* Logo / Brand Name */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="w-10 h-10 rounded-full bg-brand-chocolate flex items-center justify-center shadow-md hover:bg-brand-gold transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <span className="text-base font-bold text-white font-mono">هـ</span>
                </button>
                <div className="text-right">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-brand-chocolate flex items-center gap-1">
                    <span>هشّه</span>
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                  </h1>
                  <p className="text-[10px] sm:text-xs text-brand-chocolate-light font-medium mt-0.5">
                    مخبوزات وحلويات منزلية طازجة
                  </p>
                </div>
              </div>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={onCartClick}
                className={`relative flex items-center justify-center gap-2 cursor-pointer font-bold bg-brand-chocolate text-white hover:bg-brand-gold transition-all duration-300 ${
                  cartCount > 0 ? "p-3 rounded-full" : "py-2 px-4 rounded-xl text-xs sm:text-sm"
                }`}
                id="cart-btn"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartCount === 0 && <span>سلة الطلبات</span>}
                {cartCount > 0 && (
                  <span className="w-5 h-5 bg-brand-gold text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="dynamic-island"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={{ duration: 0.15 }}
              type="button"
              onClick={onCartClick}
              className="w-full h-full flex items-center justify-center relative cursor-pointer group"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5 text-white group-hover:text-brand-gold transition-colors duration-300" />
                {cartCount > 0 ? (
                  <span className="absolute -top-1.5 -right-2.5 min-w-4.5 h-4.5 px-1 bg-brand-gold text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border border-zinc-950">
                    {cartCount}
                  </span>
                ) : (
                  <span className="absolute -bottom-1 text-[8px] text-zinc-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    السلة
                  </span>
                )}
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
