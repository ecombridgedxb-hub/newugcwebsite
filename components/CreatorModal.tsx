
import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Upload, FileText, Instagram, Youtube, Facebook, Twitter, Music2, Globe, Camera, Laptop, Clock, MapPin, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SocialPlatform = 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook' | 'X' | 'Pinterest' | 'Snapchat';

const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    residence: '',
    email: '',
    phone: '',
    acceptsGifted: '' as 'Yes' | 'No' | '',
    
    // Licenses
    hasLicense: '' as 'Yes' | 'No' | 'In Progress' | '',
    licenseFile: null as File | null,
    emiratesIdFile: null as File | null,
    visaFile: null as File | null,

    // Social
    socialHandles: {} as Record<SocialPlatform, string>,
    portfolioLink: '',
    languages: [] as string[],
    otherLanguage: '',

    // Expertise
    interestFields: [] as string[],
    consistency: '',
    editingCapabilities: '',
    equipment: '',

    // Logistics
    onSiteAvailability: '',
    tat: '',
    exclusivity: '',

    // Final
    finalAgreement: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [activeSocialInput, setActiveSocialInput] = useState<SocialPlatform | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleFileChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const toggleInterestField = (field: string) => {
    setFormData(prev => {
      const current = [...prev.interestFields];
      if (current.includes(field)) {
        return { ...prev, interestFields: current.filter(f => f !== field) };
      } else if (current.length < 3) {
        return { ...prev, interestFields: [...current, field] };
      }
      return prev;
    });
  };

  const toggleLanguage = (lang: string) => {
    setFormData(prev => {
      const current = [...prev.languages];
      if (current.includes(lang)) {
        return { ...prev, languages: current.filter(l => l !== lang) };
      } else {
        return { ...prev, languages: [...current, lang] };
      }
    });
  };

  const handleSocialHandleChange = (platform: SocialPlatform, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialHandles: { ...prev.socialHandles, [platform]: value }
    }));
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.age || parseInt(formData.age) < 18) newErrors.age = "Must be 18+ to continue";
      if (!formData.gender) newErrors.gender = "Required";
      if (!formData.residence) newErrors.residence = "Required";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email required";
      if (!formData.phone) newErrors.phone = "Phone number required";
      if (!formData.acceptsGifted) newErrors.acceptsGifted = "Please select an option";
    } else if (step === 2) {
      if (!formData.hasLicense) newErrors.hasLicense = "Required";
      if (formData.hasLicense === 'Yes' && !formData.licenseFile) newErrors.licenseFile = "License upload required";
      if (!formData.emiratesIdFile) newErrors.emiratesIdFile = "Emirates ID/Passport required";
      if (!formData.visaFile) newErrors.visaFile = "Visa upload required";
    } else if (step === 3) {
      if (Object.keys(formData.socialHandles).length === 0) newErrors.social = "At least one social handle required";
      if (!formData.portfolioLink) newErrors.portfolioLink = "Portfolio link required";
      if (formData.languages.length === 0) newErrors.languages = "Select at least one language";
    } else if (step === 4) {
      if (formData.interestFields.length === 0) newErrors.interestFields = "Select at least one field";
      if (!formData.consistency) newErrors.consistency = "Required";
      if (!formData.editingCapabilities) newErrors.editingCapabilities = "Required";
      if (!formData.equipment) newErrors.equipment = "Required";
    } else if (step === 5) {
      if (!formData.onSiteAvailability) newErrors.onSiteAvailability = "Required";
      if (!formData.tat) newErrors.tat = "Required";
    } else if (step === 6) {
      if (!formData.finalAgreement) newErrors.finalAgreement = "You must agree to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step === 1 && formData.acceptsGifted === 'No') {
        setIsRejected(true);
      } else {
        setStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const formDataToSend = new FormData();
        
        // Append all text fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'socialHandles') {
            formDataToSend.append(key, JSON.stringify(value));
          } else if (Array.isArray(value)) {
            formDataToSend.append(key, value.join(', '));
          } else if (value instanceof File) {
            formDataToSend.append(key, value);
          } else if (typeof value === 'boolean') {
            formDataToSend.append(key, value.toString());
          } else if (value !== null) {
            formDataToSend.append(key, value as string);
          }
        });

        const response = await fetch('/api/applications', {
          method: 'POST',
          body: formDataToSend,
        });

        const result = await response.json();

        if (result.success) {
          setIsSubmitted(true);
        } else {
          throw new Error(result.message || 'Failed to submit application');
        }
      } catch (error: any) {
        console.error('Submission error:', error);
        setSubmitError(error.message || 'An unexpected error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];
  const interestFields = [
    'Beauty & Skincare', 'Fitness & Wellness', 'Tech & Gaming', 'Fashion', 
    'Food & Beverage', 'Parenting/Kids', 'Travel', 'Home & Lifestyle', 
    'Sports', 'Cozy Hobbies'
  ];

  const socialPlatforms: { name: SocialPlatform; icon: any; color: string }[] = [
    { name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { name: 'TikTok', icon: Music2, color: 'text-black' },
    { name: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { name: 'X', icon: Twitter, color: 'text-gray-900' },
    { name: 'Pinterest', icon: Globe, color: 'text-red-700' },
    { name: 'Snapchat', icon: Globe, color: 'text-yellow-500' },
  ];

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
        className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden h-[85vh] flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-gray-400 hover:text-heading transition-colors z-20"
        >
          <X size={24} />
        </button>

        {!isSubmitted && !isRejected ? (
          <>
            <div className="p-10 pb-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-accent text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">Step {step} of 6</span>
                <h3 className="text-2xl font-extrabold text-heading tracking-tight">Creator Registration</h3>
              </div>
              <p className="text-body text-sm font-medium mb-8">Join the UAE's most exclusive UGC network.</p>
              
              <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 6) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                ></motion.div>
              </div>
            </div>

            <div className="flex-1 px-10 pb-8 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">First Name</label>
                        <input 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full p-3.5 bg-[#F9FAFB] border rounded-xl outline-none transition-all ${errors.firstName ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-primary/20'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Last Name</label>
                        <input 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full p-3.5 bg-[#F9FAFB] border rounded-xl outline-none transition-all ${errors.lastName ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-primary/20'}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Age</label>
                        <input 
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="18+"
                          className={`w-full p-3.5 bg-[#F9FAFB] border rounded-xl outline-none ${errors.age ? 'border-red-500' : 'border-transparent focus:bg-white'}`}
                        />
                        {errors.age && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.age}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Gender</label>
                        <select 
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className={`w-full p-3.5 bg-[#F9FAFB] border rounded-xl outline-none ${errors.gender ? 'border-red-500' : 'border-transparent focus:bg-white'}`}
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Primary Residence (Emirate)</label>
                      <select 
                        name="residence"
                        value={formData.residence}
                        onChange={handleInputChange}
                        className={`w-full p-3.5 bg-[#F9FAFB] border rounded-xl outline-none transition-all ${errors.residence ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-primary/20'}`}
                      >
                        <option value="">Select Emirate</option>
                        {emirates.map(emirate => (
                          <option key={emirate} value={emirate}>{emirate}</option>
                        ))}
                      </select>
                      {errors.residence && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.residence}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Email Address</label>
                        <input 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full p-3.5 bg-[#F9FAFB] border rounded-xl outline-none ${errors.email ? 'border-red-500' : 'border-transparent focus:bg-white'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Phone / WhatsApp</label>
                        <input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+971"
                          className={`w-full p-3.5 bg-[#F9FAFB] border rounded-xl outline-none ${errors.phone ? 'border-red-500' : 'border-transparent focus:bg-white'}`}
                        />
                      </div>
                    </div>

                    <div className="p-5 bg-accent/20 rounded-2xl border border-primary/10">
                      <label className="block text-xs font-bold text-heading mb-3 leading-tight">
                        We focus on UGC influencers that accept GIFTED COLLABORATIONS (products as payment) only. Do you operate within this agreement?
                      </label>
                      <div className="flex space-x-4">
                        {['Yes', 'No'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setFormData(prev => ({ ...prev, acceptsGifted: opt as any }))}
                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${formData.acceptsGifted === opt ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-body border-gray-100 hover:border-primary/20'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.acceptsGifted && <p className="text-[10px] text-red-500 mt-2 font-bold">{errors.acceptsGifted}</p>}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-3">UAE Content Creator/Media License</label>
                      <div className="flex space-x-3 mb-6">
                        {['Yes', 'No', 'In Progress'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setFormData(prev => ({ ...prev, hasLicense: opt as any }))}
                            className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all border ${formData.hasLicense === opt ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        {formData.hasLicense === 'Yes' && (
                          <div>
                            <label className="block text-[10px] font-bold text-body uppercase tracking-widest mb-2">Upload License Copy</label>
                            <label className={`flex items-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${formData.licenseFile ? 'bg-accent/10 border-primary' : 'bg-[#F9FAFB] border-gray-200 hover:border-primary/20'}`}>
                              <input type="file" className="hidden" onChange={(e) => handleFileChange('licenseFile', e)} />
                              <Upload size={18} className="text-primary mr-3" />
                              <span className="text-xs font-bold text-heading truncate">{formData.licenseFile ? formData.licenseFile.name : 'Click to upload license'}</span>
                            </label>
                          </div>
                        )}

                        <div>
                          <label className="block text-[10px] font-bold text-body uppercase tracking-widest mb-2">Emirates ID / Passport Copy</label>
                          <label className={`flex items-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${formData.emiratesIdFile ? 'bg-accent/10 border-primary' : 'bg-[#F9FAFB] border-gray-200 hover:border-primary/20'}`}>
                            <input type="file" className="hidden" onChange={(e) => handleFileChange('emiratesIdFile', e)} />
                            <Upload size={18} className="text-primary mr-3" />
                            <span className="text-xs font-bold text-heading truncate">{formData.emiratesIdFile ? formData.emiratesIdFile.name : 'Click to upload ID/Passport'}</span>
                          </label>
                          {errors.emiratesIdFile && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.emiratesIdFile}</p>}
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-body uppercase tracking-widest mb-2">Visa Upload</label>
                          <label className={`flex items-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${formData.visaFile ? 'bg-accent/10 border-primary' : 'bg-[#F9FAFB] border-gray-200 hover:border-primary/20'}`}>
                            <input type="file" className="hidden" onChange={(e) => handleFileChange('visaFile', e)} />
                            <Upload size={18} className="text-primary mr-3" />
                            <span className="text-xs font-bold text-heading truncate">{formData.visaFile ? formData.visaFile.name : 'Click to upload Visa'}</span>
                          </label>
                          {errors.visaFile && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.visaFile}</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-4">Social Media Handles</label>
                      <div className="grid grid-cols-4 gap-3 mb-6">
                        {socialPlatforms.map(platform => (
                          <button
                            key={platform.name}
                            onClick={() => setActiveSocialInput(platform.name)}
                            className={`flex flex-col items-center p-3 rounded-xl border transition-all ${formData.socialHandles[platform.name] ? 'bg-primary/5 border-primary' : 'bg-[#F9FAFB] border-transparent hover:border-primary/20'}`}
                          >
                            <platform.icon size={20} className={platform.color} />
                            <span className="text-[9px] font-bold mt-2 uppercase tracking-tighter">{platform.name}</span>
                            {formData.socialHandles[platform.name] && <div className="mt-1 w-1 h-1 bg-primary rounded-full"></div>}
                          </button>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        {activeSocialInput && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-bold text-heading uppercase tracking-widest">{activeSocialInput} Link</span>
                              <button onClick={() => setActiveSocialInput(null)} className="text-body hover:text-heading"><X size={14}/></button>
                            </div>
                            <input 
                              autoFocus
                              placeholder={`https://${activeSocialInput.toLowerCase()}.com/yourname`}
                              value={formData.socialHandles[activeSocialInput] || ''}
                              onChange={(e) => handleSocialHandleChange(activeSocialInput, e.target.value)}
                              className="w-full p-3 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-primary/40"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {errors.social && <p className="text-[10px] text-red-500 mb-4 font-bold">{errors.social}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Portfolio / Media Kit Link</label>
                      <input 
                        name="portfolioLink"
                        value={formData.portfolioLink}
                        onChange={handleInputChange}
                        placeholder="Google Drive, Canva, or Website link"
                        className={`w-full p-3.5 bg-[#F9FAFB] border rounded-xl outline-none ${errors.portfolioLink ? 'border-red-500' : 'border-transparent focus:bg-white'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-3">Primary Content Language(s)</label>
                      <div className="flex flex-wrap gap-2">
                        {['English', 'Arabic', 'Both'].map(lang => (
                          <button
                            key={lang}
                            onClick={() => toggleLanguage(lang)}
                            className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${formData.languages.includes(lang) ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}`}
                          >
                            {lang}
                          </button>
                        ))}
                        <div className="flex-1 min-w-[120px]">
                          <input 
                            name="otherLanguage"
                            value={formData.otherLanguage}
                            onChange={handleInputChange}
                            placeholder="Other..."
                            className="w-full px-4 py-2 bg-[#F9FAFB] border border-transparent rounded-full text-xs outline-none focus:bg-white focus:border-primary/20"
                          />
                        </div>
                      </div>
                      {errors.languages && <p className="text-[10px] text-red-500 mt-2 font-bold">{errors.languages}</p>}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-3">Top 3 Interest Fields (Select up to 3)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {interestFields.map(field => (
                          <button
                            key={field}
                            onClick={() => toggleInterestField(field)}
                            className={`p-3 text-left text-[11px] font-bold rounded-xl border transition-all ${formData.interestFields.includes(field) ? 'bg-primary/5 border-primary text-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}`}
                          >
                            {field}
                          </button>
                        ))}
                      </div>
                      {errors.interestFields && <p className="text-[10px] text-red-500 mt-2 font-bold">{errors.interestFields}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Consistency</label>
                        <select 
                          name="consistency"
                          value={formData.consistency}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl text-xs outline-none"
                        >
                          <option value="">Select</option>
                          <option>Multiple times a week</option>
                          <option>Once a week</option>
                          <option>Once a month</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Editing</label>
                        <select 
                          name="editingCapabilities"
                          value={formData.editingCapabilities}
                          onChange={handleInputChange}
                          className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl text-xs outline-none"
                        >
                          <option value="">Select</option>
                          <option>I edit my own videos</option>
                          <option>I provide raw footage only</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Primary Equipment</label>
                      <input 
                        name="equipment"
                        value={formData.equipment}
                        onChange={handleInputChange}
                        placeholder="e.g., iPhone 15 Pro, Sony ZV-1"
                        className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl text-xs outline-none focus:bg-white focus:border-primary/20"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div 
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-3">Availability for On-Site Shoots</label>
                      <p className="text-[10px] text-body mb-3 font-medium">Are you available to film at malls, studios, or events in the UAE?</p>
                      <div className="flex space-x-3">
                        {['Yes', 'No'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setFormData(prev => ({ ...prev, onSiteAvailability: opt }))}
                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${formData.onSiteAvailability === opt ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-3">Standard Turnaround Time (TAT)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['48 Hours', '3–5 Days', '6-7 Days'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setFormData(prev => ({ ...prev, tat: opt }))}
                            className={`py-3 rounded-xl font-bold text-[11px] transition-all border ${formData.tat === opt ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Current Exclusivity</label>
                      <textarea 
                        name="exclusivity"
                        value={formData.exclusivity}
                        onChange={handleInputChange}
                        placeholder="Are you currently an exclusive ambassador for any specific brand? (If yes, please list)"
                        className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl text-xs outline-none focus:bg-white focus:border-primary/20 min-h-[100px] resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div 
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 py-4"
                  >
                    <div className="p-8 bg-accent/20 rounded-[2rem] border border-primary/10 text-center">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <ShieldCheck size={32} className="text-primary" />
                      </div>
                      <h4 className="text-xl font-extrabold text-heading mb-4">Final Verification</h4>
                      <p className="text-xs text-body font-medium leading-relaxed mb-8">
                        By submitting this application, you confirm that all information provided is accurate and you are legally allowed to work in the UAE.
                      </p>
                      
                      <label className="flex items-center justify-center space-x-3 cursor-pointer group">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.finalAgreement ? 'bg-primary border-primary' : 'border-gray-200 group-hover:border-primary/40'}`}>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={formData.finalAgreement}
                            onChange={(e) => setFormData(prev => ({ ...prev, finalAgreement: e.target.checked }))}
                          />
                          {formData.finalAgreement && <CheckCircle2 size={16} className="text-white" />}
                        </div>
                        <span className="text-sm font-bold text-heading">I Agree</span>
                      </label>
                      {errors.finalAgreement && <p className="text-[10px] text-red-500 mt-2 font-bold">{errors.finalAgreement}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-10 pt-0 flex flex-col space-y-4">
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600">
                  <AlertCircle size={18} />
                  <span className="text-xs font-bold">{submitError}</span>
                </div>
              )}
              <div className="flex space-x-4">
                {step > 1 && (
                  <button 
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-14 h-14 bg-gray-100 text-heading rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}
                {step < 6 ? (
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
                    disabled={isSubmitting}
                    className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : isRejected ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-16 text-center"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-10">
              <AlertCircle size={48} className="text-red-500" />
            </div>
            <h3 className="text-3xl font-extrabold text-heading mb-6 tracking-tight">Application Status</h3>
            <p className="text-body font-medium leading-relaxed mb-10 max-w-sm">
              Thank you for your interest with CuratedCircle. If our business model changes, we will notify you for potential future onboarding.
            </p>
            <button 
              onClick={onClose}
              className="px-12 py-4 bg-heading text-white font-bold rounded-2xl hover:scale-105 transition-all"
            >
              Close
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-16 text-center"
          >
            <div className="w-24 h-24 bg-accent/40 rounded-full flex items-center justify-center mb-10">
              <CheckCircle2 size={48} className="text-primary" />
            </div>
            <h3 className="text-3xl font-extrabold text-heading mb-6 tracking-tight">Application Sent</h3>
            <p className="text-body font-medium leading-relaxed mb-10 max-w-sm">
              Thank you for your interest in joining the CuratedCircle. We will review your application and get back to you through your registered email.
            </p>
            <button 
              onClick={onClose}
              className="px-12 py-4 bg-heading text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-heading/20"
            >
              Back to Home
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CreatorModal;
