import { Search, Menu, User, Heart, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { AuthModal } from "./modals/AuthModal";
import { LocationModal } from "./modals/LocationModal";
import { Link } from "react-router";

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-gray-900 flex-shrink-0">
              Яренда
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="w-full flex items-center bg-gray-50 rounded-full border border-gray-200 hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setShowLocationModal(true)}
                  className="flex items-center gap-2 px-6 py-3 border-r border-gray-200 hover:bg-gray-100 rounded-l-full transition-colors"
                >
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700 font-medium">Где?</span>
                </button>
                <Input
                  type="text"
                  placeholder="Что вы ищете?"
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm px-6"
                />
                <Button 
                  size="icon"
                  className="bg-yellow-500 hover:bg-yellow-600 text-dark-500 rounded-full m-1.5 h-10 w-10"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/catalog" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                Каталог
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                Категории
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowAuthModal(true)}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button className="hidden lg:flex bg-yellow-500 hover:bg-yellow-600 text-dark-500">
                Разместить объявление
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      <LocationModal open={showLocationModal} onOpenChange={setShowLocationModal} />
    </>
  );
}