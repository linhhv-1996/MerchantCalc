<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<div class="bg-[#111111] min-h-screen flex flex-col font-sans text-[#e5e5e5]">
    <Header />
    <main class="flex-1 w-full max-w-read mx-auto px-4 py-8">
        <slot />
    </main>
    <Footer />
</div>
