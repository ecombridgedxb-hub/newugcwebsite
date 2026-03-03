<!-- Creator Modal Component -->
<div id="creator-modal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 hidden">
    <!-- Backdrop -->
    <div onclick="closeModal()" class="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"></div>

    <!-- Modal Container -->
    <div class="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
        <button 
            onclick="closeModal()"
            class="absolute top-8 right-8 p-2 text-gray-400 hover:text-heading transition-colors z-20"
        >
            <i data-lucide="x" style="width: 24px; height: 24px;"></i>
        </button>

        <!-- Form Content -->
        <div id="modal-content" class="flex flex-col h-full">
            <div class="p-12 pb-6">
                <h3 class="text-3xl font-extrabold text-heading mb-2 tracking-tight">Application</h3>
                <p class="text-body text-sm font-medium mb-10">Request access to the curated UAE network.</p>
                
                <div class="relative h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div id="progress-bar" class="absolute top-0 left-0 h-full bg-primary transition-all duration-500" style="width: 20%;"></div>
                </div>
            </div>

            <div class="flex-1 px-12 pb-8 overflow-y-auto">
                <!-- Step 1 -->
                <div id="step-1" class="space-y-6">
                    <div>
                        <label class="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Full Name</label>
                        <input 
                            name="fullName"
                            placeholder="Sarah Ahmed"
                            class="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all"
                        />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Age</label>
                            <input 
                                name="age"
                                type="number"
                                class="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white"
                            />
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Residence</label>
                            <select 
                                name="country"
                                class="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none"
                            >
                                <option>Dubai</option>
                                <option>Abu Dhabi</option>
                                <option>Sharjah</option>
                                <option>Other UAE</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Email</label>
                        <input 
                            name="email"
                            type="email"
                            class="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none"
                        />
                    </div>
                </div>

                <!-- Step 2 -->
                <div id="step-2" class="space-y-6 hidden">
                    <div>
                        <label class="block text-xs font-bold text-heading uppercase tracking-widest mb-3">UAE Content License</label>
                        <p class="text-[11px] text-body mb-4 font-medium leading-relaxed">
                            A valid NMC or freelancer influencer license is mandatory for all content creators operating within the UAE.
                        </p>
                        <div id="upload-container" class="relative group border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all bg-[#F9FAFB] border-gray-200 hover:border-primary/40">
                            <input 
                                type="file"
                                accept=".pdf,image/*"
                                onchange="handleFileUpload(this)"
                                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div id="upload-placeholder" class="flex flex-col items-center text-center">
                                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm mb-4 group-hover:text-primary transition-colors">
                                    <i data-lucide="upload" style="width: 32px; height: 32px;"></i>
                                </div>
                                <span class="text-sm font-bold text-heading mb-1">Click to upload license</span>
                                <span class="text-xs text-body font-medium">PDF or Image (Max 5MB)</span>
                            </div>
                            <div id="file-attached" class="hidden flex flex-col items-center text-center">
                                <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-4">
                                    <i data-lucide="file-text" style="width: 32px; height: 32px;"></i>
                                </div>
                                <span id="file-name-display" class="text-sm font-bold text-heading mb-1">filename.pdf</span>
                                <span class="text-xs text-primary font-bold">File Attached</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 3 (Socials) -->
                <div id="step-3" class="space-y-6 hidden">
                    <div>
                        <label class="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Instagram</label>
                        <input name="instagram" placeholder="@username" class="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-heading uppercase tracking-widest mb-3">TikTok</label>
                        <input name="tiktok" placeholder="@username" class="w-full p-4 bg-[#F9FAFB] border border-transparent rounded-2xl outline-none focus:bg-white" />
                    </div>
                </div>

                <!-- Step 4 (Collab Type) -->
                <div id="step-4" class="space-y-6 hidden">
                    <label class="block text-xs font-bold text-heading uppercase tracking-widest mb-3">Collaboration Type</label>
                    <div class="grid grid-cols-1 gap-3">
                        <label class="flex items-center p-4 rounded-2xl cursor-pointer border bg-[#F9FAFB] border-transparent hover:border-primary/20">
                            <input type="radio" name="collabType" value="Paid" class="mr-3 accent-primary" />
                            <span class="text-sm font-bold text-body">Paid Only</span>
                        </label>
                        <label class="flex items-center p-4 rounded-2xl cursor-pointer border bg-[#F9FAFB] border-transparent hover:border-primary/20">
                            <input type="radio" name="collabType" value="Hybrid" class="mr-3 accent-primary" />
                            <span class="text-sm font-bold text-body">Hybrid (Products + Cash)</span>
                        </label>
                        <label class="flex items-center p-4 rounded-2xl cursor-pointer border bg-[#F9FAFB] border-transparent hover:border-primary/20">
                            <input type="radio" name="collabType" value="Samples" class="mr-3 accent-primary" />
                            <span class="text-sm font-bold text-body">Open to Samples</span>
                        </label>
                    </div>
                </div>

                <!-- Step 5 (Consent) -->
                <div id="step-5" class="space-y-6 hidden">
                    <div class="p-8 bg-accent/20 rounded-3xl border border-primary/10">
                        <div class="space-y-6">
                            <label class="flex items-start space-x-4 cursor-pointer">
                                <input type="checkbox" name="consentAge" class="mt-1 w-5 h-5 accent-primary" />
                                <span class="text-xs font-medium text-heading leading-relaxed">I am 18+ and live in the UAE.</span>
                            </label>
                            <label class="flex items-start space-x-4 cursor-pointer">
                                <input type="checkbox" name="consentContact" class="mt-1 w-5 h-5 accent-primary" />
                                <span class="text-xs font-medium text-heading leading-relaxed">I agree to receive invites via Email or WhatsApp.</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Buttons -->
            <div class="p-12 pt-0 flex space-x-4">
                <button 
                    id="prev-btn"
                    onclick="prevStep()"
                    class="hidden flex items-center justify-center w-14 h-14 bg-gray-100 text-heading rounded-2xl hover:bg-gray-200 transition-colors"
                >
                    <i data-lucide="chevron-left" style="width: 24px; height: 24px;"></i>
                </button>
                <button 
                    id="next-btn"
                    onclick="nextStep()"
                    class="flex-1 bg-heading text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all"
                >
                    <span>Next Step</span>
                    <i data-lucide="chevron-right" style="width: 18px; height: 18px;"></i>
                </button>
                <button 
                    id="submit-btn"
                    onclick="handleFormSubmit()"
                    class="hidden flex-1 bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                >
                    Submit Request
                </button>
            </div>
        </div>

        <!-- Success Content -->
        <div id="success-content" class="hidden flex-1 flex flex-col items-center justify-center p-16 text-center">
            <div class="w-24 h-24 bg-accent/40 rounded-full flex items-center justify-center mb-10">
                <i data-lucide="check-circle-2" class="text-primary" style="width: 48px; height: 48px;"></i>
            </div>
            <h3 class="text-3xl font-extrabold text-heading mb-4 tracking-tight">Request Received</h3>
            <p class="text-body font-medium leading-relaxed mb-10 max-w-xs">
                Thank you for applying. Our curation team will review your profile and reach out within 48 hours.
            </p>
            <button 
                onclick="closeModal()"
                class="px-12 py-4 bg-heading text-white font-bold rounded-2xl hover:scale-105 transition-all"
            >
                Close
            </button>
        </div>
    </div>
</div>
