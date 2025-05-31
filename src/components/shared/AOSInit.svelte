<script>
  import { onMount } from 'svelte';
  import AOS from 'aos';

  onMount(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  });
</script>
