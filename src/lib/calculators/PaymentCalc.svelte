<script lang="ts">
    export let config: any;
    export let mode: 'input' | 'result' = 'input';
    export let state = { amount: 0 };

    const lblAmount = config.labels?.amount || 'Transaction Amount';
    const lblResult = config.labels?.result || 'Net Amount';

    $: fee = (state.amount * config.feeRate) + config.fixedFee;
    $: net = state.amount - fee;
</script>

{#if mode === 'input'}
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Enter Details</h3>
        <div>
            <label class="block text-xs font-bold mb-1.5 text-gray-700">{lblAmount} ({config.currency})</label>
            <input type="number" bind:value={state.amount} class="w-full p-3 border border-gray-300 rounded text-lg focus:border-[#0645ad] outline-none" placeholder="0.00">
        </div>
    </div>
{:else}
    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-5 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Payout Estimate</div>
        <div class="p-5">
            <div class="flex justify-between items-end mb-1">
                <span class="text-4xl font-bold text-blue-600">{config.currency}{(net > 0 ? net : 0).toFixed(2)}</span>
                <span class="text-sm font-medium text-gray-400 mb-2">{lblResult}</span>
            </div>
            <div class="mt-4 border-t border-gray-100 pt-3 flex justify-between text-sm text-red-600 font-medium">
                <span>Fees Deducted:</span>
                <span>-{config.currency}{fee.toFixed(2)}</span>
            </div>
        </div>
    </div>
{/if}
