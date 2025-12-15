<script lang="ts">
    import { page } from '$app/stores';
    import { tools } from '$lib/config';
    import SponsorBox from '$lib/components/SponsorBox.svelte';
    import Breadcrumb from '$lib/components/Breadcrumb.svelte';

    // Import 6 loại máy tính
    import MarketplaceCalc from '$lib/calculators/MarketplaceCalc.svelte';
    import PaymentCalc from '$lib/calculators/PaymentCalc.svelte';
    import LogisticsVolume from '$lib/calculators/LogisticsCBM.svelte';
    import LogisticsDensity from '$lib/calculators/LogisticsDensity.svelte';
    import CreatorRevenue from '$lib/calculators/CreatorRevenue.svelte';
    import ComparisonCalc from '$lib/calculators/ComparisonCalc.svelte';

    const currentYear = new Date().getFullYear();
    $: slug = $page.params.slug;
    $: toolData = tools.find(t => t.slug === slug);

    const calculatorMap = {
        'marketplace': MarketplaceCalc,
        'payment_processor': PaymentCalc,
        'logistics_volume': LogisticsVolume,
        'logistics_density': LogisticsDensity,
        'creator_revenue': CreatorRevenue,
        'comparison': ComparisonCalc
    };

    // State dùng chung
    let calcState = {}; 
</script>

<svelte:head>
    <title>{toolData ? toolData.title : 'Tool Not Found'} ({currentYear})</title>
</svelte:head>

{#if toolData}
<Breadcrumb category={toolData.category} title={toolData.title} />

<main class="flex-grow bg-[#f9f9f9] min-h-screen">
  <div class="max-w-[1100px] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    
    <div class="lg:col-span-8">
      
      <div class="mb-6">
        <h1 class="font-serif text-3xl font-bold text-gray-900 mb-2 leading-tight">{toolData.title}</h1>
        <p class="text-sm text-gray-500 mb-4">Updated for {currentYear} • {toolData.country}</p>
        
        {#if toolData.affiliateTip}
            <div class="bg-blue-50 border border-blue-100 p-3 rounded-md flex gap-3 items-center shadow-sm">
                <span class="text-lg">💡</span>
                <div class="text-[13px] text-blue-900 leading-snug">
                    <strong class="font-bold">Pro Tip:</strong> {toolData.affiliateTip.text} 
                    <a href={toolData.affiliateTip.url} class="underline font-bold hover:text-blue-700 ml-1">
                        {toolData.affiliateTip.linkText}
                    </a>
                </div>
            </div>
        {/if}
      </div>

      <div class="mb-10">
          <svelte:component 
              this={calculatorMap[toolData.type]} 
              config={toolData} 
              mode="input"
              bind:state={calcState} 
          />
      </div>
      
      <article class="prose prose-sm max-w-none text-gray-600 border-t border-gray-200 pt-8">
          <h3>Guide: {toolData.title}</h3>
          <p>
            This calculator helps independent sellers and creators estimate their net earnings for <strong>{toolData.category}</strong>. 
            Calculations are processed locally in your browser for privacy.
          </p>
          
          <h4>How fees are calculated in {currentYear}</h4>
          <ul>
              <li><strong>Platform Fees:</strong> Based on the standard rate of {toolData.feeRate ? (toolData.feeRate * 100).toFixed(2) + '%' : 'platform standards'}.</li>
              <li><strong>Fixed Costs:</strong> Includes processing fees like {toolData.currency}{toolData.fixedFee || 0} per transaction.</li>
          </ul>

          <div class="bg-gray-50 p-4 rounded-md border border-gray-200 not-prose text-xs text-gray-500 mt-4">
              <strong>Disclaimer:</strong> This tool provides estimates. Actual fees may vary based on your specific account status, VAT settings, or category-specific rates on {toolData.title}.
          </div>
      </article>
    </div>

    <aside class="lg:col-span-4 space-y-6 sticky top-6 self-start z-10">
       
       <div class="shadow-lg rounded-md overflow-hidden ring-1 ring-black/5">
           <svelte:component 
                this={calculatorMap[toolData.type]} 
                config={toolData} 
                mode="result"
                bind:state={calcState} 
            />
       </div>

       <SponsorBox />
       
       <div class="bg-white border border-gray-200 rounded p-5 shadow-sm">
            <div class="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">
                Related {toolData.category} Tools
            </div>
            <div class="flex flex-col gap-2">
                {#each tools.filter(t => t.slug !== slug && t.category === toolData.category).slice(0, 5) as related}
                    <a href="/{related.slug}" class="text-[#0645ad] text-[13px] font-medium hover:underline block py-1 truncate">
                        {related.title}
                    </a>
                {/each}
            </div>
        </div>
    </aside>

  </div>
</main>
{:else}
<div class="min-h-[50vh] flex flex-col items-center justify-center p-10 text-center">
    <h1 class="text-3xl font-bold text-gray-300 mb-4">404</h1>
    <h2 class="text-xl font-bold text-gray-900 mb-4">Tool not found</h2>
    <a href="/" class="text-white bg-[#0645ad] px-6 py-2 rounded hover:bg-blue-800 transition">Back to Directory</a>
</div>
{/if}
