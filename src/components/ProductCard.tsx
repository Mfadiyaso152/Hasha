/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Star, Flame, Scale, Box, Info, Heart, Minus, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { Product } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, notes?: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(() => (product.sizes ? product.sizes[0] : null));
  const [selectedFlavor, setSelectedFlavor] = useState(() => (product.flavors ? product.flavors[0] : null));

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAdd = () => {
    const finalProduct = { ...product };
    const idParts = [product.id];

    if (product.sizes && selectedSize) {
      idParts.push(selectedSize.id);
      finalProduct.price = selectedSize.price;
      finalProduct.pieceCount = selectedSize.pieceCount;
      finalProduct.weight = selectedSize.weight || product.weight;
    }

    if (product.flavors && selectedFlavor) {
      idParts.push(selectedFlavor);
    }

    finalProduct.id = idParts.join("-");

    if (product.sizes && selectedSize && product.flavors && selectedFlavor) {
      finalProduct.name = `${product.name} (${selectedSize.name} - ${selectedFlavor})`;
    } else if (product.sizes && selectedSize) {
      finalProduct.name = `${product.name} (${selectedSize.name})`;
    } else if (product.flavors && selectedFlavor) {
      finalProduct.name = `${product.name} (${selectedFlavor})`;
    }

    onAddToCart(finalProduct, quantity);
    setQuantity(1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-brand-sand/50 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full group"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream/10">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          id={`product-image-${product.id}`}
        />
      </div>

      {/* Product Minimalist Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-brand-chocolate">
              {product.name}
            </h3>
            <p className="text-base font-extrabold text-[#9C7A58]">
              {selectedSize ? selectedSize.price : product.price} ريال
            </p>
          </div>

          {/* Size Selectors */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-brand-chocolate-light font-bold block">اختر الحجم:</span>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                      selectedSize?.id === size.id
                        ? "bg-brand-chocolate text-white border-brand-chocolate"
                        : "bg-[#f4f4f5] text-brand-chocolate-light border-brand-sand/60 hover:bg-zinc-100"
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flavor/Type Selectors */}
          {product.flavors && product.flavors.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-brand-chocolate-light font-bold block">اختر النوع:</span>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((flavor) => (
                  <button
                    key={flavor}
                    type="button"
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer min-w-[70px] ${
                      selectedFlavor === flavor
                        ? "bg-brand-chocolate text-white border-brand-chocolate"
                        : "bg-[#f4f4f5] text-brand-chocolate-light border-brand-sand/60 hover:bg-zinc-100"
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions: Quantity Selector & Add Button */}
        <div className="mt-4 pt-3 border-t border-brand-sand/40 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-brand-chocolate-light font-medium">الكمية المطلوب تحديدها:</span>
            
            {/* Quantity Controls */}
            <div className="flex items-center gap-1 bg-[#f4f4f5] p-1 rounded-full border border-brand-sand">
              <button
                type="button"
                onClick={decrementQty}
                className="w-7 h-7 rounded-full bg-white hover:bg-zinc-200 active:scale-95 text-brand-chocolate flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-xs font-bold text-brand-chocolate">
                {quantity}
              </span>
              <button
                type="button"
                onClick={incrementQty}
                className="w-7 h-7 rounded-full bg-white hover:bg-zinc-200 active:scale-95 text-brand-chocolate flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Simple Clean Add Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-2.5 rounded-xl bg-brand-chocolate hover:bg-brand-gold text-white hover:text-white font-bold text-xs shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>أضف للسلة 🛒</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
