<script lang="ts">
    export let config: any;

    let l = 0, w = 0, h = 0, qty = 1;
    let unit = 'cm';

    $: vol = unit === 'cm' ? (l * w * h) / 1000000 : (l * w * h) / 61023;
    $: totalCBM = vol * qty;
    $: airWeight = totalCBM * 167;
</script>

<div class="space-y-6">
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <div class="flex justify-between mb-4 border-b border-gray-100 pb-2">
            <h3 class="text-xs font-bold text-gray-500 uppercase">Dimensions</h3>
            <select bind:value={unit} class="text-xs border border-gray-300 rounded p-1 bg-white">
                <option value="cm">cm / kg</option>
                <option value="inch">inch / lbs</option>
            </select>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4">
            <div><label class="block text-xs font-bold mb-1">Length</label><input type="number" bind:value={l} class="w-full p-2.5 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">Width</label><input type="number" bind:value={w} class="w-full p-2.5 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">Height</label><input type="number" bind:value={h} class="w-full p-2.5 border rounded"></div>
        </div>
        <div><label class="block text-xs font-bold mb-1">Quantity</label><input type="number" bind:value={qty} class="w-full p-2.5 border rounded"></div>
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Volume Result</div>
        <div class="p-6">
            <div class="flex flex-col mb-4">
                <span class="text-sm font-medium text-gray-400 mb-1">Total Volume</span>
                <span class="text-4xl font-bold text-blue-600">{totalCBM.toFixed(3)} m³</span>
            </div>
            <div class="pt-4 border-t border-gray-100 flex justify-between">
                <span class="text-gray-600">Air Chargeable Weight:</span>
                <span class="font-bold text-gray-900">{airWeight.toFixed(2)} kg</span>
            </div>
        </div>
    </div>
</div>
