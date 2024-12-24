import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import logo from "../assets/logo (2).png";
import dashboard from "../assets/Dashboard.png";
import student from "../assets/student.png";
import chapter from "../assets/Chapter.png";
import help from "../assets/help.png";
import reports from "../assets/Report.png";
import settings from "../assets/setting.png";

const menuItems = [
  { icon: dashboard, label: "Dashboard", href: "#" },
  { icon: student, label: "Students", href: "#", active: true },
  { icon: chapter, label: "Chapter", href: "#" },
  { icon: help, label: "Help", href: "#" },
  { icon: reports, label: "Reports", href: "#" },
  { icon: settings, label: "Settings", href: "#" },
];

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 ml-[-10px] bg-white shadow-md"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed lg:static inset-y-0 left-0 w-[248px] bg-white z-50 border-r border-gray-200 lg:translate-x-0 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6">
          <img src={logo} alt="Quyl Logo" className="w-[98px] h-[42px]" />
        </div>

        {/* Menu Items */}
        <nav className="flex-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 ${
                item.active ? 'bg-gray-100 text-black font-medium' : 'text-gray-600'
              }`}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
