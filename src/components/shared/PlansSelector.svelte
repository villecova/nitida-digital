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
          title: 'Landing Esencial',
          subtitle: 'Presencia clara y directa',
          price: '$6,000 MXN',
          description: 'Presencia clara y directa para lanzar, validar o promocionar un servicio. Un solo mensaje, un solo flujo, una sola acción principal.',
          features: [
            'Un mensaje claro que comunica tu propuesta de valor',
            'Un flujo pensado para guiar al visitante hacia una acción',
            'Presencia profesional inmediata y lista para usar',
            'Lista para aparecer en Google',
            'Se ve perfecto en cualquier dispositivo',
            'Todo lo legal incluido (aviso de privacidad y términos)',
            'Hosting y dominio (primer año)'
          ],
          buttonText: 'SOLICITAR COTIZACIÓN',
          link: 'mailto:nitidacrea@gmail.com?subject=Informaci%C3%B3n%20sobre%20Landing%20Esencial&body=Hola%2C%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20plan%20Landing%20Esencial.%20Gracias.',
          isRecommended: false
        },
        {
          title: 'Web Profesional',
          subtitle: 'Sitio web para operar tu negocio',
          price: '$12,000 MXN',
          description: 'Sitio web para operar el negocio, comunicar varios servicios y crecer sin rehacer la web. Pensado para negocios que necesitan más que presencia: necesitan un sitio que realmente trabaje para ellos.',
          features: [
            'Todo lo del plan básico',
            'Organización clara de información para que tus clientes encuentren lo que buscan',
            'Capacidad de explicar distintos servicios de forma clara y profesional',
            'Mayor claridad para el cliente final sobre quién eres y qué ofreces',
            'Base sólida para el crecimiento del negocio sin rehacer el sitio',
            'Confianza y profundidad: un sitio pensado para el largo plazo'
          ],
          buttonText: 'SOLICITAR COTIZACIÓN',
          link: 'mailto:nitidacrea@gmail.com?subject=Informaci%C3%B3n%20sobre%20Web%20Profesional&body=Hola%2C%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20plan%20Web%20Profesional.%20Gracias.',
          isRecommended: true
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
  $: gridCols = currentService === 'web' ? 'md:grid-cols-2' : 'md:grid-cols-3';
  $: maxWidth = currentService === 'web' ? 'max-w-4xl' : 'max-w-6xl';
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
    <div class="grid {gridCols} gap-8 {maxWidth} mx-auto">
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
            isRecommended={plan.isRecommended || false}
            price={plan.price || null}
          />
        </div>
      {/each}
    </div>

    <!-- Web a Medida (solo para Web Design) -->
    {#if currentService === 'web'}
      <div class="mt-16 pt-16 border-t border-gray-200">
        <div class="max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="250">
          <div class="bg-gray-50 rounded-xl p-8 md:p-12 border border-gray-200/50">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Web a Medida</h3>
            <p class="text-lg text-gray-700 mb-6 leading-relaxed">
              Si tu proyecto requiere funcionalidades específicas, integraciones complejas o una solución completamente personalizada, trabajamos contigo para definir el alcance exacto que necesitas.
            </p>
            <p class="text-base text-gray-600 mb-8 leading-relaxed">
              Cada proyecto a medida es único. Conversamos sobre tus objetivos, necesidades técnicas y presupuesto para crear una propuesta que se ajuste perfectamente a tu negocio.
            </p>
            <div class="pt-6 border-t border-gray-200">
              <a
                href="/contact"
                class="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-base transition-colors"
              >
                Agendar una llamada para conversar sobre tu proyecto →
              </a>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Sección de Mantenimiento (solo para Web Design) -->
    {#if currentService === 'web'}
      <div class="mt-24 pt-16 border-t border-gray-200">
        <div class="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
          <h2 class="text-3xl md:text-5xl font-main text-gray-900 my-2">
            Mantenimiento y seguimiento web
          </h2>
          <p class="text-lg text-accent max-w-2xl mx-auto">
            Mantén tu sitio actualizado, funcional y alineado con tu negocio a lo largo del tiempo.
            Elige la opción que mejor se adapte a tu ritmo.
          </p>
        </div>

        <!-- Planes Mensual y Anual -->
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <!-- Plan Mensual -->
          <div data-aos="fade-up" data-aos-delay="150">
            <div class="flex flex-col bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
              <div class="flex-auto">
                <h3 class="mb-3 text-2xl font-bold text-gray-900 leading-tight">Plan Mensual</h3>
                <p class="text-gray-600 text-sm mb-4">Seguimiento continuo</p>
                <p class="text-gray-600 mb-6 text-sm leading-relaxed">
                  Ideal si necesitas ajustes frecuentes o acompañamiento constante.
                </p>
                <p class="text-gray-900 font-semibold mb-4 text-sm">Incluye:</p>
                <ul role="list" class="mb-8 space-y-3 text-left">
                  <li class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600 leading-relaxed">Actualizaciones de contenido</span>
                  </li>
                  <li class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600 leading-relaxed">Soporte técnico</span>
                  </li>
                  <li class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600 leading-relaxed">Ajustes visuales menores</span>
                  </li>
                  <li class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600 leading-relaxed">Revisión general del sitio</span>
                  </li>
                </ul>
              </div>
              <div class="flex-none pt-6 border-t border-gray-200">
                <div class="mb-4">
                  <p class="text-2xl font-bold text-gray-900">$1,800 <span class="text-base font-normal text-gray-600">MXN / mes</span></p>
                </div>
                <a
                  href="mailto:nitidacrea@gmail.com?subject=Contratar%20Plan%20Mensual%20de%20Mantenimiento&body=Hola%2C%20me%20interesa%20contratar%20el%20Plan%20Mensual%20de%20Mantenimiento.%20Gracias."
                  class="cursor-pointer uppercase inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium rounded-lg focus:outline-none transition-all duration-200 focus:ring-4 bg-blue-600 hover:bg-black text-white focus:ring-blue-500/50"
                  role="button"
                >
                  Contratar plan mensual
                </a>
              </div>
            </div>
          </div>

          <!-- Plan Anual (Recomendado) -->
          <div data-aos="fade-up" data-aos-delay="200">
            <div class="flex flex-col bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full relative">
              <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span class="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">⭐ Recomendado</span>
              </div>
              <div class="flex-auto">
                <h3 class="mb-3 text-2xl font-bold text-gray-900 leading-tight">Plan Anual</h3>
                <p class="text-gray-600 text-sm mb-4">Seguimiento continuo con beneficio de inversión</p>
                <p class="text-gray-600 mb-6 text-sm leading-relaxed">
                  La opción recomendada para mantener tu sitio estable y optimizado durante todo el año.
                </p>
                <p class="text-gray-900 font-semibold mb-4 text-sm">Incluye:</p>
                <ul role="list" class="mb-8 space-y-3 text-left">
                  <li class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600 leading-relaxed">Todo lo del plan mensual</span>
                  </li>
                  <li class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600 leading-relaxed">Prioridad en solicitudes</span>
                  </li>
                  <li class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600 leading-relaxed">Revisión periódica del sitio</span>
                  </li>
                </ul>
              </div>
              <div class="flex-none pt-6 border-t border-gray-200">
                <div class="mb-2">
                  <p class="text-2xl font-bold text-gray-900">$18,000 <span class="text-base font-normal text-gray-600">MXN / año</span></p>
                  <p class="text-sm text-gray-500 mt-1">(equivale a 2 meses sin costo)</p>
                </div>
                <a
                  href="mailto:nitidacrea@gmail.com?subject=Contratar%20Plan%20Anual%20de%20Mantenimiento&body=Hola%2C%20me%20interesa%20contratar%20el%20Plan%20Anual%20de%20Mantenimiento.%20Gracias."
                  class="cursor-pointer uppercase inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium rounded-lg focus:outline-none transition-all duration-200 focus:ring-4 bg-blue-600 hover:bg-black text-white focus:ring-blue-500/50"
                  role="button"
                >
                  Contratar plan anual
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Cambios por única vez (discreto) -->
        <div class="max-w-2xl mx-auto text-center" data-aos="fade-up" data-aos-delay="250">
          <div class="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Cambios por única vez</h3>
            <p class="text-gray-600 text-sm mb-6">
              Para ajustes puntuales sin plan activo. Si solo necesitas un cambio específico, también podemos ayudarte.
            </p>
            <div class="space-y-3 text-left mb-6">
              <div class="flex items-start space-x-3">
                <span class="text-sm text-gray-600">Cambios simples (texto, imagen, enlace):</span>
                <span class="text-sm font-semibold text-gray-900 ml-auto">desde $500 MXN</span>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-sm text-gray-600">Cambios intermedios (sección, ajuste visual):</span>
                <span class="text-sm font-semibold text-gray-900 ml-auto">desde $1,200 MXN</span>
              </div>
              <div class="flex items-start space-x-3">
                <span class="text-sm text-gray-600">Cambios complejos:</span>
                <span class="text-sm font-semibold text-gray-900 ml-auto">Cotización personalizada</span>
              </div>
            </div>
            <a
              href="mailto:nitidacrea@gmail.com?subject=Solicitar%20Cambio%20Puntual&body=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20cambio%20puntual%20en%20mi%20sitio%20web.%20Gracias."
              class="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
            >
              Solicitar cambio puntual →
            </a>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
