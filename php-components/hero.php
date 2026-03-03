<!-- Hero Component -->
<section class="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-bgMain">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            <!-- Left Content -->
            <div class="w-full lg:w-1/2 z-10 text-left">
                <div class="opacity-0 translate-x-[-20px] transition-all duration-1000 ease-out" id="hero-left">
                    <div class="inline-flex items-center px-4 py-1.5 mb-8 bg-accent text-primary text-xs font-bold tracking-widest uppercase rounded-full border border-primary/10">
                        Invite-only Startup
                    </div>
                    <h1 class="text-5xl lg:text-7xl font-extrabold text-heading leading-[1.1] mb-8 tracking-tight">
                        Premium content for <br/><span class="text-primary">curated</span> brands.
                    </h1>
                    <p class="text-lg lg:text-xl text-body mb-12 leading-relaxed max-w-lg">
                        The Middle East's most trusted marketplace connecting high-growth brands with elite creators. Join the next generation of storytelling.
                    </p>

                    <div class="flex flex-col sm:space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                        <button 
                            onclick="openModal()"
                            class="px-10 py-4 bg-primary text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
                        >
                            Apply to Join
                        </button>
                        <button 
                            class="px-10 py-4 border-2 border-primary text-primary font-bold text-lg rounded-full hover:bg-primary/5 transition-all active:scale-[0.98]"
                        >
                            Learn More
                        </button>
                    </div>

                    <div class="mt-14 flex items-center space-x-6">
                        <div class="flex -space-x-3">
                            <div class="w-10 h-10 rounded-full border-2 border-bgMain bg-gray-200 overflow-hidden shadow-sm">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Profile" class="w-full h-full object-cover" />
                            </div>
                            <div class="w-10 h-10 rounded-full border-2 border-bgMain bg-gray-200 overflow-hidden shadow-sm">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Profile" class="w-full h-full object-cover" />
                            </div>
                            <div class="w-10 h-10 rounded-full border-2 border-bgMain bg-gray-200 overflow-hidden shadow-sm">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Profile" class="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div class="h-8 w-px bg-gray-200"></div>
                        <p class="text-sm font-medium text-heading">
                            Trusted by <span class="text-primary font-bold">5,000+</span> creators in the UAE
                        </p>
                    </div>
                </div>
            </div>

            <!-- Right Content -->
            <div class="w-full lg:w-1/2 relative">
                <div class="opacity-0 scale-95 transition-all duration-1000 delay-200 ease-out" id="hero-right">
                    <div class="relative rounded-[3rem] overflow-hidden shadow-soft aspect-[4/5] lg:aspect-[5/6]">
                        <img 
                            src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=1200" 
                            alt="UGC Creator" 
                            class="w-full h-full object-cover"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-heading/10 to-transparent"></div>
                    </div>
                </div>
                
                <!-- Decorative elements -->
                <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-accent/60 rounded-full blur-3xl -z-10"></div>
                <div class="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            </div>

        </div>
    </div>
</section>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.getElementById('hero-left').classList.remove('opacity-0', 'translate-x-[-20px]');
            document.getElementById('hero-right').classList.remove('opacity-0', 'scale-95');
        }, 100);
    });
</script>
