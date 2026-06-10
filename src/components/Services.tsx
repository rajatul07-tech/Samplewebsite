import React, { useState } from 'react';
import { Heart, Activity, ShieldPlus, Radio, Stethoscope, Clock, ShieldCheck, ChevronRight, X, ArrowRight, DollarSign } from 'lucide-react';
import { servicesData } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onServiceSelect: (serviceId: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'clinical' | 'specialized' | 'preventive' | 'emergency'>('all');

  const filteredServices = activeTab === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab);

  // Map arbitrary strings to Lucide icons
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHeart':
        return <Heart className="w-6 h-6" />;
      case 'Activity':
        return <Activity className="w-6 h-6" />;
      case 'ShieldAlert':
        return <ShieldPlus className="w-6 h-6" />;
      case 'Radio':
        return <Radio className="w-6 h-6" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6" />;
      default:
        return <Stethoscope className="w-6 h-6" />;
    }
  };

  const tabs = [
    { id: 'all', label: 'All Services' },
    { id: 'clinical', label: 'Clinical Intake' },
    { id: 'specialized', label: 'Advanced Imaging' },
    { id: 'preventive', label: 'Preventive Care' },
    { id: 'emergency', label: 'Urgent Care' },
  ] as const;

  const categoryColorMap = {
    clinical: { text: 'text-teal-700 bg-teal-50 border-teal-100', icon: 'bg-teal-50 text-teal-600' },
    specialized: { text: 'text-sky-700 bg-sky-50 border-sky-100', icon: 'bg-sky-50 text-sky-600' },
    preventive: { text: 'text-purple-700 bg-purple-50 border-purple-100', icon: 'bg-purple-50 text-purple-600' },
    emergency: { text: 'text-red-700 bg-red-50 border-red-100', icon: 'bg-red-50 text-red-600' },
  };

  return (
    <section id="services" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title area */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3.5">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600 block">Department Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Cardiovascular Solutions
          </h2>
          <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed">
            From basic physical assessments to state-of-the-art hemodynamics, we support patient vitality with modern non-invasive medical care.
          </p>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200/60 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services mapping grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredServices.map((service) => {
            const theme = categoryColorMap[service.category];
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-100 hover:border-teal-100 shadow-sm hover:shadow-lg transition-all duration-300 p-7 flex flex-col justify-between group h-full"
              >
                <div>
                  
                  {/* Service Card Top Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl transition-transform group-hover:scale-105 duration-300 ${theme.icon}`}>
                      {renderIcon(service.icon)}
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold py-1 px-3.5 rounded-full border ${theme.text}`}>
                      {service.category}
                    </span>
                  </div>

                  {/* Header Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-teal-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Key points indicator */}
                  <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> Duration</span>
                      <span className="text-slate-800 font-bold">{service.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                      <span className="flex items-center"><DollarSign className="w-3.5 h-3.5 mr-0.5 text-slate-400" /> Consult Fee</span>
                      <span className="text-teal-600 font-extrabold">{service.price}</span>
                    </div>
                  </div>

                </div>

                {/* Card footer actions */}
                <div className="space-y-3.5 mt-auto">
                  <button
                    onClick={() => setSelectedProtocol(service)}
                    className="w-full text-center text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Read Clinical Protocol</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onServiceSelect(service.id)}
                    className="w-full text-center text-xs font-bold bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-700 py-3.5 rounded-xl hover:shadow-md hover:shadow-teal-600/10 transition-all flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Book This Procedure</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic emergency support widget */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl border border-red-100 p-6 md:p-8 mt-16 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center space-x-4">
            <div className="bg-red-500 text-white rounded-full p-3.5 animate-pulse">
              <Stethoscope className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 leading-tight">Experiencing Acute Cardiorespiratory Chest Pains?</h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl font-normal leading-relaxed">
                If you are currently experiencing active left-arm pain, radiating crushing chest sensation, or severe shortness of breath, please immediately call 911 or our acute hotline.
              </p>
            </div>
          </div>
          <a
            href="tel:+18005550199"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all text-center shrink-0 w-full md:w-auto"
          >
            Direct Acute Intake: +1 (800) 555-0199
          </a>
        </div>

      </div>

      {/* Protocol Overlay Modal */}
      {selectedProtocol && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center z-10">
              <div className="flex items-center space-x-3 text-teal-600">
                <div className="p-2 bg-teal-50 rounded-xl">
                  {renderIcon(selectedProtocol.icon)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded">
                    Clinical Protocol
                  </span>
                  <h3 className="font-bold text-slate-950 text-base sm:text-lg tracking-tight mt-0.5">
                    {selectedProtocol.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedProtocol(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all focus:outline-none"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-left">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">Protocol Narrative</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedProtocol.longDesc}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-3">Diagnostic & Clinical Deliverables</h4>
                <div className="grid gap-2">
                  {selectedProtocol.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="bg-slate-50 border border-slate-100/80 rounded-xl p-3 flex items-start text-xs text-slate-700">
                      <ShieldCheck className="w-4.5 h-4.5 text-teal-600 shrink-0 mr-2.5 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-50/40 rounded-2xl border border-teal-50 p-4 space-y-1">
                <div className="text-xs font-mono uppercase text-teal-800 font-semibold">Estimated Billing & Co-Pays</div>
                <div className="flex justify-between items-baseline pt-1">
                  <div className="text-slate-600 text-xs">Aura Flat-Rate Private Billing fee:</div>
                  <div className="text-2xl font-black text-teal-700 font-display">{selectedProtocol.price}</div>
                </div>
                <div className="text-[10px] text-slate-400">Subject to health insurance co-pay validation. Custom itemized claims receipts are provided post-consultation.</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-100 p-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setSelectedProtocol(null)}
                className="w-full sm:w-[40%] bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl text-center text-xs transition-all cursor-pointer"
              >
                Close Protocol
              </button>
              <button
                onClick={() => {
                  onServiceSelect(selectedProtocol.id);
                  setSelectedProtocol(null);
                }}
                className="w-full sm:w-[60%] bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-xl text-center text-xs shadow-lg shadow-teal-500/10 transition-all flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>Select & Schedule Procedure</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
