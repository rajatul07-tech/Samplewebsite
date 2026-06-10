import React from 'react';
import { Award, GraduationCap, CheckCircle2, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { doctorData } from '../data';

interface AboutProps {
  onBookClick: () => void;
}

export default function About({ onBookClick }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Visual Title Grid */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between border-b border-slate-100 pb-10 mb-16">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600 block">About The Physician</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Dr. Rachel Carter, MD, FACC
            </h2>
            <p className="text-slate-500 max-w-xl font-normal text-sm md:text-base">
              Setting international clinical benchmarks in preventive healthcare and non-invasive cardiovascular intervention.
            </p>
          </div>
          
          <button
            onClick={onBookClick}
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 bg-slate-900 text-white rounded-xl text-sm font-semibold py-3.5 px-6 hover:bg-teal-600 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Briefing With Dr. Carter</span>
          </button>
        </div>

        {/* Outer Split layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column A: Doctor biography list */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800">Clinical Philosophy</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {doctorData.bio}
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                \"I believe modern medicine must move beyond managing complications. True cardiovascular health begins with preemptive analysis, cellular metabolic tuning, and stopping arterial injury before it can manifest as a crisis. By utilizing high-fidelity imaging alongside biological markers, we build a defensive medicine shield for your lifestyle.\"
              </p>
            </div>

            {/* Quick credentials columns */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              
              {/* Education list */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100/70">
                <div className="flex items-center space-x-2.5 mb-4 text-teal-700">
                  <GraduationCap className="w-5 h-5" />
                  <h4 className="font-bold text-slate-800 text-sm tracking-tight uppercase">Academic Credentials</h4>
                </div>
                <ul className="space-y-3">
                  {doctorData.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start text-xs text-slate-600">
                      <span className="text-teal-500 mr-2 font-bold">•</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications list */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100/70">
                <div className="flex items-center space-x-2.5 mb-4 text-teal-700">
                  <Award className="w-5 h-5" />
                  <h4 className="font-bold text-slate-800 text-sm tracking-tight uppercase">Board Certifications</h4>
                </div>
                <ul className="space-y-3">
                  {doctorData.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-2 shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Column B: Doctor side card featuring achievements & badges */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Stats panel */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-7 shadow-xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Heart className="w-32 h-32 stroke-[1.5]" />
              </div>
              
              <h4 className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold mb-6">Proven Medical Excellence</h4>
              
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div>
                  <div className="text-3xl font-black text-white">{doctorData.experienceYears}+</div>
                  <div className="text-xs text-slate-400 mt-1">Years of Dedicated Cardiovascular Practice</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-teal-400">Harvard & Mayo</div>
                  <div className="text-xs text-slate-400 mt-1">Alumna Training Foundations</div>
                </div>
                <div className="border-t border-slate-800 pt-4 col-span-2">
                  <div className="text-3xl font-black text-teal-400">{doctorData.treatedCount.toLocaleString()}+</div>
                  <div className="text-xs text-slate-400 mt-1">Private Consultations & Procedures Completed</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>LICENSURE: ACTIVE</span>
                <span className="text-teal-400 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-teal-500 mr-1.5 animate-pulse"></span>
                  BOARD VERIFIED
                </span>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-6 text-left">
              <h4 className="font-bold text-slate-800 text-sm tracking-tight uppercase mb-4 text-teal-800">
                Major Career Distinctions
              </h4>
              <ul className="space-y-3.5">
                {doctorData.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start text-xs leading-relaxed text-slate-700">
                    <span className="text-teal-600 mr-2.5 font-bold shrink-0 mt-0.5">✔</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote decoration */}
            <div className="border-l-4 border-slate-200 pl-4 py-1 text-slate-500 text-xs italic text-left">
              \"Cardiovascular health isn't a medical abstract. It's the engine of your daily vitality. We protect it with rigorous, predictive science.\"
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
