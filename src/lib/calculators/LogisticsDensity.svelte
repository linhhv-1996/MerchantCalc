<script lang="ts">
    export let config: any;
    export let mode: 'input' | 'result' = 'input';
    export let state = { l: 0, w: 0, h: 0, weight: 0 };

    $: volCF = (state.l * state.w * state.h) / 1728;
    $: density = (state.weight > 0 && volCF > 0) ? (state.weight / volCF) : 0;
    
    // Logic Class
    let fClass = 0;
    $: {
        if (density === 0) fClass = 0;
        else if (density < 1) fClass = 400;
        else if (density < 2) fClass = 300;
        else if (density < 4) fClass = 250;
        else if (density < 6) fClass = 175;
        else if (density < 8) fClass = 125;
        else if (density < 10) fClass = 100;
        else if (density < 12) fClass = 92.5;
        else if (density < 15) fClass = 85;
        else if (density < 22.5) fClass = 70;
        else if (density < 30) fClass = 65;
        else fClass = 60;
    }
</script>

{#if mode === 'input'}
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Pallet Info (Inches/Lbs)</h3>
        <div class="grid grid-cols-3 gap-3 mb-3">
            <div><label class="block text-xs font-bold mb-1">Length</label><input type="number" bind:value={state.l} class="w-full p-2 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">Width</label><input type="number" bind:value={state.w} class="w-full p-2 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">Height</label><input type="number" bind:value={state.h} class="w-full p-2 border rounded"></div>
        </div>
        <div><label class="block text-xs font-bold mb-1">Weight (lbs)</label><input type="number" bind:value={state.weight} class="w-full p-2 border rounded"></div>
    </div>
{:else}
    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-5 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Freight Class</div>
        <div class="p-5">
            <div class="flex justify-between items-end mb-2">
                <span class="text-4xl font-bold text-purple-600">{fClass > 0 ? fClass : '--'}</span>
                <span class="text-sm font-medium text-gray-400 mb-1">NMFC Class</span>
            </div>
            <div class="text-xs text-gray-500 pt-2 border-t border-gray-100">Density: {density.toFixed(2)} lbs/ft³</div>
        </div>
    </div>
{/if}
