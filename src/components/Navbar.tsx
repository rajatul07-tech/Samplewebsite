import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Phone, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { doctorData } from '../data';

interface NavbarProps {
  onBookClick: () => void;
  onPortalClick: () => void;
  portalOpen: boolean;
}

export default function Navbar({ onBookClick, onPortalClick, portalOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Dr. Carter', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Aura', href: '#why-choose-us' },
    { name: 'Clinic Gallery', href: '#gallery' },
    { name: 'Patient Reviews', href: '#testimonials' },
    { name: 'Location', href: '#contact' },
  ];

  return (
    <>
      {/* Top Banner (Always Visible / Trust elements & Emergency trigger) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-teal-400">
              <span className="h-2 w-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
              Dr. Carter Is Currently Accepting New Patients
            </span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              Hours: Mon - Fri (08:00 AM - 06:00 PM)
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={`tel:${doctorData.emergencyContact}`} 
              className="flex items-center text-red-400 font-medium hover:text-red-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 mr-1" />
              EMERGENCY ARREST LINE: {doctorData.emergencyContact}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3'
            : 'bg-slate-50/90 backdrop-blur-md border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Brand */}
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="bg-teal-600 group-hover:bg-teal-500 rounded-xl p-2.5 text-white shadow-md shadow-teal-600/10 transition-all duration-300">
                <Heart className="w-6 h-6 fill-teal-100/20 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center">
                  AURA <span className="text-teal-600 font-semibold ml-1.5 text-base tracking-widest border border-teal-200 bg-teal-50 px-1.5 py-0.5 rounded text-xs">MED</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Cardiovascular Clinic</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200 relative py-2"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3.5">
              <button
                onClick={onPortalClick}
                className={`text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 flex items-center ${
                  portalOpen
                    ? 'bg-slate-200 text-slate-800'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-100 bg-transparent'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mr-1.5 text-teal-600" />
                My Scheduling Portal
              </button>
              
              <button
                onClick={onBookClick}
                className="bg-slate-900 text-white rounded-xl text-sm font-medium px-5 py-2.5 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/20 active:scale-98 transition-all duration-200 flex items-center cursor-pointer"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden space-x-2">
              <button
                onClick={onPortalClick}
                className="text-xs font-medium py-1.5 px-3 rounded-lg bg-teal-50 text-teal-700 border border-teal-100 mr-1.5 flex items-center"
              >
                My Portal
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-700 p-2.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-5 px-4 space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="grid grid-cols-2 gap-2 text-center pb-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 flex flex-col space-y-2.5">
              <button
                onClick={() => {
                  onPortalClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl text-sm flex items-center transition-colors"
              >
                <ShieldCheck className="w-4.5 h-4.5 mr-2 text-teal-600" />
                Access Booking Portal
              </button>

              <button
                onClick={() => {
                  onBookClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-xl text-sm shadow-md flex items-center transition-all"
              >
                Schedule Appointment Now
              </button>
              
              <div className="flex justify-between text-xs text-slate-500 pt-3 px-2">
                <a href={`tel:${doctorData.emergencyContact}`} className="text-red-600 font-semibold flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 animate-pulse" /> Emergency Call
                </a>
                <a 
                  href={`https://wa.me/${doctorData.whatsappContact.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer" 
                  className="text-emerald-600 font-semibold flex items-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1" /> WhatsApp Care
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
