<script>
  export let projects = [];
  export let initialCount = 4;

  let visibleCount = initialCount;

  const showMore = () => {
    visibleCount += 4;
  };
</script>

<div class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
  {#each projects.slice(0, visibleCount) as project}
    <a 
      href={`/works/${project.slug}`} 
      class="block overflow-hidden transition "
    >
      <img
        class="w-full h-72 object-cover rounded-xl shadow-lg"
        src={project.gallery?.[0] || '/placeholder.jpg'}
        alt={project.title}
        loading="lazy"
      />
      <div class="flex flex-row mt-4 items-center place-content-between px-4">
        <p>{project.title}</p>
        <div class="border text-primary border-secondary px-4 rounded-xl">
          →
        </div>
      </div>
    </a>
  {/each}
</div>

{#if visibleCount < projects.length}
  <div class="text-center mt-6">
    <button on:click={showMore} class="mt-8 uppercase px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:shadow-xl transition">
      Ver más
    </button>
  </div>
{/if}
