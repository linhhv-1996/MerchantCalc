<script lang="ts">
    export let config: any;
    export let mode: 'input' | 'result' = 'input'; // Nhận chế độ hiển thị
    
    // State mặc định
    export let state = { soldPrice: 0, shippingCharge: 0, itemCost: 0, shippingCost: 0 };

    // Logic tính toán (Reactive)
    $: revenue = (state.soldPrice || 0) + (state.shippingCharge || 0);
    $: fee = (revenue * config.feeRate) + config.fixedFee;
    $: totalCost = (state.itemCost || 0) + (state.shippingCost || 0) + fee;
    $: profit = revenue - totalCost;
    $: margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    $: roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
</script>

{#if mode === 'input'}
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">
            1. Enter Transaction Details ({config.currency})
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Sold Price</label>
                <input type="number" bind:value={state.soldPrice} class="w-full p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none transition-colors" placeholder="0.00">
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Shipping Charge (From Buyer)</label>
                <input type="number" bind:value={state.shippingCharge} class="w-full p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none" placeholder="0.00">
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Item Cost (Your Cost)</label>
                <input type="number" bind:value={state.itemCost} class="w-full p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none" placeholder="0.00">
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Shipping Cost (You Pay)</label>
                <input type="number" bind:value={state.shippingCost} class="w-full p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none" placeholder="0.00">
            </div>
        </div>
    </div>
{:else}
    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-5 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex justify-between items-center">
            <span>Result</span>
            <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px]">Live</span>
        </div>
        <div class="p-5">
            <div class="flex justify-between items-end mb-1">
                <span class="text-4xl font-bold {profit >= 0 ? 'text-green-600' : 'text-red-600'}">
                    {config.currency}{profit.toFixed(2)}
                </span>
                <span class="text-sm font-bold text-gray-400 mb-2">Net Profit</span>
            </div>
            
            <div class="flex gap-4 mb-4 text-xs font-medium text-gray-500">
                <span class="bg-gray-100 px-2 py-1 rounded">Margin: {margin.toFixed(1)}%</span>
                <span class="bg-gray-100 px-2 py-1 rounded">ROI: {roi.toFixed(1)}%</span>
            </div>

            <div class="space-y-2 border-t border-gray-100 pt-3 text-sm">
                <div class="flex justify-between text-gray-600">
                    <span>Total Revenue:</span>
                    <span>{config.currency}{revenue.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-red-600">
                    <span>Platform Fees:</span>
                    <span>-{config.currency}{fee.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-gray-500">
                    <span>Total Costs:</span>
                    <span>-{config.currency}{totalCost.toFixed(2)}</span>
                </div>
            </div>
        </div>
        <div class="bg-[#f0f7ff] p-3 text-center border-t border-blue-100">
             <a href="#" class="text-xs font-bold text-[#0645ad] hover:underline">
               Want lower fees? Check Wise vs PayPal &rarr;
             </a>
        </div>
    </div>
{/if}
