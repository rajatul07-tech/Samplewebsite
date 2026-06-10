import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, ExternalLink, Calendar, MessageSquare, Compass, ShieldAlert } from 'lucide-react';
import { doctorData } from '../data';

interface ContactSectionProps {
  onBookClick: () => void;
}

export default function ContactSection({ onBookClick }: ContactSectionProps) {
  const [currentStatus, setCurrentStatus] = useState({ state: 'Closed', details: 'Opens at 8:00 AM' });

  // Compute live open/closed slot indicator based on actual system hours
  useEffect(() => {
    const updateClinicStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1-5 is Mon-Fri, 6 is Saturday
      const hour = now.getHours();
      const min = now.getMinutes();
      const currentTimeDecimal = hour + min / 60;

      if (day >= 1 && day <= 5) {
        // Weekday: 8:00 AM (8.0) to 6:00 PM (18.0)
        if (currentTimeDecimal >= 8 && currentTimeDecimal < 18) {
          setCurrentStatus({ state: 'Open Now', details: `Closes at 06:00 PM (Mon-Fri)` });
        } else if (currentTimeDecimal < 8) {
          setCurrentStatus({ state: 'Closed', details: `Open starting today at 08:00 AM` });
        } else {
          setCurrentStatus({ state: 'Closed', details: `Open tomorrow at 08:00 AM` });
        }
      } else if (day === 6) {
        // Saturday: 9:00 AM (9.0) to 2:00 PM (14.0)
        if (currentTimeDecimal >= 9 && currentTimeDecimal < 14) {
          setCurrentStatus({ state: 'Open Now', details: `Closes at 02:00 PM (Saturday)` });
        } else if (currentTimeDecimal < 9) {
          setCurrentStatus({ state: 'Closed', details: `Open starting today at 09:00 AM` });
        } else {
          setCurrentStatus({ state: 'Closed', details: `Open Monday at 08:00 AM` });
        }
      } else {
        // Sunday: Emergency Only
        setCurrentStatus({ state: 'Emergency Only', details: 'Closed for routine consults' });
      }
    };

    updateClinicStatus();
    const interval = setInterval(updateClinicStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Standard safe Google Map embed link for a generic medical district / clinical area (Times Square / Medical centre)
  // Let's use an elegant dark or standard clean styled map frame
  const googleMapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12087.411603513361!2d-73.9856555!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1718000000000!5m2!1sen!2sus";

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title elements */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400 block">Intake Logistics</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Reach Our Specialist Clinic
          </h2>
          <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed">
            Connect with our triage desk directly for schedule questions, medical questions, or priority billing validation.
          </p>
        </div>

        {/* Double-column coordinate splits */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column A: Contact coordinates data */}
          <div className="lg:col-span-5 space-y-7 text-left flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Dynamic Live Working hours panel */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2.5 rounded-xl ${
                    currentStatus.state === 'Open Now' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : currentStatus.state === 'Emergency Only'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    <Clock className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">Clinical Status</span>
                      <span className={`inline-flex items-center h-2 w-2 rounded-full ${
                        currentStatus.state === 'Open Now' 
                          ? 'bg-emerald-400 animate-pulse' 
                          : currentStatus.state === 'Emergency Only'
                          ? 'bg-red-400'
                          : 'bg-amber-400'
                      }`} />
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal mt-0.5">{currentStatus.details}</div>
                  </div>
                </div>

                <span className={`text-[10px] font-mono tracking-widest font-bold uppercase rounded-lg px-3 py-1 bg-slate-900 border ${
                  currentStatus.state === 'Open Now'
                    ? 'border-emerald-500/20 text-emerald-400'
                    : currentStatus.state === 'Emergency Only'
                    ? 'border-red-500/20 text-red-400'
                    : 'border-slate-800 text-slate-400'
                }`}>
                  {currentStatus.state}
                </span>
              </div>

              {/* Direct coordinates items itemized */}
              <div className="space-y-5">
                
                {/* Physical address option */}
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 text-teal-400 rounded-xl p-3 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="font-bold text-white uppercase tracking-wider font-mono text-[10px] text-slate-400">Clinic Headquarters</div>
                    <p className="mt-1 font-semibold text-slate-200 leading-relaxed">
                      {doctorData.address}
                    </p>
                  </div>
                </div>

                {/* Patient service hotline */}
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 text-teal-400 rounded-xl p-3 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="font-bold text-white uppercase tracking-wider font-mono text-[10px] text-slate-400">Direct Patient Intake</div>
                    <a href={`tel:${doctorData.emergencyContact}`} className="font-bold text-lg text-teal-400 hover:underline inline-block mt-0.5">
                      {doctorData.emergencyContact}
                    </a>
                  </div>
                </div>

                {/* Email messaging channel */}
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 text-teal-400 rounded-xl p-3 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="font-bold text-white uppercase tracking-wider font-mono text-[10px] text-slate-400">Email Correspondence</div>
                    <a href={`mailto:${doctorData.email}`} className="font-bold text-slate-200 hover:text-white inline-block hover:underline mt-0.5">
                      {doctorData.email}
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Conversion CTA cards */}
            <div className="pt-6 sm:pt-0 border-t border-slate-800/60 flex flex-col sm:flex-row gap-3.5">
              <button
                onClick={onBookClick}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation</span>
              </button>

              <a
                href={`https://wa.me/${doctorData.whatsappContact.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Intake Desk</span>
              </a>
            </div>

          </div>

          {/* Column B: Live responsive Google Map iframe integration */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl overflow-hidden border border-slate-800/80 aspect-video lg:aspect-auto relative min-h-[350px]">
            <iframe
              src={googleMapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%) opacity(0.85)" }} // Elegant dark map styling overlay
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aura Cardiovascular Medical Clinic Coordinates Map Overview"
              id="clinic-location-map"
              className="absolute inset-0"
            />
            
            {/* Visual badge directions */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3 flex items-center space-x-2.5 max-w-xs text-left shadow-lg">
              <div className="bg-teal-500/10 text-teal-400 p-2 rounded-lg">
                <Compass className="w-4.5 h-4.5 animate-spin-slow" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Clinics GPS</div>
                <div className="text-[10px] text-slate-400 mt-0.5">742 Evergreen Terr, Medical District</div>
              </div>
            </div>
          </div>

        </div>

        {/* Hour specifics footer listings */}
        <div className="grid sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-slate-800 text-left">
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-mono tracking-widest text-teal-400 font-bold">Weekdays (Mon - Fri)</div>
            <div className="font-extrabold text-white text-base">{doctorData.workingHours.weekday}</div>
            <div className="text-[10px] text-slate-500">Scheduled clinical diagnostics</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-mono tracking-widest text-teal-400 font-bold">Saturday</div>
            <div className="font-extrabold text-white text-base">{doctorData.workingHours.saturday}</div>
            <div className="text-[10px] text-slate-500 font-normal">Morning outpatient reviews only</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-mono tracking-widest text-teal-400 font-bold">Sunday</div>
            <div className="font-extrabold text-red-400 text-base">{doctorData.workingHours.sunday}</div>
            <div className="text-[10px] text-slate-500 font-normal">Acute dynamic response coordinator on-call</div>
          </div>
        </div>

      </div>
    </section>
  );
}
