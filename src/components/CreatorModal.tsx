import React, { useState } from 'react';
import { X, Upload, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    emirate: '',
    email: '',
    phone: '',
    acceptsGifted: null as boolean | null,
    
    hasLicense: '', // Yes, No, In Progress
    licenseFile: null as File | null,
    licenseFileName: '',
    emiratesIdFile: null as File | null,
    emiratesIdFileName: '',
    visaFile: null as File | null,
    visaFileName: '',

    socialHandles: {} as Record<string, string>,
    portfolioLink: '',
    languages: [] as string[],
    otherLanguage: '',

    interests: [] as string[],
    consistency: '',
    editing: '',
    equipment: '',

    onSiteAvailability: '',
    turnaroundTime: '',
    exclusivity: '',
    
    agreed: false
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && formData.acceptsGifted === false) {
      setIsRejected(true);
      return;
    }
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    setIsSubmitted(true);
  };

  const handleFileChange = (field: 'licenseFile' | 'emiratesIdFile' | 'visaFile', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ 
        ...formData, 
        [field]: file,
        [`${field}Name`]: file.name 
      });
    }
  };

  const toggleInterest = (interest: string) => {
    const current = [...formData.interests];
    if (current.includes(interest)) {
      setFormData({ ...formData, interests: current.filter(i => i !== interest) });
    } else if (current.length < 3) {
      setFormData({ ...formData, interests: [...current, interest] });
    }
  };

  const toggleLanguage = (lang: string) => {
    const current = [...formData.languages];
    if (current.includes(lang)) {
      setFormData({ ...formData, languages: current.filter(l => l !== lang) });
    } else {
      setFormData({ ...formData, languages: [...current, lang] });
    }
  };

  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'x', name: 'X (Twitter)' },
    { id: 'pinterest', name: 'Pinterest' },
    { id: 'snapchat', name: 'Snapchat' }
  ];

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];

  const renderEndScreen = (type: 'success' | 'rejection') => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center overflow-y-auto">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 ${type === 'success' ? 'bg-[#D1FAE5]/40' : 'bg-gray-100'}`}>
        {type === 'success' ? (
          <CheckCircle2 className="text-[#1FAE9A]" style={{ width: 40, height: 40 }} />
        ) : (
          <X className="text-gray-400" style={{ width: 40, height: 40 }} />
        )}
      </div>
      <h3 className="text-2xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
        {type === 'success' ? 'Application Received' : 'Thank you for your interest'}
      </h3>
      <p className="text-[#6B7280] font-medium leading-relaxed mb-10 max-w-sm">
        {type === 'success' 
          ? 'Thank you for your interest in joining the CuratedCircle. We will review your application and get back to you through your registered email.'
          : 'Thank you for your interest with CuratedCircle. If our business model changes, we will notify you for potential future onboarding.'}
      </p>
      <button 
        onClick={onClose}
        className="px-10 py-4 bg-[#0F172A] text-white font-bold rounded-2xl hover:scale-105 transition-all active:scale-95"
      >
        Close
      </button>
    </div>
  );

  if (isSubmitted) return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"></div>
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden h-[90vh] flex flex-col">
        {renderEndScreen('success')}
      </div>
    </div>
  );

  if (isRejected) return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"></div>
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden h-[90vh] flex flex-col">
        {renderEndScreen('rejection')}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"></div>

      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden h-[90vh] flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-gray-400 hover:text-[#0F172A] transition-colors z-20"
        >
          <X style={{ width: 24, height: 24 }} />
        </button>

        <div className="flex flex-col h-full">
          <div className="p-10 pb-4">
            <h3 className="text-2xl font-extrabold text-[#0F172A] mb-1 tracking-tight">Creator Registration</h3>
            <p className="text-[#6B7280] text-xs font-medium mb-6">Section {step}: {
              step === 1 ? 'Personal Information' :
              step === 2 ? 'Licenses & Verification' :
              step === 3 ? 'Social Media & Portfolio' :
              step === 4 ? 'Content Expertise' :
              step === 5 ? 'Collaboration & Logistics' : 'Final Verification'
            }</p>
            
            <div className="relative h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[#1FAE9A] transition-all duration-500" 
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex-1 px-10 pb-6 overflow-y-auto custom-scrollbar">
            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">First Name</label>
                    <input 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="Jane"
                      className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none focus:bg-white focus:border-[#1FAE9A]/20 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Last Name</label>
                    <input 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Doe"
                      className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none focus:bg-white focus:border-[#1FAE9A]/20 transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Age (18+)</label>
                    <input 
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      placeholder="25"
                      className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none focus:bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Gender</label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none text-sm"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Primary Residence (Emirate)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {emirates.map(e => (
                      <button
                        key={e}
                        onClick={() => setFormData({...formData, emirate: e})}
                        className={`p-2.5 text-[11px] font-bold rounded-xl border transition-all ${formData.emirate === e ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-[#F9FAFB] text-[#6B7280] border-transparent hover:border-gray-200'}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="jane@example.com"
                    className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Phone / WhatsApp Number</label>
                  <input 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+971 50 000 0000"
                    className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none text-sm"
                  />
                </div>
                <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100">
                  <p className="text-[11px] font-bold text-[#0F172A] mb-3 leading-relaxed">
                    We focus on UGC influencers that accept GIFTED COLLABORATIONS (products as payment) only. Do you operate within this agreement?
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setFormData({...formData, acceptsGifted: true})}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${formData.acceptsGifted === true ? 'bg-[#1FAE9A] text-white' : 'bg-white text-[#6B7280] border border-gray-200'}`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setFormData({...formData, acceptsGifted: false})}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${formData.acceptsGifted === false ? 'bg-red-500 text-white' : 'bg-white text-[#6B7280] border border-gray-200'}`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-3">UAE Content Creator/Media License</label>
                  <div className="flex space-x-2 mb-4">
                    {['Yes (NMCI/MCI)', 'No', 'In Progress'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFormData({...formData, hasLicense: opt})}
                        className={`flex-1 py-2.5 text-[11px] font-bold rounded-xl border transition-all ${formData.hasLicense === opt ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-[#F9FAFB] text-[#6B7280] border-transparent'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  
                  {formData.hasLicense === 'Yes (NMCI/MCI)' && (
                    <div className="mb-4">
                      <label className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">Upload License Copy</label>
                      <div className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${formData.licenseFileName ? 'bg-[#D1FAE5]/10 border-[#1FAE9A]' : 'bg-[#F9FAFB] border-gray-200'}`}>
                        <input type="file" onChange={(e) => handleFileChange('licenseFile', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <Upload className={formData.licenseFileName ? 'text-[#1FAE9A]' : 'text-gray-400'} style={{ width: 24, height: 24, marginBottom: 8 }} />
                        <span className="text-[11px] font-bold text-[#0F172A]">{formData.licenseFileName || 'Click to upload license'}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">Emirates ID / Passport Copy</label>
                      <div className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${formData.emiratesIdFileName ? 'bg-[#D1FAE5]/10 border-[#1FAE9A]' : 'bg-[#F9FAFB] border-gray-200'}`}>
                        <input type="file" onChange={(e) => handleFileChange('emiratesIdFile', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <Upload className={formData.emiratesIdFileName ? 'text-[#1FAE9A]' : 'text-gray-400'} style={{ width: 24, height: 24, marginBottom: 8 }} />
                        <span className="text-[11px] font-bold text-[#0F172A]">{formData.emiratesIdFileName || 'Upload Emirates ID / Passport'}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">Visa Upload</label>
                      <div className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${formData.visaFileName ? 'bg-[#D1FAE5]/10 border-[#1FAE9A]' : 'bg-[#F9FAFB] border-gray-200'}`}>
                        <input type="file" onChange={(e) => handleFileChange('visaFile', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <Upload className={formData.visaFileName ? 'text-[#1FAE9A]' : 'text-gray-400'} style={{ width: 24, height: 24, marginBottom: 8 }} />
                        <span className="text-[11px] font-bold text-[#0F172A]">{formData.visaFileName || 'Upload Visa Copy'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-3">Social Media Handles</label>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {socialPlatforms.map(p => (
                      <div key={p.id} className="space-y-1">
                        <div className="text-[10px] font-bold text-[#6B7280] ml-1">{p.name}</div>
                        <input 
                          value={formData.socialHandles[p.id] || ''}
                          onChange={(e) => setFormData({
                            ...formData, 
                            socialHandles: { ...formData.socialHandles, [p.id]: e.target.value }
                          })}
                          placeholder="Link or @handle"
                          className="w-full p-3 bg-[#F9FAFB] border border-transparent rounded-xl outline-none text-xs focus:bg-white focus:border-[#1FAE9A]/20"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Portfolio / Media Kit Link</label>
                  <input 
                    value={formData.portfolioLink}
                    onChange={(e) => setFormData({...formData, portfolioLink: e.target.value})}
                    placeholder="Link to Canva, Drive, or Website"
                    className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-3">Primary Content Language(s)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['English', 'Arabic', 'Both', 'Other'].map(l => (
                      <button
                        key={l}
                        onClick={() => toggleLanguage(l)}
                        className={`p-3 text-xs font-bold rounded-xl border transition-all ${formData.languages.includes(l) ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-[#F9FAFB] text-[#6B7280] border-transparent'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  {formData.languages.includes('Other') && (
                    <input 
                      value={formData.otherLanguage}
                      onChange={(e) => setFormData({...formData, otherLanguage: e.target.value})}
                      placeholder="Specify language"
                      className="w-full mt-3 p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none text-sm"
                    />
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-3">Top 3 Interest Fields (Select up to 3)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Beauty & Skincare', 'Fitness & Wellness', 'Tech & Gaming', 
                      'Fashion', 'Food & Beverage', 'Parenting/Kids', 
                      'Travel', 'Home & Lifestyle', 'Sports', 'Cozy Hobbies'
                    ].map(field => (
                      <button
                        key={field}
                        onClick={() => toggleInterest(field)}
                        className={`p-3 text-[10px] font-bold rounded-xl border transition-all text-left ${formData.interests.includes(field) ? 'bg-[#1FAE9A] text-white border-[#1FAE9A]' : 'bg-[#F9FAFB] text-[#6B7280] border-transparent'}`}
                      >
                        {field}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-3">Consistency in Creating Content</label>
                  <div className="space-y-2">
                    {['Multiple times a week', 'Once a week', 'Once a month'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFormData({...formData, consistency: opt})}
                        className={`w-full p-3.5 text-sm font-bold rounded-xl border transition-all text-left ${formData.consistency === opt ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-[#F9FAFB] text-[#6B7280] border-transparent'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-3">Editing Capabilities</label>
                  <div className="space-y-2">
                    {[
                      { id: 'self', label: 'I edit my own videos (CapCut, etc.)' },
                      { id: 'raw', label: 'I provide raw footage only' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setFormData({...formData, editing: opt.label})}
                        className={`w-full p-3.5 text-sm font-bold rounded-xl border transition-all text-left ${formData.editing === opt.label ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-[#F9FAFB] text-[#6B7280] border-transparent'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Primary Equipment used for filming</label>
                  <input 
                    value={formData.equipment}
                    onChange={(e) => setFormData({...formData, equipment: e.target.value})}
                    placeholder="e.g., iPhone 15 Pro, Sony ZV-1"
                    className="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl outline-none text-sm"
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-3">Availability for On-Site Shoots</label>
                  <p className="text-[10px] text-[#6B7280] mb-3">Are you available to film at malls, studios, or events in the UAE?</p>
                  <div className="flex space-x-3">
                    {['Yes', 'No'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFormData({...formData, onSiteAvailability: opt})}
                        className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all ${formData.onSiteAvailability === opt ? 'bg-[#0F172A] text-white' : 'bg-[#F9FAFB] text-[#6B7280]'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-3">Standard Turnaround Time (TAT)</label>
                  <p className="text-[10px] text-[#6B7280] mb-3">How many days from receiving a product do you typically need to deliver the first draft?</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['48 Hours', '3–5 Days', '6-7 Days'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFormData({...formData, turnaroundTime: opt})}
                        className={`py-3.5 rounded-xl font-bold text-[11px] transition-all ${formData.turnaroundTime === opt ? 'bg-[#0F172A] text-white' : 'bg-[#F9FAFB] text-[#6B7280]'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-2">Current Exclusivity</label>
                  <p className="text-[10px] text-[#6B7280] mb-3">Are you currently an exclusive ambassador for any specific brand? (If yes, please list):</p>
                  <textarea 
                    value={formData.exclusivity}
                    onChange={(e) => setFormData({...formData, exclusivity: e.target.value})}
                    placeholder="List brands or leave empty"
                    className="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-xl outline-none text-sm min-h-[100px] resize-none"
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8 py-4">
                <div className="p-8 bg-[#D1FAE5]/20 rounded-[2rem] border border-[#1FAE9A]/10 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle2 className="text-[#1FAE9A]" style={{ width: 32, height: 32 }} />
                  </div>
                  <h4 className="text-xl font-extrabold text-[#0F172A] mb-4">Final Verification</h4>
                  <label className="flex items-start space-x-4 cursor-pointer text-left">
                    <input 
                      type="checkbox" 
                      checked={formData.agreed}
                      onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
                      className="mt-1 w-5 h-5 accent-[#1FAE9A] rounded-md" 
                    />
                    <span className="text-xs font-bold text-[#0F172A] leading-relaxed">
                      I confirm that all information provided is accurate, and I am legally allowed to work in the UAE.
                    </span>
                  </label>
                </div>
                <p className="text-[10px] text-[#6B7280] text-center px-6 leading-relaxed">
                  Most sites focus on immediate sign-in and deal with the details later. We review applications manually to ensure the highest quality for our brand partners.
                </p>
              </div>
            )}
          </div>

          <div className="p-10 pt-0 flex space-x-4">
            {step > 1 && (
              <button 
                onClick={handlePrev}
                className="flex items-center justify-center w-14 h-14 bg-gray-100 text-[#0F172A] rounded-2xl hover:bg-gray-200 transition-colors active:scale-95"
              >
                <ChevronLeft style={{ width: 24, height: 24 }} />
              </button>
            )}
            {step < 6 ? (
              <button 
                onClick={handleNext}
                disabled={step === 1 && formData.acceptsGifted === null}
                className={`flex-1 font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] ${step === 1 && formData.acceptsGifted === null ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#0F172A] text-white hover:bg-[#1FAE9A]'}`}
              >
                <span>Next Step</span>
                <ChevronRight style={{ width: 18, height: 18 }} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={!formData.agreed}
                className={`flex-1 font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] shadow-xl ${!formData.agreed ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#1FAE9A] text-white shadow-[#1FAE9A]/20'}`}
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorModal;
