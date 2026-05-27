/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, MessageSquareCode, Quote, Heart } from "lucide-react";
import { REVIEWS } from "../data";
import { motion } from "motion/react";

export default function ReviewSlider() {
  return (
    <section className="py-12 bg-white rounded-3xl border border-brand-sand/30 shadow-sm p-6 sm:p-8 mt-12 max-w-7xl mx-auto">
      {/* Title block */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold text-brand-gold-dark tracking-widest uppercase bg-brand-cream px-3 py-1 rounded-full border border-brand-sand/50">
          آراء عملاء البوتيك
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-chocolate mt-3">
          شهادات نعتز بها ❤️
        </h2>
        <p className="text-xs sm:text-sm text-brand-chocolate-light mt-2.5">
          محبّتكم ورضاكم الدائم هو سر شغفنا وإلهامنا اليومي في خبز أجود الحلويات من مطبخنا المنزلي لكم.
        </p>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {REVIEWS.map((rev, index) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-brand-cream/40 p-5 rounded-2xl border border-brand-sand/20 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
          >
            {/* Quote decoration */}
            <span className="absolute top-4 left-4 text-brand-gold/15">
              <Quote className="w-8 h-8 fill-current rotate-180" />
            </span>

            {/* Stars & Text */}
            <div className="space-y-3">
              {/* Star Rating */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating
                        ? "fill-brand-gold text-brand-gold"
                        : "text-brand-sand fill-none"
                    }`}
                  />
                ))}
              </div>

              {/* Comment text in native Saudi dialogue */}
              <p className="text-xs text-brand-chocolate-light leading-relaxed font-normal min-h-[90px]">
                "{rev.comment}"
              </p>
            </div>

            {/* Reviewer Details */}
            <div className="border-t border-brand-sand/30 pt-3.5 mt-4 flex justify-between items-center text-xs">
              <div>
                <strong className="block text-brand-chocolate text-[13px]">{rev.name}</strong>
                <span className="text-[10px] text-brand-chocolate-light/70">{rev.location}</span>
              </div>
              <div className="text-[10px] text-brand-chocolate-light bg-white border border-brand-sand/50 px-2 py-0.5 rounded-full">
                {rev.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Satisfaction note */}
      <div className="mt-8 pt-6 border-t border-brand-sand/20 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-brand-chocolate-light">
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          <span>ضمان السمن الطبيعي الطازج ١٠٠٪ في جميع المخبوزات والحلويات</span>
        </div>
        <span className="hidden sm:inline text-brand-sand">|</span>
        <div>أكثر من <strong className="text-brand-gold-dark">٥٠٠+</strong> عميل سعيد ومستمر شهرياً في مختلف مناطق المملكة.</div>
      </div>
    </section>
  );
}
