"use client"

import { NavContent } from "@/components/navContent";
import { SheetSideComponent } from "./navSlideIn"; // Adjust the import path as necessary
import { useState } from 'react';

export const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-lg">
      <nav className="bg-black p-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon toggles based on menu state */}
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
            {/* Desktop NavContent */}
            <div className="hidden sm:block">
              <NavContent />
            </div>
          </div>
        </div>
      </nav>

      {/* SheetSideComponent for mobile menu */}
      <SheetSideComponent isOpen={isOpen} onRequestClose={() => setIsOpen(false)} />
    </div>
  );
};