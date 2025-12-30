
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import MessagingPage from './pages/MessagingPage';
import PaymentPage from './pages/PaymentPage';
import ServicesPage from './pages/ServicesPage';
import { UserRole, User } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', '') || '/');

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
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Alex`
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

  if (!isLoggedIn) {
    if (currentPath === '/login') {
      return <LoginPage onLogin={handleLogin} />;
    }
    return <LandingPage onGetStarted={() => handleNavigate('/login')} onLogin={() => handleNavigate('/login')} />;
  }

  const renderContent = () => {
    if (!user) return null;
    switch (currentPath) {
      case '/':
        return <HomePage onSearch={() => handleNavigate('/search')} />;
      case '/search':
        return <SearchPage />;
      case '/dashboard':
        return <Dashboard userRole={user.role} userId={user.id} />;
      case '/profile':
        return <ProfilePage user={user} onUpdateUser={handleUpdateUser} />;
      case '/messages':
        return <MessagingPage currentUser={user} />;
      case '/payments':
        return <PaymentPage currentUser={user} />;
      case '/services':
        return <ServicesPage />;
      case '/admin':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-black">Global Oversight</h1>
            <div className="bg-white dark:bg-[#0D1512] p-12 rounded-[40px] shadow-sm border border-slate-100 dark:border-emerald-900/30 text-center">
               <p className="text-slate-400 italic">Advanced system analytics and moderation console.</p>
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
