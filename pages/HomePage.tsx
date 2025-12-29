
import React from 'react';
import { Search, MapPin, Shield, Star, Zap, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onSearch: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[700px] rounded-[40px] overflow-hidden shadow-2xl shadow-emerald-900/20">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Architecture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/60 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col items-start justify-center text-left px-8 md:px-20 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 backdrop-blur-md rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-left-4">
            <Sparkles size={14} /> The Future of Living is Here
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
            Elegance in <br/><span className="text-amber-400 italic font-serif">every</span> move.
          </h1>
          <p className="text-lg md:text-xl text-emerald-50/80 mb-12 max-w-xl leading-relaxed">
            Nawiri360 redefines the rental experience. A seamless ecosystem connecting verified tenants, elite landlords, and expert pros.
          </p>
          
          <div className="w-full max-w-2xl bg-white/95 dark:bg-[#0D1512]/95 backdrop-blur-xl p-3 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4 border border-white/20 dark:border-emerald-800/30">
            <div className="flex-[1.5] flex items-center gap-3 px-5 py-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-emerald-800/30">
              <MapPin className="text-emerald-700 dark:text-amber-400" size={22} />
              <input 
                type="text" 
                placeholder="Where is your next sanctuary?" 
                className="w-full focus:outline-none text-slate-800 dark:text-emerald-50 bg-transparent text-sm font-medium placeholder:text-slate-400 dark:placeholder:text-emerald-700"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-5 py-3">
              <Search className="text-emerald-700 dark:text-amber-400" size={22} />
              <select className="w-full focus:outline-none text-slate-800 dark:text-emerald-50 bg-transparent text-sm font-medium appearance-none cursor-pointer">
                <option className="bg-white dark:bg-[#0D1512]">Residence</option>
                <option className="bg-white dark:bg-[#0D1512]">Luxury Estate</option>
                <option className="bg-white dark:bg-[#0D1512]">Modern Loft</option>
              </select>
            </div>
            <button 
              onClick={onSearch}
              className="bg-emerald-800 dark:bg-amber-400 dark:text-emerald-950 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-900/30 dark:shadow-amber-400/10 flex items-center justify-center gap-2 group"
            >
              Explore <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
        {[
          { icon: Shield, title: "Elite Verification", desc: "A gold-standard trust protocol for every member of our ecosystem.", color: "text-emerald-800 dark:text-amber-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { icon: Zap, title: "Intelligence-First", desc: "AI-driven matching and market analytics tailored to your unique lifestyle.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-400/10" },
          { icon: Star, title: "360° Services", desc: "On-demand access to premium concierge and maintenance professionals.", color: "text-slate-800 dark:text-emerald-100", bg: "bg-slate-100 dark:bg-emerald-800/20" }
        ].map((feat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#0D1512] p-10 rounded-[32px] border border-slate-100 dark:border-emerald-900/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className={`${feat.bg} ${feat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}>
              <feat.icon size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 text-emerald-950 dark:text-emerald-50">{feat.title}</h3>
            <p className="text-slate-500 dark:text-emerald-500/60 leading-relaxed text-sm">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Areas */}
      <section>
        <div className="flex justify-between items-end mb-12 px-4">
          <div>
            <span className="text-emerald-800 dark:text-amber-400 font-bold text-xs uppercase tracking-widest mb-2 block">Curated Locations</span>
            <h2 className="text-4xl font-black text-emerald-950 dark:text-emerald-50">World Class Destinations</h2>
          </div>
          <button className="text-emerald-800 dark:text-emerald-400 font-bold hover:gap-3 flex items-center gap-2 transition-all">
            Explore All <ArrowRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'San Francisco', count: 124, img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800' },
            { name: 'New York', count: 352, img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800' },
            { name: 'Austin', count: 89, img: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&q=80&w=800' },
            { name: 'Miami', count: 156, img: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800' }
          ].map((area, idx) => (
            <div key={idx} className="relative group cursor-pointer overflow-hidden rounded-[32px] aspect-[4/5] shadow-lg">
              <img src={area.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={area.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent flex flex-col justify-end p-8 text-white">
                <h4 className="text-2xl font-black tracking-tight">{area.name}</h4>
                <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mt-1">{area.count} Residences</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Sparkles = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

export default HomePage;
