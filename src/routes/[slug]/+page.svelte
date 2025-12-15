<script lang="ts">
    import { page } from '$app/stores';
    import { tools } from '$lib/config';
    import { seoContent } from '$lib/seo-content'; // <--- Import file mới
    import SponsorBox from '$lib/components/SponsorBox.svelte';
    import Breadcrumb from '$lib/components/Breadcrumb.svelte';

    // Import components
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

    // --- LOGIC XỬ LÝ SEO CONTENT ---
    let dynamicArticle = { title: '', content: '' };

    $: if (toolData) {
        // Lấy template dựa trên 'type' (marketplace, payment...)
        // Nếu không tìm thấy type thì fallback về bài mặc định hoặc rỗng
        const template = seoContent[toolData.type] || { 
            title: `Calculate Fees for ${toolData.title}`, 
            content: '<p>Use this calculator to estimate your profits and fees accurately.</p>' 
        };

        // Hàm thay thế biến {{variable}} bằng giá trị thật
        const replaceVars = (str: string) => {
            return str
                .replace(/{{toolName}}/g, toolData.title)
                .replace(/{{year}}/g, currentYear.toString())
                .replace(/{{currency}}/g, toolData.currency || '$')
                .replace(/{{feeRate}}/g, toolData.feeRate ? (toolData.feeRate * 100).toString() : '0')
                .replace(/{{fixedFee}}/g, toolData.fixedFee ? toolData.fixedFee.toString() : '0');
        };

        dynamicArticle = {
            title: replaceVars(template.title),
            content: replaceVars(template.content)
        };
    }
</script>

<svelte:head>
    <title>{toolData ? toolData.title : 'Tool Not Found'} ({currentYear}) - Merchant Calculator</title>
    <meta name="description" content={`Calculate fees and profits for ${toolData?.title}. Updated for ${currentYear}.`} />
</svelte:head>

{#if toolData}
<Breadcrumb category={toolData.category} title={toolData.title} />

<main class="flex-grow bg-[#f9f9f9] min-h-screen">
  <div class="max-w-[1000px] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    
    <div class="lg:col-span-8">
      
      <div class="mb-8">
        <h1 class="font-serif text-3xl font-bold text-gray-900 mb-2 leading-tight">{toolData.title}</h1>
        <p class="text-sm text-gray-500 mb-4">Updated for {currentYear} • {toolData.country} • Free Tool</p>
        
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

      <div class="mb-12">
          <svelte:component 
              this={calculatorMap[toolData.type]} 
              config={toolData} 
          />
      </div>
      
      <article class="mt-16 border-t border-slate-200 pt-12">
          
          <h2 class="text-3xl font-black text-slate-900 mb-6 tracking-tight">
              {dynamicArticle.title}
          </h2>
          
          <div class="prose prose-lg prose-slate max-w-none 
                      prose-headings:font-bold prose-headings:text-slate-800 
                      prose-p:text-slate-600 prose-li:text-slate-600 
                      prose-strong:text-slate-900 prose-strong:font-bold">
              {@html dynamicArticle.content}
          </div>

          <div class="mt-10 pt-6 border-t border-slate-100 flex gap-4 items-start opacity-70">
              <span class="text-2xl">⚖️</span>
              <p class="text-xs text-slate-500 leading-5">
                  <strong>Disclaimer:</strong> This tool provides estimates for planning purposes only. Official platform fees are subject to change and may vary based on your specific account status, VAT settings, or subscription level. We are not a financial advisor.
              </p>
          </div>

      </article>

    </div>

    <aside class="lg:col-span-4 space-y-6 sticky top-6 self-start">
       <!-- <SponsorBox /> -->
       
       <div class="bg-white border border-gray-200 rounded p-5 shadow-sm">
            <div class="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">
                 More {toolData.category} Tools
            </div>
            <div class="flex flex-col gap-2">
                {#each tools.filter(t => t.slug !== slug && t.category === toolData.category).slice(0, 10) as related}
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
    <a href="/" class="text-white bg-[#0645ad] px-6 py-2 rounded hover:bg-blue-800 transition">Back to Home</a>
</div>
{/if}
