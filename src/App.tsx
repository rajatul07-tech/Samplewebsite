import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import PortalPanel from './components/PortalPanel';
import ContactSection from './components/ContactSection';
import { Appointment } from './types';
import { doctorData, servicesData } from './data';
import { 
  Heart, 
  Calendar, 
  Ticket, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  MessageSquare,
  ShieldCheck,
  MapPin,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [activeSegment, setActiveSegment] = useState<'booking' | 'portal'>('booking');
  const [lastCreatedBooking, setLastCreatedBooking] = useState<Appointment | null>(null);
  
  // Floating success toasts state
  const [toast, setToast] = useState<{ message: string; sub: string; type: 'success' | 'info' } | null>(null);

  // Auto-hide toast alerts
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleServiceSecured = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveSegment('booking');
    
    // Smooth scroll down to interactive segment
    const el = document.getElementById('scheduler-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookingConfirmed = (apt: Appointment) => {
    setLastCreatedBooking(apt);
    setActiveSegment('portal'); // flip segment to portal so they see their ticket instantly!
    
    const matchedService = servicesData.find(s => s.id === apt.serviceId);
    
    setToast({
      message: "Consultation Reserved Successfully!",
      sub: `Your registration ticket (${apt.bookingCode}) has been activated in your Scheduling Portal.`,
      type: 'success'
    });

    // Scroll slightly to let portal sit nicely in screen
    const el = document.getElementById('scheduler-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const triggerScrollToScheduler = (mode: 'booking' | 'portal' = 'booking') => {
    setActiveSegment(mode);
    const el = document.getElementById('scheduler-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      
      {/* Sticky Top Headers */}
      <Navbar 
        onBookClick={() => triggerScrollToScheduler('booking')} 
        onPortalClick={() => triggerScrollToScheduler('portal')}
        portalOpen={activeSegment === 'portal'}
      />

      {/* Hero Header Area */}
      <Hero onBookClick={() => triggerScrollToScheduler('booking')} />

      {/* Unified Medical Credentials / Experience block */}
      <div className="bg-slate-50 py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1.5 border-r border-slate-200/60 last:border-0">
              <div className="text-3xl font-black text-teal-600 font-display">16+ Yrs</div>
              <div className="text-xs text-slate-500 font-medium">Outpatient Care Focus</div>
            </div>
            <div className="space-y-1.5 md:border-r border-slate-200/60 last:border-0">
              <div className="text-3xl font-black text-slate-900 font-display">1,200+</div>
              <div className="text-xs text-slate-500 font-medium">Verified 5-Star Reviews</div>
            </div>
            <div className="space-y-1.5 border-r border-slate-200/60 last:border-0">
              <div className="text-3xl font-black text-teal-600 font-display">8,400+</div>
              <div className="text-xs text-slate-500 font-medium">Hearts Stabilized</div>
            </div>
            <div className="space-y-1.5 last:border-0">
              <div className="text-3xl font-black text-slate-900 font-display">100%</div>
              <div className="text-xs text-slate-500 font-medium">HIPAA Compliant Records</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main informative pathways */}
      <About onBookClick={() => triggerScrollToScheduler('booking')} />
      
      <Services onServiceSelect={handleServiceSecured} />
      
      <WhyChooseUs />
      
      <Gallery />
      
      <Testimonials />

      {/* Central Booking Portal Engine segment with Tab layouts */}
      <section id="scheduler-engine" className="py-20 bg-slate-50 border-t border-slate-100 relative">
        {/* Visual background noise elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section titles */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600 block">Digital Intake Desk</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Calibrate Your Consultation
            </h2>
            <p className="text-slate-500 text-sm font-normal">
              Pick a slot to request a clinical checkup session, or access and cancel pending registrations in the digital registry.
            </p>

            {/* Tab Controller Segment */}
            <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-200 mt-6 md:mt-8 space-x-1">
              <button
                onClick={() => setActiveSegment('booking')}
                className={`py-3 px-6 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                  activeSegment === 'booking'
                    ? 'bg-white text-teal-700 shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation Slot</span>
              </button>

              <button
                onClick={() => setActiveSegment('portal')}
                className={`py-3 px-6 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                  activeSegment === 'portal'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>Access Scheduling Portal</span>
              </button>
            </div>
          </div>

          {/* Displays appropriate block depending on segment states */}
          <div className="animate-in fade-in zoom-in-98 duration-300">
            {activeSegment === 'booking' ? (
              <BookingForm 
                selectedServiceId={selectedServiceId} 
                onBookingSuccess={handleBookingConfirmed} 
              />
            ) : (
              <PortalPanel 
                onClose={() => setActiveSegment('booking')} 
                highlightedBooking={lastCreatedBooking} 
              />
            )}
          </div>

        </div>
      </section>

      {/* Coordinate systems and details */}
      <ContactSection onBookClick={() => triggerScrollToScheduler('booking')} />

      {/* Comprehensive Medical Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm py-16 border-t border-slate-900 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Footer Card A - Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="bg-teal-600 rounded-xl p-2">
                <Heart className="w-5 h-5 fill-white/10" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                AURA <span className="text-teal-400">MED</span> CLINIC
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed font-light text-xs max-w-sm">
              Providing medical-grade modern cardiology, vascular screening, and custom metabolic therapies in an executive outpatient format. Founded by Harvard alumna Dr. Rachel Carter.
            </p>

            <div className="text-[10px] text-slate-500 max-w-xs uppercase font-mono tracking-wider">
              REGISTRATION LICENSE: #MD-2034-CARD <br />
              HIPAA SECURED DATA PIPELINES ACTIVE
            </div>
          </div>

          {/* Footer Card B - Fast pathways */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase">Clinical Pathways</h4>
            <div className="flex flex-col space-y-2">
              <a href="#about" className="hover:text-teal-400 transition-colors text-xs">Physician Credentials</a>
              <a href="#services" className="hover:text-teal-400 transition-colors text-xs font-normal">Cardiovascular Services</a>
              <a href="#why-choose-us" className="hover:text-teal-400 transition-colors text-xs font-normal">Modern Technology Edge</a>
              <a href="#gallery" className="hover:text-teal-400 transition-colors text-xs font-normal">Environmental Gallery</a>
            </div>
          </div>

          {/* Footer Card C - Trust Legal warnings */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase">Triage Disclaimer</h4>
            <p className="text-slate-500 leading-relaxed font-normal text-xs">
              All therapeutic and clinical statements on this portal are designed under strict alignment with AHA standards. Booking online secures a pending registration reservation subject to triage screening and clinical criteria confirmations by Dr. Carter's medical team.
            </p>
            <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-xl text-[10px] text-red-400/80 leading-relaxed">
              If you have progressive shortness of breath or radiating crushing chest tightness/pain, call 911 or visit the closest emergency room instantly.
            </div>
          </div>

        </div>

        {/* Legal copyright strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 mt-12 pt-8 text-[11px] text-slate-600 flex flex-col sm:flex-row justify-between gap-4 font-normal">
          <div>
            &copy; {new Date().getFullYear()} Aura Premium Medical Clinic. All rights and clinical licenses reserved globally.
          </div>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">HIPAA Compliance</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Billing Protection terms</span>
          </div>
        </div>
      </footer>

      {/* Floating Success Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-teal-500/30 p-5 flex items-start space-x-3.5 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-teal-500/10 text-teal-400 p-2 rounded-xl shrink-0">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
          </div>
          
          <div className="flex-1 text-left">
            <h5 className="text-sm font-bold text-white">{toast.message}</h5>
            <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">{toast.sub}</p>
            
            <button
              onClick={() => {
                setActiveSegment('portal');
                setToast(null);
                const el = document.getElementById('scheduler-engine');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-teal-400 hover:text-teal-300 font-bold text-xs mt-3.5 inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>Inspect Ticket Receipt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setToast(null)}
            className="p-1 rounded-md text-slate-500 hover:text-slate-300 transition-colors focus:outline-none shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Secondary Floating Rapid Triage Dial Button (Sticky Outpatient Touchpoint) */}
      <div className="fixed bottom-6 left-6 z-30 hidden md:block">
        <a
          href={`tel:${doctorData.emergencyContact}`}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-xl hover:shadow-red-600/30 flex items-center space-x-2 transition-all hover:scale-104 duration-300 group"
        >
          <div className="bg-white/10 rounded-full p-1 animate-pulse">
            <Phone className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-xs font-bold pr-1 tracking-wide uppercase max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap">
            Urgent Hotline: {doctorData.emergencyContact}
          </span>
        </a>
      </div>

    </div>
  );
}
