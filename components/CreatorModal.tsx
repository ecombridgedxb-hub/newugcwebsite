
import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Upload, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    phone: '',
    instagram: '',
    tiktok: '',
    otherSocial: '',
    hasLicense: '',
    hasExperience: '',
    openToUnpaid: '',
    style: '',
    consentAge: false,
    consentContact: false,
    licenseFile: null as File | null,
    licenseBase64: '' as string
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (name === 'age' && parseInt(value) < 18) {
      setErrors(prev => ({ ...prev, age: "Must be 18 or older." }));
    } else if (name === 'age') {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs.age;
        return newErrs;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          licenseFile: file,
          licenseBase64: reader.result as string
        }));
      };
      reader.readAsDataURL(file);

      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs.license;
        return newErrs;
      });
    }
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Name is required";
      if (!formData.age || parseInt(formData.age) < 18) newErrors.age = "Must be 18 or older";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    }
    if (step === 2) {
      if (!formData.licenseFile) newErrors.license = "License file is required";
    }
    if (step === 3) {
      if (!formData.instagram && !formData.tiktok) newErrors.social = "Social handle is required";
    }
    if (step === 5) {
      if (!formData.consentAge || !formData.consentContact) newErrors.consent = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // Backend simulation: Save to localStorage with 'pending' status
      const application = {
        id: Date.now(),
        ...formData,
        licenseFile: undefined, // Don't store actual File object in JSON
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      
      const existingApps = JSON.parse(localStorage.getItem('uae_creator_applications') || '[]');
      localStorage.setItem('uae_creator_applications', JSON.stringify([...existingApps, application]));
      
      setIsSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"
      ></motion.div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-gray-400 hover:text-heading transition-colors z-20"
        >
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="p-12 pb-6">
              <h3 className="text-3xl font-extrabold text-heading mb-2 tracking-tight">Application</h3>
              <p className="text-body text-sm font-medium mb-10">Request access to the curated UAE network.</p>
              
              <div className="relative h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                ></motion.div>
              </div>
            </div>

            <div className="flex-1 px-12 pb-8 overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Full Name</label>
                      <input 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Sarah Ahmed"
                        className={`w-full p-4 bg-[#F9FAFB] border rounded-2xl outline-none transition-all ${errors.fullName ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-primary/20'}`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Age</label>
                        <input 
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                          className={`w-full p-4 bg-[#F9FAFB] border rounded-2xl outline-none ${errors.age ? 'border-red-500' : 'border-transparent focus:bg-white'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Residence</label>
                        <select 
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
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
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Email</label>
                      <input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-4 bg-[#F9FAFB] border rounded-2xl outline-none ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">UAE Content License</label>
                      <p className="text-[11px] text-body mb-4 font-medium leading-relaxed">
                        A valid NMC or freelancer influencer license is mandatory for all content creators operating within the UAE to ensure compliance with local regulations.
                      </p>
                      <div className={`relative group border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all ${formData.licenseFile ? 'bg-accent/10 border-primary' : 'bg-[#F9FAFB] border-gray-200 hover:border-primary/40'}`}>
                        <input 
                          type="file"
                          accept=".pdf,image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {formData.licenseFile ? (
                          <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-4">
                              <FileText size={32} />
                            </div>
                            <span className="text-sm font-bold text-heading mb-1">{formData.licenseFile.name}</span>
                            <span className="text-xs text-primary font-bold">File Attached</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm mb-4 group-hover:text-primary transition-colors">
                              <Upload size={32} />
                            </div>
                            <span className="text-sm font-bold text-heading mb-1">Click to upload license</span>
                            <span className="text-xs text-body font-medium">PDF or Image (Max 5MB)</span>
                          </div>
                        )}
                      </div>
                      {errors.license && <p className="text-xs font-bold text-red-500 mt-2">{errors.license}</p>}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Instagram</label>
                      <input 
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="@username"
                        className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">TikTok</label>
                      <input 
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={handleInputChange}
                        placeholder="@username"
                        className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Collaboration Type</label>
                    <div className="grid grid-cols-1 gap-3">
                        {['Paid Only', 'Hybrid (Products + Cash)', 'Open to Samples'].map(opt => (
                          <label key={opt} className={`flex items-center p-4 rounded-2xl cursor-pointer border transition-all ${formData.openToUnpaid === opt ? 'bg-primary/5 border-primary' : 'bg-[#F9FAFB] border-transparent'}`}>
                            <input 
                              type="radio" 
                              name="openToUnpaid" 
                              value={opt} 
                              checked={formData.openToUnpaid === opt}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <span className={`text-sm font-bold ${formData.openToUnpaid === opt ? 'text-primary' : 'text-body'}`}>{opt}</span>
                          </label>
                        ))}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div 
                    key="step5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="p-8 bg-accent/20 rounded-3xl border border-primary/10">
                      <div className="space-y-6">
                        <label className="flex items-start space-x-4 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="consentAge" 
                            checked={formData.consentAge}
                            onChange={handleInputChange}
                            className="mt-1 w-5 h-5 accent-primary"
                          />
                          <span className="text-xs font-medium text-heading leading-relaxed">
                            I am 18+ and live in the UAE.
                          </span>
                        </label>
                        <label className="flex items-start space-x-4 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="consentContact" 
                            checked={formData.consentContact}
                            onChange={handleInputChange}
                            className="mt-1 w-5 h-5 accent-primary"
                          />
                          <span className="text-xs font-medium text-heading leading-relaxed">
                            I agree to receive invites via Email or WhatsApp.
                          </span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-12 pt-0 flex space-x-4">
              {step > 1 && (
                <button 
                  onClick={prevStep}
                  className="flex items-center justify-center w-14 h-14 bg-gray-100 text-heading rounded-2xl hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              {step < 5 ? (
                <button 
                  onClick={nextStep}
                  className="flex-1 bg-heading text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all"
                >
                  <span>Next Step</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                >
                  Submit Request
                </button>
              )}
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-16 text-center"
          >
            <div className="w-24 h-24 bg-accent/40 rounded-full flex items-center justify-center mb-10">
              <CheckCircle2 size={48} className="text-primary" />
            </div>
            <h3 className="text-3xl font-extrabold text-heading mb-4 tracking-tight">Request Received</h3>
            <p className="text-body font-medium leading-relaxed mb-10 max-w-xs">
              Thank you for applying. Our curation team will review your profile and reach out within 48 hours.
            </p>
            <button 
              onClick={onClose}
              className="px-12 py-4 bg-heading text-white font-bold rounded-2xl hover:scale-105 transition-all"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CreatorModal;
