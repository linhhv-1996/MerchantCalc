<script lang="ts">
    import { type ToolConfig } from '$lib/config';
    export let config: ToolConfig;
    
    let amount = 1000;

    // Logic tính phí đơn giản cho so sánh
    // Lưu ý: Tool này dùng config.compare riêng biệt, không dùng config.globalFees
    $: rateA = config.compare?.rateA || 0;
    $: fixedA = config.compare?.fixedA || 0;
    $: feeA = (amount * rateA) + fixedA;
    $: getA = amount - feeA;

    $: rateB = config.compare?.rateB || 0;
    $: fixedB = config.compare?.fixedB || 0;
    $: feeB = (amount * rateB) + fixedB;
    $: getB = amount - feeB;
    
    $: savings = getB - getA;
    $: isBBetter = getB > getA;
</script>

<div class="space-y-6">
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Transfer Details</h3>
        <div>
            <label class="block text-xs font-bold mb-1.5 text-gray-700">Amount to Send ({config.currency})</label>
            <div class="relative">
                <input type="number" bind:value={amount} class="w-full pl-4 p-4 border border-gray-300 rounded text-xl focus:border-[#0645ad] outline-none font-medium text-gray-900">
                <span class="absolute right-4 top-4 text-gray-400 font-bold">{config.currency}</span>
            </div>
        </div>
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex justify-between items-center">
            <span>Result</span>
            {#if Math.abs(savings) > 0}
                <span class="{isBBetter ? 'text-green-700 bg-green-100' : 'text-blue-700 bg-blue-100'} px-2 py-1 rounded font-bold">
                    {isBBetter ? config.compare?.nameB : config.compare?.nameA} is cheaper
                </span>
            {/if}
        </div>
        <div class="grid grid-cols-2 divide-x divide-gray-100 text-center relative">
            
            <div class="p-6 {savings < 0 ? 'bg-green-50/30' : ''}">
                <div class="text-xs font-bold text-gray-500 uppercase mb-2">{config.compare?.nameA}</div>
                <div class="text-red-500 font-bold text-xl mb-1">-{config.currency}{feeA.toFixed(2)}</div>
                <div class="text-sm text-gray-500">Net: {getA.toFixed(2)}</div>
            </div>

            <div class="p-6 {savings > 0 ? 'bg-green-50/30' : ''}">
                 <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm z-10">VS</div>

                <div class="text-xs font-bold text-gray-500 uppercase mb-2">{config.compare?.nameB}</div>
                <div class="text-red-500 font-bold text-xl mb-1">-{config.currency}{feeB.toFixed(2)}</div>
                <div class="text-sm text-gray-500">Net: {getB.toFixed(2)}</div>
            </div>
        </div>
        
        {#if savings > 0}
        <div class="bg-green-600 text-white text-center py-2 text-sm font-bold">
            You save {config.currency}{savings.toFixed(2)} with {config.compare?.nameB}!
        </div>
        {/if}
    </div>
</div>
