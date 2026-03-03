<?php
/**
 * UAE Creators - Admin Dashboard
 * cPanel Compatible Version (PHP + Vanilla JS)
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curation Hub | UAE Creators</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4 { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-[#F8FAFC] p-8 md:p-12">
    <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
                <h1 class="text-4xl font-extrabold text-[#0F172A] tracking-tight mb-2">Curation Hub</h1>
                <p class="text-[#6B7280] font-medium">Internal application management for UAE Creators.</p>
            </div>
            <div class="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
                <button onclick="setFilter('pending')" id="filter-pending" class="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all bg-[#1FAE9A] text-white shadow-lg shadow-[#1FAE9A]/20">pending</button>
                <button onclick="setFilter('approved')" id="filter-approved" class="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-[#6B7280] hover:bg-gray-50">approved</button>
                <button onclick="setFilter('rejected')" id="filter-rejected" class="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-[#6B7280] hover:bg-gray-50">rejected</button>
            </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
            <!-- List -->
            <div class="lg:col-span-2 space-y-4" id="app-list">
                <!-- Apps will be injected here -->
            </div>

            <!-- Details -->
            <div class="lg:col-span-1" id="app-details">
                <div class="bg-[#D1FAE5]/10 rounded-[2.5rem] p-12 text-center border border-[#1FAE9A]/10">
                    <i data-lucide="shield" class="mx-auto text-[#1FAE9A] mb-6" style="width: 48px; height: 48px;"></i>
                    <h4 class="font-bold text-[#0F172A] text-xl mb-3">Compliance Ready</h4>
                    <p class="text-[#6B7280] text-sm leading-relaxed font-medium">Select an application to verify credentials and manage access.</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        let applications = [];
        let currentFilter = 'pending';
        let selectedAppId = null;

        function loadApps() {
            applications = JSON.parse(localStorage.getItem('uae_creator_applications') || '[]');
            renderList();
            if (selectedAppId) {
                const app = applications.find(a => a.id === selectedAppId);
                if (app) renderDetails(app);
            }
        }

        function setFilter(f) {
            currentFilter = f;
            ['pending', 'approved', 'rejected'].forEach(filter => {
                const btn = document.getElementById(`filter-${filter}`);
                if (filter === f) {
                    btn.classList.add('bg-[#1FAE9A]', 'text-white', 'shadow-lg', 'shadow-[#1FAE9A]/20');
                    btn.classList.remove('text-[#6B7280]', 'hover:bg-gray-50');
                } else {
                    btn.classList.remove('bg-[#1FAE9A]', 'text-white', 'shadow-lg', 'shadow-[#1FAE9A]/20');
                    btn.classList.add('text-[#6B7280]', 'hover:bg-gray-50');
                }
            });
            renderList();
        }

        function renderList() {
            const listEl = document.getElementById('app-list');
            const filtered = applications.filter(app => app.status === currentFilter);
            
            if (filtered.length === 0) {
                listEl.innerHTML = `
                    <div class="bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
                        <i data-lucide="clock" class="mx-auto text-gray-200 mb-6" style="width: 48px; height: 48px;"></i>
                        <p class="text-[#6B7280] font-bold text-lg">No ${currentFilter} applications found.</p>
                    </div>
                `;
            } else {
                listEl.innerHTML = filtered.map(app => `
                    <div onclick="selectApp(${app.id})" class="bg-white p-6 rounded-3xl border transition-all cursor-pointer group ${selectedAppId === app.id ? 'border-[#1FAE9A] ring-4 ring-[#1FAE9A]/5' : 'border-gray-100 hover:border-[#1FAE9A]/20 hover:shadow-xl hover:shadow-gray-200/40'}">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 rounded-2xl bg-[#D1FAE5]/20 flex items-center justify-center text-[#1FAE9A] font-bold">
                                    ${app.fullName.charAt(0)}
                                </div>
                                <div>
                                    <h4 class="font-bold text-[#0F172A] text-lg">${app.fullName}</h4>
                                    <p class="text-xs text-[#6B7280] font-medium">${app.email}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${app.status === 'pending' ? 'bg-amber-100 text-amber-600' : app.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}">
                                    ${app.status}
                                </span>
                                <p class="text-[10px] text-gray-400 mt-2 font-medium">${new Date(app.submittedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            lucide.createIcons();
        }

        function selectApp(id) {
            selectedAppId = id;
            const app = applications.find(a => a.id === id);
            renderDetails(app);
            renderList();
        }

        function renderDetails(app) {
            const detailsEl = document.getElementById('app-details');
            detailsEl.innerHTML = `
                <div class="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 sticky top-12 border border-gray-100">
                    <div class="flex justify-between items-start mb-8">
                        <h3 class="text-2xl font-extrabold text-[#0F172A] tracking-tight">Profile View</h3>
                        <button onclick="closeDetails()" class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <i data-lucide="x" class="text-gray-400" style="width: 20px; height: 20px;"></i>
                        </button>
                    </div>

                    <div class="space-y-6">
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Creator</label>
                            <p class="text-lg font-bold text-[#0F172A]">${app.fullName} (${app.age})</p>
                            <p class="text-sm font-medium text-[#6B7280]">${app.country}</p>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="p-4 bg-gray-50 rounded-2xl">
                                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Instagram</label>
                                <p class="text-sm font-bold text-[#1FAE9A] truncate">${app.instagram || 'N/A'}</p>
                            </div>
                            <div class="p-4 bg-gray-50 rounded-2xl">
                                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">TikTok</label>
                                <p class="text-sm font-bold text-[#1FAE9A] truncate">${app.tiktok || 'N/A'}</p>
                            </div>
                        </div>

                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">License Verification</label>
                            <div class="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 border border-gray-200">
                                ${app.licenseBase64 ? `<img src="${app.licenseBase64}" class="w-full h-full object-cover" />` : `<div class="w-full h-full flex items-center justify-center text-gray-400"><i data-lucide="file-text" style="width: 40px; height: 40px;"></i></div>`}
                            </div>
                        </div>

                        <div class="pt-6 grid grid-cols-2 gap-4">
                            <button onclick="updateStatus(${app.id}, 'rejected')" class="py-4 rounded-2xl bg-rose-50 text-rose-600 font-bold text-sm hover:bg-rose-100 transition-colors flex items-center justify-center space-x-2">
                                <i data-lucide="x" style="width: 18px; height: 18px;"></i>
                                <span>Reject</span>
                            </button>
                            <button onclick="updateStatus(${app.id}, 'approved')" class="py-4 rounded-2xl bg-emerald-50 text-emerald-600 font-bold text-sm hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-2">
                                <i data-lucide="check" style="width: 18px; height: 18px;"></i>
                                <span>Approve</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        function updateStatus(id, status) {
            const index = applications.findIndex(a => a.id === id);
            if (index !== -1) {
                applications[index].status = status;
                applications[index].processedAt = new Date().toISOString();
                localStorage.setItem('uae_creator_applications', JSON.stringify(applications));
                closeDetails();
                renderList();
            }
        }

        function closeDetails() {
            selectedAppId = null;
            document.getElementById('app-details').innerHTML = `
                <div class="bg-[#D1FAE5]/10 rounded-[2.5rem] p-12 text-center border border-[#1FAE9A]/10">
                    <i data-lucide="shield" class="mx-auto text-[#1FAE9A] mb-6" style="width: 48px; height: 48px;"></i>
                    <h4 class="font-bold text-[#0F172A] text-xl mb-3">Compliance Ready</h4>
                    <p class="text-[#6B7280] text-sm leading-relaxed font-medium">Select an application to verify credentials and manage access.</p>
                </div>
            `;
            lucide.createIcons();
        }

        loadApps();
        setInterval(loadApps, 3000);
        lucide.createIcons();
    </script>
</body>
</html>
