/**
 * Fashion Products API Routes
 * Handles CRUD operations for Marco Fashion products, categories, and banners
 */

import { RequestHandler } from "express";
import { getDatabase } from "../db/mongodb";
import { ObjectId } from "mongodb";

// ============================================================================
// DEMO DATA
// ============================================================================

const DEMO_CATEGORIES = [
  {
    _id: new ObjectId(),
    name: "Men",
    slug: "men",
    icon: "👨",
    description: "Men's Fashion Collection",
    isActive: true,
    sortOrder: 1,
    subcategories: [
      {
        name: "Shirts",
        slug: "shirts",
        description: "Men's Shirts",
        isActive: true,
      },
      {
        name: "Pants",
        slug: "pants",
        description: "Men's Pants",
        isActive: true,
      },
      {
        name: "T-Shirts",
        slug: "t-shirts",
        description: "Men's T-Shirts",
        isActive: true,
      },
    ],
  },
  {
    _id: new ObjectId(),
    name: "Women",
    slug: "women",
    icon: "👩",
    description: "Women's Fashion Collection",
    isActive: true,
    sortOrder: 2,
    subcategories: [
      {
        name: "Sarees",
        slug: "sarees",
        description: "Women's Sarees",
        isActive: true,
      },
      {
        name: "Kurtis",
        slug: "kurtis",
        description: "Women's Kurtis",
        isActive: true,
      },
      {
        name: "Jeans",
        slug: "jeans",
        description: "Women's Jeans",
        isActive: true,
      },
    ],
  },
  {
    _id: new ObjectId(),
    name: "Kids",
    slug: "kids",
    icon: "👶",
    description: "Kids Fashion Collection",
    isActive: true,
    sortOrder: 3,
    subcategories: [
      {
        name: "T-Shirts",
        slug: "t-shirts",
        description: "Kids T-Shirts",
        isActive: true,
      },
      {
        name: "Casual Wear",
        slug: "casual-wear",
        description: "Kids Casual Wear",
        isActive: true,
      },
    ],
  },
];

const DEMO_PRODUCTS = [
  {
    _id: new ObjectId(),
    title: "Premium Cotton T-Shirt",
    category: "Men",
    categoryId: DEMO_CATEGORIES[0]._id,
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
    stock: 50,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Classic Denim Jeans",
    category: "Men",
    categoryId: DEMO_CATEGORIES[0]._id,
    price: 1299,
    description: "Stylish and durable denim jeans for a timeless look",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    rating: 4.7,
    reviews: 567,
    stock: 40,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Formal Shirt",
    category: "Men",
    categoryId: DEMO_CATEGORIES[0]._id,
    price: 899,
    description: "Perfect for office and formal occasions",
    images: [
      "https://images.unsplash.com/photo-1596362051929-f8e63c4b5c2e?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue", "Light Pink"],
    rating: 4.6,
    reviews: 189,
    stock: 35,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Women's Casual Dress",
    category: "Women",
    categoryId: DEMO_CATEGORIES[1]._id,
    price: 799,
    description: "Comfortable and fashionable casual dress for everyday wear",
    images: [
      "https://images.unsplash.com/photo-1595777384481-189e3c8a2b61?w=500&h=500&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy", "White"],
    rating: 4.8,
    reviews: 456,
    stock: 60,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Elegant Saree",
    category: "Women",
    categoryId: DEMO_CATEGORIES[1]._id,
    price: 2499,
    description: "Beautiful traditional saree with modern designs",
    images: [
      "https://images.unsplash.com/photo-1630638139973-dddcfaaed454?w=500&h=500&fit=crop",
    ],
    sizes: ["Free Size"],
    colors: ["Maroon", "Gold", "Navy Blue", "Teal"],
    rating: 4.9,
    reviews: 342,
    stock: 25,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Women's Jeans",
    category: "Women",
    categoryId: DEMO_CATEGORIES[1]._id,
    price: 999,
    description: "Trendy and comfortable women's jeans",
    images: [
      "https://images.unsplash.com/photo-1541099810657-a375ab37c47f?w=500&h=500&fit=crop",
    ],
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Dark Blue", "Light Blue", "Black", "Gray"],
    rating: 4.6,
    reviews: 278,
    stock: 45,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Kids T-Shirt Set",
    category: "Kids",
    categoryId: DEMO_CATEGORIES[2]._id,
    price: 349,
    description: "Colorful and comfortable t-shirt set for kids",
    images: [
      "https://images.unsplash.com/photo-1503342394128-c894fdcc4d42?w=500&h=500&fit=crop",
    ],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: ["Red", "Blue", "Yellow", "Green"],
    rating: 4.7,
    reviews: 156,
    stock: 55,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Kids Casual Wear",
    category: "Kids",
    categoryId: DEMO_CATEGORIES[2]._id,
    price: 599,
    description: "Cute and playful casual wear for kids",
    images: [
      "https://images.unsplash.com/photo-1518006675773-f6b0256c8386?w=500&h=500&fit=crop",
    ],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: ["Pink", "Light Blue", "Mint Green"],
    rating: 4.5,
    reviews: 234,
    stock: 38,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Men's Polo Shirt",
    category: "Men",
    categoryId: DEMO_CATEGORIES[0]._id,
    price: 699,
    description: "Stylish polo shirt perfect for casual outings",
    images: [
      "https://images.unsplash.com/photo-1586032615691-cb4c4d21b0ed?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy", "Red"],
    rating: 4.4,
    reviews: 145,
    stock: 42,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Women's Kurti",
    category: "Women",
    categoryId: DEMO_CATEGORIES[1]._id,
    price: 449,
    description: "Traditional ethnic kurti with modern designs",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Orange", "Magenta", "Teal", "Purple"],
    rating: 4.6,
    reviews: 298,
    stock: 50,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const DEMO_BANNERS = [
  {
    _id: new ObjectId(),
    title: "Marco Fashion Sale",
    subtitle: "Up to 50% OFF on selected items",
    imageUrl:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&h=400&fit=crop",
    position: "homepage_hero",
    link: "/men",
    isActive: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Summer Collection",
    subtitle: "New arrivals for summer season",
    imageUrl:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=400&fit=crop",
    position: "homepage_hero",
    link: "/women",
    isActive: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Kids Special",
    subtitle: "Comfortable and stylish kids wear",
    imageUrl:
      "https://images.unsplash.com/photo-1518006675773-f6b0256c8386?w=1200&h=400&fit=crop",
    position: "homepage_hero",
    link: "/kids",
    isActive: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ============================================================================
// INITIALIZATION
// ============================================================================

export const initializeFashionData: RequestHandler = async (req, res) => {
  try {
    const db = getDatabase();
    const { force } = req.query;

    // Check if data already exists
    const existingCategories = await db
      .collection("fashion_categories")
      .countDocuments();
    if (existingCategories > 0 && force !== "true") {
      return res.status(200).json({
        success: true,
        message:
          "Fashion data already initialized. Use ?force=true to reinitialize",
        data: {
          categories: existingCategories,
        },
      });
    }

    // Clear existing data if force=true
    if (force === "true") {
      await db.collection("fashion_categories").deleteMany({});
      await db.collection("fashion_products").deleteMany({});
      await db.collection("fashion_banners").deleteMany({});
    }

    // Create indexes
    await db
      .collection("fashion_categories")
      .createIndex({ slug: 1 }, { unique: true });
    await db.collection("fashion_products").createIndex({ category: 1 });
    await db.collection("fashion_products").createIndex({ isActive: 1 });

    // Insert categories
    const categoriesResult = await db
      .collection("fashion_categories")
      .insertMany(DEMO_CATEGORIES);
    console.log(`✅ Inserted ${categoriesResult.insertedCount} categories`);

    // Insert products
    const productsResult = await db
      .collection("fashion_products")
      .insertMany(DEMO_PRODUCTS);
    console.log(`✅ Inserted ${productsResult.insertedCount} products`);

    // Insert banners
    const bannersResult = await db
      .collection("fashion_banners")
      .insertMany(DEMO_BANNERS);
    console.log(`✅ Inserted ${bannersResult.insertedCount} banners`);

    res.json({
      success: true,
      message: "Fashion data initialized successfully",
      data: {
        categories: categoriesResult.insertedCount,
        products: productsResult.insertedCount,
        banners: bannersResult.insertedCount,
      },
    });
  } catch (error) {
    console.error("Error initializing fashion data:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ============================================================================
// GET PRODUCTS
// ============================================================================

export const getFashionProducts: RequestHandler = async (req, res) => {
  try {
    const db = getDatabase();
    const { category, active, limit = 20, skip = 0 } = req.query;

    const filter: any = {};
    if (active === "true") {
      filter.isActive = true;
    }
    if (category && category !== "all") {
      filter.category = category;
    }

    const products = await db
      .collection("fashion_products")
      .find(filter)
      .limit(Number(limit))
      .skip(Number(skip))
      .toArray();

    const total = await db
      .collection("fashion_products")
      .countDocuments(filter);

    res.json({
      success: true,
      data: products,
      total,
      limit: Number(limit),
      skip: Number(skip),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ============================================================================
// GET CATEGORIES
// ============================================================================

export const getFashionCategories: RequestHandler = async (req, res) => {
  try {
    const db = getDatabase();
    const { active } = req.query;

    const filter: any = {};
    if (active === "true") {
      filter.isActive = true;
    }

    const categories = await db
      .collection("fashion_categories")
      .find(filter)
      .sort({ sortOrder: 1 })
      .toArray();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ============================================================================
// GET BANNERS
// ============================================================================

export const getFashionBanners: RequestHandler = async (req, res) => {
  try {
    const db = getDatabase();
    const { position, active } = req.query;

    const filter: any = {};
    if (position) {
      filter.position = position;
    }
    if (active === "true") {
      filter.isActive = true;
    }

    const banners = await db
      .collection("fashion_banners")
      .find(filter)
      .sort({ order: 1 })
      .toArray();

    res.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ============================================================================
// CREATE PRODUCT (ADMIN)
// ============================================================================

export const createFashionProduct: RequestHandler = async (req, res) => {
  try {
    const db = getDatabase();
    const product = req.body;

    if (!product.title || !product.category || !product.price) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: title, category, price",
      });
    }

    const result = await db.collection("fashion_products").insertOne({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });

    res.status(201).json({
      success: true,
      data: { _id: result.insertedId, ...product },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ============================================================================
// UPDATE PRODUCT (ADMIN)
// ============================================================================

export const updateFashionProduct: RequestHandler = async (req, res) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    const updates = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID",
      });
    }

    const result = await db.collection("fashion_products").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    if (!result.value) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.json({
      success: true,
      data: result.value,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ============================================================================
// DELETE PRODUCT (ADMIN)
// ============================================================================

export const deleteFashionProduct: RequestHandler = async (req, res) => {
  try {
    const db = getDatabase();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID",
      });
    }

    const result = await db
      .collection("fashion_products")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
