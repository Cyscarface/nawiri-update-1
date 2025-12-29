
import React, { useState, useEffect } from 'react';
import { api } from '../services/mockApi';
import { geminiService } from '../services/geminiService';
import { Property } from '../types';
import { MapPin, Bath, Bed, Maximize, Star, Filter, Info, Search } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [marketInsight, setMarketInsight] = useState<string>("");
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    city: 'San Francisco'
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const props = await api.properties.list(filters);
      setProperties(props);
      
      const insight = await geminiService.getMarketInsights(filters.city);
      setMarketInsight(insight);
      
      setLoading(false);
    };
    fetchData();
  }, [filters]);

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      {/* Header & Market Insight */}
      <div className="bg-emerald-900 dark:bg-[#0D1512] rounded-[32px] lg:rounded-[40px] p-8 lg:p-14 text-white relative overflow-hidden shadow-2xl shadow-emerald-950/20 border dark:border-emerald-900/30">
        <div className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl lg:blur-3xl"></div>
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 lg:gap-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight leading-tight">Elite residences in {filters.city}</h1>
            <div className="flex items-start gap-3 text-emerald-100 dark:text-emerald-400/80 bg-white/5 dark:bg-emerald-900/20 p-4 lg:p-5 rounded-[20px] lg:rounded-[24px] border border-white/10 dark:border-emerald-800/20 backdrop-blur-sm">
              <Info size={18} className="text-amber-400 mt-1 shrink-0 lg:w-5 lg:h-5" />
              <p className="text-xs lg:text-sm italic font-medium leading-relaxed">{marketInsight || "Analyzing premium market trends for this district..."}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:gap-4 w-full xl:w-auto">
            <button className="flex-1 xl:flex-none bg-white/10 dark:bg-emerald-800/20 hover:bg-white/20 dark:hover:bg-emerald-800/40 px-6 lg:px-8 py-3 lg:py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/20 dark:border-emerald-800/20 font-bold text-sm lg:text-base">
              <Filter size={18} />
              Refine
            </button>
            <button className="flex-1 xl:flex-none bg-amber-400 hover:bg-amber-500 text-emerald-950 font-black px-6 lg:px-8 py-3 lg:py-3.5 rounded-2xl transition-all shadow-lg shadow-amber-400/20 text-sm lg:text-base">
              Save Search
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
        {/* Listings Grid */}
        <div className="xl:col-span-2 space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-slate-100 dark:bg-emerald-900/10 animate-pulse rounded-[32px] aspect-[4/5]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {properties.map(property => (
                <div key={property.id} className="bg-white dark:bg-[#0D1512] rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50 dark:border-emerald-900/20 group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={property.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 lg:top-5 lg:left-5 bg-emerald-950/90 dark:bg-[#0D1512]/90 backdrop-blur-md px-4 lg:px-5 py-1.5 lg:py-2 rounded-2xl text-sm lg:text-base font-black text-amber-400 shadow-xl border border-white/10">
                      ${property.price.toLocaleString()}<span className="text-white/60 text-[10px] lg:text-xs font-normal ml-1">/mo</span>
                    </div>
                    <button className="absolute top-4 right-4 lg:top-5 lg:right-5 bg-white/90 dark:bg-emerald-900/60 backdrop-blur-md p-2 lg:p-3 rounded-2xl shadow-xl hover:text-red-500 dark:text-emerald-50 transition-colors">
                      <Star size={18} className="lg:w-5 lg:h-5" />
                    </button>
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-black mb-1.5 lg:mb-2 truncate text-emerald-950 dark:text-emerald-50">{property.title}</h3>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-emerald-500/60 text-xs lg:text-sm font-medium mb-4 lg:mb-6">
                      <MapPin size={14} className="text-emerald-700 dark:text-amber-400 lg:w-4 lg:h-4" />
                      {property.address}
                    </div>
                    <div className="flex justify-between items-center pt-4 lg:pt-6 border-t border-slate-50 dark:border-emerald-900/20">
                      <div className="flex gap-4 lg:gap-6 text-slate-500 dark:text-emerald-200/60 font-bold">
                        <div className="flex items-center gap-1.5 lg:gap-2">
                          <Bed size={16} className="text-emerald-800 dark:text-amber-400 lg:w-[18px] lg:h-[18px]" />
                          <span className="text-xs lg:text-sm">{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1.5 lg:gap-2">
                          <Bath size={16} className="text-emerald-800 dark:text-amber-400 lg:w-[18px] lg:h-[18px]" />
                          <span className="text-xs lg:text-sm">{property.bathrooms}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-400/10 px-2 lg:px-3 py-1 lg:py-1.5 rounded-xl text-amber-700 dark:text-amber-400 font-black text-xs lg:text-sm">
                        <Star size={14} fill="currentColor" className="lg:w-4 lg:h-4" />
                        {property.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Map Sidebar - Hidden on Tablets, only visible on Extra Large Screens or with explicit toggle in real app */}
        <div className="relative hidden xl:block h-[calc(100vh-350px)] sticky top-32">
          <div className="absolute inset-0 bg-slate-100 dark:bg-emerald-950/20 rounded-[40px] overflow-hidden border border-slate-200 dark:border-emerald-900/30 shadow-inner">
            <div className="w-full h-full relative bg-[#F1F3F2] dark:bg-[#050807] flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_#B9C6C0_1px,_transparent_1px)] dark:bg-[radial-gradient(circle_at_center,_#1F2F28_1px,_transparent_1px)] bg-[length:32px_32px]"></div>
              <div className="bg-white/80 dark:bg-[#0D1512]/80 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl border border-white dark:border-emerald-800/30 flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-600 dark:bg-amber-400 rounded-full animate-ping"></div>
                <span className="text-emerald-900 dark:text-emerald-50 font-black text-sm uppercase tracking-tighter">Live Map</span>
              </div>
              
              {properties.slice(0, 3).map((p, idx) => (
                <div 
                  key={idx}
                  className="absolute p-2.5 bg-emerald-900 dark:bg-amber-400 text-amber-400 dark:text-emerald-950 text-[10px] font-black rounded-2xl shadow-2xl cursor-pointer transform hover:scale-125 hover:-translate-y-1 transition-all border border-white/20"
                  style={{ 
                    top: `${30 + (idx * 20)}%`, 
                    left: `${20 + (idx * 25)}%` 
                  }}
                >
                  ${p.price.toLocaleString()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
