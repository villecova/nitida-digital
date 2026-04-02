<script>
  import { onMount } from 'svelte';

  export let target = 0;
  export let suffix = '';
  export let duration = 2000; // ms
  export let delay = 0;

  let count = 0;
  let isVisible = false;

  onMount(() => {
    // Delay antes de empezar la animación
    setTimeout(() => {
      isVisible = true;
      animate();
    }, delay);
  });

  function animate() {
    const startTime = Date.now();
    const startValue = 0;
    const endValue = target;

    function update() {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      count = Math.floor(startValue + (endValue - startValue) * easeOut);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        count = endValue;
      }
    }

    requestAnimationFrame(update);
  }
</script>

<span class="inline-block">
  {count}{suffix}
</span>
