/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Product, CustomerReview } from "./types";

// Import the real generated image paths from our generation tool
import maamoulHeroImage from "./assets/images/maamoul_hero_1779895819732.png";
import maamoulDatesImage from "./assets/images/real_maamoul_dates_1779902098632.png";
import maamoulPistachioImage from "./assets/images/real_maamoul_pistachio_box_1779902244506.png";
import jozeyaBoxImage from "./assets/images/real_jozeya_box_1779902184445.png";
import petitsFoursBoxImage from "./assets/images/real_petits_fours_box_1779902203083.png";
import maamoulWalnutBoxImage from "./assets/images/real_maamoul_walnut_box_1779902222189.png";
import mixedBoxImage from "./assets/images/real_mixed_box_1779902266372.png";

export const CUSTOMER_CONTACT = {
  phone: "0536370589",
  whatsappNumber: "966536370589",
  whatsappDisplay: "0536370589",
  instagram: "@anamel.sugar",
  tiktok: "@anamel.sugar",
  address: "الرياض، المملكة العربية السعودية",
  storeTimes: "يومياً من الساعة 2:00 ظهراً حتى 10:00 مساءً",
  ibanBank: "بنك الراجحي",
  ibanValue: "SA74 8000 0539 6080 1800 2790"
};

export const CATEGORIES: Category[] = [
  {
    id: "all",
    name: "الكل",
    description: "",
    iconName: "Grid"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "jozeya",
    categoryId: "jozeya",
    name: "علبة جوزيه",
    description: "",
    price: 60, // base price
    image: jozeyaBoxImage,
    rating: 5.0,
    reviewsCount: 142,
    ingredients: [],
    weight: "حجم كبير",
    pieceCount: 36,
    sweetnessLevel: 2,
    sweetnessDesc: "",
    sizes: [
      { id: "big", name: "حجم كبير", price: 60, pieceCount: 36, weight: "حجم كبير" },
      { id: "small", name: "حجم صغير", price: 30, pieceCount: 18, weight: "حجم صغير" }
    ]
  },
  {
    id: "maamoul-dates",
    categoryId: "maamoul",
    name: "علبة معمول تمر",
    description: "",
    price: 60, // base price
    image: maamoulDatesImage,
    rating: 5.0,
    reviewsCount: 176,
    ingredients: [],
    weight: "حجم كبير",
    pieceCount: 38,
    sweetnessLevel: 2,
    sweetnessDesc: "",
    sizes: [
      { id: "big", name: "حجم كبير", price: 60, pieceCount: 38, weight: "حجم كبير" },
      { id: "small", name: "حجم صغير", price: 30, pieceCount: 18, weight: "حجم صغير" }
    ]
  },
  {
    id: "petits-fours",
    categoryId: "petits-fours",
    name: "علبة بيتيفور",
    description: "",
    price: 60, // base price
    image: petitsFoursBoxImage,
    rating: 5.0,
    reviewsCount: 110,
    ingredients: [],
    weight: "حجم كبير",
    pieceCount: 42,
    sweetnessLevel: 2,
    sweetnessDesc: "",
    sizes: [
      { id: "big", name: "حجم كبير", price: 60, pieceCount: 42, weight: "حجم كبير" },
      { id: "small", name: "حجم صغير", price: 30, pieceCount: 20, weight: "حجم صغير" }
    ],
    flavors: ["شوكولاته", "مشكل", "فانيلا"]
  },
  {
    id: "maamoul-walnut",
    categoryId: "maamoul",
    name: "علبة معمول جوز",
    description: "",
    price: 80,
    image: maamoulWalnutBoxImage,
    rating: 5.0,
    reviewsCount: 125,
    ingredients: [],
    weight: "حجم واحد كبير",
    pieceCount: 30,
    sweetnessLevel: 1,
    sweetnessDesc: ""
  },
  {
    id: "maamoul-pistachio",
    categoryId: "maamoul",
    name: "علبة معمول فستق",
    description: "",
    price: 80,
    image: maamoulPistachioImage,
    rating: 5.0,
    reviewsCount: 148,
    ingredients: [],
    weight: "حجم واحد كبير",
    pieceCount: 30,
    sweetnessLevel: 1,
    sweetnessDesc: ""
  },
  {
    id: "jozeya-mixed-12",
    categoryId: "jozeya",
    name: "مشكل 12 حبه",
    description: "",
    price: 20,
    image: mixedBoxImage,
    rating: 4.8,
    reviewsCount: 52,
    ingredients: [],
    weight: "12 حبة",
    pieceCount: 12,
    sweetnessLevel: 2,
    sweetnessDesc: ""
  },
  {
    id: "jozeya-mixed-24",
    categoryId: "jozeya",
    name: "مشكل 24 حبه",
    description: "",
    price: 40,
    image: mixedBoxImage,
    rating: 4.9,
    reviewsCount: 89,
    ingredients: [],
    weight: "24 حبة",
    pieceCount: 24,
    sweetnessLevel: 2,
    sweetnessDesc: ""
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "نورهان العتيبي",
    rating: 5,
    comment: "تجاوز التوقعات بكل أمانة! معمول الفستق يذوب ذوبااان ويموت السمن البري ريحته تهبل تبارك الله. حلاوته موزونة ومستحيل تاكل حبة وما ترجع للثانية. الله يبارك لكم في رزقكم.",
    date: "أمس",
    location: "الرياض"
  },
  {
    id: "rev-2",
    name: "أبو فهد الحارثي",
    rating: 5,
    comment: "المعمول بالتمر خفيف ولذيذ ونكهة بهارات المعمول فيه مضبوطة بالملي، تذكرني بمعمول أمي وجدتي زمان. طلبت البكس الملكي للجمعة والكل انهبل عليه. فخر شغل بيوت فندقي.",
    date: "منذ ٣ أيام",
    location: "جدة"
  }
];

export const CITIES = [
  { name: "الرياض", deliveryFee: 0 }
];
