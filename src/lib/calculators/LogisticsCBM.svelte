<script lang="ts">
    export let config: any;
    export let mode: 'input' | 'result' = 'input';
    export let state = { l: 0, w: 0, h: 0, qty: 1, unit: 'cm' };

    $: vol = state.unit === 'cm' ? (state.l * state.w * state.h) / 1000000 : (state.l * state.w * state.h) / 61023;
    $: totalCBM = vol * state.qty;
    $: airWeight = totalCBM * 167;
</script>

{#if mode === 'input'}
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <div class="flex justify-between mb-4 border-b border-gray-100 pb-2">
            <h3 class="text-xs font-bold text-gray-500 uppercase">Package Dimensions</h3>
            <select bind:value={state.unit} class="text-xs border rounded p-1"><option value="cm">cm / kg</option><option value="inch">inch / lbs</option></select>
        </div>
        <div class="grid grid-cols-3 gap-3 mb-4">
            <div><label class="block text-xs font-bold mb-1">Length</label><input type="number" bind:value={state.l} class="w-full p-2 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">Width</label><input type="number" bind:value={state.w} class="w-full p-2 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">Height</label><input type="number" bind:value={state.h} class="w-full p-2 border rounded"></div>
        </div>
        <div><label class="block text-xs font-bold mb-1">Quantity (Cartons)</label><input type="number" bind:value={state.qty} class="w-full p-2 border rounded"></div>
    </div>
{:else}
    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-5 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Volume Result</div>
        <div class="p-5">
            <div class="flex justify-between items-end mb-2">
                <span class="text-3xl font-bold text-blue-600">{totalCBM.toFixed(3)} m³</span>
                <span class="text-sm font-medium text-gray-400 mb-1">Volume</span>
            </div>
            <div class="space-y-2 border-t border-gray-100 pt-3 text-sm">
                <div class="flex justify-between"><span class="text-gray-600">Air Chargeable Weight:</span><span class="font-bold">{airWeight.toFixed(2)} kg</span></div>
            </div>
        </div>
    </div>
{/if}
