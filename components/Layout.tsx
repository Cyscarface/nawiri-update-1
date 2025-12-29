
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import ChatAssistant from './ChatAssistant';
import Footer from './Footer';
import { 
  Home, Search, LayoutDashboard, MessageSquare, 
  Wrench, ShieldCheck, User as UserIcon, LogOut, Menu, X,
  Sun, Moon, ChevronLeft, ChevronRight, MoreHorizontal,
  UserCircle
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onNavigate: (path: string) => void;
  currentPath: string;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onNavigate, currentPath, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed');
      if (saved) return saved === 'true';
      return window.innerWidth < 1280;
    }
    return false;
  });
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', isCollapsed.toString());
  }, [isCollapsed]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const navItems = [
    { name: 'Home', path: '/', icon: Home, roles: null },
    { name: 'Search', path: '/search', icon: Search, roles: null },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: [UserRole.TENANT, UserRole.LANDLORD, UserRole.SERVICE_PROVIDER, UserRole.ADMIN] },
    { name: 'Profile', path: '/profile', icon: UserCircle, roles: null },
    { name: 'Messages', path: '/messages', icon: MessageSquare, roles: [UserRole.TENANT, UserRole.LANDLORD] },
    { name: 'Maintenance', path: '/maintenance', icon: Wrench, roles: [UserRole.TENANT, UserRole.LANDLORD] },
    { name: 'Admin', path: '/admin', icon: ShieldCheck, roles: [UserRole.ADMIN] },
  ];

  const userRole = user?.role;
  const filteredNav = navItems.filter(item => 
    !item.roles || (userRole && item.roles.includes(userRole))
  );

  const mobilePrimaryNav = filteredNav.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-emerald-50/30 dark:bg-[#050807] transition-colors duration-500 font-sans overflow-hidden">
      {/* Mobile Top Nav */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-[#0D1512]/80 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900/30 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
          <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center text-amber-400 font-bold shadow-md shadow-emerald-900/20">N</div>
          <span className="font-black text-lg lowercase tracking-tight text-emerald-950 dark:text-emerald-50">nawiri360</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-amber-400">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-emerald-950/20 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-[70] bg-white dark:bg-[#0D1512] border-r border-emerald-100 dark:border-emerald-900/20 transform transition-all duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'md:w-64 lg:w-72'}
      `}>
        <div className="p-4 md:p-6 h-full flex flex-col bg-gradient-to-b from-white to-emerald-50/20 dark:from-[#0D1512] dark:to-[#0D1512]">
          <div className={`hidden md:flex items-center mb-12 h-11 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('/')}>
              <div className="w-11 h-11 shrink-0 bg-emerald-800 rounded-xl flex items-center justify-center text-amber-400 font-bold text-2xl shadow-lg shadow-emerald-900/20 group-hover:scale-105 transition-transform">N</div>
              {!isCollapsed && (
                <span className="font-black text-2xl tracking-tighter lowercase text-emerald-950 dark:text-emerald-50 animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap">
                  nawiri360
                </span>
              )}
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {filteredNav.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center rounded-2xl transition-all duration-300 group overflow-hidden ${
                  isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'
                } ${
                  currentPath === item.path 
                    ? 'bg-emerald-800 text-white dark:bg-emerald-900/40 dark:text-amber-400 font-bold shadow-lg shadow-emerald-900/20' 
                    : 'text-emerald-800/60 dark:text-emerald-500/60 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:text-emerald-900 dark:hover:text-emerald-50'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon size={22} className="shrink-0" strokeWidth={currentPath === item.path ? 2.5 : 2} />
                {!isCollapsed && (
                  <span className="text-[15px] animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-emerald-100 dark:border-emerald-900/20 space-y-4">
            <button 
              onClick={toggleTheme}
              className={`w-full flex items-center rounded-2xl text-emerald-800/60 dark:text-emerald-500/60 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all duration-300 group ${
                isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'
              }`}
            >
              <div className="shrink-0 p-1 rounded-lg">
                {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-emerald-800" />}
              </div>
              {!isCollapsed && (
                <span className="text-[15px] font-bold animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap">
                  {isDark ? 'Light' : 'Dark'} Mode
                </span>
              )}
            </button>

            {user && (
              <div 
                onClick={() => onNavigate('/profile')}
                className={`flex items-center bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 transition-all duration-300 cursor-pointer hover:border-amber-400/50 ${
                isCollapsed ? 'p-2 justify-center' : 'p-3 gap-3'
              }`}>
                <div className="w-10 h-10 shrink-0 rounded-full border-2 border-white dark:border-emerald-800 shadow-sm overflow-hidden ring-2 ring-emerald-200 dark:ring-emerald-500/20">
                  <img 
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} 
                    alt="Avatar" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="font-black text-sm text-emerald-950 dark:text-emerald-50 truncate">{user.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-emerald-700 dark:text-amber-400 font-black uppercase tracking-widest truncate">{user.role}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <button 
                onClick={onLogout}
                className={`w-full flex items-center rounded-2xl text-emerald-800/40 dark:text-emerald-500/40 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200 group ${
                isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'
              }`}>
                <LogOut size={20} className="shrink-0" />
                {!isCollapsed && (
                  <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                    Sign Out
                  </span>
                )}
              </button>

              <button 
                onClick={toggleCollapse}
                className={`hidden md:flex w-full items-center rounded-2xl text-emerald-800/40 dark:text-emerald-500/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all duration-300 group ${
                  isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'
                }`}
              >
                {isCollapsed ? <ChevronRight size={20} className="shrink-0" /> : <ChevronLeft size={20} className="shrink-0" />}
                {!isCollapsed && (
                  <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                    Collapse
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden pb-24 md:pb-0">
        <main className="flex-1">
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-500">
            {children}
          </div>
        </main>
        
        <Footer onNavigate={onNavigate} />
      </div>

      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-white/90 dark:bg-[#0D1512]/90 backdrop-blur-xl border border-emerald-100 dark:border-emerald-900/30 rounded-[32px] h-16 flex items-center justify-around px-4 shadow-2xl z-[50]">
        {mobilePrimaryNav.map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
              currentPath === item.path 
                ? 'text-emerald-800 dark:text-amber-400' 
                : 'text-slate-400 dark:text-emerald-500/40'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${currentPath === item.path ? 'bg-emerald-50 dark:bg-amber-400/10' : ''}`}>
              <item.icon size={22} strokeWidth={currentPath === item.path ? 2.5 : 2} />
            </div>
          </button>
        ))}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 dark:text-emerald-500/40"
        >
          <div className="p-2 rounded-2xl">
            <MoreHorizontal size={22} />
          </div>
        </button>
      </div>

      <ChatAssistant 
        userRole={userRole || UserRole.TENANT} 
        userName={user?.name.split(' ')[0] || "Guest"} 
      />
    </div>
  );
};

export default Layout;
