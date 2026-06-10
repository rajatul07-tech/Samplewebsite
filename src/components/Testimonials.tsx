import React from 'react';
import { testimonialsData } from '../data';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600 block">Patient Voices</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted By Active Families
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Read transparent, firsthand accounts of clinical transformations, diagnostics accuracy, and compassionate lifestyle recovery plans led by Dr. Carter.
          </p>
        </div>

        {/* Column grid layout */}
        <div className="grid md:grid-cols-3 gap-8 text-left items-stretch">
          {testimonialsData.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-7 flex flex-col justify-between hover:shadow-lg hover:border-teal-200/50 transition-all duration-300 relative group h-full"
            >
              {/* Absolutes Quote decorator */}
              <div className="absolute top-6 right-6 text-slate-200 group-hover:text-teal-100 transition-colors duration-300">
                <Quote className="w-10 h-10 stroke-[1.5]" />
              </div>

              <div>
                {/* Rating score stars */}
                <div className="flex items-center space-x-1 mb-5">
                  {[...Array(review.rating)].map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className="w-4 h-4 fill-amber-400 stroke-amber-500"
                    />
                  ))}
                </div>

                {/* Review narrative */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 italic relative z-10 font-normal">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer signature */}
              <div className="flex items-center space-x-3.5 border-t border-slate-200/50 pt-5 mt-auto">
                <img
                  src={review.image}
                  alt={review.author}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 flex items-center">
                    <span>{review.author}</span>
                    {review.verified && (
                      <span className="ml-1.5 inline-flex items-center text-[9px] font-mono uppercase bg-teal-100/60 text-teal-800 px-1.5 py-0.5 rounded-md font-bold tracking-wider">
                        <ShieldCheck className="w-2.5 h-2.5 mr-0.5 text-teal-600" />
                        verify
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500">{review.designation}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{review.date}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Global summary count strip */}
        <div className="mt-14 inline-flex flex-wrap justify-center items-center gap-2 sm:gap-6 bg-slate-50 border border-slate-200/50 rounded-full py-3 px-6 text-xs sm:text-sm text-slate-600 mx-auto w-auto">
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-teal-600">4.9 / 5.0</span>
            <span className="text-slate-300">|</span>
            <span>Independent Healthgrades Rating</span>
          </div>
          <span className="text-slate-300 hidden sm:block">•</span>
          <div className="flex items-center space-x-1">
            <span className="font-extrabold text-slate-900">1,240+</span>
            <span>Patient Submissions Audited</span>
          </div>
        </div>

      </div>
    </section>
  );
}
