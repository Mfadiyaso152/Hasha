/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { X, User, Phone, MapPin, Calendar, CreditCard, Send, Check } from "lucide-react";
import { CartItem } from "../types";
import { CUSTOMER_CONTACT } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (invoiceText: string, qrValue: string) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}: CheckoutModalProps) {
  // Client Credentials & Choices
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState(""); // موقع البيت بالتفصيل
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer">("cash");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");
  
  // Feedback states
  const [errorText, setErrorText] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  // We can assume a fixed reasonable delivery fee if delivery is chosen (e.g. 30), or just show items total.
  // Let's set a standard delivery fee of 30 SAR.
  const activeDeliveryFee = deliveryMethod === "delivery" ? 30 : 0;
  const finalTotalAmount = subtotal + activeDeliveryFee;

  const handleApplyOrder = () => {
    // 1. Validations
    if (!customerName.trim()) {
      setErrorText("الرجاء كتابة الاسم الكريم لطلبك");
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorText("الرجاء إدخال رقم الجوال للمتابعة");
      return;
    }
    if (!deliveryDate) {
      setErrorText("الرجاء تحديد تاريخ التسليم المطلق");
      return;
    }
    if (deliveryMethod === "delivery" && !address.trim()) {
      setErrorText("الرجاء كتابة موقع البيت بالتفصيل لتوصيل طلبك");
      return;
    }

    setErrorText("");

    // Generate Order Number
    const orderNum = `HASH-${Math.floor(100000 + Math.random() * 900000)}`;

    // Prepare line items text for WhatsApp
    const linesStr = cartItems
      .map(
        (item) =>
          `* ${item.product.name} (الكمية: ${item.quantity}) - بسعر ${item.product.price * item.quantity} ريال`
      )
      .join("\n");

    const arabicPayment = paymentMethod === "cash" ? "كاش عند الاستلام" : "تحويل بنكي (بعد التاكيد)";
    const arabicDelivery = deliveryMethod === "delivery" ? "توصيل للمنزل" : "استلام من الموقع";

    // Construct the precise WhatsApp message specified by the user
    // (السلام عليكم ، طلبت من الموقع منتجات )
    const receiptMessageOutput = `السلام عليكم ، طلبت من الموقع منتجات 

*تفاصيل المنتجات:*
${linesStr}

*السعر النهائي بالموقع:* ${finalTotalAmount} ريال
*التاريخ المطلق للتسليم:* ${deliveryDate}
*طريقة الاستلام:* ${arabicDelivery}
${deliveryMethod === "delivery" ? `*موقع البيت بالتفصيل:* ${address}` : ""}
*طريقة الدفع:* ${arabicPayment}

*بياناتي:*
الاسم: ${customerName}
الجوال: ${phoneNumber}
${notes.trim() ? `ملاحظة: ${notes}` : ""}`;

    // Encode to URL
    const waUrl = `https://wa.me/${CUSTOMER_CONTACT.whatsappNumber}?text=${encodeURIComponent(receiptMessageOutput)}`;
    
    // Redirect user to WhatsApp
    window.open(waUrl, "_blank");

    // Inform App that order success occurred
    onOrderSuccess(receiptMessageOutput, orderNum);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 transition-opacity"
            id="checkout-backdrop"
          />

          {/* Modal Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-brand-sand/50"
            id="checkout-modal-panel"
            dir="rtl"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-brand-sand/40 bg-[#FAF9F6] flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-brand-chocolate">مراجعة وتأكيد طلبك</h2>
                <p className="text-[10px] text-brand-chocolate-light mt-0.5">
                  أدخل بياناتك وسيتم تحويلك إلى الواتساب فوراً لإتمام التجهيز والتسليم
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 px-2.5 rounded-lg border border-brand-sand text-xs text-brand-chocolate hover:bg-brand-sand/20 transition-all cursor-pointer"
              >
                إغلاق ✕
              </button>
            </div>

            {/* Modal Content - Forms */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {errorText && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-bold text-center">
                  ⚠️ {errorText}
                </div>
              )}

              {/* Form Grid */}
              <div className="space-y-4">
                {/* Contact Credentials */}
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-brand-sand/40 space-y-3">
                  <h3 className="text-xs font-bold text-brand-chocolate flex items-center gap-1.5 border-b border-brand-sand/30 pb-2">
                    <User className="w-4 h-4 text-brand-chocolate" />
                    بيانات المتلقي الكريم
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-600 mb-1">الاسم الكريم <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        placeholder="الرجاء كتابة اسمك"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 border border-brand-sand text-xs rounded-lg bg-white text-brand-chocolate focus:ring-1 focus:ring-brand-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-600 mb-1">رقم الجوال <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        placeholder="05xxxxxx"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-brand-sand text-xs rounded-lg bg-white text-brand-chocolate focus:ring-1 focus:ring-brand-gold focus:outline-none placeholder:text-zinc-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-600 mb-1">تاريخ الاستلام المطلق بالموقع <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-sand text-xs rounded-lg bg-white text-brand-chocolate focus:ring-1 focus:ring-brand-gold focus:outline-none text-right"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* Delivery Method Choice */}
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-brand-sand/40 space-y-3">
                  <h3 className="text-xs font-bold text-brand-chocolate flex items-center gap-1.5 border-b border-brand-sand/30 pb-2">
                    <MapPin className="w-4 h-4 text-brand-chocolate" />
                    طريقة الاستلام والتوصيل <span className="text-red-500">*</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("delivery")}
                      className={`py-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                        deliveryMethod === "delivery"
                          ? "bg-brand-chocolate text-white border-brand-chocolate"
                          : "bg-white text-brand-chocolate border-brand-sand hover:bg-zinc-50"
                      }`}
                    >
                      🚚 توصيل للمنزل
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`py-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                        deliveryMethod === "pickup"
                          ? "bg-brand-chocolate text-white border-brand-chocolate"
                          : "bg-white text-brand-chocolate border-brand-sand hover:bg-zinc-50"
                      }`}
                    >
                      🏪 استلام من موقعنا بالرياض
                    </button>
                  </div>

                  {deliveryMethod === "delivery" ? (
                    <div className="pt-2">
                      <label className="block text-[10px] font-bold text-zinc-600 mb-1">موقع البيت بالتفصيل (الحي - الشارع - رقم المنزل) <span className="text-red-500">*</span></label>
                      <textarea
                        rows={2}
                        placeholder="فضلاً اكتب هنا موقع بيتك / تفاصيل العنوان كاملة لنتمكن من إيصال طلبك وحساب سعر التوصيل بالواتساب"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-brand-sand text-xs rounded-lg bg-white text-brand-chocolate focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                  ) : (
                    <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100 text-[10px] text-brand-chocolate leading-relaxed">
                      📍 <strong>استلام شخصي من موقعنا في الرياض:</strong>
                      <p className="mt-0.5 text-zinc-600">سنقوم بمشاركة لوكيشن المتجر والتنسيق معك مباشرة عبر الواتساب فور إرسال الطلب.</p>
                    </div>
                  )}
                </div>

                {/* Payment Selection Options */}
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-brand-sand/40 space-y-3">
                  <h3 className="text-xs font-bold text-brand-chocolate flex items-center gap-1.5 border-b border-brand-sand/30 pb-2">
                    <CreditCard className="w-4 h-4 text-brand-chocolate" />
                    طريقة الدفع المطلوبة <span className="text-red-500">*</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`py-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                        paymentMethod === "cash"
                          ? "bg-brand-chocolate text-white border-brand-chocolate"
                          : "bg-white text-brand-chocolate border-brand-sand hover:bg-zinc-50"
                      }`}
                    >
                      💵 كاش عند الاستلام
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("transfer")}
                      className={`py-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                        paymentMethod === "transfer"
                          ? "bg-brand-chocolate text-white border-brand-chocolate"
                          : "bg-white text-brand-chocolate border-brand-sand hover:bg-zinc-50"
                      }`}
                    >
                      🏦 تحويل بنكي
                    </button>
                  </div>

                  {paymentMethod === "transfer" ? (
                    <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg text-[11px] text-blue-800 leading-relaxed space-y-1">
                      <p className="font-extrabold flex items-center gap-1">🏦 طريقة التحويل البنكي:</p>
                      <p className="text-zinc-600">سيتم تزويدكم بآيبان بنك الراجحي وتفاصيل الحساب لإكمال التحويل فور تأكيد طلبك ومتابعتك للمحادثة على الواتساب مع خدمة العملاء لراحة وسهولة أكبر بالنسبة لك.</p>
                    </div>
                  ) : (
                    <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-lg text-[11px] text-emerald-800">
                      <p className="font-semibold">💵 تفضل بالدفع كاش أو شبكة يدوياً مباشرة عند الاستلام!</p>
                    </div>
                  )}
                </div>

                {/* Simple Extras */}
                <div>
                  <label className="block text-[10px] font-bold text-zinc-600 mb-1">ملاحظات إضافية على الطلب (اختياري)</label>
                  <input
                    type="text"
                    placeholder="إذا كان لديك ملاحظة أو طلب خاص مثل التغليف، اكتبها هنا"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-sand text-xs rounded-lg bg-white text-brand-chocolate focus:ring-1 focus:ring-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Bill Details */}
              <div className="bg-zinc-50 p-4 rounded-xl border border-brand-sand space-y-2">
                <div className="text-xs space-y-1.5 text-brand-chocolate-light">
                  <div className="flex justify-between">
                    <span>مجموع المنتجات بالسلة:</span>
                    <span className="font-bold text-brand-chocolate">{subtotal} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم التوصيل المقدرة:</span>
                    <span className="font-bold text-brand-chocolate">
                      {deliveryMethod === "delivery" ? "30 ريال (محدد)" : "مجاني (استلام من موقع)"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-brand-sand/40 pt-2 text-sm font-black text-brand-chocolate">
                    <span>السعر النهائي بالموقع:</span>
                    <span className="text-base text-[#9C7A58] font-black">{finalTotalAmount} ريال سعودي</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-white border-t border-brand-sand/40 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleApplyOrder}
                className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-750 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>تأكيد الطلب المباشر والتحويل للواتساب 💬</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
