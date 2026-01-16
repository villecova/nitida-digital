<script>
  export let projects = [];
  export let initialCount = 4;
  export let colorScheme = null; // 'blue', 'purple', 'yellow' o null

  let visibleCount = initialCount;

  const showMore = () => {
    visibleCount += 4;
  };

  // Obtener las clases del botón según el colorScheme
  $: buttonClasses = (() => {
    const baseClass = "cursor-pointer uppercase inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg focus:outline-none transition-all duration-200";
    
    if (colorScheme === 'blue') {
      return `${baseClass} bg-blue-600 text-white hover:bg-black hover:shadow-xl focus:ring-4 focus:ring-blue-500/50`;
    } else if (colorScheme === 'purple') {
      return `${baseClass} bg-purple-600 text-white hover:bg-black hover:shadow-xl focus:ring-4 focus:ring-purple-500/50`;
    } else if (colorScheme === 'yellow') {
      return `${baseClass} bg-yellow-500 text-white hover:bg-black hover:shadow-xl focus:ring-4 focus:ring-yellow-500/50`;
    } else {
      return `${baseClass} bg-primary text-white hover:bg-black hover:shadow-xl focus:ring-4 focus:ring-primary/50`;
    }
  })();
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
    <button on:click={showMore} class={buttonClasses}>
      Ver más
    </button>
  </div>
{/if}
