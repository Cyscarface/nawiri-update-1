
import React, { useState, useEffect } from 'react';
import { UserRole, Property, Application, MaintenanceRequest, MaintenanceStatus, Payment, PaymentStatus } from '../types';
import { api } from '../services/mockApi';
// Added ShieldCheck and Sparkles to the lucide-react imports
import { 
  CreditCard, MessageSquare, Wrench, Calendar, 
  ArrowUpRight, AlertCircle, CheckCircle2, 
  Home, Users, TrendingUp, Plus, ArrowRight,
  ExternalLink, Clock, ShieldCheck, Sparkles
} from 'lucide-react';

interface DashboardProps {
  userRole: UserRole;
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, userId }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    properties: Property[];
    applications: Application[];
    maintenance: MaintenanceRequest[];
    payments: Payment[];
  }>({
    properties: [],
    applications: [],
    maintenance: [],
    payments: []
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        if (userRole === UserRole.LANDLORD) {
          const owned = await api.properties.getByLandlord(userId);
          const allApps = await Promise.all(owned.map(p => api.applications.getByProperty(p.id)));
          setData({
            properties: owned,
            applications: allApps.flat(),
            maintenance: [], // Mocked as empty for now
            payments: [] // In a real app, fetch payments for these properties
          });
        } else {
          const myApps = await api.applications.getByUser(userId);
          const history = await api.payments.getByUser(userId);
          setData({
            properties: [], // Tenants see their active lease elsewhere or via applications
            applications: myApps,
            maintenance: [], 
            payments: history
          });
        }
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [userRole, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isLandlord = userRole === UserRole.LANDLORD;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-emerald-950 dark:text-emerald-50 tracking-tight">
            Control Center
          </h1>
          <p className="text-slate-400 dark:text-emerald-500/40 text-sm font-bold uppercase tracking-widest mt-1">
            Operational Overview &bull; {isLandlord ? 'Estate Management' : 'Residency Portal'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-black text-emerald-800 dark:text-amber-400 uppercase tracking-widest">System Status</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-emerald-950 dark:text-emerald-50">Neural Link Active</span>
          </div>
        </div>
      </div>

      {/* Action Required Panel (Critical items) */}
      <section className="bg-amber-50 dark:bg-amber-400/5 border border-amber-200 dark:border-amber-400/20 rounded-[32px] p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-amber-600 dark:text-amber-400" size={20} />
          <h2 className="text-sm font-black text-amber-900 dark:text-amber-200 uppercase tracking-widest">Attention Required</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!isLandlord && (
            <div className="bg-white dark:bg-[#0D1512] p-4 rounded-2xl flex items-center justify-between border border-amber-200/50 dark:border-amber-400/10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-400/10 rounded-xl text-amber-600 dark:text-amber-400">
                  <CreditCard size={18} />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-emerald-100">March Rent Payment</span>
              </div>
              <button className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase hover:underline">Pay Now</button>
            </div>
          )}
          <div className="bg-white dark:bg-[#0D1512] p-4 rounded-2xl flex items-center justify-between border border-amber-200/50 dark:border-amber-400/10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-400/10 rounded-xl text-amber-600 dark:text-amber-400">
                <MessageSquare size={18} />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-emerald-100">2 Unread Messages</span>
            </div>
            <button className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase hover:underline">View</button>
          </div>
          <div className="bg-white dark:bg-[#0D1512] p-4 rounded-2xl flex items-center justify-between border border-amber-200/50 dark:border-amber-400/10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-400/10 rounded-xl text-amber-600 dark:text-amber-400">
                <Clock size={18} />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-emerald-100">Maintenance Update</span>
            </div>
            <button className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase hover:underline">Track</button>
          </div>
        </div>
      </section>

      {/* Primary Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Stats & Financials */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Financial Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-950 rounded-[32px] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6">
                {isLandlord ? 'Portfolio Revenue' : 'Financial Balance'}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-4xl font-black text-white leading-none">
                    {isLandlord ? '$12,450' : '$2,500'}
                  </h3>
                  <p className="text-xs font-bold text-emerald-100/40 mt-2">
                    {isLandlord ? 'Total Expected March' : 'Total Outstanding'}
                  </p>
                </div>
                {isLandlord && (
                  <div className="text-right">
                    <span className="text-emerald-400 text-sm font-black flex items-center gap-1">
                      <TrendingUp size={16} /> 94%
                    </span>
                    <p className="text-[10px] text-emerald-100/20 font-bold uppercase mt-1">Collection Rate</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0D1512] rounded-[32px] p-8 border border-slate-100 dark:border-emerald-900/20 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-emerald-500/40 mb-6">
                {isLandlord ? 'Occupancy Stats' : 'Lease Integrity'}
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-emerald-900/10 flex items-center justify-center border border-slate-100 dark:border-emerald-900/20">
                  {isLandlord ? <Users size={32} className="text-emerald-800 dark:text-amber-400" /> : <ShieldCheck size={32} className="text-emerald-800 dark:text-amber-400" />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-emerald-950 dark:text-emerald-50">
                    {isLandlord ? `${data.properties.length} Active` : '98 Score'}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 dark:text-emerald-500/60 mt-1">
                    {isLandlord ? 'Properties in Portfolio' : 'Verified Profile Score'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity / Communications Center */}
          <div className="bg-white dark:bg-[#0D1512] rounded-[32px] border border-slate-100 dark:border-emerald-900/20 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-emerald-900/20 flex justify-between items-center">
              <h3 className="font-black text-lg text-emerald-950 dark:text-emerald-50">Intelligence Feed</h3>
              <button className="text-[10px] font-black text-emerald-800 dark:text-amber-400 uppercase tracking-widest hover:underline">History</button>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-emerald-900/10">
              <div className="p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-emerald-900/5 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-800 dark:text-amber-400 shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-black text-emerald-950 dark:text-emerald-50">New message from Jane Smith</p>
                    <span className="text-[10px] text-slate-400 font-bold">10m ago</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-emerald-500/60 mt-1 line-clamp-1 font-medium">The move-in documents are ready for your review and digital signature...</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </div>
              <div className="p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-emerald-900/5 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-800 dark:text-amber-400 shrink-0">
                  <Wrench size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-black text-emerald-950 dark:text-emerald-50">Maintenance Ticket #4412</p>
                    <span className="text-[10px] text-slate-400 font-bold">Yesterday</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-emerald-500/60 mt-1 line-clamp-1 font-medium">Status updated to: IN PROGRESS. Expert 'Volt Masters' is on site.</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions & Maintenance */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Quick Action Hub */}
          <div className="bg-white dark:bg-[#0D1512] rounded-[32px] p-8 border border-slate-100 dark:border-emerald-900/20 shadow-sm">
            <h3 className="font-black text-lg text-emerald-950 dark:text-emerald-50 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-4 rounded-2xl bg-emerald-800 dark:bg-amber-400 text-white dark:text-emerald-950 flex items-center justify-between group hover:scale-[1.02] transition-all">
                <div className="flex items-center gap-3">
                  <Plus size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">{isLandlord ? 'Add Property' : 'Pay Rent'}</span>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-emerald-900/10 text-emerald-950 dark:text-emerald-100 border border-slate-100 dark:border-emerald-800/20 flex items-center justify-between group hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3">
                  <Wrench size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Maintenance Request</span>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-emerald-900/10 text-emerald-950 dark:text-emerald-100 border border-slate-100 dark:border-emerald-800/20 flex items-center justify-between group hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3">
                  <Calendar size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Book Services</span>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Active Lease / Property Overview */}
          <div className="bg-white dark:bg-[#0D1512] rounded-[32px] p-8 border border-slate-100 dark:border-emerald-900/20 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-lg text-emerald-950 dark:text-emerald-50">{isLandlord ? 'Portfolio Pulse' : 'Lease Summary'}</h3>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-800 dark:text-amber-400">
                <Home size={16} />
              </div>
            </div>
            
            <div className="space-y-6">
              {isLandlord ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Occupancy Rate</span>
                    <span className="text-emerald-600 font-black">88%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-emerald-900/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[88%]"></div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Pending Renewals</span>
                    <span className="text-amber-600 font-black">3 Assets</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-slate-100 dark:border-emerald-800/20">
                    <p className="text-[10px] font-black text-slate-400 dark:text-emerald-500/40 uppercase tracking-widest">Active Residence</p>
                    <p className="text-sm font-black text-emerald-950 dark:text-emerald-50 mt-1">Modern Downtown Loft</p>
                    <p className="text-[10px] text-emerald-700 dark:text-amber-400 font-bold mt-1">Lease expires: Jan 2025</p>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase text-emerald-800 dark:text-amber-400 hover:scale-105 transition-transform">
                    View Agreement <ExternalLink size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* System Announcement Card */}
          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
            <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" />
            <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-2">Neural Update</h4>
            <p className="text-xs text-white/60 leading-relaxed font-medium">
              We've upgraded our maintenance matching algorithm. Providers now arrive 20% faster on average.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
