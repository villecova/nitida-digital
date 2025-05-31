<script>
    export let images = [];
    let selectedImage = images[0];
  </script>
  
  <div class="flex flex-col md:flex-row gap-4 h-[70vh] max-h-[70vh]">
    <!-- Imagen principal -->
    <div class="flex-1 overflow-hidden rounded-xl shadow-lg">
      <img
        src={selectedImage}
        alt="Imagen grande"
        class="w-full h-full object-cover"
      />
    </div>
  
    <!-- Miniaturas (solo si hay más de una imagen) -->
    {#if images.length > 1}
      <div class="flex md:flex-col gap-4 md:w-[120px] overflow-y-auto">
        {#each images as img}
        <button
          type="button"
          class="w-[100px] h-[100px] md:w-full md:h-auto aspect-square overflow-hidden rounded-xl shadow-lg p-0 border-0"
          on:click={() => selectedImage = img}
        >
          <img
            src={img}
            alt="Miniatura"
            class="w-full h-full object-cover cursor-pointer hover:opacity-50 transition"
          />
        </button>
      {/each}
      
      </div>
    {/if}
  </div>
  