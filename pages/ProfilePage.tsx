
import React, { useState, useRef } from 'react';
import { User, UserRole } from '../types';
import { 
  Camera, ShieldCheck, Mail, MapPin, 
  Plus, Trash2, Edit3, Check, X,
  Image as ImageIcon, Sparkles, Heart
} from 'lucide-react';

interface ProfilePageProps {
  user: User;
  onUpdateUser: (updatedUser: Partial<User>) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [likedPictures, setLikedPictures] = useState<string[]>([
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = () => {
    onUpdateUser({ name: editName });
    setIsEditing(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLikedPictures(prev => [reader.result as string, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index: number) => {
    setLikedPictures(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Header Container - Adjusted to allow avatar overlap without clipping */}
      <div className="relative">
        {/* Banner */}
        <div className="relative h-64 md:h-80 rounded-[40px] overflow-hidden bg-emerald-950 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-900/20 opacity-60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent"></div>
          <img 
            src="https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=2000" 
            alt="Banner background" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>

        {/* Profile Identity Block (Avatar + Info) */}
        <div className="px-8 md:px-12 -mt-20 md:-mt-24 relative z-10 flex flex-col md:flex-row items-end md:items-center gap-6 md:gap-10">
          {/* Avatar Area */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] md:rounded-[56px] border-[6px] md:border-[10px] border-white dark:border-[#050807] overflow-hidden shadow-2xl bg-slate-100 dark:bg-emerald-900/20 relative">
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-emerald-950/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white backdrop-blur-sm"
              >
                <Camera size={32} className="mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Edit Frame</span>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleAvatarUpload} 
              />
            </div>
            {user.verified && (
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-emerald-500 text-white p-2.5 md:p-3 rounded-2xl shadow-lg ring-4 ring-white dark:ring-[#050807] transform transition-transform group-hover:scale-110">
                <ShieldCheck size={20} className="md:w-6 md:h-6" />
              </div>
            )}
          </div>

          {/* User Info Title Area */}
          <div className="pb-2 md:pb-6 flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-2">
              {isEditing ? (
                <div className="flex items-center gap-2 bg-white/5 dark:bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                  <input 
                    value={editName}
                    autoFocus
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-transparent border-none rounded-xl px-3 py-1 text-white text-2xl md:text-3xl font-black outline-none focus:ring-0"
                  />
                  <button onClick={handleSaveProfile} className="bg-emerald-500 p-2.5 rounded-xl text-white hover:bg-emerald-400 transition-colors shadow-lg">
                    <Check size={20} />
                  </button>
                  <button onClick={() => { setIsEditing(false); setEditName(user.name); }} className="bg-red-500 p-2.5 rounded-xl text-white hover:bg-red-400 transition-colors shadow-lg">
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 group/name">
                  <h1 className="text-3xl md:text-5xl font-black text-emerald-950 dark:text-emerald-50 tracking-tight">
                    {user.name}
                  </h1>
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-amber-400 opacity-0 group-hover/name:opacity-100 transition-all hover:scale-110"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
               <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-amber-400 font-black uppercase tracking-[0.2em] text-[10px] rounded-lg">
                 {user.role}
               </span>
               <span className="text-emerald-700/40 dark:text-emerald-500/40 font-bold text-xs uppercase tracking-widest">Member since 2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pt-4">
        {/* Profile Info Card */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-[#0D1512] rounded-[32px] p-8 md:p-10 border border-slate-100 dark:border-emerald-900/20 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            
            <h3 className="text-xl font-black mb-8 text-emerald-950 dark:text-emerald-50 relative z-10">Identity Portfolio</h3>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-800 dark:text-amber-400 shadow-sm group-hover:rotate-3 transition-transform">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-emerald-500/40">Secured Email</p>
                  <p className="font-bold text-emerald-950 dark:text-emerald-100 break-all">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-800 dark:text-amber-400 shadow-sm group-hover:-rotate-3 transition-transform">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-emerald-500/40">Neural Node</p>
                  <p className="font-bold text-emerald-950 dark:text-emerald-100">San Francisco Bay Area</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-800 dark:text-amber-400 shadow-sm group-hover:rotate-3 transition-transform">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-emerald-500/40">Trust Certificate</p>
                  <p className="font-bold text-emerald-950 dark:text-emerald-100">{user.verified ? 'Verified Premium Gold' : 'Standard'}</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-10 py-5 bg-emerald-950 dark:bg-emerald-900/20 text-white dark:text-emerald-100 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-900 dark:hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-950/10">
              Update Credentials
            </button>
          </div>

          <div className="bg-amber-400 rounded-[32px] p-8 md:p-10 text-emerald-950 shadow-2xl shadow-amber-400/20 relative overflow-hidden group">
            <Sparkles size={140} className="absolute -right-12 -bottom-12 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000" />
            <h3 className="text-2xl font-black mb-4 relative z-10 tracking-tight">Ecosystem Rewards</h3>
            <p className="text-sm font-medium mb-10 leading-relaxed relative z-10 opacity-80">Your profile integrity score is in the top 5%. You've unlocked priority concierge response times.</p>
            <button className="bg-emerald-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all relative z-10 shadow-xl shadow-emerald-950/20">
              Explore Benefits
            </button>
          </div>
        </div>

        {/* Liked Pictures / Inspiration Gallery */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white dark:bg-[#0D1512] rounded-[40px] p-8 md:p-12 border border-slate-100 dark:border-emerald-900/20 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
              <div>
                <h3 className="text-3xl font-black text-emerald-950 dark:text-emerald-50 tracking-tight">Style Intelligence</h3>
                <p className="text-emerald-500/40 text-sm font-bold mt-1 uppercase tracking-widest">Personal curation of residential inspiration</p>
              </div>
              <button 
                onClick={() => galleryInputRef.current?.click()}
                className="w-16 h-16 bg-emerald-800 dark:bg-amber-400 rounded-[24px] flex items-center justify-center text-white dark:text-emerald-950 shadow-2xl hover:scale-110 hover:rotate-6 active:scale-95 transition-all group"
              >
                <Plus size={32} className="group-hover:scale-110 transition-transform" />
              </button>
              <input 
                type="file" 
                ref={galleryInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleGalleryUpload} 
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {likedPictures.length > 0 ? (
                likedPictures.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-[32px] overflow-hidden bg-slate-100 dark:bg-emerald-900/10 border border-slate-100 dark:border-emerald-900/20 shadow-sm hover:shadow-xl transition-all duration-500">
                    <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" alt="Inspiration" />
                    <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
                      <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-amber-400 hover:text-emerald-950 transition-all hover:scale-110">
                        <ImageIcon size={20} />
                      </button>
                      <button 
                        onClick={() => removeGalleryImage(idx)}
                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-red-500 transition-all hover:scale-110"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="absolute top-5 right-5 text-amber-400 drop-shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart size={24} fill="currentColor" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center space-y-6">
                  <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-[40px] flex items-center justify-center text-emerald-800/10 dark:text-amber-400/10 mx-auto">
                    <ImageIcon size={48} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black text-emerald-900/60 dark:text-emerald-100/40">Artifact Collection Empty</p>
                    <p className="text-slate-400 dark:text-emerald-800 font-bold max-w-xs mx-auto">Begin building your style profile to enable AI recommendations.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Suggested Aesthetics */}
          <div className="bg-emerald-50/50 dark:bg-emerald-900/5 rounded-[48px] p-10 md:p-14 border border-emerald-100/50 dark:border-emerald-900/20 flex flex-col md:flex-row items-center gap-10 md:gap-14 shadow-inner relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl group-hover:bg-amber-400/10 transition-colors"></div>
            <div className="w-28 h-28 md:w-32 md:h-32 bg-white dark:bg-[#0D1512] rounded-[40px] border-4 border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center shadow-2xl shrink-0 group-hover:rotate-6 transition-transform duration-700">
              <Sparkles size={56} className="text-amber-400 animate-pulse" />
            </div>
            <div className="space-y-4">
              <h4 className="text-2xl font-black text-emerald-950 dark:text-emerald-50 tracking-tight">Neural Aesthetic Profile</h4>
              <p className="text-emerald-700/60 dark:text-emerald-500/60 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                Analysis complete. Based on your Style Artifacts, we've identified a preference for <span className="text-emerald-800 dark:text-amber-400 font-black">Modern Minimalist</span> and <span className="text-emerald-800 dark:text-amber-400 font-black">Eco-Industrial</span> sanctuaries. 
              </p>
              <div className="flex gap-4 pt-2">
                 <button className="text-[10px] font-black uppercase tracking-widest text-emerald-800 dark:text-amber-400 border-b-2 border-emerald-800/20 dark:border-amber-400/20 hover:border-amber-400 transition-all">View Matched Properties</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
