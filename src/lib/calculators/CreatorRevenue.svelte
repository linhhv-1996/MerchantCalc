<script lang="ts">
    export let config: any;
    let views = 10000;
    let rpm = 0.30;
    $: earnings = (views / 1000) * rpm;
</script>

<div class="space-y-6">
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Engagement Stats</h3>
        <div class="grid grid-cols-2 gap-5">
            <div><label class="block text-xs font-bold mb-1">Views</label><input type="number" bind:value={views} class="w-full p-2.5 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">RPM ($)</label><input type="number" bind:value={rpm} class="w-full p-2.5 border rounded" step="0.01"></div>
        </div>
        <p class="text-[11px] text-gray-400 mt-3 italic">* Avg RPM: TikTok ($0.02 - $0.04), YouTube ($2.00 - $5.00)</p>
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Earnings</div>
        <div class="p-6 text-center">
             <div class="text-5xl font-bold text-pink-600">{config.currency}{earnings.toFixed(2)}</div>
             <div class="text-xs text-gray-400 mt-2">Estimated Revenue</div>
        </div>
    </div>
</div>
