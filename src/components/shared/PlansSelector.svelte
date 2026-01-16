<script>
  import { onMount } from 'svelte';
  import PricingCard from './PricingCard.svelte';

  export let selectedService = 'web';

  let currentService = selectedService;

  const services = {
    web: {
      name: 'Web Design',
      colorScheme: 'blue',
      title: 'Planes de Web Design',
      subtitle: 'Explora las opciones y elige el paquete que mejor se adapta a tu proyecto de sitio web.',
      plans: [
        {
          title: 'Plan Básico',
          subtitle: 'Sitio web profesional y funcional',
          description: 'Perfecto para negocios que necesitan una presencia online clara y profesional.',
          features: [
            'Hasta 5 secciones (Inicio, Nosotros, Servicios, Contacto, etc.)',
            'Diseño responsive (móvil, tablet, desktop)',
            'Formulario de contacto',
            'Optimización SEO básica',
            'Hosting y dominio (primer año)',
            'Capacitación para actualizar contenido'
          ],
          buttonText: 'COTIZAR PLAN',
          link: 'mailto:nitidacrea@gmail.com?subject=Informaci%C3%B3n%20sobre%20el%20Plan%20B%C3%A1sico%20Web&body=Hola%2C%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20Plan%20B%C3%A1sico%20de%20Web%20Design.%20Gracias.'
        },
        {
          title: 'Plan Profesional',
          subtitle: 'Sitio web optimizado para conversión',
          description: 'Para negocios que buscan generar leads y convertir visitantes en clientes.',
          features: [
            'Todo lo del Plan Básico',
            'Hasta 8 secciones',
            'Integración con Google Analytics',
            'Optimización SEO avanzada',
            'Blog o noticias (hasta 10 posts iniciales)',
            'Integración con redes sociales',
            'Formularios avanzados y CRM básico'
          ],
          buttonText: 'COTIZAR PLAN',
          link: 'mailto:nitidacrea@gmail.com?subject=Informaci%C3%B3n%20sobre%20el%20Plan%20Profesional%20Web&body=Hola%2C%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20Plan%20Profesional%20de%20Web%20Design.%20Gracias.'
        },
        {
          title: 'Plan Avanzado',
          subtitle: 'Sitio web completo y personalizado',
          description: 'Solución completa para empresas que necesitan un sitio web robusto y escalable.',
          features: [
            'Todo lo del Plan Profesional',
            'Secciones ilimitadas',
            'E-commerce básico (hasta 20 productos)',
            'Panel de administración personalizado',
            'Integración con sistemas de pago',
            'Soporte técnico prioritario',
            'Plan de mantenimiento incluido (3 meses)'
          ],
          buttonText: 'COTIZAR PLAN',
          link: 'mailto:nitidacrea@gmail.com?subject=Informaci%C3%B3n%20sobre%20el%20Plan%20Avanzado%20Web&body=Hola%2C%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20Plan%20Avanzado%20de%20Web%20Design.%20Gracias.'
        }
      ]
    },
    branding: {
      name: 'Branding',
      colorScheme: 'purple',
      title: 'Planes de Branding',
      subtitle: 'Explora las opciones y elige el paquete que mejor se adapta a tu proyecto de identidad visual.',
      plans: [
        {
          title: 'Plan Emprendedor',
          subtitle: 'Identidad sencilla pero sólida',
          description: 'Perfecto para emprendedores que quieren proyectar una imagen profesional y coherente desde el primer día.',
          features: [
            'Logotipo (3 propuestas, 3 rondas de cambios)',
            'Paleta de colores',
            'Archivos editables listos para impresión o uso digital',
            'Optimización de perfil de Instagram'
          ],
          buttonText: 'COTIZAR PLAN',
          link: 'mailto:nitidacrea@gmail.com?subject=Informaci%C3%B3n%20sobre%20el%20Plan%20Emprendedor&body=Hola%2C%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20Plan%20Emprendedor.%20Gracias.'
        },
        {
          title: 'Plan Especialista',
          subtitle: 'Diseño enfocado en profesionistas independientes',
          description: 'Pensado para médicos, terapeutas, psicólogos, nutriólogos y especialistas que necesitan una identidad visual confiable, clara y alineada a su profesión.',
          features: [
            'Todo lo del Plan Emprendedor',
            '3 post para redes sociales',
            '3 Plantillas para post de Instagram',
            '3 íconos para historias destacadas (IG)',
            'Manual básico de marca',
            'Tarjeta de presentación digital o impresa',
            'Hoja membretada (recetas, informes, etc.)',
            '1 hoja de presentación de servicios o perfil médico',
            'Firma de correo profesional'
          ],
          buttonText: 'COTIZAR PLAN',
          link: 'mailto:nitidacrea@gmail.com?subject=Informaci%C3%B3n%20sobre%20el%20Plan%20Especialista&body=Hola%2C%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20Plan%20Especialista.%20Gracias.'
        },
        {
          title: 'Plan Avanzado',
          subtitle: 'Marca completa y lista para despegar',
          description: 'Para negocios que buscan una identidad visual robusta y una web profesional lista para funcionar.',
          features: [
            'Todo lo del Plan Emprendedor',
            'Manual de marca extendido',
            'Sitio web de hasta 5 secciones (Inicio, Nosotros, Servicios, etc.)'
          ],
          buttonText: 'COTIZAR PLAN',
          link: 'mailto:nitidacrea@gmail.com?subject=Informaci%C3%B3n%20sobre%20el%20Plan%20Avanzado&body=Hola%2C%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20Plan%20Avanzado.%20Gracias.'
        }
      ]
    }
  };

  const switchService = (service) => {
    currentService = service;
    // Actualizar URL sin recargar la página
    const url = new URL(window.location.href);
    url.searchParams.set('service', service);
    window.history.pushState({}, '', url);
  };

  onMount(() => {
    // Leer el parámetro de la URL si existe (solo en el cliente)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const serviceFromUrl = urlParams.get('service');
      if (serviceFromUrl === 'branding' || serviceFromUrl === 'web') {
        currentService = serviceFromUrl;
      } else {
        currentService = selectedService;
      }
    } else {
      currentService = selectedService;
    }
  });

  $: currentServiceData = services[currentService];
</script>

<section class="bg-slate-50 pt-8 pb-16 md:pt-12 md:pb-24" id="planes">
  <div class="max-w-6xl mx-auto px-4">
    <!-- Selector de servicios -->
    <div class="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="50">
      <div class="inline-flex bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
        <button
          on:click={() => switchService('web')}
          class={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
            currentService === 'web'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Web Design
        </button>
        <button
          on:click={() => switchService('branding')}
          class={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
            currentService === 'branding'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Branding
        </button>
      </div>
    </div>

    <!-- Título y subtítulo -->
    <div class="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
      <h2 class="text-3xl md:text-5xl font-main text-gray-900 my-2">
        {currentServiceData.title}
      </h2>
      <p class="text-lg text-accent max-w-2xl mx-auto">
        {currentServiceData.subtitle}
      </p>
    </div>

    <!-- Grid de planes -->
    <div class="grid md:grid-cols-3 gap-8">
      {#each currentServiceData.plans as plan, index}
        <div data-aos="fade-up" data-aos-delay={150 + (index * 50)}>
          <PricingCard
            title={plan.title}
            subtitle={plan.subtitle}
            description={plan.description}
            features={plan.features}
            buttonText={plan.buttonText}
            link={plan.link}
            icon="check"
            colorScheme={currentServiceData.colorScheme}
          />
        </div>
      {/each}
    </div>
  </div>
</section>
