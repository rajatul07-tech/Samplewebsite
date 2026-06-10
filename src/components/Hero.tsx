import React from 'react';
import { ShieldCheck, ArrowRight, Calendar, Star, Award, Users, PhoneCall, ChevronRight } from 'lucide-react';
import { doctorData } from '../data';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  // Compute nice active dates dynamically for the "Live clinic slots" widget
  const today = new Date();
  const formatToday = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/10 to-white pt-8 pb-16 lg:py-24">
      {/* Decorative medical background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-gradient from-teal-500/5 to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text metadata */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Trust badge */}
            <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-100 rounded-full py-1.5 px-4 text-teal-800 text-xs font-semibold tracking-wide">
              <Award className="w-4 h-4 text-teal-600 fill-teal-600/10" />
              <span>Harvard & Mayo Clinic Educated Board Certified Cardiologist</span>
            </div>

            {/* Authoritative Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Advanced Heart Care. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-600">
                  Patient-Centered Science.
                </span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Connect with <strong className="text-slate-900 font-semibold">{doctorData.name}</strong> for premium cardiovascular diagnostics, preventive life medicine, and customized circulatory care.
              </p>
            </div>

            {/* Doctor experience summary badge card */}
            <div className="bg-white rounded-2xl border border-slate-100/80 shadow-md p-5 max-w-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="bg-teal-50 rounded-xl p-3 text-teal-600">
                  <Star className="w-5.5 h-5.5 fill-teal-500 stroke-teal-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">{doctorData.rating} Out of 5 Stars</div>
                  <div className="text-xs text-slate-500">From {doctorData.reviewsCount.toLocaleString()} Verified Patient Audits</div>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-100 hidden sm:block" />
              <div className="flex items-center space-x-3.5">
                <div className="bg-sky-50 rounded-xl p-3 text-sky-600">
                  <ShieldCheck className="w-5.5 h-5.5 text-sky-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">100% Secure Care</div>
                  <div className="text-xs text-slate-500">HIPAA Compliant Record Systems</div>
                </div>
              </div>
            </div>

            {/* Dynamic Appointment CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onBookClick}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-4 px-8 rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/30 active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-4 px-7 rounded-xl transition-all border border-slate-200/50 flex items-center justify-center space-x-1.5"
              >
                <span>View Clinical Services</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Live slot banner */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for Consultations: {formatToday} — Priority slots book out early.</span>
            </div>

          </div>

          {/* Premium Overlapping Visual Card & Counters */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
            
            <div className="relative max-w-sm sm:max-w-md w-full">
              {/* Main Decorative Grid backing */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-teal-200/50 -z-10 rounded-tl-3xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-sky-200/50 -z-10 rounded-br-3xl pointer-events-none" />

              {/* Main Doctor Poster Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-4 border-white">
                <img
                  src={doctorData.image}
                  alt={doctorData.name}
                  className="w-full h-[380px] sm:h-[450px] object-cover object-top hover:scale-101 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Label Overlays */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-6 pt-20 text-white text-left">
                  <div className="text-xs font-mono text-teal-400 tracking-wider uppercase font-semibold">Senior Clinician</div>
                  <h3 className="text-2xl font-bold tracking-tight">{doctorData.name}</h3>
                  <p className="text-slate-300 text-sm font-light mt-1">{doctorData.title}</p>
                </div>
              </div>

              {/* Suspended clinical achievement tags (Floating widgets) */}
              
              {/* Live counter 1 */}
              <div className="absolute -left-6 top-16 bg-white rounded-2xl border border-slate-100 shadow-xl p-4 flex items-center space-x-3.5 transform -rotate-2 hover:rotate-0 transition-transform duration-300 hidden sm:flex">
                <div className="bg-teal-50 rounded-xl p-2 text-teal-600">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-black text-slate-800">{doctorData.treatedCount.toLocaleString()}+</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Patients Stabilized</div>
                </div>
              </div>

              {/* Live counter 2 */}
              <div className="absolute -right-6 bottom-20 bg-white rounded-2xl border border-slate-100 shadow-xl p-4 flex items-center space-x-3.5 transform rotate-3 hover:rotate-0 transition-transform duration-300 hidden sm:flex">
                <div className="bg-sky-50 rounded-xl p-2 text-sky-600">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-black text-slate-800">{doctorData.experienceYears}+ Years</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Clinical Focus</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
