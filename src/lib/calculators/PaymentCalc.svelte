<script lang="ts">
    import { type ToolConfig } from '$lib/config';
    
    export let config: ToolConfig;
    
    // Khởi tạo null
    let amount: number | null = null;
    
    $: lblAmount = config.labels?.amount || 'Transaction Amount';
    $: lblResult = config.labels?.result || 'Net Payout';

    // State check
    $: hasInput = amount !== null && amount > 0;

    // Logic tính toán
    $: inputVal = amount || 0;
    $: fee = (inputVal * (config.feeRate || 0)) + (config.fixedFee || 0);
    $: net = inputVal - fee;
</script>

<div class="space-y-6">
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">Enter Details</h3>
        <div>
            <label class="block text-xs font-bold mb-1.5 text-gray-700">{lblAmount} ({config.currency})</label>
            <div class="relative">
                <span class="absolute left-4 top-4 text-gray-400 text-lg">{config.currency}</span>
                <input type="number" bind:value={amount} class="w-full pl-10 p-4 border border-gray-300 rounded text-xl focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
            </div>
        </div>
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex justify-between">
            <span>Payout Estimate</span>
            {#if !hasInput}
                <span class="text-gray-400 text-[10px]">WAITING...</span>
            {/if}
        </div>
        <div class="p-6">
            <div class="flex justify-between items-end mb-4 pb-4 border-b border-gray-100">
                 <div>
                    <span class="text-sm font-medium text-gray-400 block mb-1">{lblResult}</span>
                    <span class="text-5xl font-bold {hasInput ? 'text-blue-600' : 'text-gray-200'}">
                        {#if hasInput}
                            {config.currency}{(net > 0 ? net : 0).toFixed(2)}
                        {:else}
                            --
                        {/if}
                    </span>
                 </div>
            </div>
            
            <div class="flex justify-between text-sm text-red-600 font-medium">
                <span>Total Fees:</span>
                <span>
                    {#if hasInput}
                        -{config.currency}{fee.toFixed(2)}
                    {:else}
                        --
                    {/if}
                </span>
            </div>
            <div class="text-xs text-gray-400 mt-2 italic">
                Fee rate: {((config.feeRate || 0)*100).toFixed(2)}% + {config.currency}{config.fixedFee}
            </div>
        </div>
    </div>
</div>
