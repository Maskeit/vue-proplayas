<template>
    <section id="quienes-somos" class="relative min-h-screen flex items-center justify-center">

        <div class="container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10">
            <!-- Aqui las imagenes por scroll driven -->
            <div ref="columnsContainer" class="lg:w-1/2 flex justify-center">
                <div class="columns grid grid-cols-3 gap-2 overflow-hidden">
                    <div class="column-reverse flex flex-col-reverse gap-3">
                        <img v-for="(image, index) in imagesLeft" :key="'left-' + index" :src="image"
                            class="rounded-lg shadow-lg w-full h-[260px] object-cover aspect-[3/4]">
                    </div>
                    <div class="column flex flex-col gap-3">
                        <img v-for="(image, index) in imagesCenter" :key="'center-' + index" :src="image"
                            class="rounded-lg shadow-lg w-full h-[260px] object-cover aspect-[3/4]">
                    </div>
                    <div class="column-reverse flex flex-col-reverse gap-3">
                        <img v-for="(image, index) in imagesRight" :key="'right-' + index" :src="image"
                            class="rounded-lg shadow-lg w-full h-[260px] object-cover aspect-[3/4]">
                    </div>
                </div>
            </div>

            <!-- Contenido de la derecha -->
            <div class="lg:w-1/2 text-center lg:text-right animate-fade-up gap-2">
                <h1 class="text-4xl lg:text-6xl font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200">
                    ¿Quiénes Somos?
                </h1>
                <p class="mt-4 text-lg text-gray-700 dark:text-gray-200">
                    La mayor comunidad de profesionales, ciudadanos, empresarios, funcionarios y científicos que
                    trabajan en y con las playas en América Latina y Europa del Sur.
                    Desde 2007, nos hemos consolidado como la comunidad de playeros más grande y diversa del continente,
                    promoviendo la gestión integrada de las zonas costeras.
                </p>
                <button @click="openHistory"
                    class="mt-6 px-6 py-3 bg-yellow-500 hover:bg-zinc-400 dark:bg-yellow-600 dark:hover:bg-zinc-500 text-white rounded-lg shadow-lg ">
                    Historia
                </button>
                <button @click="openPDF"
                    class="mt-6 ml-3 px-6 py-3 bg-[var(--color-eastern-blue-600)] hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-white rounded-lg shadow-lg ">
                    ABC Proplayas
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const columnsContainer = ref<HTMLElement | null>(null);

const path = "/src/assets/images/home/";
const imagesLeft = [`${path}about1.webp`, `${path}about2.webp`, `${path}about3.webp`];
const imagesCenter = [`${path}about4.webp`, `${path}about5.webp`, `${path}about6.webp`];
const imagesRight = [`${path}about7.webp`, `${path}about8.webp`, `${path}about9.webp`];

const openPDF = () => {
    window.open("/ABC_RED_PROPLAYAS.pdf", "_blank");
};
const openHistory = () => {
    router.push('/history');
};
let scrollListener: (() => void) | null = null;
onMounted(() => {
    if (!columnsContainer.value) return;

    // Activar solo la animación de opacidad primero
    setTimeout(() => {
        // Verificar compatibilidad con ScrollTimeline
        if ("ScrollTimeline" in window) {
            setupScrollTimeline();
        } else {
            console.warn("ScrollTimeline no está soportado en este navegador. Se usará requestAnimationFrame.");
            setupFallbackAnimation();
        }
    }, 1000); // Esperar 1s antes de ejecutar las animaciones de las imágenes
});

onUnmounted(() => {
    if (scrollListener) {
        window.removeEventListener("scroll", scrollListener);
    }
});

const setupScrollTimeline = () => {
    
    (columnsContainer.value!.querySelector(".columns") as HTMLElement).style.overflowY = "hidden";
    const timeline = new (window as any).ScrollTimeline({ source: document.documentElement });

    columnsContainer.value!.querySelectorAll(".column-reverse").forEach(($column) => {
        ($column as HTMLElement).style.flexDirection = "column-reverse";
        ($column as HTMLElement).animate(
            { transform: ["translateY(calc(-100% + 100vh))", "translateY(calc(100% - 100vh))"] },
            { fill: "both", timeline } as any
        );
    });

    columnsContainer.value!.querySelectorAll(".column").forEach(($column) => {
        ($column as HTMLElement).animate(
            { transform: ["translateY(calc(100% - 100vh))", "translateY(calc(-100% + 100vh))"] },
            { fill: "both", timeline } as any
        );
    });
};

// ✅ Alternativa con requestAnimationFrame para Safari/Firefox
const setupFallbackAnimation = () => {
    const columns = columnsContainer.value!.querySelectorAll(".column, .column-reverse");

    scrollListener = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        columns.forEach((column, index) => {
            const rect = column.getBoundingClientRect();
            const start = viewportHeight * 0.2;
            const end = viewportHeight * 0.8;

            // Normaliza el progreso del scroll en base a la posición de la columna
            let progress = (rect.top - start) / (end - start);
            progress = Math.min(Math.max(progress, 0), 1); // Limita el progreso entre 0 y 1

            const direction = index % 2 === 0 ? 1 : -1; // Alterna dirección de desplazamiento
            (column as HTMLElement).style.transform = `translateY(${direction * (1 - progress) * 50}px)`;
        });

        requestAnimationFrame(scrollListener!);
    };

    requestAnimationFrame(scrollListener);
};
</script>