<script lang="ts">
    import { type ToolConfig, type FeeRule } from '$lib/config';

    export let config: ToolConfig;

    // --- INPUTS ---
    let soldPrice: number | null = null;       
    let shippingCharge: number | null = null;  
    let itemCost: number | null = null;
    let shippingCost: number | null = null;    
    
    // Advanced Inputs
    let adRate: number = 0;
    let buyerTaxRate: number = 0;              
    
    let selectedCategoryIndex = 0;
    
    // Quản lý các phí Optional (User có thể tick/untick)
    // Dạng: { "International Fee": true, "Offsite Ads": false }
    let activeOptionalFees: Record<string, boolean> = {};

    // Reset inputs khi chuyển tool
    $: if (config) {
        selectedCategoryIndex = 0;
        // Reset optional fees mặc định là false hoặc true tùy logic (ở đây để false)
        activeOptionalFees = {};
        if (config.globalFees) {
             config.globalFees.forEach(f => {
                 if (f.isOptional) activeOptionalFees[f.name] = false;
             });
        }
    }

    // --- LOGIC TÍNH TOÁN CỐT LÕI (CORE ENGINE) ---
    
    // 1. Hàm tính phí cho từng Rule
    function calculateRuleCost(rule: FeeRule, revenue: number): number {
        // A. Check điều kiện (Condition)
        if (rule.condition) {
            if (rule.condition.minPrice !== undefined && revenue < rule.condition.minPrice) return 0;
            if (rule.condition.maxPrice !== undefined && revenue >= rule.condition.maxPrice) return 0;
        }

        let fee = 0;

        // B. Tính toán dựa trên Type
        if (rule.type === 'fixed') {
            fee = rule.value || 0;
        } 
        else if (rule.type === 'percent') {
            fee = revenue * (rule.value || 0);
        } 
        else if (rule.type === 'tiered_progressive' && rule.tiers) {
            // Logic lũy tiến (Ví dụ: 13.25% cho $7500 đầu, 2.35% cho phần còn lại)
            let remaining = revenue;
            let previousLimit = 0;

            for (const tier of rule.tiers) {
                if (remaining <= 0) break;
                
                // Độ rộng của bậc này
                const tierSpan = tier.upto - previousLimit;
                // Phần doanh thu chịu thuế ở bậc này
                const taxableInTier = Math.min(remaining, tierSpan);
                
                fee += taxableInTier * tier.rate;
                
                remaining -= taxableInTier;
                previousLimit = tier.upto;
            }
        }

        // C. Kiểm tra Max Cap (Mức trần)
        if (rule.cap && fee > rule.cap) {
            fee = rule.cap;
        }

        return fee;
    }

    // --- REACTIVE STATEMENTS ---

    $: hasInput = soldPrice !== null && soldPrice > 0;
    
    // Tổng doanh thu (Revenue) = Giá bán + Tiền ship thu của khách
    $: price = soldPrice || 0;
    $: shipCharge = shippingCharge || 0;
    $: totalRevenue = price + shipCharge;

    // Chi phí vốn (COGS)
    $: costItem = itemCost || 0;
    $: costShip = shippingCost || 0;

    // Thuế người mua (Sales Tax / VAT) - Thường phí sàn tính trên (Revenue + Tax)
    $: taxAmount = totalRevenue * (buyerTaxRate / 100);
    $: feeBasis = totalRevenue + taxAmount; 

    // --- TÍNH TỔNG PHÍ SÀN (PLATFORM FEES) ---
    let detailedFees: { name: string, amount: number, isHidden?: boolean }[] = [];
    let totalPlatformFee = 0;

    $: {
        detailedFees = [];
        totalPlatformFee = 0;

        if (hasInput) {
            // 1. Global Fees (Phí chung)
            if (config.globalFees) {
                config.globalFees.forEach(rule => {
                    // Nếu là optional fee, check xem user có tick không
                    if (rule.isOptional && !activeOptionalFees[rule.name]) return;

                    const cost = calculateRuleCost(rule, feeBasis); // Lưu ý: Tính trên FeeBasis (bao gồm tax)
                    if (cost !== 0 || rule.hidden) {
                        detailedFees.push({ name: rule.name, amount: cost, isHidden: rule.hidden });
                        totalPlatformFee += cost;
                    }
                });
            }

            // 2. Category Fees (Phí danh mục)
            if (config.categories && config.categories.length > 0) {
                const catRules = config.categories[selectedCategoryIndex].rules;
                catRules.forEach(rule => {
                    if (rule.isOptional && !activeOptionalFees[rule.name]) return;
                    
                    const cost = calculateRuleCost(rule, feeBasis);
                    if (cost !== 0 || rule.hidden) {
                        detailedFees.push({ name: rule.name, amount: cost, isHidden: rule.hidden });
                        totalPlatformFee += cost;
                    }
                });
            }

            // 3. VAT on Fees (Thuế đánh chồng lên phí - Chỉ dùng cho UK/EU)
            if (config.vatOnFeeRate && totalPlatformFee > 0) {
                const vatCost = totalPlatformFee * config.vatOnFeeRate;
                detailedFees.push({ name: `VAT on Fees (${config.vatOnFeeRate * 100}%)`, amount: vatCost });
                totalPlatformFee += vatCost;
            }
        }
    }

    // --- KẾT QUẢ CUỐI CÙNG ---
    $: adFee = totalRevenue * (adRate / 100);
    $: totalExpenses = costItem + costShip + totalPlatformFee + adFee;
    $: netProfit = totalRevenue - totalExpenses;
    
    $: profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    $: roi = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0;

    // Chart Data
    $: percentProfit = totalRevenue > 0 ? Math.max(0, (netProfit / totalRevenue) * 100) : 0;
    $: percentFees = totalRevenue > 0 ? ((totalPlatformFee + adFee) / totalRevenue) * 100 : 0;
    $: percentCost = totalRevenue > 0 ? ((costItem + costShip) / totalRevenue) * 100 : 0;

</script>

<div class="space-y-8"> 
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm relative">
        <h3 class="text-xs font-bold text-gray-500 uppercase mb-4 border-b border-gray-100 pb-2">
            Enter Details ({config.currency})
        </h3>
        
        {#if config.categories && config.categories.length > 0}
            <div class="mb-5">
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Category</label>
                <div class="relative">
                    <select bind:value={selectedCategoryIndex} class="w-full p-3 bg-blue-50/50 border border-blue-200 rounded text-sm text-gray-800 focus:border-[#0645ad] outline-none cursor-pointer font-medium">
                        {#each config.categories as cat, i}
                             <option value={i}>{cat.name}</option>
                        {/each}
                    </select>
                </div>
            </div>
        {/if}

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Sold Price <span class="text-red-500">*</span></label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400 font-bold">{config.currency}</span>
                    <input type="number" bind:value={soldPrice} class="w-full pl-8 p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-bold text-gray-900 text-lg" placeholder="0.00" step="0.01">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Shipping Charge</label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400 font-bold">{config.currency}</span>
                    <input type="number" bind:value={shippingCharge} class="w-full pl-8 p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Item Cost</label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400 font-bold">{config.currency}</span>
                    <input type="number" bind:value={itemCost} class="w-full pl-8 p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold mb-1.5 text-gray-700">Shipping Cost</label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400 font-bold">{config.currency}</span>
                    <input type="number" bind:value={shippingCost} class="w-full pl-8 p-2.5 border border-gray-300 rounded focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00">
                </div>
            </div>
        </div>

        {#if config.globalFees && config.globalFees.some(f => f.isOptional)}
        <div class="mt-4 flex flex-wrap gap-4">
            {#each config.globalFees.filter(f => f.isOptional) as optFee}
                <label class="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer bg-gray-50 px-3 py-2 rounded border border-gray-200 hover:border-gray-400 transition">
                    <input type="checkbox" bind:checked={activeOptionalFees[optFee.name]} class="accent-[#0645ad]">
                    {optFee.name}
                </label>
            {/each}
        </div>
        {/if}

        {#if config.hasAdInput || config.hasTaxInput}
            <div class="mt-6 pt-4 border-t border-dashed border-gray-200 grid grid-cols-2 gap-5">
                {#if config.hasTaxInput}
                <div>
                    <label class="block text-[11px] font-bold mb-1.5 text-gray-500 uppercase">Buyer's Sales Tax / VAT</label>
                    <div class="relative">
                        <input type="number" bind:value={buyerTaxRate} class="w-full p-2 border border-gray-200 rounded text-sm bg-gray-50 focus:bg-white focus:border-[#0645ad] outline-none transition-colors" placeholder="0">
                        <span class="absolute right-3 top-2 text-gray-400 text-xs">%</span>
                    </div>
                </div>
                {/if}
                {#if config.hasAdInput}
                <div>
                    <label class="block text-[11px] font-bold mb-1.5 text-gray-500 uppercase">Ad Rate (Promoted)</label>
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
                <span class="bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">WAITING...</span>
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
                        <div class="text-sm font-bold text-gray-700">{hasInput ? profitMargin.toFixed(1) + '%' : '--'}</div>
                     </div>
                     <div class="text-center px-4 py-2 bg-gray-50 rounded border border-gray-100">
                        <div class="text-[10px] text-gray-400 font-bold uppercase">ROI</div>
                        <div class="text-sm font-bold text-gray-700">{hasInput ? roi.toFixed(1) + '%' : '--'}</div>
                     </div>
                </div>
            </div>

            {#if hasInput && totalRevenue > 0}
            <div class="mb-6 animate-fade-in">
                <div class="text-[11px] font-bold text-gray-400 uppercase mb-2 flex justify-between">
                    <span>Revenue Dist.</span>
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
                {#if detailedFees.length > 0}
                    <div class="bg-red-50 p-3 rounded border border-red-100 mb-4">
                        <div class="text-[10px] font-bold text-red-400 uppercase mb-2">Platform Fees</div>
                        {#each detailedFees as fee}
                            {#if !fee.isHidden}
                            <div class="flex justify-between text-gray-600 text-xs mb-1">
                                <span>{fee.name}</span>
                                <span class="font-medium text-red-600">-{config.currency}{fee.amount.toFixed(2)}</span>
                            </div>
                            {/if}
                        {/each}
                        <div class="border-t border-red-200 mt-2 pt-2 flex justify-between font-bold text-red-700">
                            <span>Total Platform Fees</span>
                            <span>-{config.currency}{totalPlatformFee.toFixed(2)}</span>
                        </div>
                    </div>
                {/if}

                <div class="flex justify-between text-gray-500 py-1 border-b border-dashed border-gray-100">
                    <span>Total Revenue</span>
                    <span class="font-medium text-gray-900">{hasInput ? config.currency + totalRevenue.toFixed(2) : '--'}</span>
                </div>
                
                {#if adFee > 0}
                <div class="flex justify-between text-gray-500 py-1">
                    <span>Ad Fees</span>
                    <span class="font-medium text-red-500">-{config.currency}{adFee.toFixed(2)}</span>
                </div>
                {/if}

                <div class="flex justify-between text-gray-500 py-1">
                    <span>Cost of Goods & Shipping</span>
                    <span class="font-medium text-gray-900">{hasInput ? '-' + config.currency + (costItem + costShip).toFixed(2) : '--'}</span>
                </div>
            </div>
        </div>
        
        <div class="bg-[#f0f7ff] p-3 text-center border-t border-blue-100">
            <a href="/wise-vs-paypal-calculator" class="text-xs font-bold text-[#0645ad] hover:underline">
                Compare transfer fees? Check Wise vs PayPal &rarr;
            </a>
        </div>
    </div>
</div>
