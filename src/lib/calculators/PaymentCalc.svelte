<script lang="ts">
    import { type ToolConfig, type FeeRule } from '$lib/config';
    
    export let config: ToolConfig;

    // --- INPUTS ---
    let amount: number | null = null;
    let mode: 'standard' | 'reverse' = 'standard'; // 'standard': Tính Net | 'reverse': Tính Invoice
    
    // Quản lý phí Optional (Ví dụ: International Fee)
    let activeOptionalFees: Record<string, boolean> = {};

    // Reset khi đổi config
    $: if (config) {
        activeOptionalFees = {};
        if (config.globalFees) {
             config.globalFees.forEach(f => {
                 if (f.isOptional) activeOptionalFees[f.name] = false;
             });
        }
    }

    // --- LOGIC TÍNH TOÁN 2 CHIỀU ---
    
    $: inputVal = amount || 0;
    
    // Biến kết quả
    let totalFee = 0;
    let netPayout = 0;
    let invoiceAmount = 0;

    $: {
        totalFee = 0;
        netPayout = 0;
        invoiceAmount = 0;

        if (inputVal > 0 && config.globalFees) {
            if (mode === 'standard') {
                // TÍNH XUÔI: Nhập Amount -> Trừ phí -> Ra Net
                invoiceAmount = inputVal;
                
                config.globalFees.forEach(rule => {
                    if (rule.isOptional && !activeOptionalFees[rule.name]) return;
                    
                    let fee = 0;
                    if (rule.type === 'fixed') fee = rule.value || 0;
                    else if (rule.type === 'percent') fee = inputVal * (rule.value || 0);
                    
                    totalFee += fee;
                });
                
                netPayout = invoiceAmount - totalFee;

            } else {
                // TÍNH NGƯỢC: Nhập Net (Mong muốn nhận) -> Cộng phí -> Ra Invoice
                // Công thức: Invoice = (Goal + FixedFees) / (1 - PercentFees)
                netPayout = inputVal;

                let totalFixed = 0;
                let totalRate = 0;

                config.globalFees.forEach(rule => {
                    if (rule.isOptional && !activeOptionalFees[rule.name]) return;

                    if (rule.type === 'fixed') totalFixed += rule.value || 0;
                    else if (rule.type === 'percent') totalRate += rule.value || 0;
                });

                // Tránh chia cho 0
                if (totalRate < 1) {
                    invoiceAmount = (netPayout + totalFixed) / (1 - totalRate);
                    totalFee = invoiceAmount - netPayout;
                }
            }
        }
    }
</script>

<div class="space-y-6">
    <div class="bg-white p-6 border border-gray-300 rounded shadow-sm">
        <div class="flex bg-gray-100 p-1 rounded mb-6 text-sm font-bold text-gray-500">
            <button 
                class="flex-1 py-2 rounded shadow-sm transition-all {mode === 'standard' ? 'bg-white text-[#0645ad]' : 'hover:text-gray-700'}"
                on:click={() => mode = 'standard'}
            >
                Seller Pays Fees
                <span class="block text-[10px] font-normal opacity-70">I bill $100, receive $96</span>
            </button>
            <button 
                class="flex-1 py-2 rounded shadow-sm transition-all {mode === 'reverse' ? 'bg-white text-[#0645ad]' : 'hover:text-gray-700'}"
                on:click={() => mode = 'reverse'}
            >
                Client Pays Fees
                <span class="block text-[10px] font-normal opacity-70">I need $100, bill $104</span>
            </button>
        </div>

        <div>
            <label class="block text-xs font-bold mb-1.5 text-gray-700">
                {mode === 'standard' ? (config.labels?.amount || 'Invoice Amount') : 'Amount You Want to Receive'} 
                ({config.currency})
            </label>
            <div class="relative">
                <span class="absolute left-4 top-4 text-gray-400 text-lg">{config.currency}</span>
                <input type="number" bind:value={amount} class="w-full pl-10 p-4 border border-gray-300 rounded text-xl focus:border-[#0645ad] outline-none font-medium text-gray-900" placeholder="0.00" step="0.01">
            </div>
        </div>

        {#if config.globalFees && config.globalFees.some(f => f.isOptional)}
        <div class="mt-4 pt-4 border-t border-dashed border-gray-200">
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-2">Options</label>
            <div class="flex flex-wrap gap-3">
                {#each config.globalFees.filter(f => f.isOptional) as optFee}
                    <label class="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                        <input type="checkbox" bind:checked={activeOptionalFees[optFee.name]} class="accent-[#0645ad]">
                        {optFee.name}
                    </label>
                {/each}
            </div>
        </div>
        {/if}
    </div>

    <div class="bg-white border border-gray-300 rounded shadow-md overflow-hidden">
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex justify-between">
            <span>Result Breakdown</span>
            {#if !amount}
                 <span class="text-gray-400 text-[10px]">WAITING...</span>
            {/if}
        </div>
        <div class="p-6">
            <div class="mb-6 pb-6 border-b border-gray-100 text-center sm:text-left">
                 <span class="text-sm font-bold text-gray-400 block mb-1">
                    {mode === 'standard' ? (config.labels?.result || 'Net Payout') : 'You Should Invoice'}
                 </span>
                 <span class="text-5xl font-bold {amount ? 'text-blue-600' : 'text-gray-200'} tracking-tight">
                    {#if amount}
                        {config.currency}{mode === 'standard' ? netPayout.toFixed(2) : invoiceAmount.toFixed(2)}
                    {:else}
                        --
                    {/if}
                 </span>
            </div>
            
            <div class="space-y-2 text-sm">
                <div class="flex justify-between text-gray-600">
                    <span>Total Invoice Amount:</span>
                    <span class="font-bold">{amount ? config.currency + invoiceAmount.toFixed(2) : '--'}</span>
                </div>
                
                <div class="flex justify-between text-red-600">
                    <span>Total Fees Deducted:</span>
                    <span class="font-bold">{amount ? '-' + config.currency + totalFee.toFixed(2) : '--'}</span>
                </div>

                <div class="flex justify-between text-green-700 pt-2 border-t border-dashed border-gray-200 mt-2">
                    <span>Net Received:</span>
                    <span class="font-bold">{amount ? config.currency + netPayout.toFixed(2) : '--'}</span>
                </div>
            </div>

            <div class="bg-gray-50 p-3 rounded mt-5 text-[11px] text-gray-500 leading-relaxed border border-gray-100">
                <strong>Applied Fees:</strong>
                <ul class="list-disc pl-4 mt-1 space-y-0.5">
                    {#if config.globalFees}
                        {#each config.globalFees as rule}
                             {#if !rule.isOptional || activeOptionalFees[rule.name]}
                                <li>
                                    {rule.name}: 
                                    {#if rule.type === 'percent'}{((rule.value || 0) * 100).toFixed(2)}%{:else}{config.currency}{rule.value}{/if}
                                </li>
                             {/if}
                        {/each}
                    {/if}
                </ul>
            </div>
        </div>
    </div>
</div>
