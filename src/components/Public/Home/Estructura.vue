<template>
  <section class="py-20 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100">
    <div class="container mx-auto px-6 lg:px-20 flex flex-col gap-12">
      <!-- Título y descripción -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 class="text-4xl lg:text-6xl font-bold text-[var(--color-eastern-blue-800)] dark:text-white">
            Estructura Organizativa (Nodos)
          </h1>
        </div>
        <div>
          <p class="text-lg leading-relaxed">
            Nuestra red se construye sobre nodos dinámicos que integran diversos sectores: científico, empresarial, público y sociedad civil.
          </p>
          <button @click="goNodos"
            class="mt-6 px-6 py-3 bg-[var(--color-eastern-blue-600)] hover:bg-[var(--color-eastern-blue-800)] dark:bg-zinc-600 dark:hover:bg-zinc-500 text-white rounded-lg shadow-lg">
            Nodos
          </button>
        </div>
      </div>

      <!-- Cards -->
      <div class="flex flex-wrap gap-6 justify-start">
        <div class="bg-white dark:bg-zinc-700 rounded-xl shadow-md p-6 text-left hover:shadow-lg transition duration-300 w-full sm:w-[300px]">
          <div class="text-3xl mb-2">🧠</div>
          <h3 class="text-xl font-bold mb-2">Sistema de nodos</h3>
          <p class="text-sm text-gray-700 dark:text-gray-300">Explicación del sistema de nodos dinámicos que integran diversos sectores.</p>
        </div>

        <div class="bg-white dark:bg-zinc-700 rounded-xl shadow-md p-6 text-left hover:shadow-lg transition duration-300 w-full sm:w-[300px]">
          <div class="text-3xl mb-2">🧩</div>
          <h3 class="text-xl font-bold mb-2">Requisitos</h3>
          <p class="text-sm text-gray-700 dark:text-gray-300">Grupos mínimo de 3 personas para formar parte de un nodo.</p>
        </div>

        <div class="bg-white dark:bg-zinc-700 rounded-xl shadow-md p-6 text-left hover:shadow-lg transition duration-300 w-full sm:w-[300px]">
          <div class="text-3xl mb-2">🌍</div>
          <h3 class="text-xl font-bold mb-2">Tipos de Participantes</h3>
          <ul class="list-disc ml-4 text-sm text-gray-700 dark:text-gray-300">
            <li>Científicos</li>
            <li>Empresarial</li>
            <li>Función Pública</li>
            <li>Activista/Sociedad Civil</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goNodos = () => {
    router.push({ name: 'Nodos' });
}
</script>