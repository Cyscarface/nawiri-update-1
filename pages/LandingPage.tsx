
import React from 'react';
import { 
  ArrowRight, Shield, Zap, Star, CheckCircle, 
  Users, Building2, Wrench, ChevronRight, Play 
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen bg-[#050807] text-white font-sans selection:bg-amber-400 selection:text-emerald-950">
      {/* Public Top Navigation */}
      <nav className="fixed top-0 inset-x-0 z-[100] bg-[#050807]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-emerald-950 font-black text-xl shadow-lg shadow-amber-400/20">N</div>
          <span className="font-black text-2xl tracking-tighter lowercase">nawiri360</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Ecosystem', 'Solutions', 'Verification', 'Pricing'].map((item) => (
            <a key={item} href="#" className="text-sm font-bold text-emerald-100/40 hover:text-white transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onLogin} className="text-sm font-bold text-amber-400 hover:text-white transition-colors px-4">Portal Access</button>
          <button 
            onClick={onGetStarted}
            className="bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-black px-6 py-2.5 rounded-xl transition-all shadow-xl shadow-emerald-900/20 border border-emerald-700/50"
          >
            Join Ecosystem
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-emerald-800/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px]"></div>

        <div className="max-w-[1400px] mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-left-4">
              <Zap size={14} className="fill-current" /> Next-Gen Residential Intelligence
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
              The 360° <br/>
              <span className="text-amber-400 italic font-serif">Living</span> <br/>
              Protocol.
            </h1>
            
            <p className="text-xl text-emerald-100/60 leading-relaxed max-w-lg font-medium">
              A sovereign marketplace connecting elite residents, asset owners, and master service providers through an end-to-end verified ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={onGetStarted}
                className="bg-amber-400 text-emerald-950 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-amber-400/20 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all group"
              >
                Get Started <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 group">
                <Play size={20} className="fill-white" /> Watch Film
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-white/5">
              {[
                { label: 'Verified Homes', val: '12k+' },
                { label: 'Active Pros', val: '2.5k' },
                { label: 'Trust Score', val: '99.9%' }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-black text-white">{stat.val}</p>
                  <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-amber-400 rounded-[60px] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative rounded-[60px] overflow-hidden border border-white/10 shadow-2xl bg-[#0D1512] aspect-square lg:aspect-auto lg:h-[700px]">
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                alt="Modern Architecture"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent"></div>
              
              {/* Floating UI Elements */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-[40px] translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                      <Shield className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-white font-black">Identity Verified</p>
                      <p className="text-emerald-400 text-xs font-bold">Standard Gold Tier</p>
                    </div>
                  </div>
                  <div className="bg-amber-400 text-emerald-950 text-[10px] font-black px-3 py-1.5 rounded-full uppercase">Authenticated</div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full bg-emerald-400 h-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">One Platform. Three Pillars.</h2>
            <p className="text-emerald-100/40 text-lg font-medium">Nawiri360 harmonizes the residential experience for every participant.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Users, 
                title: "The Resident", 
                desc: "Discover premium sanctuaries with AI-driven matching and handle everything from lease to logistics in one dashboard.",
                features: ["Sovereign Verification", "Smart Recommendations", "One-Click Logistics"]
              },
              { 
                icon: Building2, 
                title: "The Asset Owner", 
                desc: "Maximize your portfolio yield with elite tenant screening, automated billing, and a pro-network on speed-dial.",
                features: ["Yield Optimization", "Automated Compliance", "Asset Intelligence"]
              },
              { 
                icon: Wrench, 
                title: "The Service Pro", 
                desc: "Access a constant stream of high-value maintenance requests and build your reputation within an elite network.",
                features: ["Automated Dispatch", "Escrow Payments", "Reputation Mining"]
              }
            ].map((sol, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-12 rounded-[48px] hover:border-amber-400/20 hover:bg-white/[0.07] transition-all group">
                <div className="w-20 h-20 bg-emerald-800/20 rounded-3xl flex items-center justify-center text-amber-400 mb-10 group-hover:scale-110 transition-transform">
                  <sol.icon size={40} />
                </div>
                <h3 className="text-3xl font-black mb-6">{sol.title}</h3>
                <p className="text-emerald-100/60 mb-10 leading-relaxed font-medium">{sol.desc}</p>
                <div className="space-y-4">
                  {sol.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm font-bold text-white/80">
                      <CheckCircle size={16} className="text-emerald-400" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Protocol CTA */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-emerald-900 rounded-[60px] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 space-y-8 max-w-3xl">
              <div className="w-20 h-20 bg-amber-400 rounded-3xl flex items-center justify-center text-emerald-950 mx-auto shadow-2xl">
                <Shield size={40} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Ready to transcend the <br/><span className="text-amber-400 italic font-serif">standard</span> rental?</h2>
              <p className="text-emerald-100/60 text-xl font-medium">Join 15,000+ members already living in the future.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={onGetStarted}
                  className="bg-white text-emerald-950 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl"
                >
                  Create Your Identity
                </button>
                <button className="bg-white/10 border border-white/10 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
                  Contact Concierge
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Simplified for Landing) */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center text-emerald-950 font-black text-sm">N</div>
            <span className="font-black text-xl tracking-tighter lowercase text-white/40">nawiri360</span>
          </div>
          <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} NAWIRI360 GLOBAL ESTATES. SECURE NEURAL PROTOCOL v2.5
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
