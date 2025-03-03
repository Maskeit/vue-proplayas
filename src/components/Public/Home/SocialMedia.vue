<template>
    <div class="flex flex-col gap-6 py-12 text-center p-6">
        <h1 class="text-4xl font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200">
            Contacto y Redes Sociales
        </h1>
        <p class="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Mantente conectado con nuestra comunidad a través de múltiples canales de comunicación.
        </p>

        <!-- Contenedor de redes sociales -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
            <a href="https://www.instagram.com/proplayas" class="social-box">
                <InstagramIcon class="icon-style" />
                <div>
                    <h3 class="text-lg font-semibold dark:text-gray-100">Instagram</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">@Red_Proplayas</p>
                </div>
            </a>

            <a href="https://www.facebook.com/proplayas" class="social-box">
                <FacebookIcon class="icon-style" />
                <div>
                    <h3 class="text-lg font-semibold dark:text-gray-100">Facebook</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">@Red_Proplayas</p>
                </div>
            </a>

            <a href="https://www.youtube.com/proplayas" class="social-box">
                <YoutubeIcon class="icon-style" />
                <div>
                    <h3 class="text-lg font-semibold dark:text-gray-100">YouTube</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">@Red_Proplayas</p>
                </div>
            </a>

        </div>
        <!-- Correo de contacto -->
        <p class="text-lg text-[var(--color-eastern-blue-600)] dark:text-[var(--color-eastern-blue-300)] font-semibold">
            <a href="mailto:red.proplayas@gmail.com" class="hover:underline">
                red.proplayas@gmail.com
            </a>
        </p>
    </div>
</template>

<script setup lang="ts">
import FacebookIcon from '@/components/icons/FacebookIcon.vue';
import InstagramIcon from '@/components/icons/InstagramIcon.vue';
import YoutubeIcon from '@/components/icons/YoutubeIcon.vue';
</script>

<style scoped>
/* Estilo general de las cajas de redes sociales */
.social-box {    
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    transition: background-color 0.3s ease;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.3s ease;
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
}
.icon-style {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-eastern-blue-600);
    transition: color 0.3s ease;
}
/* .icon-style {
    @apply w-10 h-10 text-[var(--color-eastern-blue-600)] dark:text-[var(--color-eastern-blue-300)];
} */

</style>