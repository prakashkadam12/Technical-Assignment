import { Input } from "@/components/ui/input";
import avatar from "../assets/Avatar Image.png";
import help from "../assets/help.png";
import message from "../assets/message.png";
import setting from "../assets/settings.png";
import notification from "../assets/Notification.png";
import search from "../assets/Search (1).png";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');
      if (
        isMenuOpen &&
        menu &&
        !menu.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="relative bg-[#E9EDF1] w-full max-w-[1176px] shadow-sm">
      <div className="flex flex-col md:flex-row md:h-[48px] items-center justify-between px-4 md:px-1 py-4 md:py-0">
        {/* Menu Button */}
        <button 
          id="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute right-1 top-4 md:hidden z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-4 h-4 text-gray-600" />
          ) : (
            <Menu className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Search Bar */}
        <div className="flex items-center w-[250px] md:w-[614px] md:h-full md:mt-4 mr-4">
          <div className="relative w-full">
            <img
              src={search}
              alt="Search Icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search your course"
              className="w-full h-[40px] pl-12 text-sm bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Section - Desktop & Mobile */}
        <div
          id="mobile-menu"
          className={`
            ${isMenuOpen ? 'flex' : 'hidden md:flex'}
            flex-col md:flex-row items-center gap-6 md:gap-10
            w-full md:w-auto mt-4 md:mt-4
            ${isMobile ? 'absolute top-16 left-0 bg-[#E9EDF1] p-4 shadow-lg z-40' : ''}
            transition-all duration-300 ease-in-out
          `}
        >
          {/* Icons Container */}
          <div className="flex items-center justify-center md:justify-start gap-8 w-full md:w-auto">
            <img
              src={help}
              alt="Help Icon"
              className="w-[24px] h-[24px] cursor-pointer hover:opacity-80 transition-opacity"
            />
            <div className="relative">
              <img
                src={message}
                alt="Message Icon"
                className="w-[24px] h-[24px] cursor-pointer hover:opacity-80 transition-opacity"
              />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </div>
            <img
              src={setting}
              alt="Settings Icon"
              className="w-[24px] h-[24px] cursor-pointer hover:opacity-80 transition-opacity"
            />
            <div className="relative">
              <img
                src={notification}
                alt="Notification Icon"
                className="w-[24px] h-[24px] cursor-pointer hover:opacity-80 transition-opacity"
              />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-[40px] h-[40px] object-cover rounded-lg border-2 border-white"
            />
            <span className="text-base font-semibold text-[#05162E]">
              Adeline H. Dancy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}