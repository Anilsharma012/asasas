import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  AlertCircle,
  CheckCircle,
  Upload,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  isActive: boolean;
  images: string[];
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

export default function FashionAdmin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showInitializeAlert, setShowInitializeAlert] = useState(false);
  const [initializeLoading, setInitializeLoading] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    category: "Men",
    price: 0,
    description: "",
    stock: 0,
  });

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const categoriesRes = await api.get("fashion/categories");
        if (categoriesRes?.data?.success) {
          setCategories(categoriesRes.data.data);
        }

        // Fetch products
        const productsRes = await api.get("fashion/products?active=true");
        if (productsRes?.data?.success) {
          setProducts(productsRes.data.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setShowInitializeAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Initialize fashion data
  const handleInitializeData = async () => {
    try {
      setInitializeLoading(true);
      const response = await api.post("admin/fashion/initialize?force=true");
      if (response?.data?.success) {
        alert("✅ Fashion data initialized successfully!");
        setShowInitializeAlert(false);
        // Refresh data
        window.location.reload();
      }
    } catch (err) {
      console.error("Error initializing data:", err);
      alert("❌ Failed to initialize data");
    } finally {
      setInitializeLoading(false);
    }
  };

  // Save product (create or update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.category || !formData.price) {
        alert("Please fill in all required fields");
        return;
      }

      let response;
      if (editingProductId) {
        // Update
        response = await api.put(
          `admin/fashion/products/${editingProductId}`,
          formData,
        );
      } else {
        // Create
        response = await api.post("admin/fashion/products", formData);
      }

      if (response?.data?.success) {
        alert(
          `✅ Product ${editingProductId ? "updated" : "created"} successfully!`,
        );
        setFormData({
          title: "",
          category: "Men",
          price: 0,
          description: "",
          stock: 0,
        });
        setIsEditingProduct(false);
        setEditingProductId(null);
        // Refresh products
        const productsRes = await api.get("fashion/products?active=true");
        if (productsRes?.data?.success) {
          setProducts(productsRes.data.data);
        }
      }
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product");
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await api.delete(`admin/fashion/products/${productId}`);
      if (response?.data?.success) {
        alert("✅ Product deleted successfully!");
        setProducts(products.filter((p) => p._id !== productId));
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  // Edit product
  const handleEditProduct = (product: Product) => {
    setEditingProductId(product._id);
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price,
      description: product.description,
      stock: product.stock,
    });
    setIsEditingProduct(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditingProduct(false);
    setEditingProductId(null);
    setFormData({
      title: "",
      category: "Men",
      price: 0,
      description: "",
      stock: 0,
    });
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fashion products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/admin")}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold">👗 Marco Fashion Admin</h1>
          </div>
          <p className="text-white/90">
            Manage products, categories, and inventory
          </p>
        </div>
      </div>

      {/* Initialize Alert */}
      {showInitializeAlert && (
        <div className="bg-yellow-50 border border-yellow-200 m-4 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={20}
              className="text-yellow-600 mt-1 flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">
                Initialize Fashion Data
              </h3>
              <p className="text-sm text-yellow-800 mb-3">
                The fashion product database appears to be empty. Click the
                button below to initialize with demo data.
              </p>
              <Button
                onClick={handleInitializeData}
                disabled={initializeLoading}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                {initializeLoading ? "Initializing..." : "Initialize Demo Data"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Product Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., Premium Cotton T-Shirt"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category || "Men"}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="499"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  value={formData.stock || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Product description..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2"
              >
                <Plus size={16} />
                {isEditingProduct ? "Update Product" : "Add Product"}
              </Button>
              {isEditingProduct && (
                <Button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="text-sm text-gray-600 py-2">
              Found {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No products found. Create one to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {product.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {product.isActive ? (
                          <div className="flex items-center gap-1 text-green-700">
                            <CheckCircle size={16} />
                            <span className="text-sm">Active</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
