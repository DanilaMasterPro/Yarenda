"use client";

import { Search, Menu, User, Heart, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { AuthModal } from "../modals/AuthModal";
import { LocationModal } from "../modals/LocationModal";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";
import Link from "next/link";

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 flex-shrink-0"
            >
              Яренда
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <SearchBar onLocationClick={() => setShowLocationModal(true)} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                href="/catalog"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Каталог
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Категории
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center md:space-x-3 flex-shrink-0">
              <Button
                onClick={() => setShowLocationModal(true)}
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAuthModal(true)}
                className="hidden lg:flex"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button variant="primary" className="hidden lg:flex">
                Разместить объявление
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowMobileMenu(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      <LocationModal
        open={showLocationModal}
        onOpenChange={setShowLocationModal}
      />
      <MobileMenu
        open={showMobileMenu}
        onOpenChange={setShowMobileMenu}
        onAuthClick={() => setShowAuthModal(true)}
      />
    </>
  );
}
