// Initialize Lucide icons
lucide.createIcons({
  icons: {
    Shield, Clock, FileText, ExternalLink, Filter, X, Check
  }
});

let applications = [];
let filter = 'pending';
let selectedApp = null;

const applicationsList = document.getElementById('applications-list');
const detailsSidebar = document.getElementById('details-sidebar');
const filterBtns = document.querySelectorAll('.filter-btn');

const loadApps = () => {
  // In a real app, this would be an API call
  // For now, we'll still use localStorage to keep it consistent with the previous version
  applications = JSON.parse(localStorage.getItem('uae_creator_applications') || '[]');
  render();
};

const handleStatusUpdate = (id, newStatus) => {
  applications = applications.map(app => 
    app.id === id ? { ...app, status: newStatus, processedAt: new Date().toISOString() } : app
  );
  localStorage.setItem('uae_creator_applications', JSON.stringify(applications));
  selectedApp = null;
  render();
};

const render = () => {
  const filteredApps = applications.filter(app => app.status === filter);
  
  // Render List
  applicationsList.innerHTML = '';
  if (filteredApps.length === 0) {
    applicationsList.innerHTML = `
      <div class="bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
        <i data-lucide="clock" class="mx-auto text-gray-200 mb-6" size="48"></i>
        <p class="text-body font-bold text-lg">No ${filter} applications found.</p>
      </div>
    `;
  } else {
    filteredApps.forEach(app => {
      const card = document.createElement('div');
      card.className = `bg-white p-6 rounded-3xl border transition-all cursor-pointer group ${selectedApp?.id === app.id ? 'border-primary ring-4 ring-primary/5' : 'border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-gray-200/40'}`;
      card.innerHTML = `
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-primary font-bold">
              ${app.firstName?.charAt(0) || 'U'}
            </div>
            <div>
              <h4 class="font-bold text-heading text-lg">${app.firstName} ${app.lastName}</h4>
              <p class="text-xs text-body font-medium">${app.email}</p>
            </div>
          </div>
          <div class="text-right">
             <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${app.status === 'pending' ? 'bg-amber-100 text-amber-600' : app.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}">
               ${app.status}
             </span>
             <p class="text-[10px] text-gray-400 mt-2 font-medium">
               ${app.residence}
             </p>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        selectedApp = app;
        render();
      });
      applicationsList.appendChild(card);
    });
  }

  // Render Sidebar
  if (selectedApp) {
    detailsSidebar.innerHTML = `
      <div class="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 sticky top-12 border border-gray-100 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
        <div class="flex justify-between items-start mb-8">
          <h3 class="text-2xl font-extrabold text-heading tracking-tight">Profile View</h3>
          <button id="close-sidebar" class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <i data-lucide="x" size="20" class="text-gray-400"></i>
          </button>
        </div>

        <div class="space-y-6">
          <div>
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Creator</label>
            <p class="text-lg font-bold text-heading">${selectedApp.firstName} ${selectedApp.lastName} (${selectedApp.age})</p>
            <p class="text-sm font-medium text-body">${selectedApp.residence} • ${selectedApp.gender}</p>
          </div>

          <div class="p-4 bg-gray-50 rounded-2xl">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Social Handles</label>
            <div class="flex flex-wrap gap-2">
              ${Object.entries(selectedApp.socialHandles || {}).map(([platform, handle]) => `
                <div class="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-heading">
                  ${platform}: ${handle}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gray-50 rounded-2xl">
               <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Gifted Collabs</label>
               <p class="text-sm font-bold text-primary">${selectedApp.acceptsGifted}</p>
            </div>
            <div class="p-4 bg-gray-50 rounded-2xl">
               <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">TAT</label>
               <p class="text-sm font-bold text-primary">${selectedApp.tat}</p>
            </div>
          </div>

          <div>
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Interests</label>
            <div class="flex flex-wrap gap-2">
              ${(selectedApp.interestFields || []).map(field => `
                <span class="px-3 py-1 bg-accent/20 text-primary rounded-full text-[10px] font-bold">
                  ${field}
                </span>
              `).join('')}
            </div>
          </div>

          <div>
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Portfolio</label>
            <a href="${selectedApp.portfolioLink}" target="_blank" class="text-xs font-bold text-primary underline flex items-center">
              View Portfolio <i data-lucide="external-link" size="12" class="ml-1"></i>
            </a>
          </div>

          <div>
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">License & Docs</label>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span class="text-[10px] font-bold text-heading">License (${selectedApp.hasLicense})</span>
                ${selectedApp.hasLicense === 'Yes' ? '<i data-lucide="file-text" size="14" class="text-primary"></i>' : ''}
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span class="text-[10px] font-bold text-heading">Emirates ID / Passport</span>
                <i data-lucide="check" size="14" class="text-emerald-500"></i>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span class="text-[10px] font-bold text-heading">Visa Copy</span>
                <i data-lucide="check" size="14" class="text-emerald-500"></i>
              </div>
            </div>
          </div>

          <div class="pt-6 grid grid-cols-2 gap-4">
            <button id="reject-btn" class="py-4 rounded-2xl bg-rose-50 text-rose-600 font-bold text-sm hover:bg-rose-100 transition-colors flex items-center justify-center space-x-2">
              <i data-lucide="x" size="18"></i>
              <span>Reject</span>
            </button>
            <button id="approve-btn" class="py-4 rounded-2xl bg-emerald-50 text-emerald-600 font-bold text-sm hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-2">
              <i data-lucide="check" size="18"></i>
              <span>Approve</span>
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('close-sidebar').addEventListener('click', () => {
      selectedApp = null;
      render();
    });
    document.getElementById('reject-btn').addEventListener('click', () => handleStatusUpdate(selectedApp.id, 'rejected'));
    document.getElementById('approve-btn').addEventListener('click', () => handleStatusUpdate(selectedApp.id, 'approved'));
  } else {
    detailsSidebar.innerHTML = `
      <div class="bg-accent/10 rounded-[2.5rem] p-12 text-center border border-primary/10">
        <i data-lucide="shield" class="mx-auto text-primary mb-6" size="48"></i>
        <h4 class="font-bold text-heading text-xl mb-3">Compliance Ready</h4>
        <p class="text-body text-sm leading-relaxed font-medium">Select an application to verify credentials and manage access to the UAE Creators platform.</p>
      </div>
    `;
  }

  lucide.createIcons();
};

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    filterBtns.forEach(b => {
      b.classList.remove('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20');
      b.classList.add('text-body', 'hover:bg-gray-50');
    });
    btn.classList.add('bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20');
    btn.classList.remove('text-body', 'hover:bg-gray-50');
    render();
  });
});

loadApps();
// Poll for changes
setInterval(loadApps, 5000);
