<script lang="ts">
    export let config: any;
    export let mode: 'input' | 'result' = 'input';
    export let state = { views: 10000, rpm: 0.30 };

    $: earnings = (state.views / 1000) * state.rpm;
</script>

{#if mode === 'input'}
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Engagement Stats</h3>
        <div class="grid grid-cols-2 gap-4">
            <div><label class="block text-xs font-bold mb-1">Views</label><input type="number" bind:value={state.views} class="w-full p-2 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">RPM ($)</label><input type="number" bind:value={state.rpm} class="w-full p-2 border rounded" step="0.01"></div>
        </div>
        <p class="text-[11px] text-gray-400 mt-2 italic">Avg RPM: TikTok ($0.02-$0.04), YouTube ($2-$5)</p>
    </div>
{:else}
    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-5 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Estimated Earnings</div>
        <div class="p-5">
             <div class="text-4xl font-bold text-pink-600">{config.currency}{earnings.toFixed(2)}</div>
        </div>
    </div>
{/if}
