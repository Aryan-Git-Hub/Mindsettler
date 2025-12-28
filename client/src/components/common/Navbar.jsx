import { useState, useEffect } from "react";
import logo from "../../assets/icons/MindsettlerLogo-removebg-preview.png";
import { Link, NavLink } from "react-router"; // Use NavLink for active state detection
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use useMemo or define inside to avoid mutation issues during re-renders
  const baseLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Booking", href: "/booking" },
    { name: "Psycho-Education", href: "/education" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Resources", href: "/resources" },
    { name: "Corporate Services", href: "/corporate" },
    { name: "Contact", href: "/contact" },
  ];

  const navLinks = [...baseLinks];
  if (!user) {
    navLinks.push({ name: "Login", href: "/auth" });
  } else {
    if (user.role === "admin") navLinks.push({ name: "Admin", href: "/admin" });
    navLinks.push({ name: "Logout", href: "/logout" });
  }

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-6 flex justify-center">
      <nav 
        className={`w-full max-w-7xl flex items-center justify-between px-10 py-4 
                    rounded-full transition-all duration-500 ease-in-out
                    ${isScrolled 
                      ? "bg-white/70 backdrop-blur-xl border-black/10 shadow-xl" 
                      : "bg-white/10 backdrop-blur-lg border-white/30 shadow-lg"
                    }`}
      >
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

        <ul className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group py-1">
              <NavLink
                to={link.href}
                className={({ isActive }) => `
                  text-[15px] font-bold tracking-wide transition-all duration-300 whitespace-nowrap
                  ${isScrolled ? "text-[#583f7a]" : "text-[#e04073]"}
                  ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}
                `}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {/* The Underline: Shows if Active OR on Hover */}
                    <span 
                      className={`absolute bottom-0 left-0 h-[2.5px] bg-current transition-all duration-300 ease-in-out
                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button className={`${isScrolled ? "text-[#38352f]" : "text-white"}`}>
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