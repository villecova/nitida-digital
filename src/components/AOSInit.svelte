<script>
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import { onMount } from 'svelte';

  onMount(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  });
</script>
