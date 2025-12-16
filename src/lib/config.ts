// src/lib/config.ts

// ==========================================
// 1. DEFINITIONS (CORE LOGIC)
// ==========================================

export type FeeType = 'fixed' | 'percent' | 'tiered_progressive' | 'tiered_flat';

export interface FeeCondition {
    minPrice?: number; // Chỉ áp dụng nếu giá >= mức này
    maxPrice?: number; // Chỉ áp dụng nếu giá < mức này
}

export interface FeeTier {
    upto: number;   // Ngưỡng giá (Infinity cho mức cuối)
    rate: number;   // % áp dụng cho khoảng này
    fixed?: number; // Phí cố định cho khoảng này (nếu có)
}

export interface FeeRule {
    name: string;
    type: FeeType;
    value?: number;     // Dùng cho 'fixed' hoặc 'percent' đơn giản
    tiers?: FeeTier[];  // Dùng cho 'tiered_progressive'
    condition?: FeeCondition;
    cap?: number;       // Mức phí tối đa (Max Fee Cap)
    min?: number;       // Mức phí tối thiểu (Min Fee)
    isOptional?: boolean; // User có thể tick chọn
    hidden?: boolean;   // Dùng cho các phí ẩn hoặc đã gộp
    description?: string; // Tooltip giải thích phí
}

export interface Category {
    name: string;
    rules: FeeRule[];
}

export interface ToolConfig {
    slug: string;
    title: string;
    category: 'Marketplace' | 'Handmade' | 'Fashion' | 'Social' | 'Logistics' | 'Finance' | 'E-commerce';
    country: string;
    currency: string;
    type: 'marketplace' | 'payment_processor' | 'logistics_volume' | 'logistics_density' | 'creator_revenue' | 'comparison' | 'calculator'; 
    
    // --- NEW FEE STRUCTURE ---
    globalFees?: FeeRule[];  
    categories?: Category[]; 
    vatOnFeeRate?: number;   

    // --- SETTINGS ---
    hasAdInput?: boolean;    
    hasTaxInput?: boolean;   
    hasCostInput?: boolean;  
    hasShippingInput?: boolean; 
    
    // --- LEGACY/HELPER ---
    labels?: { amount?: string; result?: string; cost?: string; };
    compare?: { nameA: string; rateA: number; fixedA: number; nameB: string; rateB: number; fixedB: number; };
    affiliateTip?: { text: string; linkText: string; url: string; };
}

// ==========================================
// 2. TOOLS DATA (FULL MERGED VERSION)
// ==========================================

export const tools: ToolConfig[] = [
    
    // ============================================================
    // GROUP 1: MAJOR MARKETPLACES (eBay, Amazon, Walmart)
    // ============================================================
    {
        slug: 'ebay-fee-calculator-usa',
        title: 'eBay Fee Calculator USA (2025)',
        category: 'Marketplace',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        hasShippingInput: true,
        globalFees: [
            { name: 'Regulatory Operating Fee', type: 'fixed', value: 0.30 },
            { name: 'International Fee', type: 'percent', value: 0.0165, isOptional: true }
        ],
        categories: [
            {
                name: 'Most Categories (Standard)',
                rules: [{ name: 'Final Value Fee', type: 'tiered_progressive', tiers: [{ upto: 7500, rate: 0.1325 }, { upto: Infinity, rate: 0.0235 }] }]
            },
            {
                name: 'Sneakers > $150',
                rules: [
                    { name: 'Final Value Fee', type: 'percent', value: 0.08 },
                    { name: 'Insertion Fee', type: 'fixed', value: 0, hidden: true }
                ]
            },
            {
                name: 'Watches, Parts & Accessories',
                rules: [{ name: 'Final Value Fee', type: 'tiered_progressive', tiers: [{ upto: 1000, rate: 0.15 }, { upto: 7500, rate: 0.065 }, { upto: Infinity, rate: 0.03 }] }]
            },
            {
                name: 'Consumer Electronics',
                rules: [{ name: 'Final Value Fee', type: 'tiered_progressive', tiers: [{ upto: 7500, rate: 0.09 }, { upto: Infinity, rate: 0.0235 }] }]
            }
        ],
        affiliateTip: { text: "Giảm phí ship eBay?", linkText: "Dùng thử ShipStation", url: "#" }
    },
    {
        slug: 'ebay-fee-calculator-uk',
        title: 'eBay Fee Calculator UK',
        category: 'Marketplace',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        vatOnFeeRate: 0.20, 
        globalFees: [
            { name: 'Regulatory Operating Fee', type: 'fixed', value: 0.30 },
            { name: 'International Fee', type: 'percent', value: 0.0126, isOptional: true }
        ],
        categories: [
            { name: 'Most Categories', rules: [{ name: 'Final Value Fee', type: 'percent', value: 0.128 }] },
            { name: 'Sneakers > £100', rules: [{ name: 'Final Value Fee', type: 'percent', value: 0.08 }] },
            { name: 'Jewellery & Watches', rules: [{ name: 'Final Value Fee', type: 'percent', value: 0.149 }] },
            { name: 'Computers/Tablets', rules: [{ name: 'Final Value Fee', type: 'percent', value: 0.069 }] }
        ],
        affiliateTip: { text: "Nhận tiền từ UK?", linkText: "Mở tài khoản Wise", url: "#" }
    },
    {
        slug: 'ebay-fee-calculator-australia',
        title: 'eBay Fee Calculator Australia',
        category: 'Marketplace',
        country: 'Australia',
        currency: 'A$',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        globalFees: [
            { name: 'Fixed Fee', type: 'fixed', value: 0.30 }
        ],
        categories: [
             { name: 'Most Categories', rules: [{ name: 'Final Value Fee', type: 'tiered_progressive', tiers: [{ upto: 4000, rate: 0.135 }, { upto: Infinity, rate: 0.025 }] }] },
             { name: 'Tech & Electronics', rules: [{ name: 'Final Value Fee', type: 'percent', value: 0.095 }] }
        ],
        affiliateTip: { text: "Importing goods?", linkText: "Check Import Tax", url: "#" }
    },
    {
        slug: 'ebay-fee-calculator-canada',
        title: 'eBay Fee Calculator Canada',
        category: 'Marketplace',
        country: 'Canada',
        currency: 'C$',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        globalFees: [
            { name: 'Fixed Fee', type: 'fixed', value: 0.30 }
        ],
        categories: [
            { name: 'Most Categories', rules: [{ name: 'Final Value Fee', type: 'tiered_progressive', tiers: [{ upto: 7500, rate: 0.129 }, { upto: Infinity, rate: 0.0235 }] }] }
        ],
        affiliateTip: { text: "Cross-border fees?", linkText: "Wise Business", url: "#" }
    },
    {
        slug: 'amazon-fba-calculator-usa',
        title: 'Amazon FBA Profit Calculator (USA)',
        category: 'Marketplace',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        globalFees: [
             { name: 'FBA Closing Fee', type: 'fixed', value: 0.00, isOptional: true },
             { name: 'Storage Fee (Est)', type: 'fixed', value: 0.00, isOptional: true }
        ],
        categories: [
            { name: 'Most Categories (Standard)', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.15, min: 0.30 }] },
            { name: 'Clothing & Accessories', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.17, min: 0.30 }] },
            { name: 'Consumer Electronics', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.08, min: 0.30 }] }
        ],
        affiliateTip: { text: "Tìm ngách Amazon?", linkText: "Helium10 Discount", url: "#" }
    },
    {
        slug: 'amazon-fba-calculator-uk',
        title: 'Amazon FBA Calculator UK',
        category: 'Marketplace',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        vatOnFeeRate: 0.20,
        hasAdInput: true,
        categories: [
             { name: 'Most Categories', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.153 }] },
             { name: 'Consumer Electronics', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.0714 }] }
        ],
        affiliateTip: { text: "Sourcing from China?", linkText: "Alibaba Guide", url: "#" }
    },
    {
        slug: 'amazon-referral-fee-calculator',
        title: 'Amazon Referral Fee Estimator',
        category: 'Marketplace',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        globalFees: [
             { name: 'Referral Fee (Avg)', type: 'percent', value: 0.15 }
        ],
        affiliateTip: { text: "Boost sales?", linkText: "Amazon PPC Tool", url: "#" }
    },
    {
        slug: 'walmart-marketplace-calculator',
        title: 'Walmart Marketplace ROI',
        category: 'Marketplace',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        globalFees: [],
        categories: [
             { name: 'Apparel & Accessories', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.15 }] },
             { name: 'Electronics', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.08 }] },
             { name: 'Home & Garden', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.15 }] },
             { name: 'Jewelry', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.20 }] }
        ],
        affiliateTip: { text: "Fulfillment cho Walmart?", linkText: "Deliverr", url: "#" }
    },

    // ============================================================
    // GROUP 2: SHOPIFY & E-COMMERCE
    // ============================================================
    {
        slug: 'shopify-fee-calculator',
        title: 'Shopify Profit Calculator',
        category: 'E-commerce',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        hasShippingInput: true,
        globalFees: [
            { name: 'Fixed Trans Fee', type: 'fixed', value: 0.30 } 
        ],
        categories: [
            { 
                name: 'Basic Shopify Plan', 
                rules: [
                    { name: 'Credit Card Rate', type: 'percent', value: 0.029, description: "2.9% + 30¢ online" },
                    { name: '3rd Party Payment Fee', type: 'percent', value: 0.02, isOptional: true, description: "Nếu không dùng Shopify Payments (2%)" }
                ] 
            },
            { 
                name: 'Shopify Plan', 
                rules: [
                    { name: 'Credit Card Rate', type: 'percent', value: 0.026, description: "2.6% + 30¢ online" },
                    { name: '3rd Party Payment Fee', type: 'percent', value: 0.01, isOptional: true, description: "Nếu không dùng Shopify Payments (1%)" }
                ] 
            },
            { 
                name: 'Advanced Shopify', 
                rules: [
                    { name: 'Credit Card Rate', type: 'percent', value: 0.024, description: "2.4% + 30¢ online" },
                    { name: '3rd Party Payment Fee', type: 'percent', value: 0.005, isOptional: true, description: "Nếu không dùng Shopify Payments (0.5%)" }
                ] 
            }
        ],
        affiliateTip: { text: "Theme Shopify đẹp?", linkText: "Themeforest", url: "#" }
    },
    {
        slug: 'woocommerce-stripe-calculator',
        title: 'WooCommerce (Stripe/PayPal)',
        category: 'E-commerce',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        categories: [
            { name: 'Stripe Payment', rules: [{ name: 'Processing', type: 'percent', value: 0.029 }, { name: 'Fixed', type: 'fixed', value: 0.30 }] },
            { name: 'PayPal Standard', rules: [{ name: 'Processing', type: 'percent', value: 0.0349 }, { name: 'Fixed', type: 'fixed', value: 0.49 }] }
        ]
    },

    // ============================================================
    // GROUP 3: HANDMADE & ETSY
    // ============================================================
    {
        slug: 'etsy-profit-calculator',
        title: 'Etsy Profit Calculator (Global)',
        category: 'Handmade',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        globalFees: [
            { name: 'Listing Fee ($0.20)', type: 'fixed', value: 0.20 },
            { name: 'Transaction Fee', type: 'percent', value: 0.065 },
            { name: 'Payment Proc. (Est)', type: 'percent', value: 0.03 },
            { name: 'Payment Fixed (Est)', type: 'fixed', value: 0.25 }
        ],
        affiliateTip: { text: "Print on Demand?", linkText: "Printful", url: "#" }
    },
    {
        slug: 'etsy-fee-calculator-usa',
        title: 'Etsy Fee Calculator USA',
        category: 'Handmade',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        globalFees: [
            { name: 'Listing Fee', type: 'fixed', value: 0.20 },
            { name: 'Transaction Fee', type: 'percent', value: 0.065 },
            { name: 'Payment Processing', type: 'percent', value: 0.03 },
            { name: 'Payment Fixed', type: 'fixed', value: 0.25 },
            { name: 'Offsite Ads', type: 'percent', value: 0.15, isOptional: true }
        ],
        affiliateTip: { text: "Nguyên liệu giá sỉ?", linkText: "Alibaba", url: "#" }
    },
    {
        slug: 'etsy-fee-calculator-uk',
        title: 'Etsy Fee Calculator UK',
        category: 'Handmade',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        vatOnFeeRate: 0.20,
        globalFees: [
            { name: 'Listing Fee ($0.20)', type: 'fixed', value: 0.16 }, // Approx GBP
            { name: 'Transaction Fee', type: 'percent', value: 0.065 },
            { name: 'Payment Processing', type: 'percent', value: 0.04 },
            { name: 'Payment Fixed', type: 'fixed', value: 0.20 },
            { name: 'Regulatory Operating Fee', type: 'percent', value: 0.0032 }
        ],
        affiliateTip: { text: "Craft supplies?", linkText: "AliExpress Bulk", url: "#" }
    },
    {
        slug: 'etsy-fee-calculator-australia',
        title: 'Etsy Fee Calculator Australia',
        category: 'Handmade',
        country: 'Australia',
        currency: 'A$',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        globalFees: [
            { name: 'Listing Fee (USD Converted)', type: 'fixed', value: 0.30 },
            { name: 'Transaction Fee', type: 'percent', value: 0.065 },
            { name: 'Payment Processing', type: 'percent', value: 0.03 },
            { name: 'Payment Fixed', type: 'fixed', value: 0.25 }
        ],
        affiliateTip: { text: "Better photos?", linkText: "PhotoRoom AI", url: "#" }
    },
    {
        slug: 'etsy-fee-calculator-canada',
        title: 'Etsy Fee Calculator Canada',
        category: 'Handmade',
        country: 'Canada',
        currency: 'C$',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        globalFees: [
            { name: 'Listing Fee (USD Converted)', type: 'fixed', value: 0.27 },
            { name: 'Transaction Fee', type: 'percent', value: 0.065 },
            { name: 'Payment Processing', type: 'percent', value: 0.03 },
            { name: 'Payment Fixed', type: 'fixed', value: 0.25 },
            { name: 'Regulatory Operating Fee', type: 'percent', value: 0.0115 }
        ],
        affiliateTip: { text: "Shipping to US?", linkText: "Chit Chats", url: "#" }
    },
    {
        slug: 'etsy-pricing-calculator',
        title: 'Etsy Pricing Strategy Tool',
        category: 'Handmade',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        globalFees: [
             { name: 'Total Estimated Fees', type: 'percent', value: 0.13 }
        ],
        affiliateTip: { text: "SEO Keyword Tool?", linkText: "eRank", url: "#" }
    },

    // ============================================================
    // GROUP 4: FASHION & RESELL (RESTORED ALL)
    // ============================================================
    {
        slug: 'poshmark-fee-calculator',
        title: 'Poshmark Fee Calculator',
        category: 'Fashion',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        globalFees: [
            { name: 'Flat Fee (Sales < $15)', type: 'fixed', value: 2.95, condition: { maxPrice: 15 } },
            { name: 'Commission (Sales >= $15)', type: 'percent', value: 0.20, condition: { minPrice: 15 } }
        ],
        affiliateTip: { text: "Tool share tự động?", linkText: "PosherVA", url: "#" }
    },
    {
        slug: 'vinted-fee-calculator-uk',
        title: 'Vinted Fee Calculator UK',
        category: 'Fashion',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        globalFees: [
            { name: 'Seller Fee', type: 'percent', value: 0.00 } 
        ],
        affiliateTip: { text: "Packaging?", linkText: "Eco Mailers", url: "#" }
    },
    {
        slug: 'depop-fee-calculator-uk',
        title: 'Depop Fee Calculator UK',
        category: 'Fashion',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        globalFees: [
            { name: 'Selling Fee (New)', type: 'percent', value: 0.00, description: "Đã bỏ phí bán hàng 10%" },
            { name: 'Processing Fee', type: 'percent', value: 0.029 },
            { name: 'Fixed Fee', type: 'fixed', value: 0.30 }
        ],
        affiliateTip: { text: "Cross-listing tool?", linkText: "Vendoo", url: "#" }
    },
    {
        slug: 'depop-fee-calculator-us',
        title: 'Depop Calculator (US)',
        category: 'Fashion',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        globalFees: [
            { name: 'Depop Fee', type: 'percent', value: 0.10 },
            { name: 'Payment Processing', type: 'percent', value: 0.033 },
            { name: 'Fixed Fee', type: 'fixed', value: 0.45 }
        ]
    },
    {
        slug: 'mercari-fee-calculator',
        title: 'Mercari Profit (0% Seller Fee)',
        category: 'Fashion',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        globalFees: [
            { name: 'Selling Fee', type: 'percent', value: 0.00 },
            { name: 'Withdrawal Fee', type: 'fixed', value: 2.00 }
        ],
        affiliateTip: { text: "Need boxes?", linkText: "USPS Free Supplies", url: "#" }
    },
    {
        slug: 'grailed-fee-calculator',
        title: 'Grailed Fee Calculator',
        category: 'Fashion',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        globalFees: [
            { name: 'Commission', type: 'percent', value: 0.09 },
            { name: 'Payment Processing', type: 'percent', value: 0.0349 }, 
            { name: 'Fixed Fee', type: 'fixed', value: 0.49 }
        ]
    },
    {
        slug: 'stockx-fee-calculator',
        title: 'StockX Seller Payout',
        category: 'Fashion',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        globalFees: [
            { name: 'Payment Proc.', type: 'percent', value: 0.03 }
        ],
        categories: [
            { name: 'Level 1 Seller (9.5%)', rules: [{ name: 'Transaction Fee', type: 'percent', value: 0.095 }] },
            { name: 'Level 2 Seller (9.0%)', rules: [{ name: 'Transaction Fee', type: 'percent', value: 0.09 }] },
            { name: 'Level 3 Seller (8.5%)', rules: [{ name: 'Transaction Fee', type: 'percent', value: 0.085 }] },
            { name: 'Level 4 Seller (8.0%)', rules: [{ name: 'Transaction Fee', type: 'percent', value: 0.08 }] }
        ],
        affiliateTip: { text: "Sneaker Group?", linkText: "Discord Cook Group", url: "#" }
    },
    {
        slug: 'goat-fee-calculator',
        title: 'GOAT Fee Calculator',
        category: 'Fashion',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        globalFees: [
             { name: 'Seller Fee', type: 'fixed', value: 5.00 },
             { name: 'Cash Out Fee', type: 'percent', value: 0.029 }
        ],
        categories: [
            { name: 'Good Rating (9.5%)', rules: [{ name: 'Commission', type: 'percent', value: 0.095 }] },
            { name: 'Rating < 90 (15%)', rules: [{ name: 'Commission', type: 'percent', value: 0.15 }] },
            { name: 'Rating > 100 (Min)', rules: [{ name: 'Commission', type: 'percent', value: 0.095 }] }
        ]
    },
    {
        slug: 'vestiaire-collective-fee-calculator',
        title: 'Vestiaire Collective Fees',
        category: 'Fashion',
        country: 'Europe',
        currency: '€',
        type: 'marketplace',
        globalFees: [
             { name: 'Selling Fee (Avg 15%)', type: 'percent', value: 0.15 },
             { name: 'Payment Proc.', type: 'percent', value: 0.03 }
        ],
        affiliateTip: { text: "Luxury Auth?", linkText: "Entrupy", url: "#" }
    },
    {
        slug: 'facebook-marketplace-fee-calculator',
        title: 'Facebook Marketplace Fees',
        category: 'Fashion',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        globalFees: [
             { name: 'Selling Fee', type: 'percent', value: 0.05 } 
        ],
        affiliateTip: { text: "Meetup safety?", linkText: "Safety Tips", url: "#" }
    },

    // ============================================================
    // GROUP 5: SOCIAL & CREATOR (RESTORED ALL)
    // ============================================================
    {
        slug: 'tiktok-shop-fee-calculator-usa',
        title: 'TikTok Shop Fee USA (2025)',
        category: 'Social',
        country: 'USA',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        hasTaxInput: true,
        globalFees: [
            { name: 'Transaction Fee', type: 'percent', value: 0.029 },
            { name: 'Fixed Fee', type: 'fixed', value: 0.30 }
        ],
        categories: [
            { name: 'Standard (Base 6%)', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.06 }] },
            { name: 'Future Rate (8%)', rules: [{ name: 'Referral Fee', type: 'percent', value: 0.08 }] }
        ],
        affiliateTip: { text: "Quay video bán hàng?", linkText: "CapCut Pro", url: "#" }
    },
    {
        slug: 'tiktok-shop-fee-calculator-uk',
        title: 'TikTok Shop Fee UK',
        category: 'Social',
        country: 'UK',
        currency: '£',
        type: 'marketplace',
        vatOnFeeRate: 0.20,
        globalFees: [
            { name: 'Commission Fee', type: 'percent', value: 0.05 }, 
            { name: 'Standard Fee', type: 'percent', value: 0.09, isOptional: true }
        ],
        affiliateTip: { text: "Nguồn hàng Dropship?", linkText: "CJ Dropshipping", url: "#" }
    },
    {
        slug: 'tiktok-shop-fee-calculator-vn',
        title: 'TikTok Shop Fee Vietnam',
        category: 'Social',
        country: 'Vietnam',
        currency: '₫',
        type: 'marketplace',
        hasAdInput: true,
        hasShippingInput: true,
        globalFees: [
            { name: 'Phí sàn (Platform)', type: 'percent', value: 0.04 },
            { name: 'Phí cố định', type: 'percent', value: 0.0, hidden: true },
        ],
        categories: [
            { name: 'Mặc định (Mall)', rules: [{ name: 'Phí Mall', type: 'percent', value: 0.0 }] },
            { name: 'Livestream FST', rules: [{ name: 'Voucher FST', type: 'percent', value: 0.03, isOptional: true }] }
        ]
    },
    {
        slug: 'tiktok-money-calculator',
        title: 'TikTok Money Calculator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'creator_revenue',
        affiliateTip: { text: "Viral editing?", linkText: "CapCut Pro", url: "#" }
    },
    {
        slug: 'whatnot-fee-calculator',
        title: 'Whatnot Fee Calculator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        globalFees: [
            { name: 'Commission', type: 'percent', value: 0.08 },
            { name: 'Processing Fee', type: 'percent', value: 0.029 },
            { name: 'Fixed Fee', type: 'fixed', value: 0.30 }
        ],
        affiliateTip: { text: "Streaming Gear?", linkText: "Ring Light", url: "#" }
    },
    {
        slug: 'twitch-payout-calculator',
        title: 'Twitch Payout Estimator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'creator_revenue', 
        affiliateTip: { text: "Overlays?", linkText: "Own3d.tv", url: "#" }
    },
    {
        slug: 'patreon-fee-calculator',
        title: 'Patreon Fee Calculator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'payment_processor', 
        globalFees: [
            { name: 'Platform Fee (Pro)', type: 'percent', value: 0.08 },
            { name: 'Processing Fee', type: 'percent', value: 0.029 },
            { name: 'Fixed Fee', type: 'fixed', value: 0.30 }
        ],
        labels: { amount: 'Pledge Amount', result: 'You Keep' }
    },
    {
        slug: 'kofi-fee-calculator',
        title: 'Ko-fi Fee Calculator',
        category: 'Social',
        country: 'Global',
        currency: '$',
        type: 'payment_processor', 
        globalFees: [
             { name: 'Platform Fee', type: 'percent', value: 0.00 },
             { name: 'PayPal Proc.', type: 'percent', value: 0.0349 },
             { name: 'Fixed Fee', type: 'fixed', value: 0.49 }
        ],
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
        globalFees: [
            { name: 'Platform Fee', type: 'percent', value: 0.10 }
        ],
        labels: { amount: 'Product Price', result: 'Earnings' },
        affiliateTip: { text: "Sell eBooks?", linkText: "Canva Pro", url: "#" }
    },

    // ============================================================
    // GROUP 6: LOGISTICS & DUTY (RESTORED ALL)
    // ============================================================
    {
        slug: 'freight-class-calculator',
        title: 'Freight Class Calculator (NMFC)',
        category: 'Logistics',
        country: 'USA',
        currency: '',
        type: 'logistics_density', 
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
        type: 'payment_processor', 
        globalFees: [
             { name: 'GST', type: 'percent', value: 0.10 }
        ],
        labels: { amount: 'Goods Value + Shipping', result: 'Tax Amount' }, 
        affiliateTip: { text: "Paying Suppliers?", linkText: "Wise Business", url: "#" }
    },
    {
        slug: 'landed-cost-calculator',
        title: 'Landed Cost Calculator',
        category: 'Logistics',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        globalFees: [],
        affiliateTip: { text: "Exact Duty?", linkText: "SimplyDuty", url: "#" }
    },
    {
        slug: 'fob-price-calculator',
        title: 'FOB Price Calculator',
        category: 'Logistics',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        globalFees: [],
        affiliateTip: { text: "Incoterms?", linkText: "Chart Download", url: "#" }
    },

    // ============================================================
    // GROUP 7: FINANCE & FREELANCE (RESTORED ALL)
    // ============================================================
    {
        slug: 'paypal-fee-calculator',
        title: 'PayPal Fees Calculator',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'payment_processor',
        categories: [
            { name: 'Domestic (US)', rules: [{ name: 'Rate', type: 'percent', value: 0.0349 }, { name: 'Fixed', type: 'fixed', value: 0.49 }] },
            { name: 'International', rules: [{ name: 'Rate', type: 'percent', value: 0.05 }, { name: 'Fixed', type: 'fixed', value: 0.49 }] }
        ],
        labels: { amount: 'Transaction Amount', result: 'You Receive' }
    },
    {
        slug: 'stripe-fee-calculator',
        title: 'Stripe Fee Calculator',
        category: 'Finance',
        country: 'USA',
        currency: '$',
        type: 'payment_processor',
        globalFees: [
            { name: 'Card Processing', type: 'percent', value: 0.029 },
            { name: 'Fixed Fee', type: 'fixed', value: 0.30 }
        ],
        labels: { amount: 'Invoice Amount', result: 'Payout' },
        affiliateTip: { text: "Quản lý tài chính SaaS?", linkText: "Baremetrics", url: "#" }
    },
    {
        slug: 'square-fee-calculator',
        title: 'Square Fee Calculator',
        category: 'Finance',
        country: 'USA',
        currency: '$',
        type: 'payment_processor',
        globalFees: [
            { name: 'Processing Fee', type: 'percent', value: 0.026 },
            { name: 'Fixed Fee', type: 'fixed', value: 0.10 }
        ],
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
        globalFees: [
             { name: 'Business Trans.', type: 'percent', value: 0.0275 }
        ],
        affiliateTip: { text: "Mobile pay?", linkText: "Cash App", url: "#" }
    },
    {
        slug: 'upwork-fee-calculator',
        title: 'Upwork Net Pay',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'payment_processor',
        globalFees: [
            { name: 'Service Fee', type: 'percent', value: 0.10 } // 10% Flat
        ],
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
        globalFees: [
            { name: 'Service Fee', type: 'percent', value: 0.20 }
        ],
        labels: { amount: 'Gig Price', result: 'You Keep' }
    },
    {
        slug: 'payoneer-fee-calculator',
        title: 'Payoneer Fees',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'payment_processor',
        globalFees: [
            { name: 'Withdraw Fee (Max)', type: 'percent', value: 0.02 }
        ],
        labels: { amount: 'Withdraw Amount', result: 'Bank Receives' }
    },
    {
        slug: 'wise-fee-calculator',
        title: 'Wise Transfer Calculator',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'payment_processor',
        globalFees: [
            { name: 'Variable Fee', type: 'percent', value: 0.0045 },
            { name: 'Fixed Fee', type: 'fixed', value: 0.50 }
        ],
        labels: { amount: 'Send Amount', result: 'Recipient Gets' }
    },

    // ============================================================
    // GROUP 8: UTILITY & METRICS (NEW)
    // ============================================================
    {
        slug: 'roas-break-even-calculator',
        title: 'Break-Even ROAS Calculator',
        category: 'Finance',
        country: 'Global',
        currency: 'x',
        type: 'calculator',
        hasCostInput: true,
        hasAdInput: false, 
        globalFees: [], 
        labels: { amount: 'Selling Price', cost: 'COGS + Fees', result: 'Min ROAS to Profit' },
        affiliateTip: { text: "Theo dõi Ads lãi lỗ?", linkText: "TripleWhale", url: "#" }
    },
    {
        slug: 'cpm-cost-calculator',
        title: 'CPM Marketing Calculator',
        category: 'Finance',
        country: 'Global',
        currency: '$',
        type: 'calculator',
        globalFees: [],
        labels: { amount: 'Total Ad Spend', result: 'CPM Cost' }
    },
    {
        slug: 'dropshipping-profit-calculator',
        title: 'Dropshipping Profit Estimator',
        category: 'E-commerce',
        country: 'Global',
        currency: '$',
        type: 'marketplace',
        hasAdInput: true,
        hasShippingInput: true,
        hasCostInput: true,
        globalFees: [
             { name: 'Payment Gateway', type: 'percent', value: 0.029 },
             { name: 'Fixed Trans', type: 'fixed', value: 0.30 }
        ],
        affiliateTip: { text: "Tìm Winning Product?", linkText: "Minea Spy Tool", url: "#" }
    }
];
