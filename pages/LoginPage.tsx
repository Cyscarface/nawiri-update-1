
import React, { useState } from 'react';
import { UserRole } from '../types';
import { Shield, Sparkles, ArrowRight, Mail, Lock, User as UserIcon, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.TENANT);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  const handleGoogleLogin = () => {
    setIsSocialLoading(true);
    // Simulate OAuth handshake
    setTimeout(() => {
      setIsSocialLoading(false);
      onLogin(UserRole.TENANT);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050807] flex flex-col lg:flex-row font-sans overflow-hidden">
      {/* Brand Side (Desktop) */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-20 bg-emerald-950 overflow-hidden border-r border-white/5">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-800/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>
        
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center text-emerald-950 font-black text-4xl shadow-2xl shadow-amber-400/20">N</div>
            <h1 className="text-5xl font-black text-white tracking-tighter lowercase">nawiri360</h1>
          </div>
          
          <h2 className="text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
            Experience <br/>
            <span className="text-amber-400 italic font-serif">the gold standard</span> <br/>
            of residential living.
          </h2>
          
          <p className="text-xl text-emerald-100/60 leading-relaxed mb-12">
            Join the elite ecosystem where verified residents, prestige landlords, and master professionals converge.
          </p>

          <div className="space-y-6">
            {[
              { text: "Identity-First Trust Protocol", icon: Shield },
              { text: "AI-Powered Portfolio Intelligence", icon: Sparkles },
              { text: "360° On-Demand Logistics", icon: CheckCircle }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-emerald-100/80 font-bold">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <item.icon size={16} className="text-amber-400" />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auth Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 relative bg-gradient-to-tr from-[#050807] via-[#050807] to-emerald-950/20">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-emerald-950 font-black text-2xl shadow-xl">N</div>
          <span className="text-3xl font-black text-white tracking-tighter lowercase">nawiri360</span>
        </div>

        <div className="w-full max-w-md bg-white/5 dark:bg-[#0D1512]/60 backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[40px] shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-emerald-800 rounded-3xl flex items-center justify-center text-amber-400 shadow-2xl border-4 border-[#050807]">
            <Lock size={32} />
          </div>

          <div className="text-center mb-10 mt-4">
            <h3 className="text-3xl font-black text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Credentials'}</h3>
            <p className="text-emerald-500/60 font-bold text-sm">Access your residential portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative group">
                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-800 group-focus-within:text-amber-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Full Legal Name" 
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-amber-400/50 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:ring-4 focus:ring-amber-400/5 transition-all"
                />
              </div>
            )}
            
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-800 group-focus-within:text-amber-400 transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Excellence@yourdomain.com" 
                required
                className="w-full bg-white/5 border border-white/10 focus:border-amber-400/50 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:ring-4 focus:ring-amber-400/5 transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60 ml-1">Ecosystem Role</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { role: UserRole.TENANT, label: 'Resident' },
                  { role: UserRole.LANDLORD, label: 'Estate Owner' },
                  { role: UserRole.SERVICE_PROVIDER, label: 'Professional' },
                  { role: UserRole.ADMIN, label: 'Overseer' }
                ].map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setSelectedRole(item.role)}
                    className={`py-3 rounded-xl text-xs font-black transition-all border ${
                      selectedRole === item.role 
                        ? 'bg-amber-400 text-emerald-950 border-amber-400 shadow-lg shadow-amber-400/20' 
                        : 'bg-white/5 text-emerald-100/40 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-3 group mt-2"
            >
              {isLogin ? 'Authorize Access' : 'Establish Profile'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
              <span className="bg-[#0D1512] px-4 text-emerald-500/40">Or Secure with</span>
            </div>
          </div>

          {/* Social Logins */}
          <button 
            onClick={handleGoogleLogin}
            disabled={isSocialLoading}
            className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3.5 rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSocialLoading ? (
              <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </button>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-400/60 hover:text-amber-400 text-xs font-bold transition-colors"
            >
              {isLogin ? "Request to join the ecosystem?" : "Already possess credentials?"}
            </button>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-800">
          <Shield size={10} />
          Verified Secure Neural Protocol v2.5
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
