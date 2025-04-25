<template>
    <section class="relative bg-gradient-to-r from-blue-50 to-blue-200 dark:from-zinc-800 dark:to-zinc-900 min-h-screen flex items-center justify-center"> 
        <div class="container my-4 mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10">
            <!-- Contenido de la izquierda -->
            <div class="lg:w-1/2 text-center lg:text-left animate-fade-up ">
                <h1 class="text-4xl lg:text-6xl font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200 ">
                    Red Proplayas
                </h1>
                <p class="mt-4 text-lg dark:text-gray-200">
                    La mayor red de gestión y certificación de playas en Iberoamérica, uniendo esfuerzos para el
                    desarrollo
                    sostenible de nuestros espacios costeros.
                </p>

                <div class="mt-6 space-y-4 text-justify-center">
                    <div class="flex items-center gap-3">

                        <span class="text-lg font-bold text-gray-800 dark:text-gray-200">- La comunidad de playeros más grande.</span>
                    </div>

                    <div class="flex items-center gap-3">
                        <span class="text-lg font-bold text-gray-800 dark:text-gray-200">- Presencia internacional</span>
                    </div>
                </div>

                <button @click="openHistory" class="mt-6 px-6 py-3 bg-[var(--color-eastern-blue-600)] dark:bg-zinc-600 dark:hover:bg-zinc-500 text-white rounded-lg shadow-lg hover:bg-[var(--color-eastern-blue-800)]">
                    Conócenos
                </button>
            </div>

            <!-- Imagen de la derecha -->
            <div class="lg:w-1/2 flex justify-center">
                <img src="@/assets/icons/proplayas_logo.svg" alt="Proplayas Logo"
                    class="animate-wiggle w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 drop-shadow-xl">
            </div>

        </div>
        
    </section>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const openHistory = () => {
    router.push('/history');
};
</script>