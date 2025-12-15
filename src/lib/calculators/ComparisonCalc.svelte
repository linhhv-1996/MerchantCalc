<script lang="ts">
    export let config: any;
    
    let amount = 1000;
    
    $: feeA = (amount * config.compare.rateA) + config.compare.fixedA;
    $: getA = amount - feeA;
    
    $: feeB = (amount * config.compare.rateB) + config.compare.fixedB;
    $: getB = amount - feeB;
    
    $: savings = getB - getA;
</script>

<div class="space-y-6">
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Transfer Details</h3>
        <div>
            <label class="block text-xs font-bold mb-1.5 text-gray-700">Amount to Send ({config.currency})</label>
            <input type="number" bind:value={amount} class="w-full p-4 border border-gray-300 rounded text-xl focus:border-[#0645ad] outline-none font-medium text-gray-900">
        </div>
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex justify-between items-center">
            <span>Result</span>
            <span class="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">Save {config.currency}{savings.toFixed(2)}</span>
        </div>
        <div class="grid grid-cols-2 divide-x divide-gray-100 text-center">
            <div class="p-6 bg-red-50/20">
                    <div class="text-xs font-bold text-gray-500 uppercase mb-2">{config.compare.nameA}</div>
                <div class="text-red-600 font-bold text-2xl mb-1">-{config.currency}{feeA.toFixed(2)}</div>
                <div class="text-sm text-gray-500">Receiver gets: {getA.toFixed(2)}</div>
            </div>
            <div class="p-6 bg-green-50/20">
                <div class="text-xs font-bold text-gray-500 uppercase mb-2">{config.compare.nameB}</div>
                <div class="text-green-600 font-bold text-2xl mb-1">-{config.currency}{feeB.toFixed(2)}</div>
                <div class="text-sm text-gray-800 font-bold">Receiver gets: {getB.toFixed(2)}</div>
            </div>
        </div>
    </div>
</div>
