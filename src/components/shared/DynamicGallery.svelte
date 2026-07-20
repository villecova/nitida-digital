<script>
  export let images = [];
</script>

{#if images.length > 0}
  <div class="grid gap-4 {images.length > 1 ? 'sm:grid-cols-2' : ''}">
    {#each images as img, i}
      <figure
        class="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm {images.length === 3 && i === 0 ? 'sm:col-span-2' : ''}"
      >
        <img
          src={img}
          alt={`Captura ${i + 1} del proyecto`}
          class="h-auto w-full object-cover object-top"
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      </figure>
    {/each}
  </div>
{/if}
