
import React, { useState, useEffect } from 'react';
import { UserRole, Property, Application, MaintenanceRequest, MaintenanceStatus } from '../types';
import { api } from '../services/mockApi';
import { geminiService } from '../services/geminiService';
import { 
  Briefcase, CheckCircle, Clock, Home, 
  MessageCircle, TrendingUp, AlertTriangle, User as UserIcon,
  Zap, Wrench, ShieldCheck, ArrowUpRight, Plus
} from 'lucide-react';

interface DashboardProps {
  userRole: UserRole;
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, userId }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceRequest[]>([]);
  const [aiRecs, setAiRecs] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (userRole === UserRole.LANDLORD) {
        const owned = await api.properties.getByLandlord(userId);
        setProperties(owned);
        const allApps = await Promise.all(owned.map(p => api.applications.getByProperty(p.id)));
        setApplications(allApps.flat());
      } else if (userRole === UserRole.TENANT) {
        const myApps = await api.applications.getByUser(userId);
        setApplications(myApps);
        const allProps = await api.properties.list();
        const user = { id: userId, name: 'Alex', email: 'alex@test.com', role: UserRole.TENANT, verified: true };
        const recs = await geminiService.getRecommendations(user, allProps, "Searching for modern lofts near downtown under $3000");
        setAiRecs(recs);
      }
    };
    loadDashboardData();
  }, [userRole, userId]);

  const StatsCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white dark:bg-[#0D1512] p-6 lg:p-8 rounded-[32px] border border-slate-50 dark:border-emerald-900/20 shadow-sm hover:shadow-xl transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 lg:p-4 rounded-2xl ${color} shadow-lg ring-4 ring-slate-50 dark:ring-emerald-900/10`}>
          <Icon size={20} className="text-white lg:w-6 lg:h-6" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-slate-400 dark:text-emerald-500/40 uppercase tracking-[0.2em]">Insights</span>
          {trend && <span className="text-[10px] lg:text-xs font-bold text-emerald-600 dark:text-amber-400 flex items-center gap-1 mt-1"><ArrowUpRight size={12}/> {trend}</span>}
        </div>
      </div>
      <h3 className="text-slate-500 dark:text-emerald-500/60 text-xs lg:text-sm font-bold tracking-tight">{title}</h3>
      <p className="text-3xl lg:text-4xl font-black mt-2 text-emerald-950 dark:text-emerald-50">{value}</p>
    </div>
  );

  return (
    <div className="space-y-10 lg:space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-emerald-700 dark:text-amber-400 font-black text-xs uppercase tracking-widest mb-2 block">Morning, Alex</span>
          <h1 className="text-3xl lg:text-5xl font-black text-emerald-950 dark:text-emerald-50 tracking-tight">Your Portfolio Intelligence</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="bg-white dark:bg-[#0D1512] border border-slate-100 dark:border-emerald-900/30 px-6 lg:px-8 py-3 rounded-2xl text-xs lg:text-sm font-black text-slate-600 dark:text-emerald-200 hover:bg-slate-50 dark:hover:bg-emerald-900/10 shadow-sm transition-all">Audit Activity</button>
          <button className="bg-emerald-800 dark:bg-amber-400 dark:text-emerald-950 text-white px-6 lg:px-8 py-3 rounded-2xl text-xs lg:text-sm font-black hover:bg-emerald-900 dark:hover:bg-amber-300 shadow-xl shadow-emerald-900/20 dark:shadow-amber-400/10 flex items-center gap-2 group transition-all">
            {userRole === UserRole.LANDLORD ? <><Plus size={16}/> List Estate</> : 'Explore Residences'}
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
        <StatsCard 
          title={userRole === UserRole.LANDLORD ? "Active Estates" : "Applications"} 
          value={userRole === UserRole.LANDLORD ? properties.length : applications.length} 
          icon={Home} 
          color="bg-emerald-800" 
          trend="+12%"
        />
        <StatsCard 
          title="Direct Inquiries" 
          value="4" 
          icon={MessageCircle} 
          color="bg-slate-900 dark:bg-emerald-700" 
        />
        <StatsCard 
          title="Open Logistics" 
          value="2" 
          icon={Clock} 
          color="bg-amber-600" 
        />
        <StatsCard 
          title="Portfolio Value" 
          value="$4.2k" 
          icon={TrendingUp} 
          color="bg-emerald-600" 
          trend="+5.4%"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Feed */}
        <div className="xl:col-span-2 space-y-10 lg:space-y-12">
          {/* Recent Activity */}
          <section className="bg-white dark:bg-[#0D1512] rounded-[32px] lg:rounded-[40px] border border-slate-50 dark:border-emerald-900/20 shadow-sm overflow-hidden">
            <div className="px-6 lg:px-10 py-6 lg:py-8 border-b border-slate-50 dark:border-emerald-900/20 flex justify-between items-center">
              <h2 className="text-xl lg:text-2xl font-black text-emerald-950 dark:text-emerald-50">Recent Intelligence</h2>
              <button className="text-emerald-800 dark:text-amber-400 text-xs lg:text-sm font-bold hover:underline">Full Audit</button>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-emerald-900/20">
              {applications.length > 0 ? (
                applications.map(app => (
                  <div key={app.id} className="px-6 lg:px-10 py-6 lg:py-8 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-emerald-900/5 transition-colors group">
                    <div className="flex items-center gap-4 lg:gap-6">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-800 dark:text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                        <Home size={24} className="lg:w-7 lg:h-7" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-sm lg:text-base text-emerald-950 dark:text-emerald-50 truncate">Residency App #{app.propertyId.slice(-4)}</p>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-emerald-500/40 mt-1 uppercase tracking-wider">Processed {new Date(app.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`px-3 lg:px-5 py-1.5 lg:py-2 rounded-xl text-[10px] font-black tracking-widest uppercase shrink-0 ${
                      app.status === 'PENDING' ? 'bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-12 lg:p-20 text-center text-slate-400">
                  <div className="mb-4 lg:mb-6 flex justify-center"><Briefcase size={48} className="opacity-10 lg:w-16 lg:h-16" /></div>
                  <p className="font-bold text-sm lg:text-base">Waiting for market activity...</p>
                </div>
              )}
            </div>
          </section>

          {/* AI Recommendations */}
          {userRole === UserRole.TENANT && aiRecs.length > 0 && (
            <section className="bg-gradient-to-br from-emerald-950 to-emerald-800 rounded-[32px] lg:rounded-[48px] p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 lg:w-64 lg:h-64 bg-amber-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] lg:blur-[100px]"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8 lg:mb-10">
                  <div className="p-2 lg:p-3 bg-amber-400 text-emerald-950 rounded-2xl shadow-xl shadow-amber-400/20"><Zap size={20} className="lg:w-6 lg:h-6" /></div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-black tracking-tight">Curated Matches</h2>
                    <p className="text-emerald-200/60 text-xs lg:text-sm font-medium">AI-driven portfolio suggestions.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {aiRecs.map((rec, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 lg:p-8 rounded-3xl hover:bg-white/10 transition-all cursor-pointer group">
                      <p className="text-amber-400 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] mb-4">Market Opportunity</p>
                      <p className="text-sm lg:text-base font-medium italic mb-6 leading-relaxed">"{rec.reason}"</p>
                      <button className="text-white text-xs lg:text-sm font-black flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Sanctuary <ArrowUpRight size={16} className="text-amber-400 lg:w-[18px] lg:h-[18px]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8 lg:space-y-10">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-[#0D1512] p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-50 dark:border-emerald-900/20 shadow-sm">
            <h3 className="font-black text-lg lg:text-xl text-emerald-950 dark:text-emerald-50 mb-6 lg:mb-8">Executive Actions</h3>
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {[
                { label: 'Transact', icon: Clock, color: 'text-emerald-800 bg-emerald-50' },
                { label: 'Logistics', icon: Wrench, color: 'text-amber-600 bg-amber-50' },
                { label: 'Artifacts', icon: Briefcase, color: 'text-slate-800 bg-slate-50' },
                { label: 'Concierge', icon: MessageCircle, color: 'text-emerald-900 bg-emerald-100' }
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-start gap-3 lg:gap-4 p-4 lg:p-6 rounded-[24px] hover:bg-slate-50 dark:hover:bg-emerald-900/10 transition-all border border-transparent hover:border-slate-100 dark:hover:border-emerald-900/20 group">
                  <div className={`p-3 lg:p-4 rounded-2xl ${action.color} group-hover:scale-110 transition-transform shadow-sm`}>
                    <action.icon size={18} className="lg:w-[22px] lg:h-[22px]" />
                  </div>
                  <span className="text-[11px] lg:text-[13px] font-black text-slate-700 dark:text-emerald-200 uppercase tracking-tighter">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-slate-900 dark:bg-emerald-950/80 text-white p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] relative overflow-hidden shadow-2xl border border-white/5">
            <ShieldCheck className="absolute -right-6 -bottom-6 w-32 h-32 lg:w-48 lg:h-48 text-emerald-500 opacity-[0.03]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-9 h-9 lg:w-10 lg:h-10 bg-emerald-500/20 flex items-center justify-center rounded-xl text-emerald-400 ring-1 ring-emerald-500/30">
                  <ShieldCheck size={20} className="lg:w-6 lg:h-6" />
                </div>
                <h3 className="font-black text-base lg:text-lg tracking-tight">Profile Integrity</h3>
              </div>
              <p className="text-slate-400 dark:text-emerald-500/60 text-[11px] lg:text-[13px] mb-6 lg:mb-8 leading-relaxed font-medium">Your identity has been fully verified to premium standards.</p>
              <div className="w-full bg-slate-800 dark:bg-emerald-900/40 rounded-full h-1.5 lg:h-2 mb-4 lg:mb-6 ring-1 ring-white/5">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1.5 lg:h-2 rounded-full w-[100%] shadow-[0_0_12px_rgba(16,185,129,0.3)]"></div>
              </div>
              <button className="text-[10px] font-black text-amber-400 uppercase tracking-widest hover:text-amber-300 transition-colors">Digital Credentials</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
