import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Upload, FileText, Camera, Video, DollarSign, PenTool, Globe, Calendar, Briefcase, MapPin, Heart, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Moved OUTSIDE to prevent re-rendering/focus loss
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

// Moved OUTSIDE to prevent re-rendering/focus loss
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
  const totalSteps = 10;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🚨PASTE YOUR GOOGLE WEB APP URL HERE
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby4vdXONgYh5gVdlQGArvov1Goa5ILiwRPQzPm9JbG31hXM4eE8aLvz3rizcgOFWreY/exec";

  const [formData, setFormData] = useState({
    // Section 1: Personal & Legal
    fullName: '',
    age: '',
    gender: '',
    residence: 'Dubai',
    email: '',
    phone: '',
    licenseStatus: '',
    licenseFile: null as File | null,
    licenseBase64: '' as string,

    // Section 2: Social & Portfolio
    instagram: '',
    tiktok: '',
    otherSocial: '',
    portfolio: '',
    contentLanguages: [] as string[],
    audienceLocation: '',

    // Section 3: Content Expertise
    interests: [] as string[],
    consistency: '',
    editing: '',
    equipment: '',

    // Section 4: Collaboration & Logistics
    collabType: 'Paid Only',
    availabilityOnSite: '',
    tat: '',
    exclusivity: '',

    // Section 5 (Questions Set 1): Commercial Rates
    rateVideo: '',
    rateBundle: '',
    rateWhitelisting: '',
    rateRaw: '',

    // Section 6 (Questions Set 2): Usage Rights
    usageOrganic: '',
    usagePaid: '',
    exclusivityPremium: '',

    // Section 7 (Questions Set 3, 4, 5): Style & Preferences
    cameraConfidence: 5,
    voiceover: '',
    contentStyle: [] as string[],
    snapchatPresence: '',
    snapchatReach: '',
    arabicDialect: '',
    childrenInContent: '',
    partnerInContent: '',
    pets: '',

    // Section 8 (Questions Set 6, 7, 8, 9, 10): Logistics & Payment & Values
    revisionLimit: '',
    scriptAdherence: '',
    reshootPolicy: '',
    addressType: '',
    perishable: '',
    returnPolicy: '',
    vatRegistered: '',
    trn: '',
    paymentMethod: '',
    dietary: [] as string[],
    excludedCategories: '',
    storeVisits: '',
    liveEvents: '',
    transport: '',

    // Final Verification
    legalConsent: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    // Handle Checkbox Groups (Arrays)
    if (['contentLanguages', 'interests', 'contentStyle', 'dietary'].includes(name)) {
      setFormData(prev => {
        const list = prev[name as keyof typeof prev] as string[];
        if (checked) return { ...prev, [name]: [...list, value] };
        else return { ...prev, [name]: list.filter(item => item !== value) };
      });
      return;
    }

    // Handle Boolean/Single Checkboxes
    if (type === 'checkbox' && !['contentLanguages', 'interests', 'contentStyle', 'dietary'].includes(name)) {
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }

    // Handle Standard Inputs
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear errors on change
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
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

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = "Required";
      if (!formData.age || parseInt(formData.age) < 18) newErrors.age = "Must be 18+";
      if (!formData.gender) newErrors.gender = "Required";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
      if (!formData.phone) newErrors.phone = "Required";
      if (!formData.licenseStatus) newErrors.licenseStatus = "Required";
    }

    if (currentStep === 2) {
      if (!formData.instagram && !formData.tiktok) newErrors.social = "At least one handle required";
      if (!formData.audienceLocation) newErrors.audienceLocation = "Required";
    }

    if (currentStep === 10) {
      if (!formData.legalConsent) newErrors.legalConsent = "You must confirm legal eligibility";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      setIsSubmitting(true);

      const application = {
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toISOString()
      };

      try {
        if (!GOOGLE_SCRIPT_URL) {
          console.warn("Google URL missing");
        } else {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(application),
            mode: 'no-cors'
          });
        }
        setIsSubmitted(true);
      } catch (error) {
        alert("Submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-heading z-20">
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="px-8 pt-8 pb-4 border-b border-gray-100 bg-white z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-extrabold text-heading tracking-tight">Application</h3>
                <span className="text-xs font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Step {step} of {totalSteps}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex-1 px-8 py-6 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">

                {/* Step 1: Personal & Legal */}
                {step === 1 && (
                  <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Shield className="w-5 h-5 mr-2" /> Personal & Legal Information</h4>
                    <InputField label="Full Name" name="fullName" placeholder="Legal Name" required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Age" name="age" type="number" required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                      <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Prefer not to say']} formData={formData} handleInputChange={handleInputChange} />
                    </div>
                    <SelectField label="Primary Residence" name="residence" options={['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah']} formData={formData} handleInputChange={handleInputChange} />
                    <InputField label="Email" name="email" type="email" required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                    <InputField label="Phone / WhatsApp" name="phone" required formData={formData} handleInputChange={handleInputChange} errors={errors} />

                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">UAE Media License</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        {['Yes (NMC/MCI)', 'No', 'In Progress'].map(opt => (
                          <label key={opt} className={`flex items-center justify-center p-3 rounded-xl cursor-pointer border ${formData.licenseStatus === opt ? 'bg-primary/10 border-primary text-primary font-bold' : 'border-gray-100 text-body'}`}>
                            <input type="radio" name="licenseStatus" value={opt} checked={formData.licenseStatus === opt} onChange={handleInputChange} className="hidden" />
                            <span className="text-sm">{opt}</span>
                          </label>
                        ))}
                      </div>
                      {formData.licenseStatus === 'Yes (NMC/MCI)' && (
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors relative">
                          <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                          {formData.licenseFile ? (
                            <span className="text-primary font-bold">{formData.licenseFile.name}</span>
                          ) : (
                            <span className="text-sm text-gray-500">Upload License Copy (Click here)</span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Social & Portfolio */}
                {step === 2 && (
                  <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Globe className="w-5 h-5 mr-2" /> Social & Portfolio</h4>
                    <InputField label="Instagram Handle" name="instagram" placeholder="@username" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                    <InputField label="TikTok Handle" name="tiktok" placeholder="@username" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                    <InputField label="Portfolio / Media Kit Link" name="portfolio" placeholder="https://..." formData={formData} handleInputChange={handleInputChange} errors={errors} />

                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-2">Content Languages</label>
                      <div className="flex flex-wrap gap-2">
                        {['English', 'Arabic', 'Hindi/Urdu', 'Other'].map(lang => (
                          <label key={lang} className={`px-4 py-2 rounded-full border text-sm cursor-pointer ${formData.contentLanguages.includes(lang) ? 'bg-heading text-white border-heading' : 'bg-white border-gray-200'}`}>
                            <input type="checkbox" name="contentLanguages" value={lang} checked={formData.contentLanguages.includes(lang)} onChange={handleInputChange} className="hidden" />
                            {lang}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-2">Audience in UAE (%)</label>
                      <input type="range" name="audienceLocation" min="0" max="100" value={formData.audienceLocation || 0} onChange={handleInputChange} className="w-full accent-primary" />
                      <div className="text-right text-sm font-bold text-primary">{formData.audienceLocation}%</div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Content Expertise */}
                {step === 3 && (
                  <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Camera className="w-5 h-5 mr-2" /> Content Expertise</h4>
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Interests (Max 3)</label>
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
                    <InputField label="Primary Equipment" name="equipment" placeholder="e.g. iPhone 15 Pro, Sony ZV-1" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                  </motion.div>
                )}

                {/* Step 4: Collaboration & Logistics */}
                {step === 4 && (
                  <motion.div key="4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Briefcase className="w-5 h-5 mr-2" /> Collaboration & Logistics</h4>
                    <SelectField label="Preferred Collab Type" name="collabType" options={['Paid Only', 'Free/Gifting', 'Hybrid (Product + Fee)']} formData={formData} handleInputChange={handleInputChange} />
                    <SelectField label="Available for On-Site Shoots?" name="availabilityOnSite" options={['Yes', 'No']} formData={formData} handleInputChange={handleInputChange} />
                    <SelectField label="Turnaround Time (First Draft)" name="tat" options={['48 Hours', '3-5 Days', '7+ Days']} formData={formData} handleInputChange={handleInputChange} />
                    <InputField label="Current Exclusivity (Brand Names)" name="exclusivity" placeholder="List existing brand ambassadorships..." formData={formData} handleInputChange={handleInputChange} errors={errors} />
                  </motion.div>
                )}

                {/* Step 5: Commercial Rates */}
                {step === 5 && (
                  <motion.div key="5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><DollarSign className="w-5 h-5 mr-2" /> Commercial Rates (AED)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="1 Video Rate" name="rateVideo" type="number" placeholder="AED" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                      <InputField label="3 Video Bundle" name="rateBundle" type="number" placeholder="AED" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                      <InputField label="Whitelisting (30 Days)" name="rateWhitelisting" type="number" placeholder="AED" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                      <InputField label="Raw Footage Fee" name="rateRaw" type="number" placeholder="AED" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Usage Rights */}
                {step === 6 && (
                  <motion.div key="6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><FileText className="w-5 h-5 mr-2" /> Usage Rights</h4>
                    <SelectField label="Allow Organic Reposting?" name="usageOrganic" options={['Yes', 'No']} formData={formData} handleInputChange={handleInputChange} />
                    <SelectField label="Allow Paid Ads Usage?" name="usagePaid" options={['Yes', 'No']} formData={formData} handleInputChange={handleInputChange} />
                    <InputField label="Exclusivity Premium %" name="exclusivityPremium" placeholder="e.g. +20% for 30 days" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                  </motion.div>
                )}

                {/* Step 7: Content Style */}
                {step === 7 && (
                  <motion.div key="7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Video className="w-5 h-5 mr-2" /> Style & Preferences</h4>
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-2">Camera Confidence (1-5)</label>
                      <input type="range" name="cameraConfidence" min="1" max="5" value={formData.cameraConfidence} onChange={handleInputChange} className="w-full accent-primary" />
                      <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Shy</span><span>Pro</span></div>
                    </div>
                    <SelectField label="Voiceover Capability" name="voiceover" options={['English', 'Arabic', 'Both', 'None']} formData={formData} handleInputChange={handleInputChange} />
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Style (Select All)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['ASMR', 'Unboxing', 'Skits/Comedy', 'Educational', 'Aesthetic Vlog', 'Green Screen'].map(cat => (
                          <label key={cat} className={`flex items-center space-x-2 p-3 rounded-xl cursor-pointer border ${formData.contentStyle.includes(cat) ? 'bg-primary/5 border-primary' : 'bg-gray-5 border-transparent'}`}>
                            <input type="checkbox" name="contentStyle" value={cat} checked={formData.contentStyle.includes(cat)} onChange={handleInputChange} className="accent-primary" />
                            <span className="text-xs font-medium">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <SelectField label="Do you own pets?" name="pets" options={['No', 'Cat', 'Dog', 'Other']} formData={formData} handleInputChange={handleInputChange} />
                  </motion.div>
                )}

                {/* Step 8: Logistics & Payment */}
                {step === 8 && (
                  <motion.div key="8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><MapPin className="w-5 h-5 mr-2" /> Logistics & Payment</h4>
                    <SelectField label="Address Type" name="addressType" options={['Residential Villa/Apt', 'PO Box', 'Office']} formData={formData} handleInputChange={handleInputChange} />
                    <SelectField label="VAT Registered?" name="vatRegistered" options={['Yes', 'No']} formData={formData} handleInputChange={handleInputChange} />
                    {formData.vatRegistered === 'Yes' && <InputField label="TRN Number" name="trn" formData={formData} handleInputChange={handleInputChange} errors={errors} />}
                    <SelectField label="Payment Method" name="paymentMethod" options={['Bank Transfer (UAE)', 'PayPal', 'Cash/Cheque']} formData={formData} handleInputChange={handleInputChange} />
                  </motion.div>
                )}

                {/* Step 9: Values & Constraints */}
                {step === 9 && (
                  <motion.div key="9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h4 className="text-lg font-bold text-primary flex items-center"><Heart className="w-5 h-5 mr-2" /> Values & Constraints</h4>
                    <div>
                      <label className="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Dietary Restrictions</label>
                      <div className="flex flex-wrap gap-2">
                        {['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal Only', 'None'].map(opt => (
                          <label key={opt} className={`px-4 py-2 rounded-full border text-xs font-bold cursor-pointer ${formData.dietary.includes(opt) ? 'bg-heading text-white' : 'bg-gray-50 border-gray-200'}`}>
                            <input type="checkbox" name="dietary" value={opt} checked={formData.dietary.includes(opt)} onChange={handleInputChange} className="hidden" />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                    <InputField label="Excluded Categories (Industries you refuse)" name="excludedCategories" placeholder="e.g. Alcohol, Gambling, Fast Fashion" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                    <SelectField label="Willing to attend Store Openings?" name="liveEvents" options={['Yes', 'No']} formData={formData} handleInputChange={handleInputChange} />
                  </motion.div>
                )}

                {/* Step 10: Final Verification */}
                {step === 10 && (
                  <motion.div key="10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 py-8">
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

            {/* Footer Navigation */}
            <div className="px-8 py-6 border-t border-gray-100 bg-white flex space-x-4">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-100 hover:bg-gray-200 text-heading transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {step < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="flex-1 h-14 bg-heading text-white font-bold rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all hover:bg-heading/90"
                >
                  <span>Next Step</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 h-14 font-bold rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white'}`}
                >
                  {isSubmitting ? 'Sending Application...' : 'Submit Final Application'}
                </button>
              )}
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 bg-accent/40 rounded-full flex items-center justify-center mb-8 text-primary">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-extrabold text-heading mb-4">Application Received!</h3>
            <p className="text-body mb-8 max-w-sm">Thank you for completing the comprehensive profile. Our team will verify your details and reach out shortly.</p>
            <button onClick={onClose} className="px-10 py-4 bg-heading text-white font-bold rounded-2xl hover:scale-105 transition-all">Close Window</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CreatorModal;
