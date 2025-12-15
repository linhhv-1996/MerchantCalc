<script lang="ts">
    export let config: any;
    let l = 0, w = 0, h = 0, weight = 0;
    $: volCF = (l * w * h) / 1728;
    $: density = (weight > 0 && volCF > 0) ? (weight / volCF) : 0;
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

<div class="space-y-6">
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Pallet Info (Inches / Lbs)</h3>
        <div class="grid grid-cols-3 gap-4 mb-4">
            <div><label class="block text-xs font-bold mb-1">Length</label><input type="number" bind:value={l} class="w-full p-2.5 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">Width</label><input type="number" bind:value={w} class="w-full p-2.5 border rounded"></div>
            <div><label class="block text-xs font-bold mb-1">Height</label><input type="number" bind:value={h} class="w-full p-2.5 border rounded"></div>
        </div>
        <div><label class="block text-xs font-bold mb-1">Total Weight (lbs)</label><input type="number" bind:value={weight} class="w-full p-2.5 border rounded"></div>
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Result</div>
        <div class="p-6">
            <span class="text-sm font-medium text-gray-400 block mb-1">NMFC Class</span>
            <span class="text-5xl font-bold text-purple-600 block mb-4">{fClass > 0 ? fClass : '--'}</span>
            <div class="pt-4 border-t border-gray-100 text-sm text-gray-500">
                Density: <strong>{density.toFixed(2)}</strong> lbs/ft³
            </div>
        </div>
    </div>
</div>
