<script lang="ts">
    import { tools } from '$lib/config';
    
    // Categories
    const categories = ['Marketplace', 'Handmade', 'Fashion', 'Social', 'Logistics', 'Finance'];

    const year = new Date().getFullYear();
    
    // Search Logic
    let searchTerm = '';
    let showDropdown = false;
    $: filteredResults = searchTerm 
        ? tools.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())) 
        : [];

    function closeDropdown() {
        setTimeout(() => { showDropdown = false; }, 200);
    }
    
    // Schema Data cho SEO (Google FAQPage)
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are these seller fee calculators accurate for ${year}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We actively monitor platform policy pages (eBay, Etsy, Amazon, PayPal) and update our algorithms weekly to reflect the latest fee structures, VAT rates, and shipping costs for ${year}."
          }
        },
        {
          "@type": "Question",
          "name": "Do you store my financial data or sales figures?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely not. Merchant Calculator operates with a strict privacy-first policy. All calculations are performed 'client-side' using JavaScript in your own browser. Your data never touches our servers."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use these calculators for tax reporting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "These tools provide high-quality estimates for profit planning and break-even analysis. However, they are not a substitute for professional accounting software or tax advice. Final platform fees may vary slightly due to specific account statuses."
          }
        },
         {
          "@type": "Question",
          "name": "Which countries do you support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We currently support major e-commerce markets including the United Kingdom (UK), United States (USA), Australia, Canada, and Germany. We also offer global tools for Stripe, PayPal, and freelance platforms."
          }
        }
      ]
    };
</script>

<svelte:head>
    <title>Merchant Calculator - Free Seller Fee Directory ({year})</title>
    <meta name="description" content="Calculate seller fees and profits for eBay, Amazon FBA, Etsy, PayPal, and more. Free, privacy-focused, and updated for ${year}." />
    {@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
</svelte:head>

<section class="bg-[#f4f5f7] border-b border-gray-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] relative z-20">
  <div class="max-w-[1000px] mx-auto px-4 py-14 flex flex-col items-center text-center">
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="text-gray-500 mb-4 text-xs font-bold uppercase tracking-widest">
      Search {tools.length}+ Free Calculators
    </label>
    
    <div class="relative w-full max-w-[500px]">
        <input 
            bind:value={searchTerm} 
            on:focus={() => showDropdown = true}
            on:blur={closeDropdown}
            class="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded text-gray-900 shadow-sm focus:outline-none focus:border-[#0645ad] focus:ring-1 focus:ring-[#0645ad] transition-all" 
            placeholder="Search (e.g. ebay uk, cbm, roas, etsy)..." 
        />
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
        </div>

        {#if showDropdown && searchTerm && filteredResults.length > 0}
        <div class="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden z-50 text-left">
            <div class="max-h-[300px] overflow-y-auto">
                {#each filteredResults as tool}
                    <a href="/{tool.slug}" class="block px-4 py-3 hover:bg-blue-50 border-b border-gray-50 last:border-0 transition-colors group">
                        <div class="text-[14px] font-semibold text-gray-800 group-hover:text-[#0645ad]">{tool.title}</div>
                        <div class="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">{tool.category} • {tool.country}</div>
                    </a>
                {/each}
            </div>
        </div>
        {/if}
        {#if showDropdown && searchTerm && filteredResults.length === 0}
        <div class="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-xl p-4 z-50 text-sm text-gray-500">
            No calculators found for "{searchTerm}".
        </div>
        {/if}
    </div>
  </div>
</section>

<main id="directory" class="flex-grow">
  <div class="max-w-[1000px] mx-auto px-5 py-12">
    <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {#each categories as cat}
        <div class="break-inside-avoid bg-white border border-[#e5e5e5] p-5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.02)] mb-6">
            <h2 class="text-[15px] font-bold mb-3 text-[#1a1a1a] flex items-center gap-2 border-b-2 border-[#f0f0f0] pb-2">
                {cat}
            </h2>
            <div class="flex flex-col gap-1.5">
                {#each tools.filter(t => t.category === cat) as tool}
                    <a href="/{tool.slug}" class="text-[#0645ad] text-[13px] hover:underline hover:text-[#0b0080] transition leading-snug">
                        {tool.title}
                    </a>
                {/each}
            </div>
        </div>
      {/each}
    </div>
  </div>
</main>

<section id="faq" class="bg-white border-t border-gray-200">
  <div class="max-w-[1000px] mx-auto px-5 py-16">
    <div class="text-center mb-10">
        <h3 class="font-serif text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h3>
        <p class="text-gray-500 text-sm">Common questions about seller fees, profit margins, and our tools.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
      
      <div>
        <h4 class="font-bold text-gray-900 text-[16px] mb-3">Are these calculators accurate for {year}?</h4>
        <p class="text-[14px] text-gray-600 leading-relaxed">
          Yes. We actively monitor official platform policy pages (eBay, Etsy, Amazon, PayPal) and update our algorithms weekly to reflect the latest fee structures, VAT rates, and shipping costs for {year}.
        </p>
      </div>
      
      <div>
        <h4 class="font-bold text-gray-900 text-[16px] mb-3">Do you store my sales data?</h4>
        <p class="text-[14px] text-gray-600 leading-relaxed">
          Absolutely not. Merchant Calculator operates with a strict <strong>privacy-first</strong> policy. All calculations are performed "client-side" (in your browser). Your financial data never touches our servers.
        </p>
      </div>

      <div>
        <h4 class="font-bold text-gray-900 text-[16px] mb-3">Is this tool really free?</h4>
        <p class="text-[14px] text-gray-600 leading-relaxed">
          Yes. We believe in open-access tools for the creator economy. We do not charge subscriptions. The site is supported by minimal affiliate partnerships with tools we trust (like Wise or ShipStation).
        </p>
      </div>

      <div>
        <h4 class="font-bold text-gray-900 text-[16px] mb-3">Can I use this for tax reporting?</h4>
        <p class="text-[14px] text-gray-600 leading-relaxed">
           These tools provide high-quality estimates for profit planning. However, they are not a substitute for professional accounting software. For official tax filings, please consult a certified accountant.
        </p>
      </div>

      <div>
        <h4 class="font-bold text-gray-900 text-[16px] mb-3">What platforms do you support?</h4>
        <p class="text-[14px] text-gray-600 leading-relaxed">
           We cover major marketplaces (eBay, Amazon, Walmart), handmade platforms (Etsy), fashion apps (Depop, Vinted, StockX), and payment processors (PayPal, Stripe, Wise).
        </p>
      </div>

      <div>
        <h4 class="font-bold text-gray-900 text-[16px] mb-3">How do I calculate CBM?</h4>
        <p class="text-[14px] text-gray-600 leading-relaxed">
           Use our <a href="/cbm-calculator" class="text-[#0645ad] hover:underline">CBM Calculator</a> under the Logistics section. Simply enter the length, width, height, and quantity of your cartons to get the total volume and chargeable weight.
        </p>
      </div>

    </div>
  </div>
</section>
