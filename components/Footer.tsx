
import React from 'react';
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  Mail, Phone, MapPin, ArrowRight, Sparkles 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Marketplace',
      links: [
        { name: 'Browse Listings', path: '/search' },
        { name: 'Luxury Estates', path: '/search' },
        { name: 'Modern Lofts', path: '/search' },
        { name: 'Neighborhood Guides', path: '/' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { name: 'For Tenants', path: '/' },
        { name: 'For Landlords', path: '/' },
        { name: 'Service Providers', path: '/' },
        { name: 'Intelligence Suite', path: '/dashboard' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Nawiri360', path: '/' },
        { name: 'Careers', path: '/' },
        { name: 'Press Room', path: '/' },
        { name: 'Contact Concierge', path: '/' },
      ]
    }
  ];

  return (
    <footer className="bg-emerald-950 text-white pt-20 pb-10 px-6 md:px-12 lg:px-20 mt-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-emerald-950 font-black text-2xl shadow-lg shadow-amber-400/10">N</div>
              <span className="font-black text-3xl tracking-tighter lowercase">nawiri360</span>
            </div>
            <p className="text-emerald-100/60 text-lg leading-relaxed max-w-sm">
              Redefining the residential ecosystem through elite verification, intelligence-driven matching, and 360° property management.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-400 hover:text-emerald-950 transition-all duration-300 border border-white/10">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-amber-400">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <button 
                        onClick={() => onNavigate(link.path)}
                        className="text-emerald-100/60 hover:text-white hover:translate-x-1 transition-all text-sm font-medium inline-flex items-center gap-1 group"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-amber-400">Intelligence Updates</h4>
              <p className="text-emerald-100/60 text-sm leading-relaxed">
                Receive curated market insights and exclusive early access to luxury listings.
              </p>
            </div>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Excellence@yourdomain.com" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 aspect-square bg-amber-400 text-emerald-950 rounded-xl flex items-center justify-center hover:bg-white transition-all shadow-lg group-hover:scale-105 active:scale-95">
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-100/30">
              <Sparkles size={12} className="text-amber-400" />
              Secure Neural Protocol v2.5
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-emerald-100/40">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Usage Agreement</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Neural Cookies</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Audit Logs</a>
          </div>
          <p className="text-[11px] font-bold text-emerald-100/20 uppercase tracking-[0.3em]">
            © {currentYear} NAWIRI360 GLOBAL ESTATES. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
