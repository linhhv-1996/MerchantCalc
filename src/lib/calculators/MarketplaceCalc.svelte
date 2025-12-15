<script lang="ts">
    import { type ToolConfig } from '$lib/config';

    export let config: ToolConfig;
    
    // --- INPUTS (Khởi tạo null để biết user chưa nhập) ---
    let soldPrice: number | null = null;       
    let shippingCharge: number | null = null;  
    let itemCost: number | null = null;        
    let shippingCost: number | null = null;    
    
    // Advanced Inputs
    let adRate: number = 0;                    
    let buyerTaxRate: number = 0;              
    
    let selectedCategoryIndex = 0;

    // Reset inputs khi chuyển tool
    $: if (config) {
        selectedCategoryIndex = 0;
    }
    
    // --- STATE CHECK ---
    // Chỉ tính toán khi người dùng đã nhập "Sold Price"
    $: hasInput = soldPrice !== null && soldPrice > 0;

    // --- LOGIC TÍNH TOÁN (Vẫn chạy ngầm nhưng chỉ hiển thị khi hasInput = true) ---
    $: activeRate = (config.categories && config.categories.length > 0)
        ? config.categories[selectedCategoryIndex].rate 
        : (config.feeRate || 0);

    $: activeFixed = (config.categories && config.categories.length > 0 && config.categories[selectedCategoryIndex].fixed !== undefined)
        ? config.categories[selectedCategoryIndex].fixed 
        : (config.fixedFee || 0);

    // Ép kiểu về 0 để tính toán không bị lỗi NaN
    $: price = soldPrice || 0;
    $: shipCharge = shippingCharge || 0;
    $: costItem = itemCost || 0;
    $: costShip = shippingCost || 0;

    $: totalRevenue = price + shipCharge;
    $: taxAmount = totalRevenue * (buyerTaxRate / 100);
    $: feeBasis = totalRevenue + taxAmount;

    $: platformFee = (feeBasis * activeRate) + (activeFixed || 0);
    $: adFee = totalRevenue * (adRate / 100);
    $: totalExpenses = costItem + costShip + platformFee + adFee;

    $: netProfit = totalRevenue - totalExpenses;
    $: profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    $: roi = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0;

    // Chart Data
    $: percentProfit = totalRevenue > 0 ? Math.max(0, (netProfit / totalRevenue) * 100) : 0;
    $: percentFees = totalRevenue > 0 ? ((platformFee + adFee) / totalRevenue) * 100 : 0;
    $: percentCost = totalRevenue > 0 ? ((costItem + costShip) / totalRevenue) * 100 : 0;
</script>

<div class="space-y-8"> 
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm relative">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">
            Transaction Details ({config.currency})
        </h3>
        
        {#if config.categories && config.categories.length > 0}
            <div class="mb-5">
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Category</label>
                <div class="relative">
                    <select bind:value={selectedCategoryIndex} class="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-sm text-gray-800 focus:border-[#0645ad] outline-none cursor-pointer">
                        {#each config.categories as cat, i}
                            <option value={i}>{cat.name} ({(cat.rate * 100).toFixed(2)}%)</option>
                        {/each}
                    </select>
                </div>
            </div>
        {/if}

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Sold Price <span class="text-red-500">*</span></label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400">{config.currency}</span>
                    <input type="number" bind:value={soldPrice} class="w-full pl-8 p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Shipping Charge</label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400">{config.currency}</span>
                    <input type="number" bind:value={shippingCharge} class="w-full pl-8 p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Item Cost</label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400">{config.currency}</span>
                    <input type="number" bind:value={itemCost} class="w-full pl-8 p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Shipping Cost</label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400">{config.currency}</span>
                    <input type="number" bind:value={shippingCost} class="w-full pl-8 p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
                </div>
            </div>
        </div>

        {#if config.hasAdInput || config.hasTaxInput}
            <div class="mt-6 pt-4 border-t border-dashed border-gray-200 grid grid-cols-2 gap-5">
                {#if config.hasTaxInput}
                <div>
                    <label class="block text-[11px] font-bold mb-1.5 text-gray-500 uppercase">Buyer's Tax %</label>
                    <div class="relative">
                        <input type="number" bind:value={buyerTaxRate} class="w-full p-2 border border-gray-200 rounded text-sm bg-gray-50 focus:bg-white focus:border-[#0645ad] outline-none transition-colors" placeholder="0">
                        <span class="absolute right-3 top-2 text-gray-400 text-xs">%</span>
                    </div>
                </div>
                {/if}
                {#if config.hasAdInput}
                <div>
                    <label class="block text-[11px] font-bold mb-1.5 text-gray-500 uppercase">Ad Rate %</label>
                    <div class="relative">
                        <input type="number" bind:value={adRate} class="w-full p-2 border border-gray-200 rounded text-sm bg-gray-50 focus:bg-white focus:border-[#0645ad] outline-none transition-colors" placeholder="0">
                        <span class="absolute right-3 top-2 text-gray-400 text-xs">%</span>
                    </div>
                </div>
                {/if}
            </div>
        {/if}
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex justify-between items-center">
            <span>Result Analysis</span>
            {#if hasInput}
                <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">CALCULATED</span>
            {:else}
                <span class="bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">WAITING FOR INPUT</span>
            {/if}
        </div>
        
        <div class="p-6">
            <div class="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-8 border-b border-gray-100 pb-8">
                <div>
                    <span class="text-sm font-bold text-gray-400 block mb-1">Net Profit</span>
                    {#if hasInput}
                        <span class="text-5xl font-bold {netProfit >= 0 ? 'text-green-600' : 'text-red-600'} tracking-tight">
                            {config.currency}{netProfit.toFixed(2)}
                        </span>
                    {:else}
                         <span class="text-5xl font-bold text-gray-200 tracking-tight">--</span>
                    {/if}
                </div>
                
                <div class="flex gap-3 mt-4 sm:mt-0">
                    <div class="text-center px-4 py-2 bg-gray-50 rounded border border-gray-100">
                        <div class="text-[10px] text-gray-400 font-bold uppercase">Margin</div>
                        <div class="text-sm font-bold text-gray-700">
                            {hasInput ? profitMargin.toFixed(1) + '%' : '--'}
                        </div>
                     </div>
                     <div class="text-center px-4 py-2 bg-gray-50 rounded border border-gray-100">
                        <div class="text-[10px] text-gray-400 font-bold uppercase">ROI</div>
                        <div class="text-sm font-bold text-gray-700">
                            {hasInput ? roi.toFixed(1) + '%' : '--'}
                        </div>
                     </div>
                </div>
            </div>

            {#if hasInput && totalRevenue > 0}
            <div class="mb-6 animate-fade-in">
                <div class="text-[11px] font-bold text-gray-400 uppercase mb-2 flex justify-between">
                    <span>Revenue Distribution</span>
                    <span>{config.currency}{totalRevenue.toFixed(2)}</span>
                </div>
                <div class="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
                    <div class="h-full bg-green-500" style="width: {percentProfit}%" title="Profit"></div>
                    <div class="h-full bg-red-400" style="width: {percentFees}%" title="Fees"></div>
                    <div class="h-full bg-gray-400" style="width: {percentCost}%" title="Costs"></div>
                </div>
                <div class="flex gap-4 mt-2 text-[10px] text-gray-500 font-medium justify-center">
                    <div class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span> Profit</div>
                    <div class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-red-400"></span> Fees</div>
                    <div class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-gray-400"></span> Costs</div>
                </div>
            </div>
            {/if}

            <div class="space-y-2 text-sm">
                <div class="flex justify-between text-gray-600 py-1 border-b border-dashed border-gray-100">
                    <span>Total Revenue:</span>
                    <span class="font-medium">
                        {hasInput ? config.currency + totalRevenue.toFixed(2) : '--'}
                    </span>
                </div>
                
                <div class="flex justify-between text-red-500 py-1">
                    <span>Platform Fees:</span>
                    <span class="font-medium">
                        {hasInput ? '-' + config.currency + platformFee.toFixed(2) : '--'}
                    </span>
                </div>
                
                {#if adFee > 0 || hasInput}
                <div class="flex justify-between text-red-500 py-1 {adFee === 0 && !hasInput ? 'opacity-50' : ''}">
                    <span>Ad Fees:</span>
                    <span class="font-medium">
                         {hasInput ? '-' + config.currency + adFee.toFixed(2) : '--'}
                    </span>
                </div>
                {/if}

                <div class="flex justify-between text-gray-500 py-1">
                    <span>Total Costs (Item + Ship):</span>
                    <span>
                        {hasInput ? '-' + config.currency + (costItem + costShip).toFixed(2) : '--'}
                    </span>
                </div>
            </div>
        </div>
        
        <div class="bg-[#f0f7ff] p-3 text-center border-t border-blue-100">
            <a href="/wise-vs-paypal-calculator" class="text-xs font-bold text-[#0645ad] hover:underline">
                Keep more profit? Check Wise vs PayPal &rarr;
            </a>
        </div>
    </div>
</div>
