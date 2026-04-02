<script>
  export let title = '';
  export let subtitle = '';
  export let description = '';
  export let features = [];
  export let buttonText = '';
  export let link = '';
  export let colorScheme = null;
  export let isRecommended = false;
  export let price = null;

  const colorPalettes = {
    blue: {
      primary: 'bg-blue-600 hover:bg-black',
      text: 'text-blue-600'
    },
    purple: {
      primary: 'bg-purple-600 hover:bg-black',
      text: 'text-purple-600'
    },
    yellow: {
      primary: 'bg-yellow-500 hover:bg-black',
      text: 'text-yellow-600'
    }
  };

  $: buttonClass = colorScheme && colorPalettes[colorScheme]
    ? `${colorPalettes[colorScheme].primary} text-white`
    : 'bg-primary hover:bg-black text-white';

  $: badgeColor = colorScheme === 'blue' 
    ? 'bg-blue-600 text-white' 
    : colorScheme === 'purple' 
    ? 'bg-purple-600 text-white' 
    : colorScheme === 'yellow'
    ? 'bg-yellow-600 text-white'
    : 'bg-gray-600 text-white';

  $: borderColor = colorScheme === 'blue'
    ? 'border-blue-600'
    : colorScheme === 'purple'
    ? 'border-purple-600'
    : colorScheme === 'yellow'
    ? 'border-yellow-600'
    : 'border-gray-200';
</script>

<div class="flex flex-col bg-white rounded-2xl p-8 border-2 transition-shadow duration-300 relative {isRecommended ? `${borderColor} shadow-lg hover:shadow-xl` : 'border-gray-200 shadow-sm hover:shadow-md'}">
  {#if isRecommended}
    <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
      <span class="{badgeColor} text-xs font-semibold px-3 py-1 rounded-full">⭐ Recomendado</span>
    </div>
  {/if}
  <div class="flex-auto">
    <h3 class="mb-3 text-2xl font-bold text-gray-900 leading-tight">{title}</h3>
    <p class="text-gray-600 text-sm mb-4">{subtitle}</p>
    {#if price}
      <div class="mb-4">
        <p class="text-2xl font-bold text-gray-900">{price}</p>
      </div>
    {/if}
    <p class="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>
    <p class="text-gray-900 font-semibold mb-4 text-sm">Incluye:</p>
    <ul role="list" class="mb-8 space-y-3 text-left">
      {#each features as feature}
        <li class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-sm text-gray-600 leading-relaxed">{feature}</span>
        </li>
      {/each}
    </ul>
  </div>
  
  <div class="flex-none pt-6 border-t border-gray-200">
    <a
      href={link}
      class={`cursor-pointer uppercase inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium rounded-lg focus:outline-none transition-all duration-200 focus:ring-4 ${buttonClass} ${
        colorScheme === 'blue' ? 'focus:ring-blue-500/50' : 
        colorScheme === 'purple' ? 'focus:ring-purple-500/50' : 
        colorScheme === 'yellow' ? 'focus:ring-yellow-500/50' : 
        'focus:ring-primary/50'
      }`}
      role="button"
    >
      {buttonText}
    </a>
  </div>
</div>
