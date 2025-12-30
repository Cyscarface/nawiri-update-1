
import React, { useState, useEffect } from 'react';
import { api } from '../services/mockApi';
import { Payment, User, PaymentStatus } from '../types';
import { CreditCard, History, CheckCircle, ArrowRight, Shield, Download } from 'lucide-react';

interface PaymentPageProps {
  currentUser: User;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ currentUser }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isPaying, setIsPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      const history = await api.payments.getByUser(currentUser.id);
      setPayments(history);
    };
    fetchPayments();
  }, [currentUser.id]);

  const handlePayRent = async () => {
    setIsPaying(true);
    // Simulate transaction delay
    setTimeout(async () => {
      const newPay = await api.payments.create({
        userId: currentUser.id,
        amount: 2500,
        type: 'Rent',
        propertyId: 'p1'
      });
      setPayments(prev => [newPay, ...prev]);
      setIsPaying(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header>
        <h1 className="text-4xl font-black text-emerald-950 dark:text-emerald-50 tracking-tight">Financial Portfolio</h1>
        <p className="text-emerald-700/60 dark:text-emerald-500/40 font-bold mt-2 uppercase tracking-widest text-xs">Manage transactions and rental commitments</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Payment Form Card */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-emerald-950 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <h3 className="text-xl font-black mb-8">Next Commitment</h3>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center text-emerald-100/60 font-bold uppercase tracking-widest text-[10px]">
                <span>Type</span>
                <span>Rent Payment</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-4xl font-black text-amber-400">$2,500.00</span>
                <span className="text-xs text-emerald-100/40 mb-1">Due March 1st</span>
              </div>
            </div>
            <button 
              onClick={handlePayRent}
              disabled={isPaying}
              className={`w-full py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all ${
                success ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-emerald-950 hover:scale-105 shadow-xl shadow-amber-400/20'
              }`}
            >
              {isPaying ? (
                <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin"></div>
              ) : success ? (
                <><CheckCircle size={20} /> Transaction Confirmed</>
              ) : (
                <><CreditCard size={20} /> Execute Payment <ArrowRight size={18} /></>
              )}
            </button>
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3 opacity-40">
              <Shield size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</span>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#0D1512] rounded-[40px] border border-slate-100 dark:border-emerald-900/20 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-emerald-900/20 flex justify-between items-center">
              <h3 className="text-xl font-black text-emerald-950 dark:text-emerald-50 flex items-center gap-3">
                <History size={24} className="text-emerald-800 dark:text-amber-400" /> Transaction Audit
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-emerald-950/20 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-emerald-500/40">
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5">Description</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Amount</th>
                    <th className="px-8 py-5">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-emerald-900/20">
                  {payments.map(pay => (
                    <tr key={pay.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-900/5 transition-colors">
                      <td className="px-8 py-6 text-sm font-bold text-slate-600 dark:text-emerald-100/60">{pay.date}</td>
                      <td className="px-8 py-6 font-black text-sm text-emerald-950 dark:text-emerald-50">{pay.type}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          pay.status === PaymentStatus.COMPLETED ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700' : 'bg-amber-50 dark:bg-amber-400/10 text-amber-600'
                        }`}>
                          {pay.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-black text-sm text-emerald-950 dark:text-emerald-50">${pay.amount.toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <button className="p-2 text-slate-400 hover:text-emerald-800 transition-colors"><Download size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
