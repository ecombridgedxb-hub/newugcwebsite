import React, { useState } from 'react';
import { X, Upload, FileText, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    country: 'Dubai',
    email: '',
    instagram: '',
    tiktok: '',
    collabType: '',
    consentAge: false,
    consentContact: false,
    licenseFile: null as File | null,
    licenseName: ''
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    setIsSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ 
        ...formData, 
        licenseFile: e.target.files[0],
        licenseName: e.target.files[0].name 
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"></div>

      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-gray-400 hover:text-[#0F172A] transition-colors z-20"
        >
          <X style={{ width: 24, height: 24 }} />
        </button>

        {!isSubmitted ? (
          <div className="flex flex-col h-full">
            <div className="p-12 pb-6">
              <h3 className="text-3xl font-extrabold text-[#0F172A] mb-2 tracking-tight">Application</h3>
              <p className="text-[#6B7280] text-sm font-medium mb-10">Request access to the curated UAE network.</p>
              
              <div className="relative h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#1FAE9A] transition-all duration-500" 
                  style={{ width: `${(step / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex-1 px-12 pb-8 overflow-y-auto">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3">Full Name</label>
                    <input 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Sarah Ahmed"
                      className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#1FAE9A]/20 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3">Age</label>
                      <input 
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3">Residence</label>
                      <select 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none"
                      >
                        <option>Dubai</option>
                        <option>Abu Dhabi</option>
                        <option>Sharjah</option>
                        <option>Other UAE</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3">Email</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3">UAE Content License</label>
                    <p className="text-[11px] text-[#6B7280] mb-4 font-medium leading-relaxed">
                      A valid NMC or freelancer influencer license is mandatory for all content creators operating within the UAE.
                    </p>
                    <div className={`relative group border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all ${formData.licenseName ? 'bg-[#D1FAE5]/10 border-[#1FAE9A]' : 'bg-[#F9FAFB] border-gray-200 hover:border-[#1FAE9A]/40'}`}>
                      <input 
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {!formData.licenseName ? (
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm mb-4 group-hover:text-[#1FAE9A] transition-colors">
                            <Upload style={{ width: 32, height: 32 }} />
                          </div>
                          <span className="text-sm font-bold text-[#0F172A] mb-1">Click to upload license</span>
                          <span className="text-xs text-[#6B7280] font-medium">PDF or Image (Max 5MB)</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-[#1FAE9A] rounded-2xl flex items-center justify-center text-white mb-4">
                            <FileText style={{ width: 32, height: 32 }} />
                          </div>
                          <span className="text-sm font-bold text-[#0F172A] mb-1">{formData.licenseName}</span>
                          <span className="text-xs text-[#1FAE9A] font-bold">File Attached</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3">Instagram</label>
                    <input 
                      value={formData.instagram}
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                      placeholder="@username" 
                      className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3">TikTok</label>
                    <input 
                      value={formData.tiktok}
                      onChange={(e) => setFormData({...formData, tiktok: e.target.value})}
                      placeholder="@username" 
                      className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white" 
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3">Collaboration Type</label>
                  <div className="grid grid-cols-1 gap-3">
                    {['Paid Only', 'Hybrid (Products + Cash)', 'Open to Samples'].map((type) => (
                      <label key={type} className="flex items-center p-4 rounded-2xl cursor-pointer border bg-[#F9FAFB] border-transparent hover:border-[#1FAE9A]/20">
                        <input 
                          type="radio" 
                          name="collabType" 
                          value={type} 
                          checked={formData.collabType === type}
                          onChange={(e) => setFormData({...formData, collabType: e.target.value})}
                          className="mr-3 accent-[#1FAE9A]" 
                        />
                        <span className="text-sm font-bold text-[#6B7280]">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div className="p-8 bg-[#D1FAE5]/20 rounded-3xl border border-[#1FAE9A]/10">
                    <div className="space-y-6">
                      <label className="flex items-start space-x-4 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.consentAge}
                          onChange={(e) => setFormData({...formData, consentAge: e.target.checked})}
                          className="mt-1 w-5 h-5 accent-[#1FAE9A]" 
                        />
                        <span className="text-xs font-medium text-[#0F172A] leading-relaxed">I am 18+ and live in the UAE.</span>
                      </label>
                      <label className="flex items-start space-x-4 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.consentContact}
                          onChange={(e) => setFormData({...formData, consentContact: e.target.checked})}
                          className="mt-1 w-5 h-5 accent-[#1FAE9A]" 
                        />
                        <span className="text-xs font-medium text-[#0F172A] leading-relaxed">I agree to receive invites via Email or WhatsApp.</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-12 pt-0 flex space-x-4">
              {step > 1 && (
                <button 
                  onClick={handlePrev}
                  className="flex items-center justify-center w-14 h-14 bg-gray-100 text-[#0F172A] rounded-2xl hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft style={{ width: 24, height: 24 }} />
                </button>
              )}
              {step < 5 ? (
                <button 
                  onClick={handleNext}
                  className="flex-1 bg-[#0F172A] text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all"
                >
                  <span>Next Step</span>
                  <ChevronRight style={{ width: 18, height: 18 }} />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-[#1FAE9A] text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all shadow-xl shadow-[#1FAE9A]/20"
                >
                  Submit Request
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-16 text-center">
            <div className="w-24 h-24 bg-[#D1FAE5]/40 rounded-full flex items-center justify-center mb-10">
              <CheckCircle2 className="text-[#1FAE9A]" style={{ width: 48, height: 48 }} />
            </div>
            <h3 className="text-3xl font-extrabold text-[#0F172A] mb-4 tracking-tight">Request Received</h3>
            <p className="text-[#6B7280] font-medium leading-relaxed mb-10 max-w-xs">
              Thank you for applying. Our curation team will review your profile and reach out within 48 hours.
            </p>
            <button 
              onClick={onClose}
              className="px-12 py-4 bg-[#0F172A] text-white font-bold rounded-2xl hover:scale-105 transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorModal;
