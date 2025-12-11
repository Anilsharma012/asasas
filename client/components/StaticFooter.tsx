import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Calendar,
  Grid3X3,
} from "lucide-react";
import FooterPackages from "./FooterPackages";
import CategoryDrawer from "./CategoryDrawer";
import { ASHISH_LOGO_URL, APP_NAME } from "../lib/constants";

export default function StaticFooter() {
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  return (
    <footer className="bg-gradient-to-r from-pink-500 to-purple-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={ASHISH_LOGO_URL}
                alt={APP_NAME}
                className="h-16 w-auto"
              />
              <h3 className="text-2xl font-bold">{APP_NAME}</h3>
            </div>

            <p className="text-pink-100 text-sm leading-relaxed">
              Discover Marco Fashion - Your premier destination for stylish, quality clothing for the entire family.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/aashishproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/aashishproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/aashishproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/aashishproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>9896095599</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>sales@ashishproperties.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Rohtak, Haryana, India</span>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Shop by Category</h4>
            <ul className="space-y-3">
              {[
                { name: "Men's Fashion", path: "/men" },
                { name: "Women's Fashion", path: "/women" },
                { name: "Kids' Fashion", path: "/kids" },
                { name: "New Arrivals", path: "/men" },
                { name: "Sale Items", path: "/women" },
                { name: "Best Sellers", path: "/kids" },
              ].map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="text-pink-200 hover:text-white transition-colors duration-200 text-sm flex items-center"
                  >
                    👗 {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/men"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/women"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/kids"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Kids' Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/fashion"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Admin Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Fashion Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about-us"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  About Marco Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/p/privacy-policy"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/p/terms-conditions"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/support/help"
                  className="text-pink-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Packages */}
        <FooterPackages />

        {/* Bottom Bar */}
        <div className="border-t border-pink-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>
                All rights reserved © 2024-{new Date().getFullYear()} Marco Fashion
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-pink-200">
              <span>Premium Fashion Edition</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Categories Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsCategoryDrawerOpen(true)}
          data-testid="footer-cats"
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-sm font-medium"
        >
          <Grid3X3 className="w-4 h-4" />
          <span>Collections</span>
        </button>
      </div>

      {/* Category Drawer */}
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        onClose={() => setIsCategoryDrawerOpen(false)}
      />
    </footer>
  );
}
