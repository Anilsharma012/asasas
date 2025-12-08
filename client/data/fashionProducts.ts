/**
 * Demo Fashion Products Data
 * Used for Marco Fashion brand display
 */

export interface FashionProduct {
  _id: string;
  title: string;
  category: "Men" | "Women" | "Kids";
  price: number;
  images: string[];
  description: string;
  sizes?: string[];
  colors?: string[];
  rating?: number;
  reviews?: number;
}

export const DEMO_FASHION_PRODUCTS: FashionProduct[] = [
  {
    _id: "mf_001",
    title: "Premium Cotton T-Shirt",
    category: "Men",
    price: 499,
    description:
      "Comfortable and stylish 100% cotton t-shirt for everyday wear",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray"],
    rating: 4.5,
    reviews: 234,
  },
  {
    _id: "mf_002",
    title: "Classic Denim Jeans",
    category: "Men",
    price: 1299,
    description: "Stylish and durable denim jeans for a timeless look",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    rating: 4.7,
    reviews: 567,
  },
  {
    _id: "mf_003",
    title: "Formal Shirt",
    category: "Men",
    price: 899,
    description: "Perfect for office and formal occasions",
    images: [
      "https://images.unsplash.com/photo-1596362051929-f8e63c4b5c2e?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue", "Light Pink"],
    rating: 4.6,
    reviews: 189,
  },
  {
    _id: "mf_004",
    title: "Women's Casual Dress",
    category: "Women",
    price: 799,
    description: "Comfortable and fashionable casual dress for everyday wear",
    images: [
      "https://images.unsplash.com/photo-1595777384481-189e3c8a2b61?w=500&h=500&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy", "White"],
    rating: 4.8,
    reviews: 456,
  },
  {
    _id: "mf_005",
    title: "Elegant Saree",
    category: "Women",
    price: 2499,
    description: "Beautiful traditional saree with modern designs",
    images: [
      "https://images.unsplash.com/photo-1630638139973-dddcfaaed454?w=500&h=500&fit=crop",
    ],
    sizes: ["Free Size"],
    colors: ["Maroon", "Gold", "Navy Blue", "Teal"],
    rating: 4.9,
    reviews: 342,
  },
  {
    _id: "mf_006",
    title: "Women's Jeans",
    category: "Women",
    price: 999,
    description: "Trendy and comfortable women's jeans",
    images: [
      "https://images.unsplash.com/photo-1541099810657-a375ab37c47f?w=500&h=500&fit=crop",
    ],
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Dark Blue", "Light Blue", "Black", "Gray"],
    rating: 4.6,
    reviews: 278,
  },
  {
    _id: "mf_007",
    title: "Kids T-Shirt Set",
    category: "Kids",
    price: 349,
    description: "Colorful and comfortable t-shirt set for kids",
    images: [
      "https://images.unsplash.com/photo-1503342394128-c894fdcc4d42?w=500&h=500&fit=crop",
    ],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: ["Red", "Blue", "Yellow", "Green"],
    rating: 4.7,
    reviews: 156,
  },
  {
    _id: "mf_008",
    title: "Kids Casual Wear",
    category: "Kids",
    price: 599,
    description: "Cute and playful casual wear for kids",
    images: [
      "https://images.unsplash.com/photo-1518006675773-f6b0256c8386?w=500&h=500&fit=crop",
    ],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: ["Pink", "Light Blue", "Mint Green"],
    rating: 4.5,
    reviews: 234,
  },
  {
    _id: "mf_009",
    title: "Men's Polo Shirt",
    category: "Men",
    price: 699,
    description: "Stylish polo shirt perfect for casual outings",
    images: [
      "https://images.unsplash.com/photo-1586032615691-cb4c4d21b0ed?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy", "Red"],
    rating: 4.4,
    reviews: 145,
  },
  {
    _id: "mf_010",
    title: "Women's Kurti",
    category: "Women",
    price: 449,
    description: "Traditional ethnic kurti with modern designs",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Orange", "Magenta", "Teal", "Purple"],
    rating: 4.6,
    reviews: 298,
  },
];

/**
 * Get demo products by category
 */
export const getProductsByCategory = (category: "Men" | "Women" | "Kids") => {
  return DEMO_FASHION_PRODUCTS.filter((p) => p.category === category);
};

/**
 * Format price for Indian Rupees
 */
export const formatFashionPrice = (price: number): string => {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lac`;
  } else if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1)}K`;
  }
  return `₹${price}`;
};
