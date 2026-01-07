import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1814] text-[#E5E5E5] pt-16 pb-8 border-t-4 border-[#F9D71C]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🍝</span>
              <span className="text-2xl font-serif font-bold text-white tracking-wide">
                INESA <span className="text-[#F9D71C]">PASTAZ</span>
              </span>
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              Authentic flavors, handmade daily. We bring the soul of Italy straight to your plate in Meerut.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: FaInstagram, link: "#" },
                { icon: FaFacebookF, link: "#" },
                { icon: FaTwitter, link: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F9D71C] hover:text-[#8B5A2B] transition-all duration-300"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:pl-10">
            <h4 className="text-white font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/" className="hover:text-[#F9D71C] transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#F9D71C] transition-colors">Order Online</Link></li>
              <li><Link to="/story" className="hover:text-[#F9D71C] transition-colors">Our Story</Link></li>
              <li><Link to="/menu" className="hover:text-[#F9D71C] transition-colors">Full Menu</Link></li>
              <li><Link to="/contact" className="hover:text-[#F9D71C] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Visit Us */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Visit Us</h4>
            <ul className="space-y-5 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#F9D71C] mt-1 flex-shrink-0" />
                <span>
                  1st Floor, M Seven Complex,<br/>
                  A Block, Pallavpuram,<br/>
                  Meerut, Uttar Pradesh 250110
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#F9D71C] flex-shrink-0" />
                <a href="mailto:inesapastaz@gmail.com" className="hover:text-white transition-colors">
                  inesapastaz@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#F9D71C] flex-shrink-0" />
                <a href="tel:+9188002005227" className="hover:text-white transition-colors">
                  +91 88002005227
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs text-center md:text-left">
            © {currentYear} Inesa Pastaz. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <span>Made with 💛 in Meerut</span>
          </div>
        </div>
      </div>
    </footer>
  );
}