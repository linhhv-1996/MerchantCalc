<script lang="ts">
    export let config: any;
    
    let soldPrice = 0;
    let shippingCharge = 0;
    let itemCost = 0;
    let shippingCost = 0;

    $: revenue = (soldPrice || 0) + (shippingCharge || 0);
    $: fee = (revenue * config.feeRate) + config.fixedFee;
    $: totalCost = (itemCost || 0) + (shippingCost || 0) + fee;
    $: profit = revenue - totalCost;
    $: margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    $: roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
</script>

<div class="space-y-6"> <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">
            1. Transaction Details ({config.currency})
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Sold Price</label>
                <input type="number" bind:value={soldPrice} class="w-full p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Shipping Charge (From Buyer)</label>
                <input type="number" bind:value={shippingCharge} class="w-full p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Item Cost (Your Cost)</label>
                <input type="number" bind:value={itemCost} class="w-full p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
            </div>
            <div>
                 <label class="block text-xs font-bold mb-1.5 text-gray-700">Shipping Cost (You Pay)</label>
                <input type="number" bind:value={shippingCost} class="w-full p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
            </div>
        </div>
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex justify-between items-center">
            <span>Estimated Result</span>
            <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">LIVE</span>
        </div>
        <div class="p-6">
            <div class="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 border-b border-gray-100 pb-6">
                <div>
                    <span class="text-sm font-bold text-gray-400 block mb-1">Net Profit</span>
                    <span class="text-5xl font-bold {profit >= 0 ? 'text-green-600' : 'text-red-600'} tracking-tight">
                        {config.currency}{profit.toFixed(2)}
                    </span>
                </div>
                <div class="flex gap-3 mt-4 sm:mt-0">
                     <div class="text-center px-4 py-2 bg-gray-50 rounded border border-gray-100">
                        <div class="text-[10px] text-gray-400 font-bold uppercase">Margin</div>
                        <div class="text-sm font-bold text-gray-700">{margin.toFixed(1)}%</div>
                     </div>
                     <div class="text-center px-4 py-2 bg-gray-50 rounded border border-gray-100">
                        <div class="text-[10px] text-gray-400 font-bold uppercase">ROI</div>
                        <div class="text-sm font-bold text-gray-700">{roi.toFixed(1)}%</div>
                     </div>
                </div>
            </div>

            <div class="space-y-3 text-sm">
                <div class="flex justify-between text-gray-600">
                    <span>Total Revenue:</span>
                    <span class="font-medium">{config.currency}{revenue.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-red-600">
                    <span>Platform Fees:</span>
                    <span class="font-medium">-{config.currency}{fee.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-gray-500">
                    <span>Total Costs (Item + Ship):</span>
                    <span>-{config.currency}{((itemCost || 0) + (shippingCost || 0)).toFixed(2)}</span>
                </div>
            </div>
        </div>
        <div class="bg-[#f0f7ff] p-3 text-center border-t border-blue-100">
                <a href="/wise-vs-paypal-calculator" class="text-xs font-bold text-[#0645ad] hover:underline">
                Want lower fees? Check Wise vs PayPal &rarr;
                </a>
        </div>
    </div>
</div>
