/**
 * UAE Creators - App Logic
 */

// State Management
let isModalOpen = false;
let currentStep = 1;
let isSubmitted = false;
let formData = {
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
    licenseFile: null,
    licenseBase64: ''
};

// UI Elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const creatorModal = document.getElementById('creator-modal');
const modalContent = document.getElementById('modal-content');
const successContent = document.getElementById('success-content');
const progressBar = document.getElementById('progress-bar');

// Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
        navbar.classList.remove('bg-transparent', 'py-6');
    } else {
        navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
        navbar.classList.add('bg-transparent', 'py-6');
    }
});

// Mobile Menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    const icon = document.getElementById('menu-icon');
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
}

// Modal Logic
function openModal() {
    isModalOpen = true;
    creatorModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderStep();
}

function closeModal() {
    isModalOpen = false;
    creatorModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function renderStep() {
    // Hide all steps
    for (let i = 1; i <= 5; i++) {
        const stepEl = document.getElementById(`step-${i}`);
        if (stepEl) stepEl.classList.add('hidden');
    }
    
    // Show current step
    const currentStepEl = document.getElementById(`step-${currentStep}`);
    if (currentStepEl) currentStepEl.classList.remove('hidden');
    
    // Update progress bar
    progressBar.style.width = `${(currentStep / 5) * 100}%`;
    
    // Update buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (currentStep > 1) {
        prevBtn.classList.remove('hidden');
    } else {
        prevBtn.classList.add('hidden');
    }
    
    if (currentStep < 5) {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    } else {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    }
}

function nextStep() {
    if (validateStep()) {
        currentStep++;
        renderStep();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        renderStep();
    }
}

function validateStep() {
    // Simple validation for demo
    const errors = [];
    if (currentStep === 1) {
        const name = document.querySelector('input[name="fullName"]').value;
        const age = document.querySelector('input[name="age"]').value;
        const email = document.querySelector('input[name="email"]').value;
        if (!name) errors.push('Name is required');
        if (!age || age < 18) errors.push('Must be 18 or older');
        if (!email) errors.push('Email is required');
    }
    
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return false;
    }
    return true;
}

function handleFormSubmit(e) {
    if (e) e.preventDefault();
    
    // Collect data
    formData.fullName = document.querySelector('input[name="fullName"]').value;
    formData.age = document.querySelector('input[name="age"]').value;
    formData.email = document.querySelector('input[name="email"]').value;
    
    // Simulation
    console.log('Submitting form...', formData);
    
    // Show success
    modalContent.classList.add('hidden');
    successContent.classList.remove('hidden');
}

// File Upload Simulation
function handleFileUpload(input) {
    if (input.files && input.files[0]) {
        const fileName = input.files[0].name;
        document.getElementById('file-name-display').innerText = fileName;
        document.getElementById('upload-placeholder').classList.add('hidden');
        document.getElementById('file-attached').classList.remove('hidden');
        document.getElementById('upload-container').classList.add('bg-accent/10', 'border-primary');
    }
}
