<script>
  import { onMount } from 'svelte';
  import lottie from 'lottie-web';

  export let src;
  let container;

  onMount(() => {
    if (!src || !container) return;
    lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: src,
    });
  });
</script>

<div bind:this={container} class="md:size-24 p-4 rounded-full bg-purple-200 flex items-center justify-center text-2xl" />
