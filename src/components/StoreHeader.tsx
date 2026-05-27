/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag } from "lucide-react";

interface StoreHeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function StoreHeader({
  cartCount,
  onCartClick,
}: StoreHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-brand-sand/40 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-chocolate flex items-center justify-center shadow-xs">
            <span className="text-lg font-bold text-white font-mono">هـ</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-brand-chocolate">
              هشّه
            </h1>
            <p className="text-[10px] sm:text-xs text-brand-chocolate-light font-medium">
              مخبوزات وحلويات منزلية طازجة
            </p>
          </div>
        </div>

        {/* Shopping Cart Button */}
        <button
          onClick={onCartClick}
          className="relative px-5 py-2.5 rounded-xl bg-brand-chocolate text-white hover:bg-brand-gold hover:text-white transition-all duration-300 shadow-xs flex items-center gap-2 cursor-pointer"
          id="cart-btn"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-bold hidden sm:inline">سلة الطلبات</span>
          {cartCount > 0 && (
            <span className="w-5 h-5 bg-brand-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
