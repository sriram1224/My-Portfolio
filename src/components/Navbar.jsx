/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-[#0C1E1B] text-white px-4 py-2 flex justify-between items-center ${
        isScrolled ? "glass-navbar" : ""
      }`}
    >
      <h1 className="text-2xl logo-font">My App</h1>
      <div className="space-x-4">
        <a href="#home" className="hover:text-[#29B475]">
          Home
        </a>
        <a href="#about" className="hover:text-[#29B475]">
          About
        </a>
        <a href="#contact" className="hover:text-[#29B475]">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
