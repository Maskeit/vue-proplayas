<template>
  <section class="py-12 bg-gray-100 dark:bg-zinc-600 text-gray-700 dark:text-gray-100 text-center md:text-left px-4">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
      <!-- Imagen lateral -->
      <div class="w-full md:w-1/2">
        <img
          src="@/assets/images/home/about.webp"
          alt="Apoya Proplayas"
          class="w-full h-64 md:h-full object-cover rounded-xl"
        />
      </div>
      <!-- Contenido textual -->
      <div class="w-full md:w-1/2">
        <h1 class="text-4xl mb-4 font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200">
          Apoya a la Red Proplayas
        </h1>
        <p class="mb-6 text-base md:text-lg">
          Tu contribución voluntaria nos ayuda a mantener este sitio en funcionamiento y a organizar actividades que
          promuevan el bienestar costero.
        </p>
        <a href="https://www.paypal.com/donate?hosted_button_id=XXXXXXXXXXXX" target="_blank" rel="noopener noreferrer"
          class="inline-block bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-300">
          Donar con PayPal
          <PaypalIcon class="inline-block w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PaypalIcon from '@/components/icons/PaypalIcon.vue';
import ImgPrueba from '@/assets/images/home/about.webp';
</script>