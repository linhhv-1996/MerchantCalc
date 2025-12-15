// src/lib/config.ts

export interface ToolConfig {
    slug: string;
    title: string;
    category: 'Marketplace' | 'Handmade' | 'Fashion' | 'Social' | 'Logistics' | 'Finance';
    country: string;
    currency: string;
    
    // 6 LOẠI LOGIC TÍNH TOÁN
    type: 'marketplace' | 'payment_processor' | 'logistics_volume' | 'logistics_density' | 'creator_revenue' | 'comparison'; 
    
    // Config cho phí (Marketplace, Payment)
    feeRate?: number;        
    fixedFee?: number;
    
    // Config cho Comparison (Wise vs PayPal)
    compare?: { 
        nameA: string; rateA: number; fixedA: number; 
        nameB: string; rateB: number; fixedB: number; 
    };

    // Config nhãn hiển thị (Custom Label)
    labels?: {
        amount?: string;
        result?: string;
    };

    affiliateTip?: { text: string; linkText: string; url: string; };
}

export const tools: ToolConfig[] = [
    
    // ============================================================
    // 1. MAJOR MARKETPLACES (eBay, Amazon, Walmart)
    // Type: marketplace (Có nhập giá vốn, ship...)
    // ============================================================
    {
        slug: 'ebay-fee-calculator-uk',
        title: 'eBay Fee Calculator UK',
        category: 'Marketplace',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        feeRate: 0.128, fixedFee: 0.30,
        affiliateTip: { text: "Selling internationally?", linkText: "Use Wise", url: "#" }
    },
    {
        slug: 'ebay-fee-calculator-usa',
        title: 'eBay Fee Calculator USA',
        category: 'Marketplace',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.1325, fixedFee: 0.30,
        affiliateTip: { text: "Cheaper shipping labels?", linkText: "ShipStation Trial", url: "#" }
    },
    {
        slug: 'ebay-fee-calculator-australia',
        title: 'eBay Fee Calculator Australia',
        category: 'Marketplace',
        country: 'Australia',
        currency: 'A$',
        type: 'marketplace',
        feeRate: 0.135, fixedFee: 0.30,
        affiliateTip: { text: "Importing goods?", linkText: "Check Import Tax", url: "#" }
    },
    {
        slug: 'ebay-fee-calculator-canada',
        title: 'eBay Fee Calculator Canada',
        category: 'Marketplace',
        country: 'Canada',
        currency: 'C$',
        type: 'marketplace',
        feeRate: 0.129, fixedFee: 0.30,
        affiliateTip: { text: "Cross-border fees?", linkText: "Wise Business", url: "#" }
    },
    {
        slug: 'amazon-fba-calculator-uk',
        title: 'Amazon FBA Calculator UK',
        category: 'Marketplace',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        feeRate: 0.153, fixedFee: 2.50, // Est avg FBA
        affiliateTip: { text: "Sourcing from China?", linkText: "Alibaba Guide", url: "#" }
    },
    {
        slug: 'amazon-fba-calculator-usa',
        title: 'Amazon FBA Calculator USA',
        category: 'Marketplace',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.15, fixedFee: 3.50, 
        affiliateTip: { text: "Product Research?", linkText: "Helium10", url: "#" }
    },
    {
        slug: 'amazon-referral-fee-calculator',
        title: 'Amazon Referral Fee Estimator',
        category: 'Marketplace',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.15, fixedFee: 0.00,
        affiliateTip: { text: "Boost sales?", linkText: "Amazon PPC Tool", url: "#" }
    },
    {
        slug: 'walmart-marketplace-calculator',
        title: 'Walmart Marketplace Fees',
        category: 'Marketplace',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.15, fixedFee: 0.00,
        affiliateTip: { text: "Fast Shipping Tag?", linkText: "Deliverr", url: "#" }
    },

    // ============================================================
    // 2. ETSY & HANDMADE
    // Type: marketplace
    // ============================================================
    {
        slug: 'etsy-profit-calculator',
        title: 'Etsy Profit Calculator (Global)',
        category: 'Handmade',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.065, fixedFee: 0.20,
        affiliateTip: { text: "Print on Demand?", linkText: "Printful", url: "#" }
    },
    {
        slug: 'etsy-fee-calculator-uk',
        title: 'Etsy Fee Calculator UK',
        category: 'Handmade',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        feeRate: 0.065, fixedFee: 0.20, // + VAT usually
        affiliateTip: { text: "Craft supplies?", linkText: "AliExpress Bulk", url: "#" }
    },
    {
        slug: 'etsy-fee-calculator-usa',
        title: 'Etsy Fee Calculator USA',
        category: 'Handmade',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.065, fixedFee: 0.25,
        affiliateTip: { text: "Design assets?", linkText: "CreativeMarket", url: "#" }
    },
    {
        slug: 'etsy-fee-calculator-australia',
        title: 'Etsy Fee Calculator Australia',
        category: 'Handmade',
        country: 'Australia',
        currency: 'A$',
        type: 'marketplace',
        feeRate: 0.065, fixedFee: 0.30,
        affiliateTip: { text: "Better photos?", linkText: "PhotoRoom AI", url: "#" }
    },
    {
        slug: 'etsy-fee-calculator-canada',
        title: 'Etsy Fee Calculator Canada',
        category: 'Handmade',
        country: 'Canada',
        currency: 'C$',
        type: 'marketplace',
        feeRate: 0.065, fixedFee: 0.25,
        affiliateTip: { text: "Shipping to US?", linkText: "Chit Chats", url: "#" }
    },
    {
        slug: 'etsy-pricing-calculator',
        title: 'Etsy Pricing Strategy Tool',
        category: 'Handmade',
        country: 'Global',
        currency: '$',
        type: 'marketplace', // Dùng logic marketplace để tính ngược margin
        feeRate: 0.065, fixedFee: 0.20,
        affiliateTip: { text: "SEO Keyword Tool?", linkText: "eRank", url: "#" }
    },

    // ============================================================
    // 3. FASHION & RESELL
    // Type: marketplace
    // ============================================================
    {
        slug: 'vinted-fee-calculator-uk',
        title: 'Vinted Fee Calculator UK',
        category: 'Fashion',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        feeRate: 0.00, fixedFee: 0.00, // No seller fee
        affiliateTip: { text: "Packaging?", linkText: "Eco Mailers", url: "#" }
    },
    {
        slug: 'depop-fee-calculator',
        title: 'Depop Profit Calculator',
        category: 'Fashion',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.10, fixedFee: 0.00,
        affiliateTip: { text: "Cross-list?", linkText: "Vendoo", url: "#" }
    },
    {
        slug: 'poshmark-fee-calculator',
        title: 'Poshmark Fee Calculator',
        category: 'Fashion',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.20, fixedFee: 0.00,
        affiliateTip: { text: "Automation Bot?", linkText: "PosherVA", url: "#" }
    },
    {
        slug: 'mercari-fee-calculator',
        title: 'Mercari Fee Calculator',
        category: 'Fashion',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.10, fixedFee: 0.50, // Selling + Process
        affiliateTip: { text: "Need boxes?", linkText: "USPS Free Supplies", url: "#" }
    },
    {
        slug: 'grailed-fee-calculator',
        title: 'Grailed Fee Calculator',
        category: 'Fashion',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.09, fixedFee: 0.30,
        affiliateTip: { text: "Legit check?", linkText: "CheckCheck App", url: "#" }
    },
    {
        slug: 'stockx-fee-calculator',
        title: 'StockX Seller Payout',
        category: 'Fashion',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.09, fixedFee: 0.00,
        affiliateTip: { text: "Sneaker Group?", linkText: "Discord Cook Group", url: "#" }
    },
    {
        slug: 'goat-fee-calculator',
        title: 'GOAT Fee Calculator',
        category: 'Fashion',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.095, fixedFee: 5.00,
        affiliateTip: { text: "Shoe cleaner?", linkText: "Reshoevn8r", url: "#" }
    },
    {
        slug: 'vestiaire-collective-fee-calculator',
        title: 'Vestiaire Collective Fees',
        category: 'Fashion',
        country: 'Europe',
        currency: '€',
        type: 'marketplace',
        feeRate: 0.15, fixedFee: 3.00,
        affiliateTip: { text: "Luxury Auth?", linkText: "Entrupy", url: "#" }
    },
    {
        slug: 'facebook-marketplace-fee-calculator',
        title: 'Facebook Marketplace Fees',
        category: 'Fashion',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.05, fixedFee: 0.00,
        affiliateTip: { text: "Meetup safety?", linkText: "Safety Tips", url: "#" }
    },

    // ============================================================
    // 4. SOCIAL & CREATOR
    // Type: payment_processor (Donation) OR creator_revenue (RPM) OR marketplace (Shop)
    // ============================================================
    {
        slug: 'tiktok-money-calculator',
        title: 'TikTok Money Calculator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'creator_revenue', // RPM Logic
        affiliateTip: { text: "Viral editing?", linkText: "CapCut Pro", url: "#" }
    },
    {
        slug: 'tiktok-shop-fee-calculator-uk',
        title: 'TikTok Shop Fees UK',
        category: 'Social',
        country: 'UK',
        currency: '£',
        type: 'marketplace', // Seller logic
        feeRate: 0.018, fixedFee: 0.00,
        affiliateTip: { text: "Dropshipping?", linkText: "CJ Dropshipping", url: "#" }
    },
    {
        slug: 'tiktok-shop-fee-calculator-usa',
        title: 'TikTok Shop Fees USA',
        category: 'Social',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.02, fixedFee: 0.30,
        affiliateTip: { text: "Influencers?", linkText: "Insense", url: "#" }
    },
    {
        slug: 'whatnot-fee-calculator',
        title: 'Whatnot Fee Calculator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        feeRate: 0.08, fixedFee: 0.30,
        affiliateTip: { text: "Streaming Gear?", linkText: "Ring Light", url: "#" }
    },
    {
        slug: 'twitch-payout-calculator',
        title: 'Twitch Payout Estimator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'creator_revenue', // Dùng logic views/subs
        affiliateTip: { text: "Overlays?", linkText: "Own3d.tv", url: "#" }
    },
    {
        slug: 'patreon-fee-calculator',
        title: 'Patreon Fee Calculator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'payment_processor', // Donation logic
        feeRate: 0.08, fixedFee: 0.30,
        labels: { amount: 'Pledge Amount', result: 'You Keep' },
        affiliateTip: { text: "Manage Subs?", linkText: "Discord", url: "#" }
    },
    {
        slug: 'kofi-fee-calculator',
        title: 'Ko-fi Fee Calculator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'payment_processor', // Donation logic
        feeRate: 0.00, fixedFee: 0.00, // Ko-fi takes 0
        labels: { amount: 'Donation', result: 'You Receive' },
        affiliateTip: { text: "Support?", linkText: "Ko-fi Gold", url: "#" }
    },
    {
        slug: 'gumroad-fee-calculator',
        title: 'Gumroad Fee Calculator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'payment_processor',
        feeRate: 0.10, fixedFee: 0.00,
        labels: { amount: 'Product Price', result: 'Earnings' },
        affiliateTip: { text: "Sell eBooks?", linkText: "Canva Pro", url: "#" }
    },

    // ============================================================
    // 5. LOGISTICS & DUTY
    // Type: logistics_volume / logistics_density
    // ============================================================
    {
        slug: 'freight-class-calculator',
        title: 'Freight Class Calculator (NMFC)',
        category: 'Logistics',
        country: 'USA',
        currency: '',
        type: 'logistics_density', // Tính class
        affiliateTip: { text: "LTL Rates?", linkText: "Freightos", url: "#" }
    },
    {
        slug: 'cbm-calculator',
        title: 'CBM Calculator',
        category: 'Logistics',
        country: 'Global',
        currency: 'm³',
        type: 'logistics_volume',
        affiliateTip: { text: "Sea Freight?", linkText: "Forwarder List", url: "#" }
    },
    {
        slug: 'chargeable-weight-calculator',
        title: 'Chargeable Weight (Air)',
        category: 'Logistics',
        country: 'Global',
        currency: 'kg',
        type: 'logistics_volume',
        affiliateTip: { text: "Air Rates?", linkText: "DHL Express", url: "#" }
    },
    {
        slug: 'volumetric-weight-calculator',
        title: 'Volumetric Weight',
        category: 'Logistics',
        country: 'Global',
        currency: 'kg',
        type: 'logistics_volume',
        affiliateTip: { text: "Courier?", linkText: "FedEx", url: "#" }
    },
    {
        slug: 'import-tax-calculator-australia',
        title: 'Import Tax Australia',
        category: 'Logistics',
        country: 'Australia',
        currency: 'A$',
        type: 'payment_processor', // Tính 10% GST trên giá trị
        feeRate: 0.10, fixedFee: 0.00,
        labels: { amount: 'Goods Value + Shipping', result: 'Total Tax' }, 
        affiliateTip: { text: "Paying Suppliers?", linkText: "Wise Business", url: "#" }
    },
    {
        slug: 'landed-cost-calculator',
        title: 'Landed Cost Calculator',
        category: 'Logistics',
        country: 'Global',
        currency: '$',
        type: 'marketplace', // Dùng form marketplace để cộng tổng chi phí
        feeRate: 0, fixedFee: 0,
        affiliateTip: { text: "Exact Duty?", linkText: "SimplyDuty", url: "#" }
    },
    {
        slug: 'fob-price-calculator',
        title: 'FOB Price Calculator',
        category: 'Logistics',
        country: 'Global',
        currency: '$',
        type: 'marketplace', // Dùng form cộng trừ chi phí
        feeRate: 0, fixedFee: 0,
        affiliateTip: { text: "Incoterms?", linkText: "Chart Download", url: "#" }
    },

    // ============================================================
    // 6. FINANCE, ADS & FREELANCE
    // Type: payment_processor OR comparison OR marketplace (Ads)
    // ============================================================
    {
        slug: 'stripe-fee-calculator',
        title: 'Stripe Fees',
        category: 'Finance',
        country: 'USA',
        currency: '$',
        type: 'payment_processor',
        feeRate: 0.029, fixedFee: 0.30,
        labels: { amount: 'Charge Amount', result: 'Payout' },
        affiliateTip: { text: "SaaS Metrics?", linkText: "Baremetrics", url: "#" }
    },
    {
        slug: 'paypal-fee-calculator',
        title: 'PayPal Fees',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'payment_processor',
        feeRate: 0.0349, fixedFee: 0.49,
        affiliateTip: { text: "Too high?", linkText: "Use Wise", url: "#" }
    },
    {
        slug: 'square-fee-calculator',
        title: 'Square Fee Calculator',
        category: 'Finance',
        country: 'USA',
        currency: '$',
        type: 'payment_processor',
        feeRate: 0.026, fixedFee: 0.10,
        affiliateTip: { text: "Hardware?", linkText: "Square Reader", url: "#" }
    },
    {
        slug: 'wise-vs-paypal-calculator',
        title: 'Wise vs PayPal',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'comparison',
        compare: { 
            nameA: 'PayPal', rateA: 0.045, fixedA: 0.00, 
            nameB: 'Wise', rateB: 0.0065, fixedB: 0.00 
        },
        affiliateTip: { text: "Sending money?", linkText: "Get Free Transfer", url: "#" }
    },
    {
        slug: 'cash-app-fee-calculator',
        title: 'Cash App Fees',
        category: 'Finance',
        country: 'USA',
        currency: '$',
        type: 'payment_processor',
        feeRate: 0.0275, fixedFee: 0.00,
        affiliateTip: { text: "Mobile pay?", linkText: "Cash App", url: "#" }
    },
    {
        slug: 'break-even-roas-calculator',
        title: 'Break Even ROAS',
        category: 'Finance',
        country: 'Global',
        currency: 'x',
        type: 'marketplace', // Dùng form marketplace để tính Margin -> suy ra ROAS
        feeRate: 0, fixedFee: 0,
        affiliateTip: { text: "Spy Ads?", linkText: "FB Ad Library", url: "#" }
    },
    {
        slug: 'dropshipping-profit-calculator',
        title: 'Dropshipping Profit',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'marketplace', // Chuẩn marketplace logic
        feeRate: 0, fixedFee: 0,
        affiliateTip: { text: "Winners?", linkText: "Minea", url: "#" }
    },
    {
        slug: 'upwork-fee-calculator',
        title: 'Upwork Net Pay',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'payment_processor',
        feeRate: 0.10, fixedFee: 0.00,
        labels: { amount: 'Project Fee', result: 'You Earn' },
        affiliateTip: { text: "Withdraw?", linkText: "Payoneer", url: "#" }
    },
    {
        slug: 'fiverr-fee-calculator',
        title: 'Fiverr Fees',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'payment_processor',
        feeRate: 0.20, fixedFee: 0.00,
        labels: { amount: 'Gig Price', result: 'You Earn' },
        affiliateTip: { text: "Pro?", linkText: "Fiverr Pro", url: "#" }
    },
    {
        slug: 'payoneer-fee-calculator',
        title: 'Payoneer Fees',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'payment_processor',
        feeRate: 0.02, fixedFee: 0.00, // ~2% withdrawal
        labels: { amount: 'Withdraw Amount', result: 'Bank Receives' },
        affiliateTip: { text: "Bonus?", linkText: "Sign up $25", url: "#" }
    }
];
