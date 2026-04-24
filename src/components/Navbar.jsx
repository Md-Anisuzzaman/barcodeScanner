import  { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Invoice", path: "/invoice" },
  { name: "Order", path: "/order" },
  { name: "Products", path: "/products" },
  { name: "Profile", path: "/profile" },
  { name: "Create Order", path: "/create-order" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-black tracking-tighter text-xl">
              ETHIAN<span className="text-indigo-500">POS</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
              >
                {item.name}
              </Link>
            ))}
            <button className="ml-4 flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 border-t border-zinc-800" : "max-h-0 opacity-0 overflow-hidden"
        } bg-zinc-900`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 active:bg-indigo-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-zinc-800">
            <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;