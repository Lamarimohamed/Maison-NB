export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number; // in DZD (د.ج)
  originalPrice?: number;
  category_id: string;
  sizes: string[];
  images: string[];
  description: string;
  in_stock: boolean;
  is_featured?: boolean;
  created_at: string;
  views: number;
  clicks: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  full_name: string;
  phone: string;
  wilaya: string;
  commune: string;
  address: string;
  size: string;
  notes?: string;
  status: OrderStatus;
  created_at: string;
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: "all", name: "الكل" },
  { id: "dresses", name: "فساتين وسهرة" },
  { id: "blouses", name: "بلوزات وقمصان" },
  { id: "coats", name: "معاطف وسترات" },
  { id: "abayas", name: "عبايات وقفتان" },
  { id: "pants", name: "بناطيل وتنانير" },
  { id: "accessories", name: "إكسسوارات وهدايا" },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "فستان سهرة حريري بكسرات رفيعة - بيج ملكي",
    price: 8900,
    originalPrice: 11200,
    category_id: "dresses",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&fit=crop&auto=format"
    ],
    description: "فستان فاخر مصنوع من أقمشة الحرير الناعم بتصميم عصري وأنيق يناسب المناسبات الخاصة. يتميز بكسرات خفيفة وحزام خصر رفيع يبرز جمال القوام.",
    in_stock: true,
    is_featured: true,
    created_at: "2026-08-10T14:30:00Z",
    views: 342,
    clicks: 128
  },
  {
    id: "prod-2",
    name: "عباية مودرن مطرزة بالخيوط الذهبية",
    price: 12500,
    originalPrice: 14800,
    category_id: "abayas",
    sizes: ["Standard", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&fit=crop&auto=format"
    ],
    description: "عباية فاخرة بقماش الكريب الملكي العالي الجودة، مطرزة يدوياً بحرفية عالية على الأكمام والحواف بخيوط ذهبية ناعمة.",
    in_stock: true,
    is_featured: true,
    created_at: "2026-08-12T10:15:00Z",
    views: 512,
    clicks: 210
  },
  {
    id: "prod-3",
    name: "قميص ساتان ناعم بأكمام منفوخة - كريمي",
    price: 4600,
    category_id: "blouses",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=800&fit=crop&auto=format"
    ],
    description: "بلوزة ساتان فاخرة ذات ملمس ناعم جداً على البشرة، مثالية للإطلالات الرسمية واليومية الراقية.",
    in_stock: true,
    is_featured: false,
    created_at: "2026-08-08T09:00:00Z",
    views: 189,
    clicks: 74
  },
  {
    id: "prod-4",
    name: "معطف صوف راقي بتصميم كلاسيكي - بني كشمير",
    price: 16800,
    originalPrice: 19500,
    category_id: "coats",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1548624149-f1af3462b86a?w=800&fit=crop&auto=format"
    ],
    description: "معطف شتوي دافئ وعصري مصمم من أجود أنواع الصوف والكشمير الممزوج لخفة الوزن والدفء المثالي.",
    in_stock: true,
    is_featured: true,
    created_at: "2026-08-05T16:20:00Z",
    views: 620,
    clicks: 195
  },
  {
    id: "prod-5",
    name: "فستان ناعم منسوج بطيات ورسمة دافئة",
    price: 7400,
    category_id: "dresses",
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&fit=crop&auto=format"
    ],
    description: "إطلالة يومية مريحة وأنيقة. فستان بطول ميداني وقماش مرن عالي الجودة متوفر بألوان أرضية هادئة.",
    in_stock: true,
    is_featured: false,
    created_at: "2026-08-11T11:00:00Z",
    views: 245,
    clicks: 88
  },
  {
    id: "prod-6",
    name: "بنطال كلاسيكي بخصر عالٍ وقصة واسعة",
    price: 5200,
    category_id: "pants",
    sizes: ["36", "38", "40", "42", "44"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&fit=crop&auto=format"
    ],
    description: "بنطال رسمي أنيق يمنحك مظهر إطالة وسلاسة بالحركة. القماش لا يتجعد ومناسب للعمل والمناسبات.",
    in_stock: true,
    is_featured: false,
    created_at: "2026-08-01T12:00:00Z",
    views: 198,
    clicks: 65
  },
  {
    id: "prod-7",
    name: "حقيبة يد جلدية فاخرة بمقبض ذهبي - MAISON Edition",
    price: 9800,
    originalPrice: 12000,
    category_id: "accessories",
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&fit=crop&auto=format"
    ],
    description: "حقيبة أنيقة مصممة خصيصاً من الجلد الطبيعي المعالج، مزودة بسلسلة ومقبض من المعدن المقاوم للصدأ باللون الذهبي.",
    in_stock: true,
    is_featured: true,
    created_at: "2026-08-13T08:45:00Z",
    views: 410,
    clicks: 160
  },
  {
    id: "prod-8",
    name: "قفطان عصري بلمسات تقليدية وحزام مجوهر",
    price: 18500,
    category_id: "abayas",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&fit=crop&auto=format"
    ],
    description: "قفطان فاخر يجمع بين الأصالة والعصرية، مزين بتطريز مخملي دقيق على الصدر والأكمام مع حزام مرصع بالأحجار.",
    in_stock: false,
    is_featured: false,
    created_at: "2026-07-28T15:00:00Z",
    views: 380,
    clicks: 110
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-9821",
    product_id: "prod-1",
    product_name: "فستان سهرة حريري بكسرات رفيعة - بيج ملكي",
    product_image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&fit=crop&auto=format",
    price: 8900,
    full_name: "مريم بن ناصر",
    phone: "0554123456",
    wilaya: "16 - الجزائر العاصمة (Algiers)",
    commune: "حيدرة",
    address: "حي سعيد حمدين، عمارة 12، شقة 4",
    size: "M",
    notes: "يرجى الاتصال بي قبل التوصيل بساعة شكراً",
    status: "pending",
    created_at: "2026-08-14T18:20:00Z"
  },
  {
    id: "ORD-9820",
    product_id: "prod-2",
    product_name: "عباية مودرن مطرزة بالخيوط الذهبية",
    product_image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&fit=crop&auto=format",
    price: 12500,
    full_name: "أمينة بوقرة",
    phone: "0661987654",
    wilaya: "31 - وهران (Oran)",
    commune: "بئر الجير",
    address: "حي إيسستو بالقرب من الجامعة",
    size: "L",
    notes: "تأكيد لون التطريز ذهبي دافئ",
    status: "confirmed",
    created_at: "2026-08-14T14:10:00Z"
  },
  {
    id: "ORD-9819",
    product_id: "prod-4",
    product_name: "معطف صوف راقي بتصميم كلاسيكي - بني كشمير",
    product_image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&fit=crop&auto=format",
    price: 16800,
    full_name: "سارة حداد",
    phone: "0770334455",
    wilaya: "25 - قسنطينة (Constantine)",
    commune: "الخروب",
    address: "حي 1000 مسكن، الخروب",
    size: "S",
    notes: "",
    status: "shipped",
    created_at: "2026-08-13T11:45:00Z"
  },
  {
    id: "ORD-9818",
    product_id: "prod-7",
    product_name: "حقيبة يد جلدية فاخرة بمقبض ذهبي - MAISON Edition",
    product_image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&fit=crop&auto=format",
    price: 9800,
    full_name: "ليلى قاسي",
    phone: "0550112233",
    wilaya: "19 - سطيف (Sétif)",
    commune: "العلمة",
    address: "شارع دبي التجاري",
    size: "One Size",
    notes: "التغليف بكتان الهدية المميز لـ MAISON NB",
    status: "delivered",
    created_at: "2026-08-12T09:30:00Z"
  }
];
