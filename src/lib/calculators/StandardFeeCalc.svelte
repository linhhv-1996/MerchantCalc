<script lang="ts">
    export let config: any; // Nhận config từ trang cha

    let soldPrice = 0;
    let shippingCharge = 0;
    let itemCost = 0;
    let shippingCost = 0;

    $: revenue = (soldPrice || 0) + (shippingCharge || 0);
    $: fee = (revenue * config.feeRate) + config.fixedFee;
    $: totalCost = (itemCost || 0) + (shippingCost || 0) + fee;
    $: profit = revenue - totalCost;
    $: margin = revenue > 0 ? (profit / revenue) * 100 : 0;
</script>

<div class="bg-white p-6 border border-gray-300 rounded shadow-sm mb-6">
    <h3 class="text-xs font-bold text-gray-500 uppercase mb-4">Transaction Details ({config.currency})</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label class="block text-xs font-bold mb-1">Sold Price</label><input type="number" bind:value={soldPrice} class="w-full p-2 border rounded" placeholder="0.00"></div>
        <div><label class="block text-xs font-bold mb-1">Shipping Charge</label><input type="number" bind:value={shippingCharge} class="w-full p-2 border rounded" placeholder="0.00"></div>
        <div><label class="block text-xs font-bold mb-1">Item Cost</label><input type="number" bind:value={itemCost} class="w-full p-2 border rounded" placeholder="0.00"></div>
        <div><label class="block text-xs font-bold mb-1">Shipping Cost</label><input type="number" bind:value={shippingCost} class="w-full p-2 border rounded" placeholder="0.00"></div>
    </div>
</div>

<div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
    <div class="bg-gray-50 px-5 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Estimated Profit</div>
    <div class="p-5">
        <div class="flex justify-between items-end mb-1">
            <span class="text-3xl font-bold {profit >= 0 ? 'text-green-600' : 'text-red-600'}">
                {config.currency}{profit.toFixed(2)}
            </span>
            <span class="text-sm font-medium text-gray-400 mb-1">Net Profit</span>
        </div>
        <div class="text-xs text-gray-500 mb-4">Margin: {margin.toFixed(1)}%</div>
        <div class="space-y-2 border-t border-gray-100 pt-3 text-sm">
            <div class="flex justify-between"><span class="text-gray-600">Platform Fees:</span><span class="font-medium text-red-600">-{config.currency}{fee.toFixed(2)}</span></div>
        </div>
    </div>
</div>
