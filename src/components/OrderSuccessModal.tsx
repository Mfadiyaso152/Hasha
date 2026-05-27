/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceText: string;
  orderNumber: string;
}

export default function OrderSuccessModal({
  isOpen,
  onClose,
}: OrderSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-chocolate/40 backdrop-blur-xs z-50 transition-opacity"
            id="success-backdrop"
          />

          {/* Dialog Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed inset-x-4 top-1/2 bottom-auto md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 -translate-y-1/2 md:w-full md:max-w-sm bg-white rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden border border-brand-sand/50 p-8 text-center"
            id="success-modal-panel"
            dir="rtl"
          >
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <div className="text-5xl animate-bounce">❣️</div>
              <h2 className="text-xl sm:text-2xl font-black text-brand-chocolate">
                شكرًا على طلبك❣️
              </h2>
              <p className="text-xs text-brand-chocolate-light font-medium leading-relaxed">
                تم تحويلك للواتساب لمتابعة تأكيد الطلب وتوصيله. نسعد بخدمتكم دائماً!
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-brand-sand/40">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-brand-chocolate hover:bg-brand-gold text-white font-bold text-xs transition-all cursor-pointer"
              >
                العودة للمتجر ↩
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
