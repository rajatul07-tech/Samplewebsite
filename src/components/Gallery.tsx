import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { galleryData } from '../data';
import { Camera, ChevronLeft, ChevronRight, X, Heart, Eye } from 'lucide-react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'facility' | 'equipment' | 'team'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeFilter === 'all'
    ? galleryData
    : galleryData.filter(item => item.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Media' },
    { id: 'facility', label: 'Our Facilities' },
    { id: 'equipment', label: 'Clinical Technology' },
    { id: 'team', label: 'Medical Staff Operations' }
  ] as const;

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    const prevIdx = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIdx);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    const nextIdx = lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIdx);
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title elements */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600 block">Visual Standards</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Premium Medical Environment
          </h2>
          <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed">
            Take a visual tour through our state-of-the-art cardiovascular suite. We prioritize comfortable interiors and high-end technical design.
          </p>

          {/* Interactive categories */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-6">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  setLightboxIndex(null); // Reset lightbox mapping
                }}
                className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/10'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-200 hover:text-teal-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery items grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/50 hover:border-teal-200/60 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-zoom-in"
            >
              {/* Media image container */}
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* On-hover interactive layer overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full p-4.5 shadow-xl text-teal-600 transform scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Eye className="w-6 h-6 stroke-[2.5]" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] font-mono tracking-wider font-extrabold uppercase py-1 px-3.5 rounded-full select-none">
                  {item.category}
                </div>
              </div>

              {/* Text descriptions */}
              <div className="p-6 text-left">
                <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors text-base sm:text-lg mb-1.5">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Lightbox Panel */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200">
          
          {/* Lightbox header bar */}
          <div className="flex justify-between items-center text-white py-2 px-4">
            <div className="flex items-center space-x-2 text-teal-400">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-mono tracking-widest uppercase">
                AURA MED GALLERY ({lightboxIndex + 1} / {filteredItems.length})
              </span>
            </div>
            
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 hover:text-teal-400 transition-all focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Core content slide with navigation handles */}
          <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-4">
            
            {/* Prev handle */}
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:-left-12 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white hover:text-teal-400 transition-all focus:outline-none z-10"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
            </button>

            {/* Slide photography */}
            <div className="relative max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-slate-900">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] object-contain w-full"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Next handle */}
            <button
              onClick={handleNext}
              className="absolute right-0 sm:-right-12 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white hover:text-teal-400 transition-all focus:outline-none z-10"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-7 h-7 stroke-[2.5]" />
            </button>

          </div>

          {/* Slide metadata descriptors */}
          <div className="mx-auto max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-5 mb-4 text-white text-center w-full">
            <span className="text-[10px] font-mono tracking-widest uppercase text-teal-400 border border-teal-500/20 bg-teal-500/10 px-3 py-1 rounded">
              {filteredItems[lightboxIndex].category}
            </span>
            <h4 className="text-lg font-bold tracking-tight text-white mt-3">
              {filteredItems[lightboxIndex].title}
            </h4>
            <p className="text-slate-300 font-light text-xs sm:text-sm mt-1">
              {filteredItems[lightboxIndex].description}
            </p>
          </div>

        </div>
      )}

    </section>
  );
}
