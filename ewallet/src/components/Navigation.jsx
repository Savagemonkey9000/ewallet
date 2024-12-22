import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaWallet, FaCreditCard } from "react-icons/fa";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", icon: FaWallet, label: "Wallet" },
    { path: "/addcard", icon: FaCreditCard, label: "Add Card" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-sm border-t border-gray-200 md:top-0 md:bottom-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around md:justify-end md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 md:py-4 transition-colors ${
                isActive(item.path)
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
