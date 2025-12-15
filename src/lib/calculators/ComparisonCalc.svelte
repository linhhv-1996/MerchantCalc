<script lang="ts">
    export let config: any;
    export let mode: 'input' | 'result' = 'input';
    export let state = { amount: 1000 };
    
    $: feeA = (state.amount * config.compare.rateA) + config.compare.fixedA;
    $: getA = state.amount - feeA;
    $: feeB = (state.amount * config.compare.rateB) + config.compare.fixedB;
    $: getB = state.amount - feeB;
    $: savings = getB - getA;
</script>

{#if mode === 'input'}
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Transfer Details</h3>
        <div>
            <label class="block text-xs font-bold mb-1.5 text-gray-700">Amount to Send ({config.currency})</label>
            <input type="number" bind:value={state.amount} class="w-full p-3 border border-gray-300 rounded text-lg focus:border-[#0645ad] outline-none">
        </div>
    </div>
{:else}
    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-5 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex justify-between">
            <span>Result</span>
            <span class="text-green-600 font-bold">Save {config.currency}{savings.toFixed(2)}</span>
        </div>
        <div class="grid grid-cols-2 divide-x divide-gray-100 text-center">
            <div class="p-4 bg-red-50/30">
                <div class="text-[10px] font-bold text-gray-500 uppercase">{config.compare.nameA}</div>
                <div class="text-red-600 font-bold">-{config.currency}{feeA.toFixed(2)}</div>
                <div class="text-xs mt-2 border-t pt-2 text-gray-500">Get: {getA.toFixed(2)}</div>
            </div>
            <div class="p-4 bg-green-50/30">
                <div class="text-[10px] font-bold text-gray-500 uppercase">{config.compare.nameB}</div>
                <div class="text-green-600 font-bold">-{config.currency}{feeB.toFixed(2)}</div>
                <div class="text-xs mt-2 border-t pt-2 text-gray-800 font-bold">Get: {getB.toFixed(2)}</div>
            </div>
        </div>
    </div>
{/if}
