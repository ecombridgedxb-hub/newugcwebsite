import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Upload, FileText, Camera, Video, DollarSign, PenTool, Globe, Calendar, Briefcase, MapPin, Heart, Shield, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InputField = ({ label, name, type = "text", placeholder = "", required = false, formData, handleInputChange, errors }: any) => (
  <div>
    <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={formData[name] || ''}
      onChange={handleInputChange}
      onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
      placeholder={placeholder}
      className={`w-full p-4 bg-[#F9FAFB] border rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all ${errors && errors[name] ? 'border-red-500' : 'border-transparent'}`}
    />
    {errors && errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
  </div>
);

const SelectField = ({ label, name, options, formData, handleInputChange }: any) => (
  <div>
    <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-2">{label}</label>
    <select
      name={name}
      value={formData[name] || ''}
      onChange={handleInputChange}
      className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white"
    >
      <option value="">Select...</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectedGifted, setRejectedGifted] = useState(false);

  // 🚨 GOOGLE WEB APP URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby4vdXONgYh5gVdlQGArvov1Goa5ILiwRPQzPm9JbG31hXM4eE8aLvz3rizcgOFWreY/exec";

  const [formData, setFormData] = useState({
    // Step 1: Personal & Gifted Check
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    residence: 'Dubai',
    email: '',
    phone: '',
    acceptGifted: '',

    // Step 2: Licenses & IDs
    licenseStatus: '',
    licenseBase64: '',
    emiratesIdBase64: '',
    visaBase64: '',

    // Step 3: Social & Portfolio
    socialPlatforms: [] as string[],
    socialLinks: {} as { [key: string]: string },
    portfolio: '',
    contentLanguages: [] as string[],

    // Step 4: Content Expertise
    interests: [] as string[],
    consistency: '',
    editing: '',
    equipment: '',

    // Step 5: Collaboration
    availabilityOnSite: '',
    tat: '',
    exclusivity: '',

    // Step 6: Verification
    legalConsent: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    if (['contentLanguages', 'interests', 'socialPlatforms'].includes(name)) {
      setFormData(prev => {
        const list = prev[name as keyof typeof prev] as string[];
        if (checked) return { ...prev, [name]: [...list, value] };
        else return { ...prev, [name]: list.filter(item => item !== value) };
      });
      return;
    }

    if (type === 'checkbox' && name === 'legalConsent') {
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => {
      const newErrs = { ...prev };
      delete newErrs[name];
      return newErrs;
    });
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = "Required";
      if (!formData.lastName) newErrors.lastName = "Required";
      if (!formData.age || parseInt(formData.age) < 18) newErrors.age = "18+ only";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid";
      if (!formData.phone) newErrors.phone = "Required";
      if (!formData.acceptGifted) newErrors.acceptGifted = "Selection required";
    }

    if (currentStep === 6 && !formData.legalConsent) {
      newErrors.legalConsent = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToGoogle = async (data: any) => {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
        mode: 'no-cors'
      });
    } catch (e) {
      console.error("Submission error", e);
    }
  };

  const nextStep = async () => {
    if (validateStep(step)) {
      if (step === 1 && formData.acceptGifted === 'No') {
        setIsSubmitting(true);
        await submitToGoogle(formData);
        setIsSubmitting(false);
        setRejectedGifted(true);
        setIsSubmitted(true);
      } else {
        setStep(prev => prev + 1);
      }
    }
  };

  const handleSubmit = async () => {
    if (validateStep(step)) {
      setIsSubmitting(true);
      await submitToGoogle(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md" />

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-heading z-20">
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="px-8 pt-8 pb-4 border-b border-gray-100 bg-white z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-extrabold text-heading tracking-tight">Creator Registration</h3>
                <span className="text-xs font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Step {step} of {totalSteps}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${(step / totalSteps) * 100}%` }} />
              </div>
            </div>

            <div className="flex-1 px-8 py-6 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Shield className="w-5 h-5 mr-2" /> Personal & Legal</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="First Name" name="firstName" required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                      <InputField label="Last Name" name="lastName" required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Age" name="age" type="number" required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                      <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Prefer not to say']} formData={formData} handleInputChange={handleInputChange} />
                    </div>
                    <SelectField label="Primary Residence" name="residence" options={['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah']} formData={formData} handleInputChange={handleInputChange} />
                    <InputField label="Email Address" name="email" type="email" required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                    <InputField label="Phone / WhatsApp" name="phone" required formData={formData} handleInputChange={handleInputChange} errors={errors} />

                    <div className="p-4 bg-accent/10 rounded-2xl border border-primary/10">
                      <p className="text-sm font-bold text-heading mb-3">We are currently focused on GIFTED COLLABORATIONS (products as payment). Do you operate within this agreement?</p>
                      <div className="flex gap-4">
                        {['Yes', 'No'].map(opt => (
                          <label key={opt} className={`flex-1 flex items-center justify-center p-3 rounded-xl cursor-pointer border transition-all ${formData.acceptGifted === opt ? 'bg-primary border-primary text-white font-bold' : 'bg-white border-gray-200 text-body'}`}>
                            <input type="radio" name="acceptGifted" value={opt} checked={formData.acceptGifted === opt} onChange={handleInputChange} className="hidden" />
                            {opt}
                          </label>
                        ))}
                      </div>
                      {errors.acceptGifted && <p className="text-red-500 text-xs mt-2 font-bold">{errors.acceptGifted}</p>}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><FileText className="w-5 h-5 mr-2" /> Licenses & IDs</h4>
                    <SelectField label="UAE Media License" name="licenseStatus" options={['Yes (NMCI/MCI)', 'No', 'In Progress']} formData={formData} handleInputChange={handleInputChange} />

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-2">Upload License (If Yes)</label>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'licenseBase64')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-2">Emirates ID / Passport Copy</label>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'emiratesIdBase64')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-2">Visa Copy</label>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'visaBase64')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Globe className="w-5 h-5 mr-2" /> Social & Portfolio</h4>
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Select Platforms</label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {['Instagram', 'Tiktok', 'Youtube', 'Facebook', 'X', 'Pinterest', 'Snapchat'].map(p => (
                          <label key={p} className={`px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${formData.socialPlatforms.includes(p) ? 'bg-heading text-white border-heading' : 'bg-white border-gray-200'}`}>
                            <input type="checkbox" name="socialPlatforms" value={p} checked={formData.socialPlatforms.includes(p)} onChange={handleInputChange} className="hidden" />
                            {p}
                          </label>
                        ))}
                      </div>
                      {formData.socialPlatforms.map(p => (
                        <div key={p} className="mb-3">
                          <InputField
                            label={`${p} Link`}
                            name={`link_${p}`}
                            placeholder={`Paste your ${p} profile link`}
                            formData={{ [`link_${p}`]: formData.socialLinks[p] || '' }}
                            handleInputChange={(e: any) => handleSocialLinkChange(p, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <InputField label="Portfolio / Media Kit Link" name="portfolio" placeholder="Google Drive, Canva, or Website" formData={formData} handleInputChange={handleInputChange} />
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-2">Primary Languages</label>
                      <div className="flex gap-3">
                        {['English', 'Arabic', 'Both'].map(l => (
                          <label key={l} className={`flex-1 flex items-center justify-center p-3 rounded-xl cursor-pointer border transition-all ${formData.contentLanguages.includes(l) ? 'bg-accent/20 border-primary text-primary font-bold' : 'border-gray-200'}`}>
                            <input type="checkbox" name="contentLanguages" value={l} checked={formData.contentLanguages.includes(l)} onChange={handleInputChange} className="hidden" />
                            {l}
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Camera className="w-5 h-5 mr-2" /> Content Expertise</h4>
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Top 3 Interest Fields</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Beauty & Skincare', 'Fitness & Wellness', 'Tech & Gaming', 'Fashion', 'Food & Beverage', 'Parenting/Kids', 'Travel', 'Home & Lifestyle', 'Sports', 'Cozy Hobbies'].map(cat => (
                          <label key={cat} className={`flex items-center space-x-2 p-3 rounded-xl cursor-pointer border ${formData.interests.includes(cat) ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-transparent'}`}>
                            <input type="checkbox" name="interests" value={cat} checked={formData.interests.includes(cat)} onChange={handleInputChange} className="accent-primary" />
                            <span className="text-xs font-medium">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <SelectField label="Posting Consistency" name="consistency" options={['Multiple times a week', 'Once a week', 'Once a month']} formData={formData} handleInputChange={handleInputChange} />
                    <SelectField label="Editing Capabilities" name="editing" options={['I edit my own videos', 'I provide raw footage only']} formData={formData} handleInputChange={handleInputChange} />
                    <InputField label="Primary Equipment Used" name="equipment" placeholder="e.g. iPhone 15 Pro, Sony ZV-1" formData={formData} handleInputChange={handleInputChange} />
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Briefcase className="w-5 h-5 mr-2" /> Collaboration & Logistics</h4>
                    <SelectField label="Available for On-Site Shoots?" name="availabilityOnSite" options={['Yes', 'No']} formData={formData} handleInputChange={handleInputChange} />
                    <SelectField label="Turnaround Time (TAT)" name="tat" options={['48 Hours', '3-5 Days', '6-7 Days']} formData={formData} handleInputChange={handleInputChange} />
                    <InputField label="Current Exclusivity (Brand Names)" name="exclusivity" placeholder="List existing brand ambassadorships..." formData={formData} handleInputChange={handleInputChange} />
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div key="6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 py-8">
                    <div className="bg-accent/20 p-8 rounded-3xl border border-primary/20 text-center">
                      <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-heading mb-4">Final Declaration</h4>
                      <label className="flex items-start space-x-3 text-left p-4 bg-white/50 rounded-xl cursor-pointer">
                        <input type="checkbox" name="legalConsent" checked={formData.legalConsent} onChange={handleInputChange} className="mt-1 w-5 h-5 accent-primary" />
                        <span className="text-sm text-body font-medium leading-relaxed">
                          I confirm that all information provided is accurate and I am legally allowed to work as a content creator in the UAE.
                        </span>
                      </label>
                      {errors.legalConsent && <p className="text-red-500 font-bold mt-2 text-sm">{errors.legalConsent}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-8 py-6 border-t border-gray-100 bg-white flex space-x-4">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-100 hover:bg-gray-200 text-heading transition-colors">
                  <ChevronLeft size={24} />
                </button>
              )}

              {step < totalSteps ? (
                <button onClick={nextStep} disabled={isSubmitting} className="flex-1 h-14 bg-heading text-white font-bold rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all hover:bg-heading/90">
                  <span>{isSubmitting ? 'Processing...' : 'Next Step'}</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={isSubmitting} className={`flex-1 h-14 font-bold rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white'}`}>
                  {isSubmitting ? 'Sending Application...' : 'Submit Application'}
                </button>
              )}
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            {rejectedGifted ? (
              <>
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-500">
                  <Info size={40} />
                </div>
                <h3 className="text-2xl font-extrabold text-heading mb-4">Application Registered</h3>
                <p className="text-body mb-8 max-w-sm">Thank you for your interest with CuratedCircle. If our business model changes, we will notify you for potential future onboarding.</p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-accent/40 rounded-full flex items-center justify-center mb-8 text-primary">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-extrabold text-heading mb-4">Application Received!</h3>
                <p className="text-body mb-8 max-w-sm">Thank you for joining CuratedCircle. We will review your application and get back to you through your registered email.</p>
              </>
            )}
            <button onClick={onClose} className="px-10 py-4 bg-heading text-white font-bold rounded-2xl hover:scale-105 transition-all">Close Window</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CreatorModal;

