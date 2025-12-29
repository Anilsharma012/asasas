/**
 * Marco Fashion - Embedded Product Database
 * No external API/MongoDB required - all data is local
 * Perfect for standalone .zip distribution and shared hosting
 */

export interface LocalProduct {
  id: string;
  title: string;
  category: "Men" | "Women" | "Kids";
  subcategory: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  stock: number;
  sku: string;
}

export interface LocalCategory {
  id: string;
  name: "Men" | "Women" | "Kids";
  slug: string;
  icon: string;
  description: string;
}

// Men's Fashion Products
const mensProducts: LocalProduct[] = [
  {
    id: "mens-001",
    title: "Premium Cotton T-Shirt",
    category: "Men",
    subcategory: "T-Shirts",
    price: 499,
    description:
      "Comfortable 100% cotton t-shirt perfect for everyday wear. Available in multiple colors.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray", "Maroon"],
    rating: 4.5,
    reviews: 234,
    stock: 50,
    sku: "MCFT-001",
  },
  {
    id: "mens-002",
    title: "Classic Denim Jeans",
    category: "Men",
    subcategory: "Pants",
    price: 1299,
    description:
      "Stylish and durable denim jeans with perfect fit. Timeless design for all occasions.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Dark Blue", "Light Blue", "Black", "Indigo"],
    rating: 4.7,
    reviews: 567,
    stock: 40,
    sku: "MCJN-002",
  },
  {
    id: "mens-003",
    title: "Formal Shirt",
    category: "Men",
    subcategory: "Shirts",
    price: 899,
    description:
      "Perfect formal shirt for office and formal occasions. Premium quality fabric.",
    images: [
      "https://images.unsplash.com/photo-1596362051929-f8e63c4b5c2e?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink", "Light Yellow"],
    rating: 4.6,
    reviews: 189,
    stock: 35,
    sku: "MCFS-003",
  },
  {
    id: "mens-004",
    title: "Casual Polo Shirt",
    category: "Men",
    subcategory: "T-Shirts",
    price: 699,
    description:
      "Versatile polo shirt perfect for casual outings. Comfortable and stylish.",
    images: [
      "https://images.unsplash.com/photo-1586032615691-cb4c4d21b0ed?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy", "Red", "Green"],
    rating: 4.4,
    reviews: 145,
    stock: 42,
    sku: "MCPS-004",
  },
  {
    id: "mens-005",
    title: "Crew Neck Sweater",
    category: "Men",
    subcategory: "Shirts",
    price: 1199,
    description:
      "Warm and cozy crew neck sweater. Perfect for winter season. Premium knit fabric.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc5052dd3c7?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Brown", "Navy", "Cream"],
    rating: 4.8,
    reviews: 98,
    stock: 28,
    sku: "MCSW-005",
  },
];

// Women's Fashion Products
const womensProducts: LocalProduct[] = [
  {
    id: "womens-001",
    title: "Casual Dress",
    category: "Women",
    subcategory: "Dresses",
    price: 799,
    description:
      "Comfortable and fashionable casual dress perfect for everyday wear. Lightweight and breathable.",
    images: [
      "https://images.unsplash.com/photo-1595777384481-189e3c8a2b61?w=500&h=500&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy", "White", "Teal"],
    rating: 4.8,
    reviews: 456,
    stock: 60,
    sku: "MCWD-001",
  },
  {
    id: "womens-002",
    title: "Elegant Saree",
    category: "Women",
    subcategory: "Sarees",
    price: 2499,
    description:
      "Beautiful traditional saree with modern designs. Perfect for festivals and special occasions.",
    images: [
      "https://images.unsplash.com/photo-1630638139973-dddcfaaed454?w=500&h=500&fit=crop",
    ],
    sizes: ["Free Size"],
    colors: ["Maroon", "Gold", "Navy Blue", "Teal", "Magenta"],
    rating: 4.9,
    reviews: 342,
    stock: 25,
    sku: "MCWS-002",
  },
  {
    id: "womens-003",
    title: "Denim Jeans",
    category: "Women",
    subcategory: "Jeans",
    price: 999,
    description:
      "Trendy and comfortable women's jeans. Perfect fit for everyday styling.",
    images: [
      "https://images.unsplash.com/photo-1541099810657-a375ab37c47f?w=500&h=500&fit=crop",
    ],
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Dark Blue", "Light Blue", "Black", "Gray"],
    rating: 4.6,
    reviews: 278,
    stock: 45,
    sku: "MCWJ-003",
  },
  {
    id: "womens-004",
    title: "Traditional Kurti",
    category: "Women",
    subcategory: "Ethnic Wear",
    price: 449,
    description:
      "Traditional ethnic kurti with modern designs. Comfortable for daily wear.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Orange", "Magenta", "Teal", "Purple", "Red"],
    rating: 4.6,
    reviews: 298,
    stock: 50,
    sku: "MCWK-004",
  },
  {
    id: "womens-005",
    title: "Summer Blouse",
    category: "Women",
    subcategory: "Tops",
    price: 599,
    description:
      "Lightweight summer blouse perfect for warm weather. Stylish and comfortable.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Cream", "Peach", "Mint Green", "Lavender"],
    rating: 4.5,
    reviews: 187,
    stock: 55,
    sku: "MCWB-005",
  },
];

// Kids' Fashion Products
const kidsProducts: LocalProduct[] = [
  {
    id: "kids-001",
    title: "T-Shirt Set",
    category: "Kids",
    subcategory: "T-Shirts",
    price: 349,
    description:
      "Colorful and comfortable t-shirt set for kids. Perfect for play and school.",
    images: [
      "https://images.unsplash.com/photo-1503342394128-c894fdcc4d42?w=500&h=500&fit=crop",
    ],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: ["Red", "Blue", "Yellow", "Green", "Orange"],
    rating: 4.7,
    reviews: 156,
    stock: 55,
    sku: "MCKT-001",
  },
  {
    id: "kids-002",
    title: "Casual Wear Set",
    category: "Kids",
    subcategory: "Casual",
    price: 599,
    description:
      "Cute and playful casual wear set for kids. Comfortable for all-day wear.",
    images: [
      "https://images.unsplash.com/photo-1518006675773-f6b0256c8386?w=500&h=500&fit=crop",
    ],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: ["Pink", "Light Blue", "Mint Green", "Purple"],
    rating: 4.5,
    reviews: 234,
    stock: 38,
    sku: "MCKC-002",
  },
  {
    id: "kids-003",
    title: "School Uniform Shirt",
    category: "Kids",
    subcategory: "Formal",
    price: 299,
    description: "Formal school uniform shirt. Durable and easy to wash.",
    images: [
      "https://images.unsplash.com/photo-1519238263670-15267080fe83?w=500&h=500&fit=crop",
    ],
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y", "14Y"],
    colors: ["White", "Light Blue", "Light Pink"],
    rating: 4.6,
    reviews: 112,
    stock: 72,
    sku: "MCKF-003",
  },
  {
    id: "kids-004",
    title: "Sports Jersey",
    category: "Kids",
    subcategory: "Sports",
    price: 449,
    description:
      "Breathable sports jersey for active kids. Perfect for sports activities.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
    ],
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: ["Red", "Blue", "Yellow", "Green", "Black"],
    rating: 4.7,
    reviews: 98,
    stock: 45,
    sku: "MCKJ-004",
  },
  {
    id: "kids-005",
    title: "Printed Cotton Shirt",
    category: "Kids",
    subcategory: "T-Shirts",
    price: 279,
    description:
      "Fun printed cotton shirt with colorful designs. Great for casual wear.",
    images: [
      "https://images.unsplash.com/photo-1522862696474-59e4a7b8f03f?w=500&h=500&fit=crop",
    ],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: ["Multi-color", "Cyan", "Pink"],
    rating: 4.6,
    reviews: 145,
    stock: 48,
    sku: "MCKP-005",
  },
];

// Fashion Categories
export const localCategories: LocalCategory[] = [
  {
    id: "cat-001",
    name: "Men",
    slug: "men",
    icon: "👨",
    description: "Men's Fashion Collection - Quality clothing for every style",
  },
  {
    id: "cat-002",
    name: "Women",
    slug: "women",
    icon: "👩",
    description: "Women's Fashion Collection - Elegant and trendy designs",
  },
  {
    id: "cat-003",
    name: "Kids",
    slug: "kids",
    icon: "👶",
    description: "Kids' Fashion Collection - Comfortable and fun clothing",
  },
];

// Combine all products
export const allProducts: LocalProduct[] = [
  ...mensProducts,
  ...womensProducts,
  ...kidsProducts,
];

/**
 * Get products by category
 */
export function getProductsByCategory(category: "Men" | "Women" | "Kids") {
  return allProducts.filter((p) => p.category === category);
}

/**
 * Get products by ID
 */
export function getProductById(id: string) {
  return allProducts.find((p) => p.id === id);
}

/**
 * Get related products (same category, exclude current product)
 */
export function getRelatedProducts(
  productId: string,
  limit: number = 4,
): LocalProduct[] {
  const product = getProductById(productId);
  if (!product) return [];

  return getProductsByCategory(product.category)
    .filter((p) => p.id !== productId)
    .slice(0, limit);
}

/**
 * Get all products with search
 */
export function searchProducts(
  query: string,
  category?: "Men" | "Women" | "Kids",
): LocalProduct[] {
  const lower = query.toLowerCase();
  let results = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.subcategory.toLowerCase().includes(lower),
  );

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  return results;
}

/**
 * Format price for Indian Rupees
 */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}
