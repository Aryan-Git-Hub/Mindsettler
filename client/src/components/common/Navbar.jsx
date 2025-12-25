import { useState, useEffect } from "react";
import logo from "../../assets/icons/MindsettlerLogo-removebg-preview.png";
import { Link } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls more than 80px, change the theme
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Admin", href: "/admin" },
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
    { name: "Psycho-Education", href: "#" },
    { name: "How it Works", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Corporate Services", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-6 flex justify-center">
      <nav 
        className={`w-full max-w-7xl flex items-center justify-between px-10 py-4 
                    rounded-full transition-all duration-500 ease-in-out
                    ${isScrolled 
                      ? "bg-white/70 backdrop-blur-xl border-black/10 shadow-xl" 
                      : "bg-white/10 backdrop-blur-lg border-white/30 shadow-lg"
                    } border`}
      >
        {/* Brand / Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="MindSettler Logo"
              className={`h-10 w-auto object-contain transition-all duration-500 
                          ${isScrolled ? "brightness-100" : "brightness-125"}`} 
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`text-[15px] font-bold tracking-wide transition-colors duration-300 
                           ${isScrolled 
                             ? "text-[#38352f]" // Dark text for light background
                             : "text-white drop-shadow-md" // White text for dark image
                           } hover:text-[#E83E8C] whitespace-nowrap`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button className={`${isScrolled ? "text-[#38352f]" : "text-white"} transition-colors`}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;