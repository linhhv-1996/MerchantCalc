// src/lib/seo-content.ts

export const seoContent: Record<string, { title: string; content: string }> = {
    marketplace: {
        title: "{{toolName}} Profit Calculator – Fees, Margin & ROI ({{year}} Update)",
        content: `
            <p class="text-base text-gray-700 leading-7 mb-6">
                Selling on <strong>{{toolName}}</strong> can be highly profitable, but only if you fully understand the platform’s fee structure. Marketplace fees, transaction costs, and shipping expenses can quickly eat into your margins if they are not calculated correctly. This <strong>{{toolName}} profit calculator</strong> helps you accurately estimate your net profit before you list or price a product.
            </p>
            
            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">Understanding {{toolName}} Fees</h3>
            <p class="text-gray-700 leading-7 mb-4">
                Most online marketplaces, including {{toolName}}, apply the following core fees to each sale:
            </p>
            <ul class="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li><strong>Referral Fee:</strong> A percentage of the total order value, typically around {{feeRate}}%, charged for access to the marketplace and its customer base.</li>
                <li><strong>Fixed Transaction Fee:</strong> A flat per-order charge (for example, {{currency}}{{fixedFee}}) that covers payment processing and administrative costs.</li>
            </ul>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">How Net Profit Is Calculated</h3>
            <p class="text-gray-700 leading-7 mb-4">
                True profitability comes from subtracting <em>all</em> costs from your revenue. This calculator uses the following formula:
            </p>
            <div class="bg-gray-100 p-4 rounded border border-gray-200 font-mono text-sm text-gray-800 mb-6">
                Profit = Sold Price + Shipping Charge - (Item Cost + Shipping Cost + Platform Fees)
            </div>
            
            <p class="text-gray-700 leading-7">
                Enter your values above to instantly see your <strong>Net Profit</strong>, <strong>Profit Margin</strong>, and <strong>ROI</strong>. This allows you to price products confidently and avoid selling at a loss.
            </p>
        `
    },

    payment_processor: {
        title: "{{toolName}} Fee Calculator – Transaction Fees & Net Payout",
        content: `
            <p class="text-base text-gray-700 leading-7 mb-6">
                If you accept payments through <strong>{{toolName}}</strong>, understanding transaction fees is essential for accurate pricing and cash flow planning. This calculator shows exactly how much you will receive after processing fees are deducted.
            </p>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">Typical {{toolName}} Processing Fees</h3>
            <p class="text-gray-700 leading-7 mb-4">
                Most payment processors, including {{toolName}}, charge a percentage-based fee plus a fixed amount per transaction. This tool estimates fees using <strong>{{feeRate}}% + {{currency}}{{fixedFee}}</strong>.
            </p>
            <p class="text-gray-700 leading-7 mb-6">
                <em>Actual fees may differ for international payments, currency conversion, or specific account plans.</em>
            </p>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">What You Can Calculate</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li><strong>Net Payout:</strong> Enter the amount charged to see how much money reaches your bank account.</li>
                <li><strong>Required Charge:</strong> Reverse-calculate how much to invoice if you need to receive a specific amount (e.g., {{currency}}500) after fees.</li>
            </ul>
        `
    },

    logistics_volume: {
        title: "CBM Calculator & Chargeable Weight Tool for Shipping",
        content: `
            <p class="text-base text-gray-700 leading-7 mb-6">
                Accurate volume calculation is critical in international logistics. Carriers and freight forwarders bill shipments based on the higher of <strong>Gross Weight</strong> or <strong>Volumetric Weight</strong>, also known as <strong>Chargeable Weight</strong>.
            </p>
            
            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">What Does CBM Mean?</h3>
            <p class="text-gray-700 leading-7 mb-4">
                <strong>CBM (Cubic Meter)</strong> is the standard unit used to measure cargo volume in freight shipping. It is calculated from the length, width, and height of your package.
            </p>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">CBM in Air Freight vs. Sea Freight</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li><strong>Sea Freight (LCL):</strong> Charges are usually based directly on CBM. One cubic meter equals one billable unit.</li>
                <li><strong>Air Freight:</strong> Volume is converted into weight using a divisor (commonly 6000 or 5000). As a reference, 1 CBM often equals <strong>167 kg</strong> in air freight.</li>
            </ul>
            
            <p class="text-gray-700 leading-7">
                Use this CBM calculator to estimate shipping costs accurately and avoid unexpected carrier surcharges.
            </p>
        `
    },

    logistics_density: {
        title: "Freight Density & NMFC Class Calculator",
        content: `
            <p class="text-base text-gray-700 leading-7 mb-6">
                In LTL (Less-Than-Truckload) shipping, pricing is determined by <strong>NMFC Freight Class</strong>, which is largely based on shipment density measured in pounds per cubic foot (lbs/ft³).
            </p>
            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">Why Shipment Density Matters</h3>
            <p class="text-gray-700 leading-7 mb-4">
                Higher-density shipments are easier to handle and transport, resulting in lower freight classes and cheaper rates. Lower-density, bulky shipments fall into higher classes and cost more to ship.
            </p>
        `
    },

    creator_revenue: {
        title: "RPM Calculator – Estimate Creator Ad Revenue",
        content: `
            <p class="text-base text-gray-700 leading-7 mb-6">
                Estimate your creator earnings from platforms like YouTube, TikTok, or Facebook using view count and <strong>RPM (Revenue Per Mille)</strong>. This tool helps you project ad revenue and compare monetization performance.
            </p>
            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">RPM Explained</h3>
            <p class="text-gray-700 leading-7 mb-4">
                RPM represents how much you earn per 1,000 views. It depends on factors such as audience location, content niche, advertiser demand, and video length.
            </p>
        `
    },

    comparison: {
        title: "Money Transfer Fee & Exchange Rate Comparison",
        content: `
            <p class="text-base text-gray-700 leading-7 mb-6">
                Compare transfer fees and exchange rates across multiple providers to identify the most cost-effective option for sending money internationally.
            </p>
            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">Watch Out for Hidden Fees</h3>
            <p class="text-gray-700 leading-7 mb-4">
                Some services advertise “zero fees” while embedding their margin in unfavorable exchange rates. Always compare the final amount received, not just the stated fee.
            </p>
        `
    }
};
