import React from 'react';
import { ShieldAlert, Heart, Activity, BadgePercent, GraduationCap, Clock, MonitorCheck, Microscope, UserCheck } from 'lucide-react';
import { doctorData } from '../data';

export default function WhyChooseUs() {
  const points = [
    {
      id: "why-physician",
      title: "Prestigious Ivy-League Training",
      desc: "Dr. Rachel Carter studied at Harvard Medical School and finished residency/fellowships at Mayo Clinic and Johns Hopkins Hospital, delivering an unparalleled academic foundation.",
      icon: <GraduationCap className="w-5.5 h-5.5 text-teal-600" />,
      color: "bg-teal-50 border-teal-100",
    },
    {
      id: "why-tech",
      title: "State-Of-The-Art Hemodynamics",
      desc: "Equipped with Philips Epic ultrasound scanners, high-frequency continuous patch Holters, and on-site point-of-care rapid troponin testers for surgical-grade results.",
      icon: <Microscope className="w-5.5 h-5.5 text-sky-600" />,
      color: "bg-sky-50 border-sky-100",
    },
    {
      id: "why-personalized",
      title: "Precision Lifestyle Integrations",
      desc: "We analyze biomarkers (ApoB, hs-CRP) alongside continuous wearable biometric signals to form holistic, personalized guidelines rather than one-size-fits-all prescriptions.",
      icon: <UserCheck className="w-5.5 h-5.5 text-purple-600" />,
      color: "bg-purple-50 border-purple-100",
    },
    {
      id: "why-fast",
      title: "Zero-Latency Client Portal",
      desc: "Our interactive digital clinical ledger allows secure 1-click scheduling, active ticket downloads, immediate slot adjustments, and swift diagnostic result access.",
      icon: <MonitorCheck className="w-5.5 h-5.5 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600 block">Our Clinical Edge</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Setting Modern Medical Benchmarks
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Cardiovascular health deserves better than outdated, rushed medicine. Experience a clinic engineered from ground up for diagnostic accuracy, transparency, and personal care.
          </p>
        </div>

        {/* Bento-style Grid Options */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Highlight Column */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-left border border-slate-800 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6">
              <span className="text-xs font-mono font-semibold tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded">
                PATIENT-DIRECT METRICS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Empowering Patients with Continuous Biological Agency
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                Our practice operates dynamically in the intersection of traditional interventional cardiology and progressive long-term preventive science. We support thousands of active families in protecting their cardiac age.
              </p>
            </div>

            <div className="mt-10 space-y-4 border-t border-slate-800 pt-7">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">99.4%</div>
                  <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5">Satisfied Recovery score</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">&lt; 15m</div>
                  <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5">Average Intake Waiting time</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 italic">
                *Verified by third-party healthcare quality assurance providers, Q1 2026 audits.
              </div>
            </div>

          </div>

          {/* Quick Points Listing Column */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {points.map((point) => (
              <div
                key={point.id}
                className="bg-slate-50 hover:bg-white rounded-3xl border border-slate-100 hover:border-teal-100 hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between text-left group"
              >
                <div className="space-y-4">
                  <div className={`p-2.5 rounded-xl inline-flex group-hover:scale-105 transition-transform duration-300 ${point.color}`}>
                    {point.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                    {point.title}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
