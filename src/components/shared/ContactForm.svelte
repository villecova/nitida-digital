<script lang="ts">
  import { onMount } from 'svelte';
  import { track } from '../../lib/analytics';

  export let formspreeEndpoint = '';
  export let emailFallback = '';

  type FormStatus = 'idle' | 'loading' | 'success' | 'error';

  let name = '';
  let email = '';
  let projectType = '';
  let description = '';
  let budget = '';
  let timeline = '';
  let company = ''; // honeypot
  let status: FormStatus = 'idle';
  let errorMessage = '';
  let fieldErrors: Record<string, string> = {};

  const projectTypes = [
    { value: 'web', label: 'Sitio web' },
    { value: 'branding', label: 'Identidad visual' },
    { value: 'web-branding', label: 'Sitio web e identidad visual' },
    { value: 'other', label: 'Otro / por definir' },
  ];

  function validate(): boolean {
    fieldErrors = {};
    if (!name.trim()) fieldErrors.name = 'Indica tu nombre.';
    if (!email.trim()) {
      fieldErrors.email = 'Indica tu correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      fieldErrors.email = 'El correo electrónico no es válido.';
    }
    if (!projectType) fieldErrors.projectType = 'Selecciona el tipo de proyecto.';
    if (!description.trim() || description.trim().length < 10) {
      fieldErrors.description = 'Describe el proyecto con un poco más de detalle (mínimo 10 caracteres).';
    }
    return Object.keys(fieldErrors).length === 0;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    errorMessage = '';

    // Honeypot: bots fill this
    if (company.trim()) {
      status = 'success';
      return;
    }

    if (!validate()) {
      status = 'idle';
      return;
    }

    if (!formspreeEndpoint) {
      status = 'error';
      errorMessage =
        'El formulario no está disponible por el momento. Puedes escribir a ' +
        emailFallback +
        ' o utilizar el enlace de correo de esta página.';
      track('form_submit_error', { reason: 'missing_endpoint' });
      return;
    }

    status = 'loading';

    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType,
          description: description.trim(),
          budget: budget.trim() || undefined,
          timeline: timeline.trim() || undefined,
          _subject: `Consulta Nítida: ${projectType} — ${name.trim()}`,
        }),
      });

      if (res.ok) {
        status = 'success';
        track('form_submit', { projectType });
        name = '';
        email = '';
        projectType = '';
        description = '';
        budget = '';
        timeline = '';
      } else {
        const data = await res.json().catch(() => ({}));
        status = 'error';
        errorMessage =
          data?.errors?.[0]?.message ||
          'No fue posible enviar el mensaje. Inténtalo de nuevo o utiliza el correo electrónico.';
        track('form_submit_error', { reason: 'api' });
      }
    } catch {
      status = 'error';
      errorMessage =
        'Error de conexión. Verifica tu red o envía tu consulta por correo electrónico.';
      track('form_submit_error', { reason: 'network' });
    }
  }

  onMount(() => {
    // no-op; reserved for future analytics page view
  });
</script>

{#if status === 'success'}
  <div
    class="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
    role="status"
    aria-live="polite"
  >
    <h3 class="text-xl font-bold text-gray-900 mb-2">Mensaje enviado</h3>
    <p class="text-gray-600 text-sm mb-6">
      Gracias por tu mensaje. Lo revisaré y te responderé en un máximo de 24 horas hábiles.
    </p>
    <button
      type="button"
      class="text-sm font-semibold text-gray-900 underline"
      on:click={() => (status = 'idle')}
    >
      Enviar otra consulta
    </button>
  </div>
{:else}
  <form
    id="formulario"
    class="space-y-5"
    on:submit={handleSubmit}
    novalidate
    aria-busy={status === 'loading'}
  >
    <!-- Honeypot -->
    <div class="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
      <label for="company">Empresa</label>
      <input
        id="company"
        name="company"
        type="text"
        tabindex="-1"
        autocomplete="off"
        bind:value={company}
      />
    </div>

    <div class="grid md:grid-cols-2 gap-5">
      <div>
        <label for="contact-name" class="block text-sm font-medium text-gray-900 mb-1.5">
          Nombre <span class="text-red-600">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autocomplete="name"
          required
          bind:value={name}
          class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none"
          aria-invalid={fieldErrors.name ? 'true' : undefined}
          aria-describedby={fieldErrors.name ? 'err-name' : undefined}
        />
        {#if fieldErrors.name}
          <p id="err-name" class="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
        {/if}
      </div>

      <div>
        <label for="contact-email" class="block text-sm font-medium text-gray-900 mb-1.5">
          Correo <span class="text-red-600">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autocomplete="email"
          required
          bind:value={email}
          class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none"
          aria-invalid={fieldErrors.email ? 'true' : undefined}
          aria-describedby={fieldErrors.email ? 'err-email' : undefined}
        />
        {#if fieldErrors.email}
          <p id="err-email" class="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
        {/if}
      </div>
    </div>

    <div>
      <label for="contact-type" class="block text-sm font-medium text-gray-900 mb-1.5">
        Tipo de proyecto <span class="text-red-600">*</span>
      </label>
      <select
        id="contact-type"
        name="projectType"
        required
        bind:value={projectType}
        class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none"
        aria-invalid={fieldErrors.projectType ? 'true' : undefined}
      >
        <option value="">Selecciona una opción</option>
        {#each projectTypes as type}
          <option value={type.value}>{type.label}</option>
        {/each}
      </select>
      {#if fieldErrors.projectType}
        <p class="mt-1 text-xs text-red-600">{fieldErrors.projectType}</p>
      {/if}
    </div>

    <div>
      <label for="contact-description" class="block text-sm font-medium text-gray-900 mb-1.5">
        Breve descripción <span class="text-red-600">*</span>
      </label>
      <textarea
        id="contact-description"
        name="description"
        rows="4"
        required
        bind:value={description}
        placeholder="Describe el proyecto, el tipo de negocio y el resultado que buscas."
        class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none resize-y"
        aria-invalid={fieldErrors.description ? 'true' : undefined}
      ></textarea>
      {#if fieldErrors.description}
        <p class="mt-1 text-xs text-red-600">{fieldErrors.description}</p>
      {/if}
    </div>

    <div class="grid md:grid-cols-2 gap-5">
      <div>
        <label for="contact-budget" class="block text-sm font-medium text-gray-900 mb-1.5">
          Presupuesto aproximado <span class="text-gray-400 font-normal">(opcional)</span>
        </label>
        <input
          id="contact-budget"
          name="budget"
          type="text"
          bind:value={budget}
          placeholder="Ej. $8,000 – $15,000 MXN"
          class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none"
        />
      </div>
      <div>
        <label for="contact-timeline" class="block text-sm font-medium text-gray-900 mb-1.5">
          Plazo deseado <span class="text-gray-400 font-normal">(opcional)</span>
        </label>
        <input
          id="contact-timeline"
          name="timeline"
          type="text"
          bind:value={timeline}
          placeholder="Ej. en 4 semanas / sin fecha definida"
          class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none"
        />
      </div>
    </div>

    {#if status === 'error' && errorMessage}
      <div
        class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        role="alert"
      >
        {errorMessage}
        {#if emailFallback}
          <a
            class="underline font-medium ml-1"
            href={`mailto:${emailFallback}`}
            on:click={() => track('email_click', { source: 'form_error' })}
          >
            {emailFallback}
          </a>
        {/if}
      </div>
    {/if}

    <button
      type="submit"
      disabled={status === 'loading'}
      class="w-full md:w-auto uppercase inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-gray-900 text-white hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-900/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
    >
      {status === 'loading' ? 'Enviando…' : 'Enviar consulta'}
    </button>

    <p class="text-xs text-gray-500">
      Respuesta en un máximo de 24 horas hábiles. Los datos se utilizan únicamente para atender esta consulta.
    </p>
  </form>
{/if}
