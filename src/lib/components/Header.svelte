<script lang="ts">
    import { tools } from '$lib/config';
    // Logic search đơn giản để redirect hoặc xử lý sau
</script>

<header class="w-full border-b border-[#333] bg-[#111] sticky top-0 z-50">
    <div class="max-w-read w-full mx-auto px-4 h-14 flex items-center justify-between">
        <div class="flex items-center gap-8">
            <a href="/" class="font-medium text-lg tracking-tight text-white flex items-center gap-2 hover:text-gray-300 transition">
                Merchant Calculators
            </a>

            <nav class="hidden md:flex items-center gap-6 text-sm font-light text-[#888]">
                <a href="/#marketplaces" class="hover:text-white transition-colors">Marketplaces</a>
                <a href="/#finance" class="hover:text-white transition-colors">Finance</a>
                <a href="/#logistics" class="hover:text-white transition-colors">Logistics</a>
            </nav>
        </div>

        <div class="relative hidden sm:block">
            <i class="ph ph-magnifying-glass absolute left-3 top-2 text-[#555] text-sm"></i>
            <input type="text" placeholder="Search {tools.length}+ tools..." 
                   class="bg-[#161616] text-white text-sm pl-9 pr-3 py-1.5 w-56 rounded-sm placeholder-[#555] font-light border border-[#333] focus:border-[#555] focus:outline-none transition-colors">
        </div>
    </div>
</header>
