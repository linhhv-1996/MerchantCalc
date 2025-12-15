<script lang="ts">
    import { tools } from '$lib/config';

    // Group tools by category
    const categories = [...new Set(tools.map(t => t.category))];
</script>

<svelte:head>
    <title>Sitemap - Merchant Calculator</title>
    <meta name="description" content="Complete directory of all seller fee calculators available on Merchant Calculator." />
</svelte:head>

<div class="max-w-[960px] mx-auto px-5 py-12">
    <h1 class="font-serif text-3xl font-bold text-gray-900 mb-8">Sitemap</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <div>
            <h2 class="font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase text-xs tracking-wider">General</h2>
            <ul class="space-y-2 text-sm">
                <li><a href="/" class="text-[#0645ad] hover:underline">Home</a></li>
                <li><a href="/about" class="text-[#0645ad] hover:underline">About Us</a></li>
                <li><a href="/contact" class="text-[#0645ad] hover:underline">Contact</a></li>
                <li><a href="/privacy-policy" class="text-[#0645ad] hover:underline">Privacy Policy</a></li>
                <li><a href="/terms-of-service" class="text-[#0645ad] hover:underline">Terms of Service</a></li>
            </ul>
        </div>

        {#each categories as cat}
        <div>
            <h2 class="font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase text-xs tracking-wider">{cat} Tools</h2>
            <ul class="space-y-2 text-sm">
                {#each tools.filter(t => t.category === cat) as tool}
                    <li>
                        <a href="/{tool.slug}" class="text-[#0645ad] hover:underline block truncate">
                            {tool.title}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
        {/each}

    </div>
</div>
