
import React, { useState, useEffect } from 'react';
import { api } from '../services/mockApi';
import { ServiceProvider } from '../types';
import { Star, MapPin, Search, Filter, Wrench, ShieldCheck, Zap } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchServices = async () => {
      const data = await api.services.list();
      setProviders(data);
    };
    fetchServices();
  }, []);

  const filtered = filter === 'All' ? providers : providers.filter(p => p.category === filter);

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h1 className="text-4xl font-black text-emerald-950 dark:text-emerald-50 tracking-tight">On-Demand Logistics</h1>
          <p className="text-emerald-700/60 dark:text-emerald-500/40 font-bold mt-2 uppercase tracking-widest text-xs">Professional ecosystem for maintenance and services</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search providers..." 
              className="w-full bg-white dark:bg-[#0D1512] border border-slate-100 dark:border-emerald-900/20 rounded-2xl py-3 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-amber-400/30 outline-none"
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar">
        {['All', 'Cleaning', 'Plumbing', 'Electrical', 'Security', 'Moving'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shrink-0 border ${
              filter === cat 
                ? 'bg-amber-400 border-amber-400 text-emerald-950 shadow-lg shadow-amber-400/20' 
                : 'bg-white dark:bg-[#0D1512] border-slate-100 dark:border-emerald-900/20 text-slate-500 dark:text-emerald-500/60 hover:border-emerald-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(provider => (
          <div key={provider.id} className="bg-white dark:bg-[#0D1512] rounded-[40px] p-8 border border-slate-100 dark:border-emerald-900/20 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="flex items-start gap-6 mb-8 relative z-10">
              <div className="w-16 h-16 rounded-[24px] overflow-hidden border-2 border-slate-50 dark:border-emerald-800 shrink-0">
                <img src={provider.avatar} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-black text-emerald-950 dark:text-emerald-50 leading-tight">{provider.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-black text-emerald-950 dark:text-emerald-50">{provider.rating}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">({provider.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 dark:text-emerald-500/60 font-medium leading-relaxed mb-8 h-10 line-clamp-2">
              {provider.description}
            </p>

            <div className="flex items-center justify-between mb-8">
              <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-amber-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100/50 dark:border-emerald-800/30">
                {provider.category}
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Starting at</p>
                <p className="text-xl font-black text-emerald-950 dark:text-emerald-50">${provider.hourlyRate}<span className="text-xs font-medium text-slate-400">/hr</span></p>
              </div>
            </div>

            <button className="w-full py-4 bg-emerald-950 dark:bg-emerald-900/20 text-white dark:text-emerald-50 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-900 dark:hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-950/10 flex items-center justify-center gap-2 group/btn">
              Request Booking <Zap size={16} className="text-amber-400 group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
