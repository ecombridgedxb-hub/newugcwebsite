<!-- Navbar Component -->
<nav id="navbar" class="fixed w-full z-50 transition-all duration-500 bg-transparent py-6">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="flex justify-between items-center">
            <!-- Logo -->
            <div class="flex items-center">
                <span class="text-xl font-extrabold tracking-tight text-heading">
                    UAE<span class="text-primary">Creators</span>
                </span>
            </div>

            <!-- Desktop Nav Links -->
            <div class="hidden md:flex items-center space-x-10">
                <a href="#creators" class="text-sm font-semibold text-heading hover:text-primary transition-colors">Creators</a>
                <a href="#how-it-works" class="text-sm font-semibold text-heading hover:text-primary transition-colors">Platform</a>
                <a href="#pricing" class="text-sm font-semibold text-heading hover:text-primary transition-colors">Pricing</a>
            </div>

            <!-- Desktop Actions -->
            <div class="hidden md:flex items-center space-x-4">
                <button 
                    onclick="openModal()"
                    class="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                >
                    Apply to Join
                </button>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button 
                    onclick="toggleMobileMenu()"
                    class="text-heading p-2"
                >
                    <i data-lucide="menu" id="menu-icon"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-white fixed inset-x-0 top-[72px] h-screen shadow-2xl p-8 flex flex-col space-y-6">
        <a href="#creators" onclick="toggleMobileMenu()" class="text-xl font-bold text-heading">Creators</a>
        <a href="#how-it-works" onclick="toggleMobileMenu()" class="text-xl font-bold text-heading">How it Works</a>
        <a href="#pricing" onclick="toggleMobileMenu()" class="text-xl font-bold text-heading">Pricing</a>
        <div class="pt-6">
            <button 
                onclick="openModal(); toggleMobileMenu();"
                class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg"
            >
                Apply to Join
            </button>
        </div>
    </div>
</nav>
