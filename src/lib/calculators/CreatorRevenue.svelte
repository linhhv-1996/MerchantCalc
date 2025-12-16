<script lang="ts">
    import { type ToolConfig } from '$lib/config';
    export let config: ToolConfig;
    
    let views = 10000;
    let rpm = 0.30; // Mặc định TikTok thấp

    $: earnings = (views / 1000) * rpm;
</script>

<div class="space-y-6">
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Engagement Stats</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Total Views</label>
                <input type="number" bind:value={views} class="w-full p-3 border border-gray-300 rounded focus:border-[#0645ad] outline-none">
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">RPM (Revenue per 1k views)</label>
                <div class="relative">
                     <span class="absolute left-3 top-3 text-gray-400 text-sm">$</span>
                     <input type="number" bind:value={rpm} class="w-full pl-6 p-3 border border-gray-300 rounded focus:border-[#0645ad] outline-none" step="0.01">
                </div>
            </div>
        </div>
        
        <div class="mt-4 flex gap-2 overflow-x-auto pb-2">
            <button class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-[10px] font-bold text-gray-600 whitespace-nowrap" on:click={() => rpm = 0.03}>TikTok Low ($0.03)</button>
            <button class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-[10px] font-bold text-gray-600 whitespace-nowrap" on:click={() => rpm = 2.50}>YouTube Avg ($2.50)</button>
            <button class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-[10px] font-bold text-gray-600 whitespace-nowrap" on:click={() => rpm = 5.00}>YouTube Finance ($5.00)</button>
        </div>
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Estimated Earnings</div>
        <div class="p-8 text-center">
             <div class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 tracking-tight">
                {config.currency}{earnings.toFixed(2)}
             </div>
             <div class="text-sm text-gray-400 mt-2 font-medium">Based on {views.toLocaleString()} views @ ${rpm} RPM</div>
        </div>
    </div>
</div>
