import React from "react";
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

export default function MindSettlerFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main content spacer */}
      <div className="grow"></div>

      {/* Footer */}
      <footer className="bg-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                MINDSETTLER
              </h2>
              <p className="text-[#Dd1764] text-sm mb-6">
                Navigate Life with Confidence
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About Us
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                An online psycho-education and mental well-being platform
                helping individuals understand their mental health through
                structured sessions in a safe, confidential environment.
              </p>
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Services
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <span>Online Sessions</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <span>Offline Sessions</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <span>Psycho-Education</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <span>Mental Health Guidance</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <span>Personalized Support</span>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <a
                    href="#"
                    className="hover:text-[#Dd1764] transition-colors"
                  >
                    Who We Are
                  </a>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <a
                    href="#"
                    className="hover:text-[#Dd1764] transition-colors"
                  >
                    Our Services
                  </a>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <a
                    href="#"
                    className="hover:text-[#Dd1764] transition-colors"
                  >
                    Our Clients
                  </a>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <a
                    href="#"
                    className="hover:text-[#Dd1764] transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <span className="mr-2">→</span>
                  <a
                    href="#"
                    className="hover:text-[#Dd1764] transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact us
              </h3>

              <div className="mb-4">
                <p className="text-gray-900 font-medium text-sm mb-1">Call:</p>
                <p className="text-gray-600 text-sm">+0123 456 789 00</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-900 font-medium text-sm mb-1">Email:</p>
                <p className="text-gray-600 text-sm">user@example.com</p>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-gray-900 font-semibold mb-3">Follow Us</p>
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-[#Dd1764] flex items-center justify-center text-white hover:bg-[#c01356] transition-colors"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400 transition-colors"
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400 transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400 transition-colors"
                  >
                    <Youtube size={16} />
                  </a>
                  <a 
                    href="https://www.instagram.com/mindsettlerbypb/"
                    className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400 transition-colors"
                    target="_blank"
                  >
                    <Instagram size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#1a1a2e] text-white py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex flex-wrap gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">
                Non-Refund Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">
                Confidentiality Policy
              </a>
            </div>
            <p className="text-gray-400">
              © {currentYear} MindSettler. All images are for demo purposes
              only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
