<script>
    const currentYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>About Us - Merchant Calculator</title>
    <meta name="description" content="Learn about the mission behind Merchant Calculator - free, privacy-first tools for online sellers." />
</svelte:head>

<div class="max-w-[800px] mx-auto px-5 py-12">
    <h1 class="font-serif text-3xl font-bold text-gray-900 mb-6">About Merchant Calculator</h1>
    
    <div class="prose prose-slate max-w-none text-gray-600">
        <p class="lead text-lg">
            Merchant Calculator was built with a simple mission: <strong>To help online sellers and creators keep more of what they earn.</strong>
        </p>
        
        <p>
            Selling online is complicated. Between platform fees, payment processing charges, shipping costs, and taxes, it's hard to know your true profit margin. Existing tools were often outdated, full of aggressive ads, or required monthly subscriptions just to do basic math.
        </p>

        <h3 class="text-gray-800 font-bold mt-8 mb-3 text-xl">Our Philosophy</h3>
        <ul class="list-disc pl-5 space-y-2">
            <li><strong>Privacy First:</strong> We believe your financial data belongs to you. That's why all our calculators run 100% in your browser ("client-side"). We do not store, record, or see your sales figures.</li>
            <li><strong>Always Free:</strong> Essential business tools should be accessible to everyone, from side-hustlers to power sellers.</li>
            <li><strong>Accuracy Matters:</strong> We constantly monitor fee updates from eBay, Etsy, Amazon, and PayPal to ensure our algorithms are up to date for {currentYear}.</li>
        </ul>

        <h3 class="text-gray-800 font-bold mt-8 mb-3 text-xl">Who We Are</h3>
        <p>
            We are a small team of developers and e-commerce enthusiasts. We built these tools because we needed them for our own businesses, and we decided to share them with the community.
        </p>
    </div>
</div>
