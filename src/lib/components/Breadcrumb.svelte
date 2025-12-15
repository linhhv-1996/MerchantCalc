<script lang="ts">
    export let category: string;
    export let title: string;
</script>

<div class="bg-[#fafafa] border-b border-gray-200">
  <div class="max-w-[1000px] mx-auto px-4 py-3 text-[12px] text-gray-500">
    <a href="/" class="hover:text-[#0645ad] hover:underline">Merchant Calculator</a> 
    <span class="mx-1">›</span> 
    <a href="/#directory" class="hover:text-[#0645ad] hover:underline">{category}</a> 
    <span class="mx-1">›</span> 
    <span class="text-gray-900 font-medium">{title}</span>
  </div>
</div>
