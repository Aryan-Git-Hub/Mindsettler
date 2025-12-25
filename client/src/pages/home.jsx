import logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import JourneySection from "../components/journey/JourneySection";
import HeroSection from "../components/hero/HeroSection";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Psycho-Education", href: "#" },
    { name: "How it Works", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Corporate Services", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-3 bg-transparent transition-all duration-300">
      {/* Brand / Logo Section */}
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <img
            src={logo}
            alt="MindSettler Logo"
            className="h-12 w-auto object-contain"
            /* h-12 (48px) allows the "by Parnika" text to stay clear */
          />
        </a>
      </div>

      {/* Navigation Links */}
      <ul className="hidden lg:flex items-center space-x-6 ">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-black/80 drop-shadow-md hover:text-[#E83E8C] transition-colors duration-200 text-md font-medium whitespace-nowrap"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button className="text-[#3A3267] p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Navbar />
      <HeroSection />
      <JourneySection />
    </div>
  );
}

export default Home;
