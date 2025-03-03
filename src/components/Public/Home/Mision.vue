<template>
    <section class="relative bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen flex items-center justify-center">
        <div class="container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10">
            <!-- Contenido de la izquierda -->
            <div class="lg:w-1/2 text-center lg:text-left animate-fade-up ">
                <h1 class="text-4xl lg:text-6xl font-bold text-[var(--color-eastern-blue-800)] ">
                    Misión
                </h1>
                <p class="mt-4 text-lg ">
                    Trabajamos por la excelencia en la gestión de playas a través del intercambio de conocimientos y
                    experiencias entre profesionales de 17 países.
                </p>
                <button @click="openPDF"
                    class="mt-6 px-6 py-3 bg-[var(--color-eastern-blue-600)] text-white rounded-lg shadow-lg hover:bg-[var(--color-eastern-blue-800)]">
                    ABC Proplayas
                </button>
            </div>

            <!-- Imagen de la derecha -->
            <div class="lg:w-1/2 flex justify-center">
                <img src="@/assets/images/mision.webp" alt="Proplayas Logo"
                    class="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 drop-shadow-xl">
            </div>

        </div>

    </section>
</template>



<script setup lang="ts">
const openPDF = () => {
    window.open("/public/ABC_RED_PROPLAYAS.pdf", "_blank");
};
</script>
<style scoped></style>
