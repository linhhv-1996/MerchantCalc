<script lang="ts">
    export let config: any;
    
    let amount = 0;
    const lblAmount = config.labels?.amount || 'Transaction Amount';
    const lblResult = config.labels?.result || 'Net Amount';

    $: fee = (amount * config.feeRate) + config.fixedFee;
    $: net = amount - fee;
</script>

<div class="space-y-6">
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Enter Details</h3>
        <div>
            <label class="block text-xs font-bold mb-1.5 text-gray-700">{lblAmount} ({config.currency})</label>
            <input type="number" bind:value={amount} class="w-full p-4 border border-gray-300 rounded text-xl focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
        </div>
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Payout Estimate</div>
        <div class="p-6">
            <div class="flex justify-between items-end mb-4 pb-4 border-b border-gray-100">
                 <div>
                    <span class="text-sm font-medium text-gray-400 block mb-1">{lblResult}</span>
                    <span class="text-5xl font-bold text-blue-600">{config.currency}{(net > 0 ? net : 0).toFixed(2)}</span>
                 </div>
            </div>
            <div class="flex justify-between text-sm text-red-600 font-medium">
                <span>Fees Deducted:</span>
                <span>-{config.currency}{fee.toFixed(2)}</span>
            </div>
        </div>
    </div>
</div>
