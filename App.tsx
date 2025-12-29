
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import { UserRole, User } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', '') || '/');

  // Simple navigation handler
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (role: UserRole) => {
    const mockUser: User = {
      id: 'u1',
      name: 'Alex Johnson',
      email: 'alex.j@prestige.com',
      role: role,
      verified: true,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role + Date.now()}`
    };
    setUser(mockUser);
    setIsLoggedIn(true);
    handleNavigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    handleNavigate('/');
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.replace('#', '') || '/';
      setCurrentPath(path);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Public Experience (Unauthenticated)
  if (!isLoggedIn) {
    if (currentPath === '/login') {
      return <LoginPage onLogin={handleLogin} />;
    }
    return <LandingPage onGetStarted={() => handleNavigate('/login')} onLogin={() => handleNavigate('/login')} />;
  }

  // Logged In Experience
  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onSearch={() => handleNavigate('/search')} />;
      case '/search':
        return <SearchPage />;
      case '/dashboard':
        return <Dashboard userRole={user?.role || UserRole.TENANT} userId={user?.id || 'u1'} />;
      case '/profile':
        return user ? <ProfilePage user={user} onUpdateUser={handleUpdateUser} /> : null;
      case '/messages':
        return (
          <div className="h-[600px] flex items-center justify-center bg-white dark:bg-[#0D1512] rounded-[40px] border border-dashed border-slate-300 dark:border-emerald-800/30 text-slate-400 italic">
            Messaging System Interface (Mock)
          </div>
        );
      case '/maintenance':
        return (
          <div className="h-[600px] flex items-center justify-center bg-white dark:bg-[#0D1512] rounded-[40px] border border-dashed border-slate-300 dark:border-emerald-800/30 text-slate-400 italic">
            Maintenance Workflow Interface (Mock)
          </div>
        );
      case '/admin':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Admin Moderation</h1>
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-8 rounded-[40px] text-red-800 dark:text-red-400">
              <h2 className="font-bold mb-2">Flagged Listings (AI Detected)</h2>
              <p className="text-sm">Gemini has identified 3 listings with suspicious low-price patterns in Downtown SF.</p>
            </div>
            <div className="bg-white dark:bg-[#0D1512] p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-emerald-900/30">
               <p className="text-slate-400 text-center italic">Advanced analytics and audit logs module</p>
            </div>
          </div>
        );
      default:
        return <HomePage onSearch={() => handleNavigate('/search')} />;
    }
  };

  return (
    <Layout 
      user={user}
      onNavigate={handleNavigate} 
      currentPath={currentPath}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
