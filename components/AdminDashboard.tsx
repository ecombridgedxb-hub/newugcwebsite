
import React, { useState, useEffect } from 'react';
import { Check, X, Shield, Clock, FileText, ExternalLink, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState('pending');
  const [selectedApp, setSelectedApp] = useState<any>(null);

  useEffect(() => {
    const loadApps = () => {
      const apps = JSON.parse(localStorage.getItem('uae_creator_applications') || '[]');
      setApplications(apps);
    };
    loadApps();
    // Poll for changes
    const interval = setInterval(loadApps, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = (id: number, newStatus: string) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status: newStatus, processedAt: new Date().toISOString() } : app
    );
    setApplications(updated);
    localStorage.setItem('uae_creator_applications', JSON.stringify(updated));
    setSelectedApp(null);
  };

  const filteredApps = applications.filter(app => app.status === filter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-heading tracking-tight mb-2">Curation Hub</h1>
            <p className="text-body font-medium">Internal application management for UAE Creators.</p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
            {['pending', 'approved', 'rejected'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-body hover:bg-gray-50'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredApps.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
                <Clock className="mx-auto text-gray-200 mb-6" size={48} />
                <p className="text-body font-bold text-lg">No {filter} applications found.</p>
              </div>
            ) : (
              filteredApps.map(app => (
                <motion.div 
                  key={app.id}
                  layoutId={app.id.toString()}
                  onClick={() => setSelectedApp(app)}
                  className={`bg-white p-6 rounded-3xl border transition-all cursor-pointer group ${selectedApp?.id === app.id ? 'border-primary ring-4 ring-primary/5' : 'border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-gray-200/40'}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-primary font-bold">
                        {app.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-heading text-lg">{app.fullName}</h4>
                        <p className="text-xs text-body font-medium">{app.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${app.status === 'pending' ? 'bg-amber-100 text-amber-600' : app.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                         {app.status}
                       </span>
                       <p className="text-[10px] text-gray-400 mt-2 font-medium">
                         {new Date(app.submittedAt).toLocaleDateString()}
                       </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedApp ? (
                <motion.div 
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 sticky top-12 border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-2xl font-extrabold text-heading tracking-tight">Profile View</h3>
                    <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                      <X size={20} className="text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Creator</label>
                      <p className="text-lg font-bold text-heading">{selectedApp.fullName} ({selectedApp.age})</p>
                      <p className="text-sm font-medium text-body">{selectedApp.country}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-2xl">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Instagram</label>
                         <p className="text-sm font-bold text-primary truncate">{selectedApp.instagram || 'N/A'}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">TikTok</label>
                         <p className="text-sm font-bold text-primary truncate">{selectedApp.tiktok || 'N/A'}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">License Verification</label>
                      <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 border border-gray-200">
                         {selectedApp.licenseBase64 ? (
                           <img src={selectedApp.licenseBase64} alt="License" className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-400">
                             <FileText size={40} />
                           </div>
                         )}
                         <a href={selectedApp.licenseBase64} target="_blank" className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg text-primary hover:scale-110 transition-transform">
                           <ExternalLink size={18} />
                         </a>
                      </div>
                    </div>

                    <div className="pt-6 grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')}
                        className="py-4 rounded-2xl bg-rose-50 text-rose-600 font-bold text-sm hover:bg-rose-100 transition-colors flex items-center justify-center space-x-2"
                      >
                        <X size={18} />
                        <span>Reject</span>
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(selectedApp.id, 'approved')}
                        className="py-4 rounded-2xl bg-emerald-50 text-emerald-600 font-bold text-sm hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Check size={18} />
                        <span>Approve</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-accent/10 rounded-[2.5rem] p-12 text-center border border-primary/10">
                  <Shield className="mx-auto text-primary mb-6" size={48} />
                  <h4 className="font-bold text-heading text-xl mb-3">Compliance Ready</h4>
                  <p className="text-body text-sm leading-relaxed font-medium">Select an application to verify credentials and manage access to the UAE Creators platform.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
