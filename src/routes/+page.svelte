<script lang="ts">
    import { tools } from '$lib/config';

    // --- LOGIC PHÂN NHÓM DỮ LIỆU ---
    // Nhóm 1: Marketplaces (Marketplace, Handmade, Fashion, Social)
    const marketGroups = ['Marketplace', 'Handmade', 'Fashion', 'Social'];
    $: marketTools = tools.filter(t => marketGroups.includes(t.category));

    // Nhóm 2: Finance (Finance, E-commerce)
    const financeGroups = ['Finance', 'E-commerce'];
    $: financeTools = tools.filter(t => financeGroups.includes(t.category));

    // Nhóm 3: Logistics
    $: logisticsTools = tools.filter(t => t.category === 'Logistics');

    // --- LOGIC TÌM KIẾM ---
    let searchTerm = '';
    $: filteredResults = searchTerm 
        ? tools.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())) 
        : [];

    const currentYear = new Date().getFullYear();

    // --- SCHEMA DATA (SEO JSON-LD) ---
    // Dữ liệu đầy đủ không cắt bớt
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Are these seller fee calculators accurate for ${currentYear}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes. We actively monitor official platform policy pages (eBay, Etsy, Amazon, PayPal) and update our algorithms weekly to reflect the latest fee structures, VAT rates, and shipping costs for ${currentYear}.`
          }
        },
        {
          "@type": "Question",
          "name": "Do you store my sales data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely not. Merchant Calculator operates with a strict privacy-first policy. All calculations are performed 'client-side' (in your browser). Your financial data never touches our servers."
          }
        },
        {
          "@type": "Question",
          "name": "Is this tool really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We believe in open-access tools for the creator economy. We do not charge subscriptions. The site is supported by minimal affiliate partnerships with tools we trust."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this for tax reporting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "These tools provide high-quality estimates for profit planning. However, they are not a substitute for professional accounting software. For official tax filings, please consult a certified accountant."
          }
        },
         {
          "@type": "Question",
          "name": "What platforms do you support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We cover major marketplaces (eBay, Amazon, Walmart), handmade platforms (Etsy), fashion apps (Depop, Vinted, StockX), and payment processors (PayPal, Stripe, Wise)."
          }
        }
      ]
    };
</script>

<svelte:head>
    <title>Merchant Calculators - Fee Calculator Directory ({currentYear})</title>
    <meta name="description" content={`Complete directory of free fee calculators for eBay, Amazon, Shopify, and PayPal. Updated daily for ${currentYear} seller policies.`} />
    {@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
</svelte:head>


    <main class="w-full max-w-[1000px] mx-auto px-0 py-0 flex-1">

        {#if !searchTerm}
        <div class="mb-8">
            <p class="text-xl font-medium text-white mb-2">Calculator Directory</p>
            <p class="text-[#888] text-sm max-w-2xl font-light">
                Complete database of fee calculators for eBay, Amazon, Shopify & PayPal. 
                Data sourced directly from {currentYear} platform policies.
            </p>
        </div>
        {/if}

        {#if searchTerm}
            <section>
                <h2 class="section-header">Search Results</h2>
                {#if filteredResults.length > 0}
                    <div class="tool-grid">
                        {#each filteredResults as tool}
                            <a href="/{tool.slug}" class="tool-row group">
                                <span class="tool-name">{tool.title}</span>
                                <span class="tool-meta">[{tool.country === 'Global' ? 'GLOBAL' : tool.country.toUpperCase()}]</span>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <div class="text-[#555] py-10 italic">No calculators found for "{searchTerm}".</div>
                {/if}
            </section>
        {:else}
            <section>
                <h2 id="marketplaces" class="section-header scroll-mt-20">
                    Marketplaces ({marketTools.length} Tools)
                </h2>
                <div class="tool-grid">
                    {#each marketTools as tool}
                        <a href="/{tool.slug}" class="tool-row group">
                            <span class="tool-name">{tool.title}</span>
                            <span class="tool-meta">[{tool.country === 'Global' ? 'GLOBAL' : tool.country.toUpperCase()}]</span>
                        </a>
                    {/each}
                </div>
            </section>

            <a href="https://wise.com/business" target="_blank" rel="nofollow noopener" class="ad-block group">
                <div class="ad-content">
                    <h3 class="text-[15px] font-semibold text-white flex items-center gap-2 mb-1">
                        <span class="text-yellow-500">🏦</span>
                        Wise Business Banking
                        <span class="ad-badge">Recommended</span>
                    </h3>
                    <p class="text-[13px] text-[#888] font-light">Selling internationally? Save 3-5% on currency exchange rates vs PayPal.</p>
                </div>
                <div class="ad-cta group-hover:bg-white group-hover:text-black transition-colors">Open Account &rarr;</div>
            </a>

            <section>
                <h2 id="finance" class="section-header scroll-mt-20">
                    Finance & Payments ({financeTools.length} Tools)
                </h2>
                <div class="tool-grid">
                    {#each financeTools as tool}
                        <a href="/{tool.slug}" class="tool-row group">
                            <span class="tool-name">{tool.title}</span>
                            <span class="tool-meta">[{tool.country === 'Global' ? 'GLOBAL' : tool.country.toUpperCase()}]</span>
                        </a>
                    {/each}
                </div>
            </section>

            <a href="https://printify.com" target="_blank" rel="nofollow noopener" class="ad-block group">
                <div class="ad-content">
                    <h3 class="text-[15px] font-semibold text-white flex items-center gap-2 mb-1">
                        <span class="text-green-500">👕</span>
                        Start Print-on-Demand
                        <span class="ad-badge">Partner</span>
                    </h3>
                    <p class="text-[13px] text-[#888] font-light">Connect Printify to eBay/Etsy. Zero inventory risk, high profit margins.</p>
                </div>
                <div class="ad-cta group-hover:bg-white group-hover:text-black transition-colors">Start Free &rarr;</div>
            </a>

            <section>
                <h2 id="logistics" class="section-header scroll-mt-20">
                    Logistics & Freight ({logisticsTools.length} Tools)
                </h2>
                <div class="tool-grid">
                    {#each logisticsTools as tool}
                        <a href="/{tool.slug}" class="tool-row group">
                            <span class="tool-name">{tool.title}</span>
                            <span class="tool-meta">[{tool.country === 'Global' ? 'GLOBAL' : tool.country.toUpperCase()}]</span>
                        </a>
                    {/each}
                </div>
            </section>

            <section class="mt-20">
                <h2 class="text-sm font-semibold text-[#555] uppercase tracking-wide mb-4">Common Questions</h2>
                
                <details class="group bg-[#141414] border border-[#333] rounded mb-2">
                    <summary class="p-4 cursor-pointer font-normal text-[#ccc] flex justify-between items-center group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors select-none">
                        How accurate are the calculators?
                        <span class="font-mono text-[#666] font-bold text-lg group-open:hidden">+</span>
                        <span class="font-mono text-[#666] font-bold text-lg hidden group-open:block">−</span>
                    </summary>
                    <div class="p-4 text-[#999] text-sm font-light leading-6 border-t border-[#333] mt-2">
                        Updated daily with {currentYear} policies from eBay, Amazon, etc. Final fees may vary by user account status.
                    </div>
                </details>

                <details class="group bg-[#141414] border border-[#333] rounded mb-2">
                    <summary class="p-4 cursor-pointer font-normal text-[#ccc] flex justify-between items-center group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors select-none">
                        Do you account for Sales Tax/VAT?
                        <span class="font-mono text-[#666] font-bold text-lg group-open:hidden">+</span>
                        <span class="font-mono text-[#666] font-bold text-lg hidden group-open:block">−</span>
                    </summary>
                    <div class="p-4 text-[#999] text-sm font-light leading-6 border-t border-[#333] mt-2">
                        Yes. Region-specific tools (UK/EU) handle VAT. US tools include Sales Tax fields for accurate processing fee calculation.
                    </div>
                </details>

                <details class="group bg-[#141414] border border-[#333] rounded mb-2">
                    <summary class="p-4 cursor-pointer font-normal text-[#ccc] flex justify-between items-center group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors select-none">
                        Can I calculate Drop Shipping profit?
                        <span class="font-mono text-[#666] font-bold text-lg group-open:hidden">+</span>
                        <span class="font-mono text-[#666] font-bold text-lg hidden group-open:block">−</span>
                    </summary>
                    <div class="p-4 text-[#999] text-sm font-light leading-6 border-t border-[#333] mt-2">
                        Yes. Enter your supplier cost (COGS) in the "Item Cost" field to deduct marketplace fees and see net profit.
                    </div>
                </details>

                <details class="group bg-[#141414] border border-[#333] rounded mb-2">
                    <summary class="p-4 cursor-pointer font-normal text-[#ccc] flex justify-between items-center group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors select-none">
                        Is this tool really free?
                        <span class="font-mono text-[#666] font-bold text-lg group-open:hidden">+</span>
                        <span class="font-mono text-[#666] font-bold text-lg hidden group-open:block">−</span>
                    </summary>
                    <div class="p-4 text-[#999] text-sm font-light leading-6 border-t border-[#333] mt-2">
                         Yes. We believe in open-access tools for the creator economy. We do not charge subscriptions. The site is supported by minimal affiliate partnerships with tools we trust.
                    </div>
                </details>

                <details class="group bg-[#141414] border border-[#333] rounded mb-2">
                    <summary class="p-4 cursor-pointer font-normal text-[#ccc] flex justify-between items-center group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors select-none">
                        Do you store my sales data?
                        <span class="font-mono text-[#666] font-bold text-lg group-open:hidden">+</span>
                        <span class="font-mono text-[#666] font-bold text-lg hidden group-open:block">−</span>
                    </summary>
                    <div class="p-4 text-[#999] text-sm font-light leading-6 border-t border-[#333] mt-2">
                        Absolutely not. Merchant Calculator operates with a strict privacy-first policy. All calculations are performed "client-side" (in your browser). Your financial data never touches our servers.
                    </div>
                </details>
            </section>
        {/if}

    </main>


<style>
    /* STYLE TỪ INDEX.HTML */
    
    .section-header { 
        border-bottom: 1px solid #333; 
        padding-bottom: 8px; 
        margin-bottom: 16px; 
        margin-top: 40px;
        font-size: 13px; 
        font-weight: 600; 
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #777;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .tool-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0;
        border-top: 1px solid #222; 
    }

    .tool-row {
        display: flex;
        align-items: baseline; 
        padding: 10px 12px;
        border-bottom: 1px solid #222;
        text-decoration: none;
        color: inherit;
        transition: background-color 0.1s ease;
        position: relative;
    }
    
    .tool-row:hover { background-color: #1a1a1a; z-index: 1; }

    .tool-name { color: #3b82f6; font-weight: 400; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .tool-row:hover .tool-name { text-decoration: underline; color: #60a5fa; }

    .tool-meta { font-size: 10px; color: #555; font-family: monospace; margin-left: auto; flex-shrink: 0; }
    
    /* AD BLOCK */
    .ad-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #161616; 
        border: 1px solid #333; 
        border-radius: 4px;
        padding: 16px 20px;
        margin: 32px 0; 
        text-decoration: none;
        transition: border-color 0.2s;
    }
    .ad-block:hover { border-color: #555; }
    
    .ad-badge { font-size: 10px; text-transform: uppercase; background: #333; color: #aaa; padding: 2px 6px; border-radius: 2px; border: 1px solid #444; margin-left: 8px; }
    
    .ad-cta { 
        background: #e5e5e5; 
        color: #000; 
        font-size: 12px; 
        font-weight: 600; 
        padding: 6px 12px; 
        border-radius: 2px; 
        white-space: nowrap;
        transition: background 0.2s;
    }
    .ad-block:hover .ad-cta { background-color: white; color: black; }

    @media (min-width: 768px) {
        .tool-grid {
            grid-template-columns: 1fr 1fr; 
            column-gap: 32px; 
        }
    }

    @media (max-width: 640px) {
        .tool-row { padding: 12px 0; border-bottom: 1px dashed #333; }
        .ad-block { flex-direction: column; align-items: flex-start; gap: 12px; }
        .ad-cta { width: 100%; text-align: center; }
    }
</style>
