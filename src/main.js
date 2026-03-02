// Initialize Lucide icons
lucide.createIcons({
  icons: {
    Menu, X, ShieldCheck, Sparkles, Heart, UserPlus, Package, Share2, ExternalLink, GraduationCap, Cpu, Activity, Instagram, Linkedin, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Upload, FileText, Youtube, Facebook, Twitter, Music2, Globe, Camera, Laptop, Clock, MapPin
  }
});

// State Management
let currentStep = 1;
let isSubmitting = false;
let formData = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  residence: '',
  email: '',
  phone: '',
  acceptsGifted: '',
  hasLicense: '',
  licenseFile: null,
  emiratesIdFile: null,
  visaFile: null,
  socialHandles: {},
  portfolioLink: '',
  languages: [],
  interestFields: [],
  consistency: '',
  editingCapabilities: '',
  equipment: '',
  onSiteAvailability: '',
  tat: '',
  exclusivity: '',
  agreed: false
};

const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];
const languages = ['English', 'Arabic', 'Hindi', 'Urdu', 'French', 'Russian', 'Spanish', 'Other'];
const interestFields = ['Fashion', 'Beauty', 'Tech', 'Food', 'Travel', 'Fitness', 'Lifestyle', 'Gaming', 'Automotive', 'Real Estate', 'Business', 'Parenting'];

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const formContainer = document.getElementById('form-container');
const nextStepBtn = document.getElementById('next-step-btn');
const prevStepBtn = document.getElementById('prev-step-btn');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress-bar');
const currentStepNum = document.getElementById('current-step-num');
const submitError = document.getElementById('submit-error');
const successScreen = document.getElementById('success-screen');
const rejectionScreen = document.getElementById('rejection-screen');
const successCloseBtn = document.getElementById('success-close-btn');
const rejectionCloseBtn = document.getElementById('rejection-close-btn');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
    navbar.classList.remove('bg-transparent', 'py-6');
  } else {
    navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
    navbar.classList.add('bg-transparent', 'py-6');
  }
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Modal Logic
const openModal = () => {
  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderStep();
};

const closeModal = () => {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  // Reset form if needed
};

openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
closeModalBtn.addEventListener('click', closeModal);
successCloseBtn.addEventListener('click', () => {
  successScreen.classList.add('hidden');
  closeModal();
});
rejectionCloseBtn.addEventListener('click', () => {
  rejectionScreen.classList.add('hidden');
  closeModal();
});

// Form Rendering
const renderStep = () => {
  formContainer.innerHTML = '';
  currentStepNum.textContent = currentStep;
  progressBar.style.width = `${(currentStep / 6) * 100}%`;

  if (currentStep === 1) {
    prevStepBtn.classList.add('hidden');
    nextStepBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
    renderStep1();
  } else if (currentStep === 6) {
    prevStepBtn.classList.remove('hidden');
    nextStepBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    renderStep6();
  } else {
    prevStepBtn.classList.remove('hidden');
    nextStepBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
    if (currentStep === 2) renderStep2();
    if (currentStep === 3) renderStep3();
    if (currentStep === 4) renderStep4();
    if (currentStep === 5) renderStep5();
  }
  
  // Re-initialize icons for newly added content
  lucide.createIcons();
};

const renderStep1 = () => {
  formContainer.innerHTML = `
    <div class="space-y-8">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">First Name</label>
          <input type="text" name="firstName" value="${formData.firstName}" class="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all" placeholder="John">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Last Name</label>
          <input type="text" name="lastName" value="${formData.lastName}" class="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all" placeholder="Doe">
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Age</label>
          <input type="number" name="age" value="${formData.age}" class="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all" placeholder="24">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Gender</label>
          <select name="gender" class="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all">
            <option value="">Select Gender</option>
            <option value="Male" ${formData.gender === 'Male' ? 'selected' : ''}>Male</option>
            <option value="Female" ${formData.gender === 'Female' ? 'selected' : ''}>Female</option>
            <option value="Non-binary" ${formData.gender === 'Non-binary' ? 'selected' : ''}>Non-binary</option>
          </select>
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Primary Residence (Emirate)</label>
        <select name="residence" class="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all">
          <option value="">Select Emirate</option>
          ${emirates.map(e => `<option value="${e}" ${formData.residence === e ? 'selected' : ''}>${e}</option>`).join('')}
        </select>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Email Address</label>
          <input type="email" name="email" value="${formData.email}" class="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all" placeholder="john@example.com">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Phone / WhatsApp</label>
          <input type="tel" name="phone" value="${formData.phone}" class="w-full p-3.5 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all" placeholder="+971 50 123 4567">
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-4">Do you accept gifted collaborations?</label>
        <div class="grid grid-cols-2 gap-4">
          <button type="button" class="gifted-btn p-4 rounded-2xl border transition-all font-bold text-sm ${formData.acceptsGifted === 'Yes' ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}" data-value="Yes">Yes, I do</button>
          <button type="button" class="gifted-btn p-4 rounded-2xl border transition-all font-bold text-sm ${formData.acceptsGifted === 'No' ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}" data-value="No">No, paid only</button>
        </div>
      </div>
    </div>
  `;
  
  // Attach listeners
  formContainer.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('change', (e) => {
      formData[e.target.name] = e.target.value;
    });
  });
  
  formContainer.querySelectorAll('.gifted-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      formData.acceptsGifted = btn.dataset.value;
      renderStep1();
    });
  });
};

const renderStep2 = () => {
  formContainer.innerHTML = `
    <div class="space-y-8">
      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-4">Do you have a UAE Content Creator / Media License?</label>
        <div class="grid grid-cols-3 gap-3">
          ${['Yes', 'No', 'In Progress'].map(v => `
            <button type="button" class="license-btn p-4 rounded-2xl border transition-all font-bold text-xs ${formData.hasLicense === v ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}" data-value="${v}">${v}</button>
          `).join('')}
        </div>
      </div>
      
      ${formData.hasLicense === 'Yes' ? `
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Upload Media License</label>
          <div class="relative group">
            <input type="file" name="licenseFile" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
            <div class="p-8 border-2 border-dashed border-gray-100 rounded-[2rem] bg-[#F9FAFB] group-hover:bg-white group-hover:border-primary/20 transition-all text-center">
              <i data-lucide="upload" class="mx-auto text-gray-300 mb-4" size="32"></i>
              <p class="text-xs font-bold text-heading">${formData.licenseFile ? formData.licenseFile.name : 'Click to upload or drag and drop'}</p>
              <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">PDF, JPG or PNG (Max 5MB)</p>
            </div>
          </div>
        </div>
      ` : ''}

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Emirates ID / Passport</label>
          <div class="relative group">
            <input type="file" name="emiratesIdFile" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
            <div class="p-6 border-2 border-dashed border-gray-100 rounded-[2rem] bg-[#F9FAFB] group-hover:bg-white group-hover:border-primary/20 transition-all text-center">
              <i data-lucide="file-text" class="mx-auto text-gray-300 mb-3" size="24"></i>
              <p class="text-[10px] font-bold text-heading truncate">${formData.emiratesIdFile ? formData.emiratesIdFile.name : 'Upload Document'}</p>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Visa Copy</label>
          <div class="relative group">
            <input type="file" name="visaFile" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
            <div class="p-6 border-2 border-dashed border-gray-100 rounded-[2rem] bg-[#F9FAFB] group-hover:bg-white group-hover:border-primary/20 transition-all text-center">
              <i data-lucide="shield-check" class="mx-auto text-gray-300 mb-3" size="24"></i>
              <p class="text-[10px] font-bold text-heading truncate">${formData.visaFile ? formData.visaFile.name : 'Upload Visa'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  formContainer.querySelectorAll('.license-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      formData.hasLicense = btn.dataset.value;
      renderStep2();
    });
  });

  formContainer.querySelectorAll('input[type="file"]').forEach(el => {
    el.addEventListener('change', (e) => {
      formData[e.target.name] = e.target.files[0];
      renderStep2();
    });
  });
};

const renderStep3 = () => {
  const platforms = [
    { id: 'instagram', icon: 'instagram', label: 'Instagram' },
    { id: 'tiktok', icon: 'music2', label: 'TikTok' },
    { id: 'youtube', icon: 'youtube', label: 'YouTube' },
    { id: 'facebook', icon: 'facebook', label: 'Facebook' },
    { id: 'x', icon: 'twitter', label: 'X (Twitter)' }
  ];

  formContainer.innerHTML = `
    <div class="space-y-8">
      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-4">Social Media Presence</label>
        <div class="grid grid-cols-5 gap-3 mb-6">
          ${platforms.map(p => `
            <button type="button" class="platform-btn w-full aspect-square rounded-2xl border flex items-center justify-center transition-all ${formData.socialHandles[p.id] ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-gray-400 border-transparent hover:border-primary/20'}" data-platform="${p.id}">
              <i data-lucide="${p.icon}" size="24"></i>
            </button>
          `).join('')}
        </div>
        <div id="platform-inputs" class="space-y-3">
          ${Object.keys(formData.socialHandles).map(p => `
            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span class="text-[10px] font-bold text-heading w-20 uppercase">${p}</span>
              <input type="text" class="handle-input flex-1 bg-transparent border-none outline-none text-sm font-bold text-primary" value="${formData.socialHandles[p]}" data-platform="${p}" placeholder="@handle or link">
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Portfolio / Media Kit Link</label>
        <div class="relative">
          <input type="url" name="portfolioLink" value="${formData.portfolioLink}" class="w-full p-3.5 pl-10 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all" placeholder="https://behance.net/yourname">
          <i data-lucide="globe" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size="18"></i>
        </div>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-4">Primary Content Language(s)</label>
        <div class="flex flex-wrap gap-2">
          ${languages.map(l => `
            <button type="button" class="lang-btn px-4 py-2 rounded-xl border text-xs font-bold transition-all ${formData.languages.includes(l) ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}" data-value="${l}">${l}</button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  formContainer.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.dataset.platform;
      if (formData.socialHandles[p]) {
        delete formData.socialHandles[p];
      } else {
        formData.socialHandles[p] = '';
      }
      renderStep3();
    });
  });

  formContainer.querySelectorAll('.handle-input').forEach(input => {
    input.addEventListener('change', (e) => {
      formData.socialHandles[input.dataset.platform] = e.target.value;
    });
  });

  formContainer.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.value;
      if (formData.languages.includes(v)) {
        formData.languages = formData.languages.filter(l => l !== v);
      } else {
        formData.languages.push(v);
      }
      renderStep3();
    });
  });

  formContainer.querySelector('input[name="portfolioLink"]').addEventListener('change', (e) => {
    formData.portfolioLink = e.target.value;
  });
};

const renderStep4 = () => {
  formContainer.innerHTML = `
    <div class="space-y-8">
      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-4">Top 3 Interest Fields</label>
        <div class="flex flex-wrap gap-2">
          ${interestFields.map(f => `
            <button type="button" class="interest-btn px-4 py-2 rounded-xl border text-xs font-bold transition-all ${formData.interestFields.includes(f) ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}" data-value="${f}">${f}</button>
          `).join('')}
        </div>
        <p class="text-[9px] text-gray-400 mt-3 font-bold uppercase tracking-widest">Selected: ${formData.interestFields.length} / 3</p>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-4">How often do you post content?</label>
        <div class="grid grid-cols-2 gap-3">
          ${['Daily', '2-3 times a week', 'Weekly', 'Bi-weekly'].map(v => `
            <button type="button" class="consistency-btn p-3.5 rounded-xl border text-xs font-bold transition-all ${formData.consistency === v ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}" data-value="${v}">${v}</button>
          `).join('')}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Editing Capabilities</label>
          <div class="relative">
            <select name="editingCapabilities" class="w-full p-3.5 pl-10 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all text-xs font-bold">
              <option value="">Select Level</option>
              <option value="Basic" ${formData.editingCapabilities === 'Basic' ? 'selected' : ''}>Basic (Cuts/Music)</option>
              <option value="Intermediate" ${formData.editingCapabilities === 'Intermediate' ? 'selected' : ''}>Intermediate (Color/FX)</option>
              <option value="Advanced" ${formData.editingCapabilities === 'Advanced' ? 'selected' : ''}>Advanced (Professional)</option>
            </select>
            <i data-lucide="laptop" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size="18"></i>
          </div>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Primary Equipment</label>
          <div class="relative">
            <select name="equipment" class="w-full p-3.5 pl-10 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all text-xs font-bold">
              <option value="">Select Gear</option>
              <option value="Smartphone" ${formData.equipment === 'Smartphone' ? 'selected' : ''}>Smartphone Only</option>
              <option value="Mirrorless/DSLR" ${formData.equipment === 'Mirrorless/DSLR' ? 'selected' : ''}>Mirrorless / DSLR</option>
              <option value="Professional" ${formData.equipment === 'Professional' ? 'selected' : ''}>Full Studio Setup</option>
            </select>
            <i data-lucide="camera" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size="18"></i>
          </div>
        </div>
      </div>
    </div>
  `;

  formContainer.querySelectorAll('.interest-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.value;
      if (formData.interestFields.includes(v)) {
        formData.interestFields = formData.interestFields.filter(f => f !== v);
      } else if (formData.interestFields.length < 3) {
        formData.interestFields.push(v);
      }
      renderStep4();
    });
  });

  formContainer.querySelectorAll('.consistency-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      formData.consistency = btn.dataset.value;
      renderStep4();
    });
  });

  formContainer.querySelectorAll('select').forEach(el => {
    el.addEventListener('change', (e) => {
      formData[e.target.name] = e.target.value;
    });
  });
};

const renderStep5 = () => {
  formContainer.innerHTML = `
    <div class="space-y-8">
      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-4">Are you available for on-site shoots in the UAE?</label>
        <div class="grid grid-cols-2 gap-4">
          ${['Yes', 'No'].map(v => `
            <button type="button" class="onsite-btn p-4 rounded-2xl border transition-all font-bold text-sm ${formData.onSiteAvailability === v ? 'bg-primary text-white border-primary' : 'bg-[#F9FAFB] text-body border-transparent hover:border-primary/20'}" data-value="${v}">${v}</button>
          `).join('')}
        </div>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Standard Turnaround Time (TAT)</label>
        <div class="relative">
          <select name="tat" class="w-full p-3.5 pl-10 bg-[#F9FAFB] border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all text-xs font-bold">
            <option value="">Select TAT</option>
            <option value="24-48 Hours" ${formData.tat === '24-48 Hours' ? 'selected' : ''}>24-48 Hours</option>
            <option value="3-5 Days" ${formData.tat === '3-5 Days' ? 'selected' : ''}>3-5 Days</option>
            <option value="7+ Days" ${formData.tat === '7+ Days' ? 'selected' : ''}>7+ Days</option>
          </select>
          <i data-lucide="clock" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size="18"></i>
        </div>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-heading uppercase tracking-widest mb-2">Current Exclusivity / Brand Conflicts</label>
        <textarea name="exclusivity" class="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all text-xs font-bold min-h-[120px]" placeholder="List any brands you are currently working with exclusively...">${formData.exclusivity}</textarea>
      </div>
    </div>
  `;

  formContainer.querySelectorAll('.onsite-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      formData.onSiteAvailability = btn.dataset.value;
      renderStep5();
    });
  });

  formContainer.querySelector('select[name="tat"]').addEventListener('change', (e) => {
    formData.tat = e.target.value;
  });

  formContainer.querySelector('textarea[name="exclusivity"]').addEventListener('change', (e) => {
    formData.exclusivity = e.target.value;
  });
};

const renderStep6 = () => {
  formContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center py-10 text-center">
      <div class="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-primary mb-8">
        <i data-lucide="shield-check" size="40"></i>
      </div>
      <h3 class="text-2xl font-extrabold text-heading mb-4 tracking-tight">Final Verification</h3>
      <p class="text-body font-medium text-sm leading-relaxed max-w-sm mb-10">
        By submitting this application, you confirm that all information provided is accurate and you agree to our creator community guidelines.
      </p>
      
      <label class="flex items-center space-x-3 cursor-pointer group">
        <input type="checkbox" id="agreed-check" ${formData.agreed ? 'checked' : ''} class="w-6 h-6 rounded-lg border-2 border-gray-200 text-primary focus:ring-primary transition-all">
        <span class="text-xs font-bold text-heading group-hover:text-primary transition-colors">I agree to the Terms & Conditions</span>
      </label>
    </div>
  `;

  formContainer.querySelector('#agreed-check').addEventListener('change', (e) => {
    formData.agreed = e.target.checked;
  });
};

// Validation
const validateStep = () => {
  if (currentStep === 1) {
    if (!formData.firstName || !formData.lastName || !formData.age || !formData.gender || !formData.residence || !formData.email || !formData.phone || !formData.acceptsGifted) {
      alert('Please fill in all personal information fields.');
      return false;
    }
    if (parseInt(formData.age) < 18) {
      alert('You must be at least 18 years old to apply.');
      return false;
    }
    if (formData.acceptsGifted === 'No') {
      rejectionScreen.classList.remove('hidden');
      return false;
    }
  }
  if (currentStep === 2) {
    if (!formData.hasLicense || !formData.emiratesIdFile || !formData.visaFile) {
      alert('Please provide the required documentation.');
      return false;
    }
    if (formData.hasLicense === 'Yes' && !formData.licenseFile) {
      alert('Please upload your media license.');
      return false;
    }
  }
  if (currentStep === 3) {
    if (Object.keys(formData.socialHandles).length === 0 || !formData.portfolioLink || formData.languages.length === 0) {
      alert('Please provide your social presence and language details.');
      return false;
    }
  }
  if (currentStep === 4) {
    if (formData.interestFields.length === 0 || !formData.consistency || !formData.editingCapabilities || !formData.equipment) {
      alert('Please complete your expertise profile.');
      return false;
    }
  }
  if (currentStep === 5) {
    if (!formData.onSiteAvailability || !formData.tat) {
      alert('Please provide your logistics details.');
      return false;
    }
  }
  if (currentStep === 6) {
    if (!formData.agreed) {
      alert('You must agree to the terms before submitting.');
      return false;
    }
  }
  return true;
};

// Navigation
nextStepBtn.addEventListener('click', () => {
  if (validateStep()) {
    currentStep++;
    renderStep();
  }
});

prevStepBtn.addEventListener('click', () => {
  currentStep--;
  renderStep();
});

// Submission
submitBtn.addEventListener('click', async () => {
  if (!validateStep()) return;

  isSubmitting = true;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <div class="flex items-center space-x-2">
      <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      <span>Submitting...</span>
    </div>
  `;
  submitError.classList.add('hidden');

  try {
    const formDataToSend = new FormData();
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
        formDataToSend.append(key, value);
      }
    });

    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formDataToSend,
    });

    const result = await response.json();

    if (result.success) {
      successScreen.classList.remove('hidden');
    } else {
      throw new Error(result.message || 'Failed to submit application');
    }
  } catch (error) {
    console.error('Submission error:', error);
    submitError.classList.remove('hidden');
    submitError.querySelector('span').textContent = error.message || 'An unexpected error occurred. Please try again.';
  } finally {
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Submit Application</span>';
  }
});

// Initialize
document.getElementById('current-year').textContent = new Date().getFullYear();
renderStep();
