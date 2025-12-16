<script lang="ts">
    import { type ToolConfig, type FeeRule } from '$lib/config';
    export let config: ToolConfig;

    // --- INPUTS ---
    let soldPrice: number | null = null;       
    let shippingCharge: number | null = null;  
    let itemCost: number | null = null;
    let shippingCost: number | null = null;
    let adRate: number = 0;
    let buyerTaxRate: number = 0;              
    let selectedCategoryIndex = 0;
    let activeOptionalFees: Record<string, boolean> = {};

    // Giữ nguyên Logic cũ của bạn
    $: if (config) {
        selectedCategoryIndex = 0;
        activeOptionalFees = {};
        if (config.globalFees) {
             config.globalFees.forEach(f => {
                 if (f.isOptional) activeOptionalFees[f.name] = false;
             });
        }
        // Set default value nhẹ để đỡ trống
        if (!soldPrice) soldPrice = 100;
    }

    // --- CORE LOGIC (Giữ nguyên) ---
    function calculateRuleCost(rule: FeeRule, revenue: number): number {
        if (rule.condition) {
            if (rule.condition.minPrice !== undefined && revenue < rule.condition.minPrice) return 0;
            if (rule.condition.maxPrice !== undefined && revenue >= rule.condition.maxPrice) return 0;
        }
        let fee = 0;
        if (rule.type === 'fixed') { fee = rule.value || 0; } 
        else if (rule.type === 'percent') { fee = revenue * (rule.value || 0); } 
        else if (rule.type === 'tiered_progressive' && rule.tiers) {
            let remaining = revenue;
            let previousLimit = 0;
            for (const tier of rule.tiers) {
                if (remaining <= 0) break;
                const tierSpan = tier.upto - previousLimit;
                const taxableInTier = Math.min(remaining, tierSpan);
                fee += taxableInTier * tier.rate;
                remaining -= taxableInTier;
                previousLimit = tier.upto;
            }
        }
        if (rule.cap && fee > rule.cap) { fee = rule.cap; }
        return fee;
    }

    // --- REACTIVE STATEMENTS (Giữ nguyên) ---
    $: hasInput = soldPrice !== null;
    $: price = soldPrice || 0;
    $: shipCharge = shippingCharge || 0;
    $: totalRevenue = price + shipCharge;
    $: costItem = itemCost || 0;
    $: costShip = shippingCost || 0;
    $: taxAmount = totalRevenue * (buyerTaxRate / 100);
    $: feeBasis = totalRevenue + taxAmount; 

    let detailedFees: { name: string, amount: number, isHidden?: boolean }[] = [];
    let totalPlatformFee = 0;

    $: {
        detailedFees = [];
        totalPlatformFee = 0;
        if (config.globalFees) {
            config.globalFees.forEach(rule => {
                if (rule.isOptional && !activeOptionalFees[rule.name]) return;
                const cost = calculateRuleCost(rule, feeBasis);
                if (cost !== 0 || rule.hidden) {
                    detailedFees.push({ name: rule.name, amount: cost, isHidden: rule.hidden });
                    totalPlatformFee += cost;
                }
            });
        }
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
        if (config.vatOnFeeRate && totalPlatformFee > 0) {
            const vatCost = totalPlatformFee * config.vatOnFeeRate;
            detailedFees.push({ name: `VAT on Fees (${config.vatOnFeeRate * 100}%)`, amount: vatCost });
            totalPlatformFee += vatCost;
        }
    }

    $: adFee = totalRevenue * (adRate / 100);
    $: totalExpenses = costItem + costShip + totalPlatformFee + adFee;
    $: netProfit = totalRevenue - totalExpenses;
    $: profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    $: roi = (costItem + costShip) > 0 ? (netProfit / (costItem + costShip)) * 100 : 0;

    function resetCalc() { soldPrice = 0; shippingCharge = 0; itemCost = 0; shippingCost = 0; }
</script>

<div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
    <div class="md:col-span-7 space-y-6">
        {#if config.categories && config.categories.length > 0}
        <div class="p-5 bg-[#161616] border border-[#333] rounded-sm">
            <label class="input-label">Category</label>
            <div class="relative">
                <select bind:value={selectedCategoryIndex} class="calc-input cursor-pointer appearance-none">
                    {#each config.categories as cat, i}
                        <option value={i}>{cat.name}</option>
                    {/each}
                </select>
                <i class="ph-bold ph-caret-down absolute right-3 top-3.5 text-[#555] pointer-events-none"></i>
            </div>
            <p class="text-[11px] text-[#555] mt-2">*Fees adjust based on category.</p>
        </div>
        {/if}

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="input-label">Sold Price ({config.currency})</label>
                <input type="number" bind:value={soldPrice} class="calc-input" placeholder="0.00" inputmode="decimal">
            </div>
            <div>
                <label class="input-label">Shipping Charge ({config.currency})</label>
                <input type="number" bind:value={shippingCharge} class="calc-input" placeholder="0.00" inputmode="decimal">
            </div>
            <div>
                <label class="input-label">Item Cost ({config.currency})</label>
                <input type="number" bind:value={itemCost} class="calc-input" placeholder="0.00" inputmode="decimal">
            </div>
            <div>
                <label class="input-label">Shipping Cost ({config.currency})</label>
                <input type="number" bind:value={shippingCost} class="calc-input" placeholder="0.00" inputmode="decimal">
            </div>
        </div>

        <div class="pt-6 border-t border-[#333]">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {#if config.hasTaxInput}
                <div>
                    <label class="input-label">Tax Rate (%)</label>
                    <input type="number" bind:value={buyerTaxRate} class="calc-input" placeholder="0" inputmode="decimal">
                </div>
                {/if}
                {#if config.hasAdInput}
                <div>
                    <label class="input-label">Ad Rate (%)</label>
                    <input type="number" bind:value={adRate} class="calc-input" placeholder="Optional" inputmode="decimal">
                </div>
                {/if}
            </div>
            
            {#if config.globalFees && config.globalFees.some(f => f.isOptional)}
            <div class="mt-4 flex flex-wrap gap-3">
                {#each config.globalFees.filter(f => f.isOptional) as optFee}
                    <label class="flex items-center gap-2 text-xs text-[#888] cursor-pointer select-none border border-[#333] px-3 py-2 rounded bg-[#0a0a0a] hover:border-[#555] transition">
                        <input type="checkbox" bind:checked={activeOptionalFees[optFee.name]} class="accent-blue-500">
                        {optFee.name}
                    </label>
                {/each}
            </div>
            {/if}
        </div>
    </div>

    <div class="md:col-span-5">
        <div class="sticky top-20 space-y-4">
            
            <div class="result-box transition-all border-l-4 {netProfit >= 0 ? 'border-l-green-500' : 'border-l-red-500'}">
                <div class="flex justify-between items-start">
                    <div>
                        <div class="result-label">Net Profit</div>
                        <div class="result-value {netProfit >= 0 ? 'text-green-500' : 'text-red-500'}">
                            {config.currency}{netProfit.toFixed(2)}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="result-label">Margin</div>
                        <div class="text-lg font-mono text-white">{profitMargin.toFixed(2)}%</div>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-[#222] flex justify-between items-end">
                    <span class="text-xs text-[#888]">ROI</span>
                    <span class="font-mono {roi >= 0 ? 'text-green-500' : 'text-red-500'}">{roi.toFixed(0)}%</span>
                </div>
            </div>

            <div class="bg-[#161616] border border-[#333] rounded-sm p-4">
                <h3 class="text-xs font-bold text-[#888] uppercase mb-3 flex items-center gap-2">
                    <i class="ph-fill ph-list-dashes"></i> Fee Breakdown
                </h3>
                <div class="space-y-1">
                    <div class="flex justify-between py-1 border-b border-dashed border-[#222] text-[13px]">
                        <span class="text-[#888]">Total Revenue</span>
                        <span class="font-mono text-white">{config.currency}{totalRevenue.toFixed(2)}</span>
                    </div>

                    {#each detailedFees as fee}
                        {#if !fee.isHidden}
                        <div class="flex justify-between py-1 border-b border-dashed border-[#222] text-[13px]">
                            <span class="text-[#888]">{fee.name}</span>
                            <span class="font-mono text-red-400">-{config.currency}{fee.amount.toFixed(2)}</span>
                        </div>
                        {/if}
                    {/each}

                    {#if adFee > 0}
                    <div class="flex justify-between py-1 border-b border-dashed border-[#222] text-[13px]">
                        <span class="text-[#888]">Ad Fees</span>
                        <span class="font-mono text-red-400">-{config.currency}{adFee.toFixed(2)}</span>
                    </div>
                    {/if}

                    <div class="flex justify-between py-1 mt-2 pt-2 border-t border-[#333] text-[13px]">
                        <span class="text-[#888]">Total Costs</span>
                        <span class="font-mono text-red-400">-{config.currency}{(costItem + costShip).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <button on:click={() => alert('Link copied!')} class="bg-[#222] hover:bg-[#333] border border-[#333] text-white text-xs py-2 rounded flex items-center justify-center gap-2 transition active:scale-95">
                    <i class="ph ph-share-network"></i> Share
                </button>
                <button on:click={resetCalc} class="bg-[#222] hover:bg-[#333] border border-[#333] text-white text-xs py-2 rounded flex items-center justify-center gap-2 transition active:scale-95">
                    <i class="ph ph-arrows-counter-clockwise"></i> Reset
                </button>
            </div>
        </div>
    </div>
</div>
